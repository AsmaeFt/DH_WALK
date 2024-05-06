import React from "react";
import "./Main.css";
import Card from "../Components/ui/Card";
import { useNavigate } from "react-router-dom";

import Overlay from "../Components/ui/Overlay";
//images
import production from "../Components/assets/production.jpg";
import Quality from "../Components/assets/Quality.jpg";
const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Overlay />

      <div className="cardContainer">
        <div className="titelHeader">
          {" "}
          <span className="dot">.</span> DH walk{" "}
          <span style={{ color: "orangered" }}>
            {" "}
            {new Date().getFullYear()}{" "}
          </span>{" "}
          <span className="dot"> .</span>{" "}
        </div>
        <div className="card_content">
          <div className="card-wrapper">
            <Card
              Department="Final Assembly"
              border="3px solid #1b0f7d"
              navigate={() => navigate("/final_assembly")}
            />
          </div>
          <div className="card-wrapper">
            <Card
              Department="Quality"
              border="3px solid green"
              navigate={() => navigate("/Quality")}
            />
          </div>
          <div className="card-wrapper">
            <Card
              Department="Cutting"
              border="3px solid gray"
              navigate={() => navigate("/Cutting")}
            />
          </div>
          <div className="card-wrapper">
            <Card
              Department="MPC"
              border="3px solid yellow"
              navigate={() => navigate("/MPC")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
