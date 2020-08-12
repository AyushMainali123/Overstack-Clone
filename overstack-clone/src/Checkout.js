import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core";
import "./Checkout.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CartItem from "./CartItem";
import numeral, { format } from "numeral";
import Creditcard from "./Creditcard";
import { useHistory } from "react-router-dom";
const Checkout = () => {
  const [{ cart, user }] = useStateValue();
  const [discount, setDiscount] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const history = useHistory();
  useEffect(() => {
    const total = cart.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    setsubtotal(total);
    setDiscount(total * 0.05);
  }, [cart]);

  const showButton = () => { 
    const classname = 'checkout__payButton'
    if (user == null) {
      return (
        <Link to="/signin">
          <Button className={classname} variant = "contained" color = "primary">
            <LockIcon />
            <span>Sign In To Pay</span>
          </Button>
        </Link>
      );
    }

    if (cart.length) {
      return (
        <Creditcard
          total={Number(numeral(`${subtotal - discount}`).format("0.00"))}
          history={history}
        />
      );
    }
    return (
      <Button className={classname} variant="contained" color="primary">
        <LockIcon />
        <span>No Items In A Cart</span>
      </Button>
    );
  };

  return (
    <div className="checkout">
      <div className="checkout__header">
        <Link to="/">
          <img
            className="checkout__headerImage"
            src="//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sewmyplace.com%2Fwp-content%2Fuploads%2Fpcm_uploads%2Fmerchant%2Fimports%2F1409416180_2626374_overstock-logo.jpg&f=1&nofb=1"
            alt="Overstock Logo"
          />
        </Link>
        <div className="checkout__headerRight">
          <span>Shopping Cart</span>
        </div>
      </div>
      <hr />
      <Link to="/">
        <div className="checkout__arrowBackContainer">
          <ArrowBackIcon />
          <span>Keep Shopping</span>
        </div>
      </Link>

      <div className="checkout__mainContainer">
        
        <div className="checkout__left">
          {
            cart.length ? cart?.map((item) => {
              const { id, title, price, rating, imageUrl, quantity } = item;
              return (
                <CartItem
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  rating={rating}
                  quantity={quantity}
                  imageUrl={imageUrl}
                />
              );
            }) : <h1>No Items in the cart</h1>
          }
        </div>
        <div className="checkout__right">
          <div className="checkout__subtotal">
            <span>Subtotal:</span>
            <span>{numeral(subtotal).format("$0,0.00")}</span>
          </div>
          <div className="checkout__discount">
            <span>Promotional Savings:</span>
            <span>{numeral(discount).format("$0,0.00")}</span>
          </div>
          <div className="checkout__totalAfterDiscount">
            <span>Subtotal After Discounts:</span>
            <span>{numeral(subtotal - discount).format("$0,0.00")}</span>
          </div>
          <div className="checkout__total">
            <span>Your Total:</span>
            <span>{numeral(subtotal - discount).format("$0,0.00")}</span>
          </div>
         {showButton()}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
