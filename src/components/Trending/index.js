// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaHotjar} from 'react-icons/fa'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoLargeImageCard from '../VideoLargeCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingvideosList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    const updatedData = jsonData.videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      channel: {
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      },
      viewCount: eachVideo.view_count,
      publishedAt: eachVideo.published_at,
    }))
    if (response.ok) {
      this.setState({
        trendingvideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
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
      <button className="retry-btn" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {trendingvideosList} = this.state
    return (
      <>
        {trendingvideosList.length > 0 ? (
          <ul className="trending-video-list-container">
            {trendingvideosList.map(videoDetails => (
              <VideoLargeImageCard
                videoDetails={videoDetails}
                key={videoDetails.id}
              />
            ))}
          </ul>
        ) : null}
      </>
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

    return (
      <>
        <div className="home-container" data-testid="trending">
          <Sidebar />

          <div className="home-content">
            <Header />

            <div className="section-heading-container">
              <FaHotjar className="sidebar-list-icon" />
              <h1 className="section-hedding">Trending</h1>
            </div>

            {this.getResult(apiStatus)}
          </div>
        </div>
      </>
    )
  }
}

export default Trending
