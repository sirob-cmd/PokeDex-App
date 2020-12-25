import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./pokemonStats.css";

import { CgPokemon } from "react-icons/cg";
import PopUpModal from "./PopUpModal";
import ProgressBar from "../progress-bar/ProgressBar";

const PokemonStats = ({ pokeInfo, goBack, add }) => {
  const [popUp, setPopUp] = useState(false);

  const { name, weight, height, types, abilities, stats, sprites } = pokeInfo;

  const img = sprites.other.dream_world.front_default;

  const statFiltered = stats.filter((move) => move.stat.name.length <= 7);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setPopUp(false);

    return () => {
      isMounted = false;
    };
  }, [name]);

  const addToFavorites = (val) => {
    add(val);
    setPopUp(true);
  };

  const transition = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    out: {
      opacity: 0,
      y: 25,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };
  return (
    <>
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={transition}
        className="generalStats"
      >
        <div className="statWrapper">
          <h2 className="stat capitalize">{name} Statistics: </h2>
          <div className="typeAndAbility">
            <div>
              <p>Pokemon Type:</p>
              {types.map((type) => (
                <ul key={type.type.name}>
                  <li className="capitalize">- {type.type.name}</li>
                </ul>
              ))}
              <p>- Weight - {weight}</p>
              <p>- Height - {height}</p>
            </div>
            <div>
              <p>Abilities: </p>
              {abilities.map((ability) => (
                <ul key={ability.ability.name}>
                  <li className="capitalize">- {ability.ability.name}</li>
                </ul>
              ))}
            </div>
          </div>

          <div>
            {statFiltered.map((stat) => (
              <ul key={stat.stat.name}>
                <li className="capitalize">
                  <span>-{stat.stat.name}</span>
                  <ProgressBar completed={stat.base_stat} />
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className="sprites">
          <div className="imageAndBtns">
            {!popUp && (
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pokemonImage"
                src={img}
                alt="pokemon img"
              />
            )}
            {popUp && <PopUpModal name={name.toUpperCase()} />}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <button
                className="btn addToFav"
                onClick={() => addToFavorites(pokeInfo)}
              >
                Catch {name.toUpperCase()}! <CgPokemon />
              </button>

              <button className="btn goBack" onClick={goBack}>
                Go Back
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PokemonStats;
