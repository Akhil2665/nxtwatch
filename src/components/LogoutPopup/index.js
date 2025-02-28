import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const LogoutPopup = props => {
  const {onClickLogout} = props
  const onClickedConfirm = () => onClickLogout()

  return (
    <Popup
      modal
      trigger={
        <button className="logout-desktop-btn" type="button">
          Logout
        </button>
      }
    >
      {close => (
        <div className="popup-msg-container">
          <p className="popup-msg">Are you sure you want to logout?</p>
          <div className="buttons-container">
            <button
              className="logout-desktop-btn"
              type="button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              className="logout-desktop-btn"
              type="button"
              onClick={onClickedConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default LogoutPopup
