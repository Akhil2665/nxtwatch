import styled from 'styled-components'

export const AdContainer = styled.div`
  background-image: url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png);
  background-size: cover;
  height: 160px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px;
  margin: 8px;
  box-shadow: 2px 4px 4px 2px brown;
`

export const GetNowButton = styled.button`
  background-color: transparent;
  border: 2px solid lightblue;
  padding: 6px 14px;
`

export const AdHeading = styled.h1` // Assuming ad-heading is a heading, if not, change to styled.p or styled.span etc.
  font-size: 20px;
`

export const LogoCloseIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
`

export const CloseIconButton = styled.button`
  background-color: transparent;
  border: none;
`

export const CloseIcon = styled.img` // Assuming close-icon is an image
  width: 30px;
  height: 30px;

  &:hover {
    scale: 1.2;
  }
`

export const AdLogo = styled.img` // Assuming ad-logo is an image
  height: 30px;
  width: 100px;
`
