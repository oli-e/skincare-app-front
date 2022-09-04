import React from 'react';
import { useNavigate } from "react-router-dom";

const Product = ({ product: { id, name, description, price, img } }) => {
    const navigate = useNavigate();
  
    const coursesPage = () => {
        navigate(`/product/${id}`);
    } 

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
