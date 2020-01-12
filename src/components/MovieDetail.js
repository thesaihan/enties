import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axio from "axios";
import "./MovieDetail.css";
import movieLogo from "../assets/movie-dark.svg";

import { API_END_POINT, API_KEY, POSTER_PATH } from "../utils/Constant";
import Loading from "./Loading";
import Rating from "./Rating";
import PriceTag from "./PriceTag";
import Trailers from "./Trailers";
import MoviesRelated from "./MoviesRelated";
import Credits from "./Credits";
import Keywords from "./Keywords";

const MovieDetail = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const fullLink =
      API_END_POINT + `/movie/${match.params.id}?api_key=${API_KEY}`;
    Axio.get(fullLink)
      .then(res => {
        window.scrollTo(0, 0);
        setMovie(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        window.scrollTo(0, 0);
        setMovie({});
        setIsLoading(false);
      });
  }, [match.params.id]);

  const renderOverview = () => {
    let id = "upper";

    const dp = document.getElementById("detail-poster").clientHeight;
    const dt = document.getElementById("detail-title").clientHeight;
    console.log(dp, dt);

    if (dt > dp / 2) {
      id = "lower";
      document.getElementById("lower").style.padding = "4vw";
      document.getElementById("upper").style.display = "none";
    }
    const Overview = props => {
      return (
        <>
          <h3 className="fg fg3">About the Movie</h3>
          <hr align="left" className="fg" />
          <p className="fg fg3">{movie.overview}</p>
        </>
      );
    };
    console.log(id);
    ReactDOM.render(<Overview />, document.getElementById(id));
  };

  useEffect(() => {
    try {
      renderOverview();
    } catch {}
  });

  // const bgStyle = {
  //   'background': `url(${POSTER_PATH_FULL + movie.backdrop_path}) top right no-repeat`,
  //   'background-size': 'contain'
  // };

  const options = { year: "numeric", month: "long", day: "numeric" };

  const solveGenres = genres => {
    return genres.map(g => g.name).join(" \u2022 ");
  };

  return (
    <section className="MovieDetail bg bg1 animate-popup">
      {isLoading ? (
        <div className="center-loading">
          <Loading />
        </div>
      ) : movie.title ? (
        <>
          <div className="detail-wrapper">
            <div className="detail-poster" id="detail-poster">
              {movie.poster_path ? (
                <img
                  className="animate-enlarge"
                  src={POSTER_PATH + movie.poster_path}
                  alt="POSTER"
                />
              ) : (
                <img className="animate-enlarge" src={movieLogo} alt="POSTER" />
              )}
            </div>
            <div className="detail-title">
              <div id="detail-title">
                <h1 className="fg fg2">{movie.title}</h1>
                {movie.vote_count ? (
                  <Rating
                    voteAverage={movie.vote_average}
                    voteCount={movie.vote_count}
                  />
                ) : null}
                {movie.release_date ? (
                  <div className="fg fg3">
                    {new Date(movie.release_date).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </div>
                ) : null}
                {movie.genres ? (
                  <div className="fg fg3">{solveGenres(movie.genres)}</div>
                ) : null}
                <div id="upper" className="fg fg2" />
              </div>
            </div>
          </div>
          <div className="download">
            <div className="fg fg3">Download : </div>
            <PriceTag popularity={movie.popularity} />
          </div>
          <div className="download">
            <div className="fg fg3">Keywords : </div>
            <Keywords movie_id={movie.id} />
          </div>
          <div id="lower" className="fg fg2" />
          
          <div className="similar">
            <h3 className="fg fg3">You Might Also Like</h3>
            <hr align="left" className="fg fullwidth" />
            <div><MoviesRelated type="similar" movie_id={movie.id}/></div>
          </div>
          <div className="recommended">
            <h3 className="fg fg3">Viewers Also Bought</h3>
            <hr align="left" className="fg fullwidth"/>
            <div><MoviesRelated type="recommendations" movie_id={movie.id}/></div>
          </div>
          
          {movie.belongs_to_collection ? (
            <div className="collection">
              <h3 className="fg fg3">Also Included In</h3>
              <hr align="left" className="fg" />
              <img
                className="animate-enlarge"
                src={POSTER_PATH + movie.belongs_to_collection.backdrop_path}
                alt="POSTER"
              />
              <h5 className="fg fg3">{movie.belongs_to_collection.name}</h5>
            </div>
          ) : null}

          <div className="credits">
            <h3 className="fg fg3 text-center">Cast &amp; Crew</h3>
            <hr align="left" className="fg fullwidth" />
          </div>
          <Credits movie_id={movie.id} />

          <Trailers movie_id={movie.id} />

        </>
      ) : (
        <div className="no-movie">
          <img className="animate-enlarge" src={movieLogo} alt="POSTER" />
          <div className="fgganimate-enlarge">NOT FOUND</div>
        </div>
      )}
    </section>
  );
};

export default MovieDetail;
