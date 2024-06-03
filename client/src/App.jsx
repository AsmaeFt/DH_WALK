import { Route, Routes } from "react-router-dom";
//Import Components
import Loading from "./Components/UI/Loading";
import NavBar from "./Components/layout/Navbar";
import Dhwalk from "./pages/Dhwalk";
import FinalAssembly from "./Components/FinalAssembl/FinalAssembly";
import Quality from "./Components/Quality/Quality";
import MPC from "./Components/Logistic/Logistic";
import Cutting from "./Components/Cutting/Cutting";
import DH_WALK from "./Components/DH_WALK/DH_WALK";
import Add_Data from "./Components/ImportData/FinalAssembly"
import Login from "./Components/auth/Login"

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/FAM" element={<FinalAssembly />} />
            <Route path="/Quality" element={<Quality />} />
            <Route path="/Logistic" element={<MPC />} />
            <Route path="/Cutting" element={<Cutting />} />
            <Route path="/DH_WALK" element={<DH_WALK />} />
            
            <Route path="/Loading" element={<Loading />} />
            <Route path="/Add_Data" element={<Add_Data />} />
                  <Route path="*" element={<p>Nothing to show here ! </p>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
