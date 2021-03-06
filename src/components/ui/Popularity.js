import React from "react";
import "./Popularity.css";

const Popularity = ({ children }) => {

    const num = children ? parseInt(children/2) : 0;
    console.log(children);

    return (
        <div className="Popularity bg">
            <div className="pop-wrap">
                {
                    [...Array(10).keys()].map((b,i) => <div key={i} className={i < num ? "bg-primary":"bg3"}></div>)
                }
            </div>
        </div>
    )
};

export default Popularity;