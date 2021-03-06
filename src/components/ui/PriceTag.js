import React from "react";
import "./PriceTag.css";

const PriceTag = ({popularity, price}) => {
    const goBuy = e => {
        e.stopPropagation();
    }
    const calculatePrice = () => {
        if(popularity){
            const price = 10.99 + parseInt(popularity/2);
            if(price > 24.99)
                return 24.99;
            return price.toFixed(2);
        }
        return 19.99;
    }
    return <button onClick={goBuy} className="PriceTag price-tag bg">${price ? price:calculatePrice()}</button>;
}

export default PriceTag;