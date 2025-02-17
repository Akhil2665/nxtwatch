import {Component} from 'react'

import ReactPlayer from 'react-player'

import './index.css'

class VideoItemDetails extends Component {
  state = {
    isClicked: false,
  }

  render() {
    return (
      <div className="video-item-details-container">
        <div className="video-container">
          <ReactPlayer
            url="https://youtu.be/dYVzLvrzKK0?si=LDEP7LE9PmnmR8IK"
            width="90%"
            controls
          />
        </div>
        <div className="video-full-details-container">
          <h1>Video Name</h1>
          <div className="views-and-date-container">
            <p className="views">1.4K views</p>
            <p className="ago-years">15 years</p>
          </div>
          <div className="video-buttons-container">
            <button type="button">Like</button>
            <button type="button">Dislike</button>
            <button type="button">Save</button>
          </div>
          <div className="channel-details-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt=""
              className="channel-logo"
            />
            <div className="channel-details">
              <p>Channel Name</p>
              <p className="subscribers">1.4K subscribers</p>
            </div>
          </div>
          <p className="about-channel">
            If your build system supports import statements, use
            react-player/lazy to lazy load the appropriate player for the url
            you pass in. This adds several reactPlayer chunks to your output,
            but reduces your main bundle size.
          </p>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
