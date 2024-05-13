import { useNavigate } from "react-router-dom";
import c from "./Dhwalk.module.css";

import Card from "../Components/UI/Card";
import Overlay from "../Components/UI/Overlay";
const Dhwalk = () => {
  const navigate = useNavigate();
  return (
    <>
      <Overlay />

      <div className={c.cardContainer}>
        <div className={c.titelHeader}>
          <span className={c.dot}>. </span> DH walk
          <span style={{ color: "orangered" }}>
            -{new Date().getFullYear()}
          </span>
          <span className={c.dot}> .</span>
        </div>
        <div className={c.card_content}>
          <div className={`${c["card-wrapper"]} ${c["fade-up"]}`}>
            <Card
              Department="Final Assembly"
              border="3px solid #1b0f7d"
              navigate={() => navigate("/FAM")}
            />
          </div>
          <div className={`${c["card-wrapper"]} ${c["fade-up"]}`}>
            <Card
              Department="Quality"
              border="3px solid green"
              navigate={() => navigate("/Quality")}
            />
          </div>
          <div className={`${c["card-wrapper"]} ${c["fade-up"]}`}>
            <Card
              Department="Cutting"
              border="3px solid gray"
              navigate={() => navigate("/Cutting")}
            />
          </div>
          <div className={`${c["card-wrapper"]} ${c["fade-up"]}`}>
            <Card
              Department="MPC"
              border="3px solid yellow"
              navigate={() => navigate("/Logistic")}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dhwalk;
