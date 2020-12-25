import React from "react";
import "./home.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pokedexImg from "../../images/pokedexBG.png";

const Home = () => {
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
      x: 25,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <div className="homeWrapper">
      <div className="homeBackground">
        <motion.div
          whileHover={{
            scale: 0.9,
            transition: { delay: 0.1, duration: 0.2 },
          }}
          initial="out"
          animate="in"
          exit="out"
          variants={transition}
          className="imageContainer"
        >
          <Link to="/pokeList">
            <img src={pokedexImg} alt="" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
