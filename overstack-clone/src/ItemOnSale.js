import React from "react";
import './ItemOnSale.css'
import numeral from 'numeral'
import {useStateValue} from './StateProvider'
const ItemOnSale = ({ id, price, title, rating, imageUrl }) => {
  
  const [{ cart }] = useStateValue()
  const isItemOnCart = () => {
    const check =  cart.some(cartItem => cartItem.id === id)
    return check ? '( In Cart )' : ''
  }
  return (
    <div className="itemOnSale">
      <img src={imageUrl} alt={title} className="itemOnSale__image" />
      <div className="itemOnSale__price">Sale: {numeral(price).format('$0,0.00')} {isItemOnCart()}</div>
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
