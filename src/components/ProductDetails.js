import React, {useCallback, useEffect, useState} from 'react';

import '../index.css';
import {useParams} from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus, AiOutlineConsoleSql } from "react-icons/ai";
import Product from "./Product";


const ProductDetails = ({  products }) => {

    let params = useParams();
    console.log(params.id);

    const [product, getProduct] = useState();
    const { decreaseQuantity, increaseQuantity, quantity, onAdd } = useStateContext();
    const getServerSide = useCallback(async () => {
    const product = await fetch(`http://localhost:9000/product/${params.id}`)
        .then(product => product.json())
        getProduct(product);
    }, [])

    useEffect(() => {
        getServerSide();
    }, [getServerSide])

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="products-container">
                        <img src={product?.img} className="product-detail-image" width={400} height={400 } />
                    </div>
                </div>

                    <div className="product-detail-desc">
                        <h1>{product?.name}</h1>
                        <div className="reviews">
                            <div>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiFillStar/>
                                <AiOutlineStar/>
                            </div>
                            <p>(20)</p>
                        </div>
                        <h4>Details</h4>
                        <p>{product?.description}</p>
                        <p className="price">${product?.price}</p>
                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="quantity-desc">
                            <span className="minus" onClick={ decreaseQuantity}>
                                    <AiOutlineMinus/>
                                </span>
                            <span className="num" >
                                    { quantity}
                                </span>
                            <span className="plus" onClick={ increaseQuantity}>
                                    <AiOutlinePlus/>
                                </span>
                                </p>
                        </div>
                        <div className="buttons">
                            <button type="button" className="add-to-cart" onClick={()=>onAdd(product, quantity)}>Add To Cart</button>
                            <button type="button" className="buy-now" onClick="">Buy Now</button>
                        </div>
                </div>
            </div>
                
                <div className="maylike-products-wrapper">
                    <h2>You may also like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                        {products.map((item) => (
                                (item.id != params.id) ? 
                                (<Product key={item.id} product={item} />) :
                                console.log()
                            )) }
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ProductDetails