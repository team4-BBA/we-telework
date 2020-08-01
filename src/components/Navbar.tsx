import React from 'react'
import logo from '../static/img/title-transparent.png'
import '../static/css/Navbar.css'
import { Link } from 'react-router-dom'

export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = () => {
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
