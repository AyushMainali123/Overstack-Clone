import React from "react";
import Banner from './Banner'
import FeaturedItems from "./FeaturedItems";
import ItemsOnSale from "./ItemsOnSale";
const Home = () => {
  return (
    <div className="home">
          <Banner />
          <FeaturedItems />
          <ItemsOnSale />
    </div>
  );
};

export default Home;
