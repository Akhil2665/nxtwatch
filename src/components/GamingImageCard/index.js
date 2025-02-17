import {Link} from 'react-router-dom'

import './index.css'

const GamingImageCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="game-video-image-list-item">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="game-desktop-image"
        />
        <h1 className="game-title">{title}</h1>
        <p className="game-views">{viewCount} Watching Worldwide</p>
      </li>
    </Link>
  )
}

export default GamingImageCard
