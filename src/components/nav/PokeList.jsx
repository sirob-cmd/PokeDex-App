import axios from "axios";
import "./pokeList.css";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Loader from "../loader/Loader";
import PokemonStats from "./PokemonStats";

const API = "https://pokeapi.co/api/v2/pokemon/";

const PokeList = ({ addFavorite }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(API);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState("");

  useEffect(() => {
    if (!currentPage) return;
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(currentPage, {
          cancelToken: source.token,
        });
        const data = await res.data;
        setData(data);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    return () => source.cancel();
  }, [nextPage, prevPage, currentPage]);

  const goBack = () => {
    setCurrentPage(API);
  };

  const individualPokemon = (value) => {
    setCurrentPage(value);
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

  const search = (e) => {
    setSearchValue(e.target.value);
  };

  const searchedPokemon = (e) => {
    e.preventDefault();
    setPokemonSearch(searchValue);
    setCurrentPage(
      `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`
    );
    setSearchValue("");
  };

  return (
    <>
      {isLoading && <Loader />}
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={transition}
        className="pokeList"
      >
        <form className="searchForm" onSubmit={searchedPokemon}>
          <input
            onChange={(e) => search(e)}
            value={searchValue}
            type="text"
            placeholder="Search Pokemon Name..."
            action=""
            className="form"
          ></input>
        </form>

        {data.results ? (
          <div className="buttons">
            <div>
              <button
                className="btn btn-prev"
                onClick={() => setCurrentPage(prevPage)}
              >
                Prev
              </button>
              <button className="btn" onClick={() => setCurrentPage(nextPage)}>
                Next
              </button>
            </div>
          </div>
        ) : null}

        <div className="pokemonListContainer">
          {data.results &&
            data.results.map((pokemon) => {
              const { name, url } = pokemon;
              const getIndex = url.split("/");
              const index = Number(getIndex[getIndex.length - 2]);
              const img = `https://pokeres.bastionbot.org/images/pokemon/${index}.png`;

              return (
                <div key={name} className="pokemonContainer">
                  <div onClick={() => individualPokemon(url)}>
                    <img className="pokeImg" src={img} alt="pokemon" />
                    <h2 className="pokemonName">{name}</h2>
                  </div>
                </div>
              );
            })}
        </div>
        {data.abilities && (
          <PokemonStats
            add={(values) => addFavorite(values)}
            pokeInfo={data}
            goBack={() => goBack()}
          />
        )}
      </motion.div>
    </>
  );
};

export default PokeList;
