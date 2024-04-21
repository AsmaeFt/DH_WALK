import { Fragment, useState } from 'react'
import {BrowserRouter as Router , Route ,Routes, Navigate} from 'react-router-dom';


//Import Components 
import Home from './pages/Home'
import Table from './Components/individuals/table';
import NavBar from './Components/layout/Navbar';
import SideBar from './Components/layout/SideBar';
import Statistics from './pages/Statistics'
import Add_Data from './Components/individuals/Data'
import Verticaltable from './Components/individuals/vertical_table';


import './App.css'
function App() {

  return (
    <>    
      <Router>
      <NavBar />
      
      <div className="app-container">
    
        <div className="content">
        <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/verticalt' element={<Verticaltable/>}/>
        <Route path='/Table' element={<Table/>}/>
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
