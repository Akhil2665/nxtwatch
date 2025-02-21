// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

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

  render() {
    const {videosList, showAd} = this.state

    return (
      <>
        <div className="home-container" data-testid="home">
          <Sidebar />

          <div className="home-content">
            <Header />
            {showAd ? (
              <Advertisement onClickRemoveAd={this.onClickRemoveAd} />
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
              {videosList.map(videoDetails => (
                <VideoImageCard
                  videoDetails={videoDetails}
                  key={videoDetails.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Home
