import React from 'react'
import './FeaturedItem.css'
const FeaturedItem = ({imageUrl, discount, feature}) => {
    return (
        <div className = "featuredItem">
            <img src={imageUrl} alt="" />
            <h3>{discount}</h3>
            <p>{feature}</p>
        </div>
    )
}

export default FeaturedItem
