import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import {BiLike, BiDislike} from 'react-icons/bi'

import {FaSave} from 'react-icons/fa'

import ReactPlayer from 'react-player'

import Header from '../Header'
import Sidebar from '../Sidebar'

import VideoContext from '../../context/VideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoItemDetails: [],
    savedVideosList: [],
    showSaveText: 'Save',
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getFormattedData = eachVideo => ({
    videoDetails: {
      id: eachVideo.video_details.id,
      title: eachVideo.video_details.title,
      thumbnailUrl: eachVideo.video_details.thumbnail_url,
      videoUrl: eachVideo.video_details.video_url,
      channel: {
        name: eachVideo.video_details.channel.name,
        profileImageUrl: eachVideo.video_details.channel.profile_image_url,
        subscriberCount: eachVideo.video_details.channel.subscriber_count,
      },
      viewCount: eachVideo.video_details.view_count,
      description: eachVideo.video_details.description,
      publishedAt: eachVideo.video_details.published_at,
      isLiked: false,
      isDisLiked: false,
      isSaved: false,
    },
  })

  getVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    console.log(formatDistanceToNow(new Date(2021, 8, 20)))
    // console.log(id)

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    const updatedData = this.getFormattedData(jsonData)

    // console.log(jsonData)

    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoItemDetails: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickedSaveVideo = onChangeSaveVideo => {
    const {videoItemDetails} = this.state
    const {videoDetails} = videoItemDetails

    this.setState(prevState => {
      const isSaved = prevState.savedVideosList.some(
        video => video.id === videoDetails.id,
      )

      return {
        savedVideosList: isSaved
          ? prevState.savedVideosList.filter(
              video => video.id !== videoDetails.id,
            )
          : [...prevState.savedVideosList, videoDetails],
        showSaveText: isSaved ? 'Save' : 'Saved',
      }
    })

    onChangeSaveVideo(videoDetails)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getVideoItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {videoItemDetails, showSaveText} = this.state
    return (
      <VideoContext.Consumer>
        {value => {
          const {onChangeSaveVideo} = value
          const {videoDetails} = videoItemDetails
          const {
            title,
            videoUrl,
            channel,
            viewCount,
            description,
            publishedAt,
          } = videoDetails
          const {name, profileImageUrl, subscriberCount} = channel

          return (
            <>
              <div
                className="video-item-details-container"
                data-testid="videoItemDetails "
              >
                <div className="video-container">
                  <ReactPlayer url={videoUrl} controls />
                </div>
                <div className="video-full-details-container">
                  <p className="video-title-video-item">{title}</p>
                  <div className="views-and-date-container">
                    <p className="views">{viewCount} views</p>
                    <p className="ago-years">{publishedAt} years</p>
                  </div>
                  <div className="video-buttons-container">
                    <button type="button" className="video-reaction-btn">
                      <BiLike className="video-reaction-icon" /> Like
                    </button>
                    <button type="button" className="video-reaction-btn">
                      <BiDislike className="video-reaction-icon" /> Dislike
                    </button>
                    <button
                      type="button"
                      className="video-reaction-btn"
                      onClick={() => this.onClickedSaveVideo(onChangeSaveVideo)}
                    >
                      <FaSave className="video-reaction-icon" /> {showSaveText}
                    </button>
                  </div>
                  <div className="channel-details-container">
                    <img
                      src={profileImageUrl}
                      alt="channel logo"
                      className="channel-logo-in-details"
                    />
                    <div className="channel-details">
                      <p className="channel-name">{name}</p>
                      <p className="subscribers">
                        {subscriberCount} subscribers
                      </p>
                    </div>
                  </div>
                  <p className="about-channel">{description}</p>
                </div>
              </div>
            </>
          )
        }}
      </VideoContext.Consumer>
    )
  }

  getResult = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    // const {videoItemDetails, savedVideosList, showSaveText} = this.state
    // console.log(savedVideosList, 'savedvideos list')

    // if (!videoItemDetails || !videoItemDetails.videoDetails) {
    //   return <p>Loading...</p>
    // }

    return (
      <div className="home-container">
        <Sidebar />

        <div className="home-content">
          <Header />
          {this.getResult(apiStatus)}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails

// onClickedSaveVideo = () => {
//   const {savedVideosList, videoItemDetails} = this.state
//   const {videoDetails} = videoItemDetails
//   const {id} = videoDetails
//   const isVideoAlreadySaved = savedVideosList.find(
//     eachVideo => eachVideo.id === id,
//   )
//   console.log(videoDetails, typeof videoDetails, 'videos in')
//   if (isVideoAlreadySaved) {
//     const updatedVideoList = savedVideosList.filter(
//       eachVideoObj => eachVideoObj.id !== id,
//     )
//     this.setState({
//       savedVideosList: updatedVideoList,
//       showSaveText: 'video Removed',
//       isVideoSaved: false,
//     })
//   } else {
//     this.setState(prevState => ({
//       savedVideosList: [...prevState.savedVideosList, videoDetails],
//       showSaveText: 'Video saved',
//       isVideoSaved: true,
//     }))
//   }
// }
