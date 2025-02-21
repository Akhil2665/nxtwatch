import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import {IoMenu} from 'react-icons/io5'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

// import {CiLight} from 'react-icons/ci'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  // const renderCartItemsCount = () => (
  //   <VideosContext.Consumer>
  //     {value => {
  //       const {savedVideosList} = value
  //       const cartItemsCount = savedVideosList.length

  //       return (
  //         <>
  //           {cartItemsCount > 0 ? (
  //             <span className="cart-count-badge">{savedVideosList.length}</span>
  //           ) : null}
  //         </>
  //       )

  //     }}
  //   </VideosContext.Consumer>
  // )

  return (
    <nav className="nav-header">
      <div className="mobile-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png "
            alt="website logo"
            className="nav-bar-img-mobile"
          />
        </Link>
        <button type="button" className="nav-item-button">
          <IoMenu />
        </button>
        <button type="button" className="nav-item-button">
          <IoMenu />
        </button>
        <button type="button" className="nav-item-button">
          <IoMenu />
        </button>
      </div>
      <div className="desktop-navbar">
        <>
          <BsMoon />
        </>
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
            alt="profile"
            className="nav-bar-img"
          />
        </>
        <button
          className="logout-desktop-btn"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
