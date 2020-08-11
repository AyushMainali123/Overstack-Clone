import React, { useState, useEffect } from "react";
import "./ItemsOnSale.css";
import ItemOnSale from "./ItemOnSale";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
const ItemsOnSale = () => {
const [{ items, cart }, dispatch] = useStateValue();
  return (
    <div className="itemsOnSale">      
      <h2 className="itemsOnSale__title">Items On Sale</h2>
      <div className="itemsOnSale__items">
        {items.map((item) => {
          const { id, price, title, description, rating, imageUrl } = item;
          return (
              <Link to={`/product/:${id}`} key={id} className = "itemsOnSale__link">
                <ItemOnSale
                  key={id}
                  id={id}
                  price={price}
                  title={title}
                  description={description}
                  rating={rating}
                  imageUrl={imageUrl}
                />
              </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsOnSale;
