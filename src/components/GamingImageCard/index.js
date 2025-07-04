import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const GamingImageCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  console.log(formatDistanceToNow(new Date(2021, 8, 20)))

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="game-video-image-list-item">
        <img src={thumbnailUrl} alt={title} className="game-desktop-image" />
        <p className="game-title">{title}</p>
        <p className="game-views">{viewCount} Watching Worldwide</p>
      </li>
    </Link>
  )
}

export default GamingImageCard
