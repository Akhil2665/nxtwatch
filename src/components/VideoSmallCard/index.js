import './index.css'

const VideoImageCard = () => (
  <>
    <li className="video-image-list-item">
      <img
        src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00352941-1718275859.jpg"
        alt="video"
        className="video-image"
      />
      <div className="video-image-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt=""
          className="channel-logo"
        />
        <div className="video-details">
          <h1 className="video-heading">video-heading</h1>
          <p className="channel-name">iB cricket</p>
          <div className="views-and-date-container-card">
            <p className="views">1.4K views</p>
            <p className="ago-years">15 years</p>
          </div>
        </div>
      </div>
    </li>
  </>
)

export default VideoImageCard
