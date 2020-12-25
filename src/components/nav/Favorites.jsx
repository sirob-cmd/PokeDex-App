import React, { useState } from "react";
import "./favorites.css";
import FavoriteModal from "./FavoriteModal";
import { motion } from "framer-motion";
import { FaHeartBroken } from "react-icons/fa";

const Favorites = ({ favoriteList, removeFavorite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  //filted duplicates:
  const filtered = favoriteList.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  const transition = {
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    out: {
      opacity: 0,
      x: -25,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <motion.div initial="out" animate="in" exit="out" variants={transition}>
      {isOpen && (
        <FavoriteModal
          pokeData={data}
          removeFavorite={removeFavorite}
          closeModal={() => setIsOpen(false)}
        />
      )}
      {isOpen
        ? document.body.classList.add("modalOpened")
        : document.body.classList.remove("modalOpened")}

      {filtered.length <= 0 ? (
        <h1
          className="noFavorites"
          style={{ textAlign: "center", marginTop: 25 }}
        >
          You dont have any favorite pokemons yet. <br />
          Start Exploring!
        </h1>
      ) : (
        <h1
          className="noFavorites"
          style={{ textAlign: "center", marginTop: 25 }}
        >
          Your Favorite Pokemons!
        </h1>
      )}

      {/* display pokemon cards */}
      <div className="favoriteList">
        {filtered.map((pokemon) => {
          const { name, id, sprites } = pokemon;

          const frontGif =
            sprites.versions["generation-v"]["black-white"].animated
              .front_default;

          return (
            <div key={id} className="favoritePokemon">
              <img
                onClick={() => {
                  setIsOpen((isOpen) => !isOpen);
                  setData(pokemon);
                }}
                className="favoritePokemonImg"
                src={frontGif}
                alt="pokeGif"
              />
              <div className="nameAndBtn">
                <h2 className="favPokemonName">{name}</h2>
                <button className="favBtn" onClick={() => removeFavorite(id)}>
                  <FaHeartBroken />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Favorites;
