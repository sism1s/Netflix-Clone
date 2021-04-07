import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Details from "./Details";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [button, setButton] = useState(false);
  const [state, setState] = useState();

  const base_url = "https://image.tmdb.org/t/p/w200/";

  const movieID = state;

  const movieClicks = [movies.slice(11)[movieID]];

  const newPage = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevCurrent) => prevCurrent + 1);
    } else if (direction === "previous" && currentPage !== 1) {
      setCurrentPage((prevCurrent) => prevCurrent - 1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${fetchUrl}&page=${currentPage}`);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl, currentPage]);

  useEffect(() => {
    setState(state);
  }, [state]);

  let arr = [];
  const handleClick = (i, event) => {
    arr = [i];
    setState(i);
    setButton(!button);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        <i
          onClick={() => newPage("previous")}
          className="fas fa-arrow-circle-left row__arrow"
        ></i>
        {/* {movies
          .slice(11)
          .map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={"movie.name"}
                />
              )
          )} */}
        {movies.slice(11).map(
          (movie, i) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <span key={i} className="row__poster">
                <button
                  className="row__button"
                  onClick={handleClick.bind(this, i)}
                >
                  <img
                    className="row__poster row__posterLarge"
                    key={movie.id}
                    src={`${base_url}${movie.poster_path}`}
                    alt={"movie.name"}
                  />
                </button>
              </span>
            )
        )}
        <i
          onClick={() => newPage("next")}
          className="fas fa-arrow-circle-right row__arrow"
        ></i>
      </div>
      {button &&
        movieClicks.map((movieClick, i) => (
          <span key={i}>
            <Details
              title={movieClick.title || movieClick.name}
              image={movieClick.backdrop_path}
              image2={movieClick.poster_path}
              overview={movieClick.overview}
            ></Details>
          </span>
        ))}
    </div>
  );
}

export default Row;
