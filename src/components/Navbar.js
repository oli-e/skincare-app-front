import React from 'react';
import {AiOutlineLogin, AiOutlineShopping} from 'react-icons/ai'

import {useStateContext} from '../context/StateContext';

import Cart from './Cart';



const Navbar =
    () => {
      const {showCart, setShowCart, totalQuantities} = useStateContext();

      const handleClick = (event) => {
        window.location.href = `/`;
    }

    return (
        <div className='navbar-container'>
            <a href='/' onClick={handleClick}>
            <p className='logo' href='/'>My Skincare</p>
            </a>
            
            <div>
                <button type='button' className='cart-icon' onClick={() => setShowCart(true) }>
                    <AiOutlineShopping />
                    { console.log(totalQuantities)}
                    <span className='cart-item-qty'>{ totalQuantities}</span>
                </button>
                <a href={`/sign-in`} >
                    <button type='button' className='cart-icon'>
                    SignIn
                    </button>
                </a>
                <a href={`/sign-up`} >
                    <button type='button' className='cart-icon'>
                    SignUp
                    </button>
                </a>
                {/* <a href='/login'>
            <button type='button' className='cart-icon' onClick="">
                <AiOutlineLogin />
                    </button>
                    </a> */}
                {showCart && <Cart/> }
            </div>
           
    </div>
    )
    }

export default Navbar;
