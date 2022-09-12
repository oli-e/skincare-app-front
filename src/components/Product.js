import React from 'react';

const Product = ({ product: { id, name, description, price, img } }) => {

    return (
        <div>
            <a href={`/product/${id}`} >
            <div className='product-card'>
            <img src={img} width={250} height={250 } className="product-image"/>
                </div>
                </a>
            <p className='product-name'>{ name}</p>
            <p className='product-price'>${ price}</p>
        </div>
    )
}


export default Product;
