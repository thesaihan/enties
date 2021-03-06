import React, { useState, useEffect } from "react";
import Axio from "axios";
import "./Trailers.css";
import { API_END_POINT } from "../../utils/Constant";

const Trailers = ({ movie_id }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const link = API_END_POINT + `/movie/${movie_id}/videos`;
    Axio.get(link)
      .then(res => {
        setVideos(res.data.results.slice(0, 6));
      })
      .catch(err => {
        console.log(err);
        setVideos([]);
      });
  }, [movie_id]);

  if (!(videos && videos.length > 0)) return null;

  return (
    <div className="Trailers">
      <h3 className="fg fg2 text-center">Trailers</h3>
      <hr className="bgg" />
      <div className="video-wrapper">
        {videos.map(video => (
          <div key={video.id} className="video-col">
            <div className="video-container">
              <iframe
                title={video.name}
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h4 className="fg fg2">{video.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailers;
