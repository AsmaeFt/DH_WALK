import { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Import Components
import NavBar from "./Components/layout/Navbar";
import Add_Data from "./Components/individuals/Data";
import Main from "./pages/Maintest";
import MainPage from './pages/Main'
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/ADD_DATA" element={<Add_Data />} />
              <Route path="*" element={<p>Nothing to show here ! </p>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}
export default App;
