import React from "react";
import { Link } from "react-router-dom";

import "./MovieList.css";
import right from "../../assets/right.svg";
import MovieCardSmall from "./MovieCardSmall";
import Loading from "../ui/Loading";

const MovieList = ({ icon, title, list, toLink, isLoading }) => {
  return (
    <div className={"MovieList list" + (title === "Discover" ? " discover-list":"")}>
      <div className="list-header">
        <img src={icon} alt="D" />
        <h2>{title}</h2>
        <Link to={toLink}>
          <h4>See All</h4>
          <img src={right} alt=">"/>
        </Link>
      </div>
      <div className="list-body fg fg3">
        {
          isLoading ? <Loading/>:list.map(m => <MovieCardSmall key={m.id} m={m} />)
        }
      </div>
    </div>
  );
};

export default MovieList;
