import React from "react";
import "./Banner.css";

function Banner() {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://preview.redd.it/zc3nnfklwz941.jpg?auto=webp&s=c0bcbce019bc5f774529821335c2b962330c3db5")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner_buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(
            `This is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test descriptionThis is test description`,
            150
          )}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
