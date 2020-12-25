import { motion } from "framer-motion";
import "./modal.css";
import ProgressBar from "../progress-bar/ProgressBar";
import { GiHealthNormal } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";

const FavoriteModal = ({ pokeData, removeFavorite, closeModal }) => {
  const { name, id, types, abilities, stats, sprites } = pokeData;

  const frontGif =
    sprites.versions["generation-v"]["black-white"].animated.front_default;
  const statFiltered = stats.filter((move) => move.stat.name.length <= 7);

  const transition = {
    in: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    out: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <div className="modalWrapper">
      <motion.div
        initial="out"
        animate="in"
        exit="in"
        variants={transition}
        className="modal"
      >
        <div className="innerModalWrapper">
          <div className="modalHeading">
            <img className="modalGifFlip" src={frontGif} alt="back gif" />
            <h1 className="modalPokemonName">{name.toUpperCase()}</h1>
            <img className="modalGif" src={frontGif} alt="front gif" />
          </div>

          <div className="stats">
            <div className="pokemonTypeAndAbilities">
              <div className="pokemonType">
                <h3>Pokemon Type:</h3>
                {types.map((type) => (
                  <div key={type.type.name}>
                    <p className="capitalize">- {type.type.name}</p>
                  </div>
                ))}
              </div>

              <div className="abilities">
                <h3>Abilities:</h3>
                {abilities.map((ability) => {
                  return (
                    <div key={ability.ability.name}>
                      <p className="capitalize">- {ability.ability.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="progressWrapper">
              {statFiltered.map((stat) => (
                <div className="iconAndBar" key={stat.stat.name}>
                  <span className="progressBarIcon">
                    {(stat.stat.name === "hp" && <GiHealthNormal />) ||
                      (stat.stat.name === "attack" && <GiPointySword />) ||
                      (stat.stat.name === "defense" && <GiCheckedShield />) ||
                      (stat.stat.name === "speed" && <GiRunningNinja />)}
                  </span>
                  <ProgressBar completed={stat.base_stat} />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                removeFavorite(id);
                closeModal();
              }}
              className="btn removeFavorite"
            >
              Remove From Favorites
            </button>
            <button
              onClick={() => {
                closeModal();
              }}
              className="btn closeModal"
            >
              <IoMdCloseCircle />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FavoriteModal;
