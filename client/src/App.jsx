import { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Import Components

import Table from "./Components/individuals/table";
import NavBar from "./Components/layout/Navbar";
import Statistics from "./pages/Statistics";
import Add_Data from "./Components/individuals/Data";
import Verticaltable from "./Components/individuals/vertical_table";
import Dhwalk from './pages/DHwalk'
import NewTablae from "./pages/NewTablae";


import Main from "./pages/Maintest";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/"element={<p>Nothing to show here ! </p>}/>
              <Route path="/main" element={<Main/>} />
              
              <Route path="/Table" element={<Table />} />
              <Route path="/ADD_DATA" element={<Add_Data />} />
              <Route path="/Statistics" element={<Statistics />} />
              <Route path="/new" element={<NewTablae />} />
              <Route path="*" element={<p>Nothing to show here ! </p>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
