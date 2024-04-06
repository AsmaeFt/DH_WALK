import React from 'react'
import { Link } from 'react-router-dom'



import './SideBar.css'
import diagram from '../assets/diagram.png'
import services from '../assets/services.png'
import logout from '../assets/logout.png'


const SideBar = () => {
  return (
    <div className="side_bar">
        <ul>
         
            <li><div><img src={diagram}/>  </div><Link to="/">statistic</Link></li>
            <li><img src={services}/><Link to="/Services">services</Link></li>
            <li><img src={logout}/><Link to="/logout">Logout</Link></li>
        </ul>
    </div>
  )
}

export default SideBar