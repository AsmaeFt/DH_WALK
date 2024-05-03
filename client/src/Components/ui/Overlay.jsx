import React from "react";
import "./Overlay.css";
import video from "../assets/aptiv.mp4";

const Overlay = () => {
  return (
    <div className="overlay">
         <div className="overlayconainer"></div>
      <div className="video-container">
        <video autoPlay loop muted playsInline src={video}></video>
      </div>
     
    </div>
  );
};

export default Overlay;
