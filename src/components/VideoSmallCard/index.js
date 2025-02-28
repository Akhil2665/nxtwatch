import {Link} from 'react-router-dom'

import './index.css'

const VideoImageCard = props => {
  const {videoDetails} = props
  const {
    id,
    channel,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
  } = videoDetails
  const {name, profileImageUrl} = channel
  return (
    <>
      <Link to={`/videos/${id}`} className="link-item">
        <li className="video-image-list-item">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="video-image"
          />
          <div className="video-image-content-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="channel-logo"
            />
            <div className="video-details">
              <p className="video-heading">{title}</p>
              <p className="channel-name">{name}</p>
              <div className="views-and-date-container-card">
                <p className="views">{viewCount} views</p>
                <p className="ago-years">{publishedAt}</p>
              </div>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default VideoImageCard
