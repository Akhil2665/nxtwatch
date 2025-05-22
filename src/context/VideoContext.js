import React from 'react'

const VideoContext = React.createContext({
  savedVideosList: [],
  onChangeSaveVideo: () => {},
  removeAllSavedVideos: () => {},
  toggleTheme: () => {},
  isDarkMode: false,
})

export default VideoContext
