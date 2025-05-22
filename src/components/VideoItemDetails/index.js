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
    isVideoLiked: false,
    isVideoDisLiked: false,
    isSaved: false,
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

    console.log(formatDistanceToNow(new Date()))
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
      console.log(updatedData)
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

  onClickedDislike = (updateVideoReaction, videoDetails) => {
    console.log('clicked on dislike btn')
    this.setState(prevState => ({
      isVideoDisLiked: !prevState.isVideoDisLiked,
      isVideoLiked: false,
    }))
    updateVideoReaction(videoDetails)
  }

  onClickedLike = (updateVideoReaction, videoDetails) => {
    console.log('clicked on like btn')
    this.setState(prevState => ({
      isVideoLiked: !prevState.isVideoLiked,
      isVideoDisLiked: false,
    }))
    updateVideoReaction(videoDetails)
  }

  onClickedSaveVideo = (
    onChangeSaveVideo,
    isVideoAlreadySaved,
    videoDetails,
  ) => {
    this.setState({isSaved: !isVideoAlreadySaved})
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
    const {videoItemDetails, isVideoDisLiked, isVideoLiked, isSaved} =
      this.state

    const likedBtnClass = isVideoLiked
      ? 'video-reaction-btn reaction-clicked'
      : 'video-reaction-btn'
    const dislikedBtnClass = isVideoDisLiked
      ? 'video-reaction-btn reaction-clicked'
      : 'video-reaction-btn'
    const likedIconClass = isVideoLiked
      ? 'video-reaction-icon reaction-clicked'
      : 'video-reaction-icon '

    const dislikedIconClass = isVideoDisLiked
      ? 'video-reaction-icon reaction-clicked'
      : 'video-reaction-icon '

    return (
      <VideoContext.Consumer>
        {value => {
          const {onChangeSaveVideo, savedVideosList, updateVideoReaction} =
            value
          const {videoDetails} = videoItemDetails
          const {
            id,
            title,
            videoUrl,
            channel,
            viewCount,
            description,
            publishedAt,
          } = videoDetails

          const isVideoAlreadySaved = savedVideosList.some(
            video => video.id === id,
          )
          const saveIconClass = isVideoAlreadySaved
            ? 'video-reaction-icon reaction-clicked'
            : 'video-reaction-icon'
          const saveBtnClass = isVideoAlreadySaved
            ? 'video-reaction-btn reaction-clicked'
            : 'video-reaction-btn'
          const showSaveText = isVideoAlreadySaved ? 'Saved' : 'Save'

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
                    <button
                      type="button"
                      className={likedBtnClass}
                      onClick={() =>
                        this.onClickedLike(updateVideoReaction, {
                          ...videoDetails,
                          isLiked: isVideoLiked,
                          isDisLiked: isVideoDisLiked,
                        })
                      }
                    >
                      <BiLike className={likedIconClass} /> Like
                    </button>
                    <button
                      type="button"
                      className={dislikedBtnClass}
                      onClick={() =>
                        this.onClickedDislike(updateVideoReaction, {
                          ...videoDetails,
                          isLiked: isVideoLiked,
                          isDisLiked: isVideoDisLiked,
                        })
                      }
                    >
                      <BiDislike className={dislikedIconClass} /> Dislike
                    </button>
                    <button
                      type="button"
                      className={saveBtnClass}
                      onClick={() =>
                        this.onClickedSaveVideo(
                          onChangeSaveVideo,
                          isVideoAlreadySaved,
                          videoDetails,
                        )
                      }
                    >
                      <FaSave className={saveIconClass} /> {showSaveText}
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
