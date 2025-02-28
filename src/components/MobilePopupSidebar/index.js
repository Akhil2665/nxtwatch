import {Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {IoClose, IoMenu} from 'react-icons/io5'
import {FaHome, FaGamepad, FaHotjar, FaSave} from 'react-icons/fa'

import './index.css'

const MobilePopupSidebar = () => (
  <>
    <div className="popup-content">
      <Popup
        trigger={
          <button type="button" className="nav-item-button">
            <IoMenu />
          </button>
        }
      >
        {close => (
          <div className="mobile-sidebar-container">
            <div className="mobile-sidebar-nav-container">
              <button
                className="close-button"
                type="button"
                onClick={() => close()}
              >
                <IoClose />
              </button>
              <ul className="mobile-sidebar-list">
                <li className="list-item-sidebar">
                  <Link to="/" className="sidebar-link-item">
                    <FaHome className="sidebar-list-icon" /> <p>Home</p>
                  </Link>
                </li>
                <li className="list-item-sidebar">
                  <Link to="/trending" className="sidebar-link-item">
                    <FaHotjar className="sidebar-list-icon" /> <p>Trending</p>
                  </Link>
                </li>
                <li className="list-item-sidebar">
                  <Link to="/gaming" className="sidebar-link-item">
                    <FaGamepad className="sidebar-list-icon" /> <p>Gaming</p>
                  </Link>
                </li>
                <li className="list-item-sidebar">
                  <Link to="/saved-videos" className="sidebar-link-item">
                    <FaSave className="sidebar-list-icon" /> <p>Saved Videos</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Popup>
    </div>
  </>
)

export default MobilePopupSidebar
