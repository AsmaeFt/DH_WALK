import { useState } from 'react'
import {BrowserRouter as Router , Route ,Routes, Navigate} from 'react-router-dom';


//Import Components 
import Home from './pages/Home'
import NavBar from './Components/layout/Navbar';
import SideBar from './Components/layout/SideBar';
import Statistics from './pages/Statistics'
import Add_Data from './Components/individuals/Data'


import './App.css'
function App() {

  return (
    <>
    <Router>
      <NavBar />
      
      <div className="app-container">
      <SideBar/>
        <div className="content">
        <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/' element={<Add_Data/>}/>
        <Route path='/Statistics' element={<Statistics/>}/>
        <Route path='*' element={<p>Nothing to show here ! </p>} />
       </Routes>

        </div>
      </div>
     
    </Router>
    
    </>
  )
}

export default App
