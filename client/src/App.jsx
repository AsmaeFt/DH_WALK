
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
            <Route path="/Quality" element={<Quality />} />
            <Route path="/Logistic" element={<MPC />} />
            <Route path="/Cutting" element={<Cutting />} />
            <Route path="/DH_WALK" element={<DH_WALK />} />
            <Route path="/add_data" element={<Add_data />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="*" element={<p>Nothing to show here ! </p>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
