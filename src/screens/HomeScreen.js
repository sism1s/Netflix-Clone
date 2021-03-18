import React from "react";
import Banner from "../Banner";
import "./HomeScreen.css";
import Nav from "../Nav";
import requests from "../Requests";
import Row from "../Row";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        isLargeRow
        title="Trending Now"
        fetchUrl={requests.fetchingTrending}
      />
      <Row isLargeRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row
        isLargeRow
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        isLargeRow
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        isLargeRow
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        isLargeRow
        title="Romance  Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        isLargeRow
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default HomeScreen;
