import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./ItemDescription.css";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
const quantityArray = [];
for (let i = 1; i <= 20; i++) {
  quantityArray.push(i);
}
const ItemDescription = () => {
  const [{ items, cart }, dispatch] = useStateValue();
  const [value, setValue] = useState(1);
  const [item, setItem] = useState({});
  const params = useParams();
  const history = useHistory()

  useEffect(() => {
    setItem(
      items.filter((data) => data.id === params.id.substr(1)).length
        ? items.filter((data) => data.id === params.id.substr(1))[0]
        : null
    );
  }, []);

  const handleClick = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: { ...item, quantity: value },
      },
    });
    history.push('/checkout')
  };

  return item ? (
    <div className="itemDescription">
      <div className="itemDescription__imageContainer">
        <img src={item?.imageUrl} alt="" />
      </div>
      <div className="itemDescription__info">
        <div className="itemDescription__Details">
          <h1 className="itemDescription__title">{item?.title}</h1>
          <div className="itemDescription__rating">
            {item?.rating &&
              Array(item.rating)
                .fill()
                .map((_, i) => <span key={i}>⭐️</span>)}
          </div>
          <div className="itemDescription__price">
            Sale Starts at ${item?.price}
          </div>

          <div className="itemDescription__description">
            {item?.description}
          </div>
        </div>

        <div className="itemDescription__cart">
          <FormControl>
            <Select value={value} onChange={(e) => setValue(e.target.value)}>
              {quantityArray.map((quantity) => (
                <MenuItem value={quantity}>Quantity: {quantity}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className="itemDescription__button"
            onClick={handleClick}
            disabled={cart.some((cartItem) => cartItem.id === item.id)}
          >
            <AddShoppingCartIcon />
            <span style={{ marginLeft: 10 }}>
              {cart.some((cartItem) => cartItem.id === item.id)
                ? "Item In Cart"
                : "Add to Cart"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <h5 style={{ marginTop: 200 }}>Not Availiable</h5>
  );
};

export default ItemDescription;
