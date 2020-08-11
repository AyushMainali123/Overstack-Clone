import React, { useEffect, useState } from "react";

import FeaturedItem from "./FeaturedItem";
import './FeaturedItems.css'
import {client} from './contentful'
// space: 'b6o1t5o9di7c',
//   accessToken: 'Yjx3_ilnt38wxCcPUbjKjpwT1y8qPMG8Wg-g9AhCzi8'
// contentTypeId: featuredProducts

const FeaturedItems = () => {
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await client.getEntries({
        content_type: "featuredProducts",
      });
      // object.items.sys.id
      // object.items.fields.discount,feature,imgae.fields.file.url
      setFeaturedData(
        products.items.map((product) => {
          const { id } = product.sys;
          const { discount, feature } = product.fields;
          const imageUrl = product.fields.image.fields.file.url;
          return { id, discount, feature, imageUrl };
        })
      );
    };
    fetchData();
  }, []);

  return (
    <div className="featuredItems">
      <h2 className="featuredItems__title">Shop Our Featured Sales</h2>
      <div className="featuredItems__items">
        {featuredData.map((data) => {
          return (
            <FeaturedItem
              key={data.id}
              discount={data.discount}
              feature={data.feature}
              imageUrl={data.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedItems;
