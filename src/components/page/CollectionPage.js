import React, { useState, useEffect } from "react";
import Axio from "axios";

import "./CollectionPage.css";
import collectionLogo from "../../assets/collection.svg";
import { API_END_POINT, API_KEY, POSTER_PATH } from "../../utils/Constant";

import Loading from "../ui/Loading";
import Rating from "../ui/Rating";
import PriceTag from "../ui/PriceTag";

import Trailers from "../element/Trailers";
import Credits from "../element/Credits";
import CollectionBlock from "../element/CollectionBlock";
import RelatedMoviesBlock from "../element/RelatedMoviesBlock";
import KeywordsBlock from "../element/KeywordsBlock";

const CollectionPage = ({ match }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isLoadingColl, setIsLoadingColl] = useState(false);
  const [collection, setCollection] = useState({});
  const [img, setImg] = useState({});

  const fetchImg = async () => {
    setIsLoadingImg(true);
    const imgLink =
      API_END_POINT + `/collection/${match.params.cid}/images?api_key=${API_KEY}`;
    const resImg = await Axio.get(imgLink);
    setImg(resImg.data);
    setIsLoadingImg(false);
  };

  const fetchColl = async () => {
    setIsLoadingColl(true);
    const collLink =
      API_END_POINT + `/collection/${match.params.cid}?api_key=${API_KEY}`;
    const collImg = await Axio.get(collLink);
    setCollection(collImg.data);
    setIsLoadingColl(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchImg();
    fetchColl();
  }, []);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const solveGenres = genres => {
    return genres.map(g => g.name).join(" \u2022 ");
  };

  return (
    <section className="CollectionPage bg bg1 animate-popup">
      {isLoadingImg || isLoadingColl ? (
        <div className="center-loading">
          <Loading />
        </div>
      ) : collection.title ? (
        <>
          <div className="detail-wrapper">
            <div className="detail-poster" id="detail-poster">
              {collection.backdrop_path ? (
                <img
                  className="animate-enlarge"
                  src={POSTER_PATH + collection.backdrop_path}
                  alt="POSTER"
                />
              ) : (
                <img className="animate-enlarge" src={collectionLogo} alt="POSTER" />
              )}
            </div>
            <div className="detail-title">
              <div id="detail-title">
                <h1 className="fg fg2 ent-text-shadow">{collection.name}</h1>
                <hr align="left" className="fg" />
                <p className="fg fg3">{collection.overview}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="no-movie">
          <img className="animate-enlarge" src={collectionLogo} alt="POSTER" />
          <div className="fgganimate-enlarge">NOT FOUND</div>
        </div>
      )}
    </section>
  );
};

export default CollectionPage;
