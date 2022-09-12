import React,  { useRef, useCallback } from 'react';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { useEffect } from "react";
import axios from 'axios';

const Cart = () => {
    const cartRef = useRef();
    
    const { totalPrice, totalQuantities, cartItems, setShowCart, getCart } = useStateContext();

    const showProduct = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    const handleDelete = (id) => {
        let userId = localStorage.getItem("userId");
        console.log("I want to delete this one with id: ", id);
        axios.get(`http://localhost:9000/delete/${id}/${userId}`, {});
        setShowCart(true);
        getCart();
    };

    const validateUser = useCallback(async () => {
    }, [])

    useEffect(() => {
        validateUser();
    }, [validateUser])

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
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className='product' key={item.id}>
                            <img src={item.img} className='cart-product-image' onClick={ () => showProduct(item.id) }></img>
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${ item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <h5 className="num" >
                                        x{item.amount }
                                    </h5>   
                                    <button type='button' className='remove-item' onClick={ () => handleDelete(item.id) }><TiDeleteOutline/></button>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                    {cartItems.length >= 1 &&
                        <div>
                            <h2>Total: ${totalPrice}</h2>
                            <a href='/checkout'>
                                <button type='button' onClick={() => setShowCart(false)} className="btn">Checkout</button>
                            </a>
                        </div>}
                </div>
            </div>
    </div>
    )
}

export default Cart;
