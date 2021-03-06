import React, {useState} from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Button } from "@material-ui/core";

const trunchuate = (str, len) =>
  str.length > len ? `${str.slice(0, len)}...` : str;

const Header = () => {
  const [{ cart, user, items }, dispatch] = useStateValue();
  const [searchValue, setSearchValue] = useState('')


  const handleUserClick = (e) => {
    auth.signOut();
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const handleSearchClick = e => {
    e.preventDefault()
    setSearchValue(e.target.value)
    const lowerCasedSearchValue = searchValue.toLowerCase()
    const itemsToShow = items.filter(cartItem => {
      const loweredCasedCartItem = cartItem.title.toLowerCase() 
      if (loweredCasedCartItem.includes(lowerCasedSearchValue)) return true;
    })
    dispatch({
      type: "UPDATE_ITEMS_TO_SHOW",
      payload: {
        itemsToShow
      }
    })
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__image"
          src="//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sewmyplace.com%2Fwp-content%2Fuploads%2Fpcm_uploads%2Fmerchant%2Fimports%2F1409416180_2626374_overstock-logo.jpg&f=1&nofb=1"
          alt="Overstock Logo"
        />
      </Link>
      <form className="header__searchbox">
        <input
          type="text"
          className="header__searchBoxInput"
          placeholder="Search"
          value={searchValue}
          onChange = {handleSearchClick}
        />
        <button className="header__searchIcon" onClick = {handleSearchClick}>
          <SearchIcon />
        </button>
      </form>
      <div className="header__navLinks">
        <Link to={!user ? "/signin" : "/"}>
          <div className="header__link">
            <PermIdentityOutlinedIcon className="header__icon" />
            <span className="header__linkText">
              {user ? trunchuate(`${user.email}`, 8) : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/">
          <div className="header__link">
            <FavoriteBorderOutlinedIcon className="header__icon" />
            <span className="header__linkText">Lists</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header__link header__cartLink">
            <ShoppingCartOutlinedIcon className="header__icon" />
            <span className="header__linkText">Cart</span>
            <span>{cart.length}</span>
          </div>
        </Link>
        {user && (
          <Button
            onClick={handleUserClick}
            color="secondary"
            variant="contained"
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
