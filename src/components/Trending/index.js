// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

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

  render() {
    const {trendingvideosList} = this.state

    return (
      <>
        <div className="home-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="home-content">
            <Header />

            <ul className="trending-video-list-container">
              {trendingvideosList.map(videoDetails => (
                <VideoLargeImageCard
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

export default Trending
