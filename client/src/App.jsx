import { useState } from 'react'
import {BrowserRouter as Router , Route ,Routes, Navigate} from 'react-router-dom';


//Import Components 
import Home from './pages/Home'
import NavBar from './Components/layout/Navbar';


import './App.css'
function App() {

  return (
    <>
    <Router>
      <NavBar />
      <div className="app-container">
        <div className="content">
        <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<p>Nothing to show here ! </p>} />
      </Routes>

        </div>
      </div>
     
    </Router>
    
    </>
  )
}

export default App
