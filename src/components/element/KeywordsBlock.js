import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./KeywordsBlock.css";

import { API_END_POINT } from "../../utils/Constant";

import Keyword from "../ui/Keyword";

const KeywordsBlock = ({ movie_id, searchQuery }) => {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    let apiLink =
      API_END_POINT +
      (searchQuery ? `/search/keyword` : `/movie/${movie_id}/keywords`);
    if (searchQuery) apiLink += `&query=${searchQuery}`;
    Axios.get(apiLink)
      .then(res => {
        setKeywords(res.data[searchQuery ? "results" : "keywords"]);
      })
      .catch(err => {
        console.log(err);
        setKeywords([]);
      });
  }, [movie_id, searchQuery]);

  if (keywords.length > 0)
    return (
      <div className="KeywordsBlock">
        {searchQuery ? (
          <>
            <h3 className="fg fg3">Search Keywords</h3>
          </>
        ) : (
            <div className="fg fg3 section-label">Keywords : </div>
          )}

        {keywords.map(kw => (
          <Keyword key={kw.id} keyword={kw} />
        ))}
      </div>
    );
  else return null;
};

export default KeywordsBlock;
