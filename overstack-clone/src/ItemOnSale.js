import React from "react";
import './ItemOnSale.css'

const ItemOnSale = ({ id, price, title, description, rating, imageUrl }) => {
  return (
    <div className="itemOnSale">
      <img src={imageUrl} alt={title} className="itemOnSale__image" />
      <div className="itemOnSale__price">Sale: ${price}</div>
      <div className="itemOnSale__title">{title}</div>
      <div className="itemOnSale__rating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <span key={i}>⭐️</span>
          ))}
      </div>
    </div>
  );
};

export default ItemOnSale;
