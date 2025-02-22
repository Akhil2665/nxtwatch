import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideoImageCard from '../SavedVideoImageCard'
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
      const {savedVideosList, removeAllSavedVideos} = value
      console.log(savedVideosList)
      const savedVideoListView = savedVideosList.map(videoDetails => (
        <SavedVideoImageCard videoDetails={videoDetails} />
      ))
      const onClickedRemoveAll = () => removeAllSavedVideos()

      const noSavedVideosView = () => (
        <div className="no-saved-videos-container" data-testid="savedVideos">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="not-found-img"
          />
          <h1 className="no-result-heading">No Saved Videos Found</h1>
          <p className="no-result-description">
            You can save your videos while watching them
          </p>
        </div>
      )
      return (
        <>
          <div className="home-container">
            <div className="sidebar-container">
              <Sidebar />
            </div>
            <div className="home-content">
              <Header />
              <button
                type="button"
                className="remove-saved-vid-btn"
                onClick={onClickedRemoveAll}
              >
                Remove All Saved Videos
              </button>

              <ul className="trending-video-list-container">
                {savedVideosList.length !== 0
                  ? savedVideoListView
                  : noSavedVideosView()}
              </ul>
            </div>
          </div>
        </>
      )
    }}
  </VideoContext.Consumer>
)

export default SavedVideos
