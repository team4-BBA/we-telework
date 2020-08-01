import React from 'react'
import logo from '../static/img/title-transparent.png'
import '../static/css/Navbar.css'
import { Link, useLocation } from 'react-router-dom'

export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = () => {
  const location = useLocation()
  if (location.pathname === '/signin') {
    return null
  }
  // console.log(location)
  return (
    <div>
      <Link to="/">
        <div className="navtitle">
          <img src={logo} alt="" className="titleImage" />
        </div>
      </Link>
    </div>
  )
}

export default Navbar
