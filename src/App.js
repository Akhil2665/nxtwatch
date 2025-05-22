import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoContext from './context/VideoContext'

import './App.css'

class App extends Component {
  state = {
    savedVideosList: [],
    isDarkMode: false,
  }

  removeAllSavedVideos = () => {
    this.setState({savedVideosList: []})
  }

  updateVideoReaction = reactionVideoDetails => {
    const {savedVideosList} = this.state
    const updatedList = savedVideosList.map(eachVideo =>
      eachVideo.id === reactionVideoDetails.id
        ? reactionVideoDetails
        : eachVideo,
    )
    this.setState({savedVideosList: updatedList})
  }

  onChangeSaveVideo = videoDetails => {
    const {savedVideosList} = this.state
    const isVideoAlreadySaved = savedVideosList.find(
      video => video.id === videoDetails.id,
    )

    if (isVideoAlreadySaved) {
      const updatedVideoList = savedVideosList.filter(
        video => video.id !== videoDetails.id,
      )
      this.setState({savedVideosList: updatedVideoList})
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoDetails],
      }))
    }
  }

  render() {
    const {savedVideosList, isDarkMode} = this.state

    return (
      <>
        <VideoContext.Provider
          value={{
            savedVideosList,
            isDarkMode,
            toggleTheme: this.toggleTheme,
            onChangeSaveVideo: this.onChangeSaveVideo,
            removeAllSavedVideos: this.removeAllSavedVideos,
            updateVideoReaction: this.updateVideoReaction,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </VideoContext.Provider>
      </>
    )
  }
}

export default App
