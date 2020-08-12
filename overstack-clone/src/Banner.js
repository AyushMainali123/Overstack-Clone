import React from 'react'
import './Banner.css'
const Banner = () => {
    return (
      <div className="banner">
        {/* <img
          src="https://ak1.ostkcdn.com/images/products/is/images/direct/9c4d5f747e832c77bfaa47024c4e8fe832ef02d5/Safavieh-Madison-Avery-Distressed-Vintage-Boho-Chic-Rug.jpg"
          alt="Background"
          className = "banner__background"
        /> */}
        <a href="#itemsOnSale">
          <div className="banner__imageContainer">
            <img
              src="https://ak1.ostkcdn.com/img/mxc/20200803-rugs-intl-991.svg"
              alt="Banner"
              className="banner__frontImage"
            />
          </div>
        </a>
        
      </div>
    );
}

export default Banner
