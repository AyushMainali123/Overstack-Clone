import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import ItemDescription from "./ItemDescription";
import { client } from "./contentful";
import { useStateValue } from "./StateProvider";
import Checkout from "./Checkout";
import SignInPage from "./SignInPage";
import { auth } from "./firebase";
function App() {
  const [{ items, cart }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: {
            user: authUser,
          },
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            user: null,
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const products = await client.getEntries({
        content_type: "overstockItemsOnSale",
      });

      const itemsToBeAdded = products.items.map((product) => {
        const { id } = product.sys;
        const { price, title, rating } = product.fields;
        const description =
          product.fields.description.content[0].content[0].value;
        const imageUrl = product.fields.image.fields.file.url;
        return { id, price, title, description, rating, imageUrl };
      });

      dispatch({
        type: "ADD_ITEMS",
        payload: {
          items: itemsToBeAdded,
        },
      });
    };
    fetchData();
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signin">
            <Header />
            <SignInPage />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/product/:id">
            <Header />
            <ItemDescription />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
