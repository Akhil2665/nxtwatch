import React from 'react'

const VideoContext = React.createContext({
  savedVideosList: [],
  onChangeSaveVideo: () => {},
  removeAllSavedVideos: () => {},
})

export default VideoContext
