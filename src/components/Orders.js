import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../index.css';


var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }


const payload = {
    headers: {
        'Authorization': `Bearer ${getCookies().authenticator}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    }
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [noOrders, setNoOrders] = useState(false);

    const getOrders = () => {
        let userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:9000/getOrders/${userId}`, payload).then(
                response => {
                    setNoOrders(response.data.length == 0);
                    setOrders(response.data);
                }

            )
        } else {
            window.location.href = "/";
        }
    }

    useEffect(() => {
        getOrders();
    }, [getOrders])

    return (
        <div className="product-detail-container" >
            <div><h1>Your Orders</h1></div>
            {noOrders && 
               <div className="products-container"><h2>You have no orders yet. Make some</h2></div>
            }
            {!noOrders && orders.map((order) => (
                <div className="hero-banner-container">
                <ul className="list-group mt-5 text-white">
                <li className="list-group-item d-flex justify-content-between align-content-center">
                    <div className="d-flex flex-row">
                        <div className="ml-2">
                    <h6 className="mb-0">Order No:{order.id}</h6>
                    <div className="about">
                        <span>Date: {order.date}</span>
                        <span>Status: {order.status}</span>
                        <span>Total: ${order.total}</span>
                    </div>
                </div>
            </div>
                        </li>
                    </ul>
                </div>
            ))

            }

        </div>
    )
}

export default Orders;
