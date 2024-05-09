import {
  Route,
  Routes,
} from "react-router-dom";

//Import Components

import NavBar from "./Components/layout/Navbar";
import Dhwalk from "./pages/Dhwalk";
import FinalAssembly from "./Components/FinalAssembl/FinalAssembly";
import Add_data from "./Components/ADD_data/FinalAssembl";
import "./App.css";
function App() {
  return (
    <>
   
        <NavBar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Dhwalk />} />
              <Route path="/FAM" element={<FinalAssembly />} />
              <Route path="/add_data" element={<Add_data />} />
              <Route path="*" element={<p>Nothing to show here ! </p>} />
            </Routes>
          </div>
        </div>
    </>
  );
}
export default App;
