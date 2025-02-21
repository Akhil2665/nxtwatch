// import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

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

  render() {
    const {gamingvideosList} = this.state

    return (
      <>
        <div className="home-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="home-content">
            <Header />

            <ul className="gaming-video-list-container">
              {gamingvideosList.map(videoDetails => (
                <GamingImageCard
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

export default Gaming
