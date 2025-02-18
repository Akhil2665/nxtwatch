import {Component} from 'react'
import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    isClicked: false,
    apiStatus: apiStatusConstants.initial,
    videoItemDetails: [],
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
    },
  })

  getVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

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

  render() {
    const {videoItemDetails} = this.state
    console.log(videoItemDetails.videoDetails)
    console.log(!videoItemDetails, !videoItemDetails.videoDetails)
    if (!videoItemDetails || !videoItemDetails.videoDetails) {
      return <p>Loading...</p>
    }

    const {videoDetails} = videoItemDetails
    const {title, videoUrl, channel, viewCount, description, publishedAt} =
      videoDetails
    const {name, profileImageUrl, subscriberCount} = channel

    return (
      <div className="home-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="home-content">
          <Header />

          <div className="video-item-details-container">
            <div className="video-container">
              <ReactPlayer url={videoUrl} width="90%" controls />
            </div>
            <div className="video-full-details-container">
              <h1>{title}</h1>
              <div className="views-and-date-container">
                <p className="views">{viewCount} views</p>
                <p className="ago-years">{publishedAt} years</p>
              </div>
              <div className="video-buttons-container">
                <button type="button">Like</button>
                <button type="button">Dislike</button>
                <button type="button">Save</button>
              </div>
              <div className="channel-details-container">
                <img
                  src={profileImageUrl}
                  alt="channel"
                  className="channel-logo"
                />
                <div className="channel-details">
                  <p>{name}</p>
                  <p className="subscribers">{subscriberCount} subscribers</p>
                </div>
              </div>
              <p className="about-channel">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
