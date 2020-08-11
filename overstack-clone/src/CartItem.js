import React, { useState } from "react";
import "./CartItem.css";
import { MenuItem } from "@material-ui/core";
import { FormControl, Select } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
const quantityArray = [];
for (let i = 1; i <= 20; i++) {
  quantityArray.push(i);
}

const CartItem = ({ id, title, price, rating, imageUrl, quantity }) => {
  const [{ cart }, dispatch] = useStateValue();
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id,
        quantity: e.target.value,
      },
    });
  };

  const handleRemoveButtonClick = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        id,
      },
    });
  };
  return (
    <div className="cartItem">
      <div className="cartItem__imageContainer">
        <img src={imageUrl} alt="" className="cartItem__image" />
      </div>
      <div className="cartItem__details">
        <div className="cartItem__upperPart">
          <div className="cartItem__title"> {title}</div>
          <div className="cartItem__price">$ {price}</div>
          <div>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <span key={i}>⭐️</span>
              ))}
          </div>
        </div>
        <div className="cartItem__lowerPart">
          <FormControl>
            <Select value={quantity} onChange={handleChange}>
              {quantityArray.map((quantity) => (
                <MenuItem value={quantity}>{quantity}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={handleRemoveButtonClick}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
