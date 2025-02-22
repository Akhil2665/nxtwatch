import React from 'react'

const VideoContext = React.createContext({
  savedVideosList: [],
  onChangeSaveVideo: () => {},
  removeAllSavedVideos: () => {},
  toggleTheme: () => {},
})

export default VideoContext
