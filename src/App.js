import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

// components
import PokeList from "./components/nav/PokeList";
import Home from "./components/nav/Home";
import Favorites from "./components/nav/Favorites";

const LS_KEY = "pokemon-local-storage-key";

function App() {
  let location = useLocation();

  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [toggle, setToggle] = useState(false);

  const addFavorite = (value) => {
    setFavoritePokemon([...favoritePokemon, value]);
  };

  const removeFavorite = (id) => {
    setFavoritePokemon(favoritePokemon.filter((pokemon) => pokemon.id !== id));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LS_KEY));
    if (stored) {
      setFavoritePokemon(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favoritePokemon));
  }, [favoritePokemon]);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="App">
      <nav className="navigation">
        <h1 className="logo">
          <Link to="/" onClick={() => setToggle(!toggle)}>
            PokéDex
          </Link>
        </h1>
        <button className="hamburger" onClick={() => setToggle(!toggle)}>
          {!toggle ? <FaBars /> : <AiOutlineClose />}
        </button>

        <motion.div
          animate={toggle ? "show" : "listNav"}
          className={toggle ? "show" : "listNav"}
          variants={variants}
        >
          <ul id="navLinks">
            <li>
              <Link to="/" onClick={() => setToggle(!toggle)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/pokeList" onClick={() => setToggle(!toggle)}>
                List
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={() => setToggle(!toggle)}>
                Your Pokemons
              </Link>
            </li>
          </ul>
        </motion.div>
      </nav>

      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pokeList">
            {<PokeList addFavorite={(value) => addFavorite(value)} />}
          </Route>
          <Route exact path="/favorites">
            {favoritePokemon !== [] && (
              <Favorites
                favoriteList={favoritePokemon}
                removeFavorite={(idVal) => removeFavorite(idVal)}
              />
            )}
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
