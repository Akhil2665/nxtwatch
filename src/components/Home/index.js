// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import Sidebar from '../Sidebar'
import Advertisement from '../Advertisement'
import VideoImageCard from '../VideoSmallCard'
// import VideoItemDetails from '../VideoItemDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    showAd: true,
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRemoveAd = () => {
    this.setState({showAd: false})
  }

  noSearchResultView = () => (
    <div className="no-search-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        className="no-videos-img"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
    </div>
  )

  renderSuccessView = () => {
    const {videosList, showAd} = this.state
    const getVideoList = () =>
      videosList.map(videoDetails => (
        <VideoImageCard videoDetails={videoDetails} key={videoDetails.id} />
      ))

    return (
      <>
        {showAd ? (
          <div data-testid="banner">
            <Advertisement onClickRemoveAd={this.onClickRemoveAd} />
          </div>
        ) : null}
        <div className="search-container">
          <input
            type="search"
            onChange={this.onChangeSearchInput}
            className="search-input"
          />
          <button
            type="button"
            onClick={this.getData}
            className="search-btn"
            data-testid="searchButton"
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
        <ul className="video-list-container">
          {videosList.length > 0 ? getVideoList() : this.noSearchResultView()}
        </ul>
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
        <div className="home-container" data-testid="home">
          <Sidebar />

          <div className="home-content">
            <Header />
            {this.getResult(apiStatus)}
          </div>
        </div>
      </>
    )
  }
}

export default Home
