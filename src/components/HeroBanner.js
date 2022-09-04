import React from "react";


const HeroBanner = ({ product }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beast-solo">SMALL TEXT </p>
                <h3>{ product?.name }</h3>
                <img src={ product?.img } alt="headphones" className="hero-banner-image"></img>
     
                <div>
                    <button type="button" to={`/product/${product?.id}`} >Shop Now</button>
                        <div className="desc">
                        <h5>{ product?.description }</h5>
                        <p>${ product?.price }</p>
                    </div>
                
                </div>
            </div>
    </div>
    )
}




export default HeroBanner;
