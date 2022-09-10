import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {AiOutlineLogin, AiOutlineShopping} from 'react-icons/ai'

import {useStateContext} from '../context/StateContext';

import Cart from './Cart';



const Navbar = () => {
    const {showCart, setShowCart, totalQuantities} = useStateContext();
    const [isLoggedIn, setLoginStatus] = useState(false);

    var getCookies = function(){
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
          var pair = pairs[i].split("=");
          // sessionStorage.setItem((pair[0] + '').trim(), pair.slice(1).join('='));
          cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
        }
        return cookies;
      }

    const showOrders = () => {
        window.location.href = 'orders';
    }
    

    const signOut = (event) => {

        let payload = { 
            "body" : {
                "email": "login@mail.com",
                "password": "1234pass"
                }
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookies().authenticator}`;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = `${getCookies().csrfToken}`;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE";
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Authorization'
        axios.defaults.headers.common['accept'] = "application/json";
        axios.defaults.headers.common['mode'] = "cors";

        console.log('csrfToken ', sessionStorage.getItem('csrfToken'))
        console.log('cookie',`Bearer ${getCookies().PLAY_SESSION}`)
        axios.post("http://localhost:9000/signOut", payload, {headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
        }, withCredentials: true}).then(
            response => console.log(response)
        );
        localStorage.removeItem("userId");
    window.location.href = `/`;
    };

    const getNavbarState = useCallback(async () => {
        if (document.cookie.includes("PLAY_SESSION")) {
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
            {isLoggedIn && <button type='button' className="btn" onClick={showOrders}>Your orders</button>}

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

export default Navbar;
