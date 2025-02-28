import {Link} from 'react-router-dom'

import './index.css'

const SavedVideoImageCard = props => {
  const {videoDetails} = props
  const {
    id,
    channel,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
  } = videoDetails
  const {name} = channel
  return (
    <>
      <Link to={`/videos/${id}`} className="link-item">
        <li className="saved-video-image-list-item">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="saved-video-large-image"
          />
          <div className="video-image-content-container">
            <div className="video-details">
              <p className="saved-video-heading">{title}</p>
              <p className="saved-video-channel-name">{name}</p>
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

export default SavedVideoImageCard
