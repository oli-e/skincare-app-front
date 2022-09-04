import React,  { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight,  AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { useEffect } from "react";

const Cart = () => {

    useEffect(() => {
        // POST request using fetch with set headers
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            },
            body: JSON.stringify({
                userId: 1,
                productId: 3,
                amount: 4
            })
        };
        fetch('http://localhost:9000/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }, []);

    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, showCart } = useStateContext();

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type="button" className='cart-heading' onClick={ () => setShowCart(false)}>
                        <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>{totalQuantities} Items</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <a href='/'>
                        <button type='button' onClick={()=> setShowCart(false)} className="btn">Find your products</button>
                        </a>
                        
                    </div>
                )}

                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map( (item)=> (
                        <div className='product' key={ item.id }>
                            <img src={item.img} className='cart-product-image'></img>
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${ item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                <p className="quantity-desc">
                            <span className="minus" onClick="">
                                    <AiOutlineMinus/>
                                </span>
                            <span className="num" >
                                    1
                                </span>
                            <span className="plus" onClick="">
                                    <AiOutlinePlus/>
                                </span>
                                </p>           
                                <button type='button' className='remove-item' onClick=""><TiDeleteOutline/></button>
                                </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    )
}

export default Cart;
