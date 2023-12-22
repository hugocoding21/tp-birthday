import React, { useState, useEffect } from "react";
import "./App.css";
import roue from "./assets/Group.svg";
import star from "./assets/Vector.svg";
import star1 from "./assets/Vector.svg";
import star2 from "./assets/Vector.svg";
import chara from "./assets/character_1.png";
import axios from "axios";
import { DateTime } from "luxon";
function App() {
  const [userData, setUserData] = useState({});
  const [citationData, setCitationData] = useState("");
  const formattedBirthdate = DateTime.fromISO(
    userData.birthdate
  ).toLocaleString(DateTime.DATE_FULL);
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/6585a5b38a6b26eebb7c520f")
      .then((response) => {
        console.log("User Data Response:", response.data);
        setUserData(response.data);
      });

    axios
      .get("http://localhost:3001/citation/6585a5b38a6b26eebb7c5209")
      .then((response) => {
        setCitationData(response.data);
        console.log("eded", response.data);
      });
  }, []);

  return (
    <div className="App">
      <div className="nav">
        <h1>Citation et Aniversaire</h1>
        <h1> {formattedBirthdate}</h1>
      </div>
      <div className="container">
        <div className="left">
          <img className="star1" src={star} alt="1" />
          <img className="star2" src={star1} alt="2" />
          <img className="roue" src={roue} alt="roue" />
          <img className="star3" src={star2} alt="3" />

          <h1>
            {userData.firstname}
            {userData.lastname}
          </h1>
        </div>
        <div className="right">
          <div className="citation box">
            {citationData.citation}
            <br />
            {citationData.auteur}
          </div>
          <div className="perso box">
            <img className="perso-img" src={chara} alt="pers1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
