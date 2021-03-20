import React from "react";
import "./Details.css";

function Details({ title, image, image2, overview }) {
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="details">
      <div className="details__backgrund">
        <div className="details__background__shadow" />
        <img
          className="details__background__image"
          src={`${base_url}${image ? image : image2}`}
          alt={"movie.name"}
        />
      </div>

      <div className="details__area">
        <div className="details__area__container ">
          <div className="details__title">{title}</div>
          <div className="details__desciption">{overview}</div>
        </div>
        <button className="trailerButton">Trailer</button>
      </div>
    </div>
  );
}

export default Details;
