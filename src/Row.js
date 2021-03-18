import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${fetchUrl}&page=${currentPage}`);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl, currentPage]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        <i
          onClick={() => setCurrentPage(currentPage - 1)}
          className="fas fa-arrow-circle-left row__arrow"
        ></i>
        {movies
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
          )}
        <i
          onClick={() => setCurrentPage(currentPage + 1)}
          className="fas fa-arrow-circle-right row__arrow"
        ></i>
      </div>
    </div>
  );
}

export default Row;
