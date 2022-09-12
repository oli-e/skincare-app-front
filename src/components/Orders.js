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
                    setNoOrders(response.data.length === 0);
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
        <div >
            <div><h1>Your Orders</h1></div>
            {noOrders && 
               <div className="products-container"><h2>You have no orders yet. Make some</h2></div>
            }
            {!noOrders && orders.map((order) => (
                <div style={orders_container}>
                    <ul style={list_group}>
                <li style={list_group_item}>
                    <div className="d-flex flex-row">
                        <div className="ml-2">
                    <h4 style={{"font-size":24}}>Order No: {order.id}</h4>
                    <div style={span_style}>
                        <span>  Date: {order.date}</span>
                        <span style={{'margin-left': '30px'}}>  Status: {order.status}</span>
                        <span style={{'margin-left': '30px'}}>  Total: ${order.total}</span>
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


const list_group = {
    width: '600px',
    'list-style-type': 'none',
    margin: 0,
    padding: 0
};

const list_group_item = {
    "margin-top": "10px",
    "border-radius": "none",
    "background": "transparent",
    "cursor": "pointer",
    "transition": "all 0.3s ease-in-out",
    // d-flex justify-content-between align-content-center
};

const span_style = {
    display: 'inline-block', 
    margin: '10px 0px',
    "font-size":16
}

const orders_container = {
    padding: '10px 10px',
    'background': '#dcdcdc',
    'border-radius': '15px',
    // position: 'relative',
    height: '100px',
    'line-height': '0.9',
    width: '100%',
    'display': 'block',
    margin: '20px',
    'justify-content': 'center',
    'align-content': 'center'
}
export default Orders;
