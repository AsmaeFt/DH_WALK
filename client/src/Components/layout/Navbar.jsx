import React from 'react'
import logo from '../assets/aptiv-logo.png'
import { Link } from 'react-router-dom'

import './Navbar.css'

const NavBar = () => {
  return (
    <div className="navbar-container">
      
      <div className="navbar-brand">
      <img className='logo' src={logo}/>
      </div>

      <ul className="navbar-nav">

     

        <li className="nav-item">
            <Link to="/">DH Walk</Link>
          </li>
         
        <li className="nav-item">
            <Link to="/ADD_DATA">ADD DATA</Link>
          </li>
         
       
         
          
          <li className="nav-item">
            <span>Welcome Amjad</span>
          </li>
        </ul>
    </div>
  )
}

export default NavBar
