// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGamepad} from 'react-icons/fa'

import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingImageCard from '../GamingImageCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingvideosList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/gaming`
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
      viewCount: eachVideo.view_count,
    }))
    if (response.ok) {
      this.setState({
        gamingvideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {gamingvideosList} = this.state

    return (
      <>
        {gamingvideosList.length > 0 ? (
          <ul className="gaming-video-list-container">
            {gamingvideosList.map(videoDetails => (
              <GamingImageCard
                videoDetails={videoDetails}
                key={videoDetails.id}
              />
            ))}
          </ul>
        ) : null}
      </>
    )
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
        <div className="home-container" data-testid="gaming">
          <Sidebar />

          <div className="home-content">
            <Header />
            <div className="section-heading-container">
              <FaGamepad className="sidebar-list-icon" />
              <h1 className="section-hedding">Gaming</h1>
            </div>
            {this.getResult(apiStatus)}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
