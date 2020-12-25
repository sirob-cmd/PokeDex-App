import React from "react";
import "./popup.css";
import pokeBallGif from "../../images/pokeball.gif";

const PopUpModal = ({ name }) => {
  return (
    <div className="popupContainer">
      <img className="pokeballGif" src={pokeBallGif} alt="pokemon ball gif" />
      <h2>{name} caught!</h2>
    </div>
  );
};

export default PopUpModal;
