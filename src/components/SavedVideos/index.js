// import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoLargeImageCard from '../VideoLargeCard'
import VideoContext from '../../context/VideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SavedVideos = () => (
  <VideoContext.Consumer>
    {value => {
      const {savedVideosList} = value
      console.log(savedVideosList)
      const savedVideoListView = 'savedVideoList'
      return (
        <>
          <div className="home-container">
            <div className="sidebar-container">
              <Sidebar />
            </div>
            <div className="home-content">
              <Header />

              <ul className="trending-video-list-container">
                {savedVideosList.length ? savedVideoListView : null}
              </ul>
            </div>
          </div>
        </>
      )
    }}
  </VideoContext.Consumer>
)

export default SavedVideos

// const onClickOnRemoveAll = () => removeAllCartItems()
//       const cartCount = Array.isArray(cartList) ? cartList.length : 0
//       const showEmptyView = cartCount === 0
//       const cartValueList = cartList.map(
//         eachItem => eachItem.price * eachItem.quantity,
//       )

// savedVideoList.map(videoDetails => (
//         <VideoLargeImageCard videoDetails={videoDetails} />
//       ))
