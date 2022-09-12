import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {AiOutlineLogin, AiOutlineShopping} from 'react-icons/ai'

import {useStateContext} from '../context/StateContext';

import Cart from './Cart';

var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }

const Navbar = () => {
    const {showCart, setShowCart, totalQuantities} = useStateContext();
    const [isLoggedIn, setLoginStatus] = useState(false);


    const showOrders = () => {
        window.location.href = '/orders';
    }
    

    const signOut = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookies().authenticator}`;
        axios.post("http://localhost:9000/signOut", {}, {headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
        }, withCredentials: true}).then(
            response => {
                console.log(response)
                localStorage.removeItem("userId");
                window.location.reload(true);
            }
        );
    };

    const getNavbarState = useCallback(async () => {
        if (document.cookie.includes("authenticator")) {
            setLoginStatus(true);
          }

    }, [])

    useEffect(() => {
        getNavbarState();
    }, [getNavbarState])

    return (
        <div className='navbar-container'>
            <a href='/'>
            <p className='logo' href='/'>My Skincare</p>
            </a>
            {isLoggedIn && <button type='button' style={orders_btn} onClick={showOrders}>Your orders</button>}

            <div>
                {isLoggedIn ? 
                    (<button type='button' className='cart-icon' onClick={signOut}>SignOut</button>):
                        (<a href={`/sign-in`} ><button type='button' className='cart-icon'>SignIn</button></a>)
                
                }
                <a href={`/sign-up`} >
                    <button type='button' className='cart-icon'>
                    SignUp
                    </button>
                </a>
                <button type='button' className='cart-icon' onClick={() => setShowCart(true) }>
                    <AiOutlineShopping />
                    { console.log(totalQuantities)}
                    <span className='cart-item-qty'>{ totalQuantities}</span>
                </button>
                {showCart && <Cart/> }
            </div>
           
    </div>
    )
    }


const orders_btn = {
    "width": "100%",
    "max-width": "400px",
    "padding": "10px 12px",
    "border-radius": "15px ",
    "border": " 2px solid #de6f83",
    "font-size": "20px",
    "margin-top": "10px",
    "text-transform": "uppercase",
    "background-color": "white",
    "color": "#de6f83",
    "cursor": "pointer",
    "transform": "scale(1, 1)",
    "transition": "transform 0.5s ease",

}

export default Navbar;
