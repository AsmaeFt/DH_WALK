import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const NavBar = () => {
  return (
    <div className="navbar-container">
      
      <div className="navbar-brand">
      <h2>APTIV</h2>
      </div>

      <ul className="navbar-nav">

     

        <li className="nav-item">
            <Link to="/Home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">Statistic</Link>
          </li>
          <li className="nav-item">
            <Link to="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">logout</Link>
          </li>
          
          <li className="nav-item">
            <span>Welcome Amjad</span>
          </li>
        </ul>
    </div>
  )
}

export default NavBar
