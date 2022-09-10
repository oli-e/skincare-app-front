import '../index.css';
import { toast } from 'react-hot-toast';
import React from 'react';

import {useStateContext} from '../context/StateContext';
import axios from 'axios';

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


const login_style = {
    'background-color': 'white',
  'padding': '2rem',
  'align-items': 'center',
    margin: '0 auto',
    // display: 'inline-block',
    'text-align': 'left',
    width: "50%"
};

const input_style = {
    background: "transparent",
    "border": 0,
    "border-bottom": "1px solid red",
    "box-sizing": "border-box",
    "color": "black",
    "display": "block",
    "font-size": "16px",
    "margin-bottom": "30px",
    "outline": "none",
    "opacity": ".6",
    "padding-bottom": "15px",
    "padding-left": "50px",
    "width": "100%",
  }
  
const prods_container = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    padding: '5px',
    border: '1px solid blue',    
    'background-color': 'yellow', 
}

const radio_button = {
    // opacity: '0',
    'z-index': '1',
    'border-radius': '50%',
    width: '24px',
    height: '24px',
    'margin-right': '10px',
    'accent-color': '#5e1414'
}


 
const Checkout = () => {
    const { totalPrice, totalQuantities, cartItems, getCart } = useStateContext();

    const handleData = (event) => {

        toast.success("Success! Order has been placed ");

        event.preventDefault();
        console.log('wysylam dane o zamówieniu');
        var userOd = parseInt(localStorage.getItem("userId"));
        var date = new Date();
        var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        var { name, surname, address, house, flat, postalcode, country, payment } = document.forms[0];

        const address_payload = {
            headers: {
                'Authorization' : `Bearer ${getCookies().authenticator}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
            }, 
            body: {
                "street" : address.value,
                "house" : parseInt(house.value),
                "flat" : parseInt(flat.value),
                "postalCode" : postalcode.value,
                "country" : country.value,
                "userId" : parseInt(localStorage.getItem("userId"))
            }
        }

        const payload = {
            headers: {
                'Authorization' : `Bearer ${getCookies().authenticator}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
            }, 
            body: {
                "products" : JSON.stringify(cartItems),
                "date": `${current_date}`,
                "status": "Ordered",
                "payment": `${payment.value}`,
                "total" : totalPrice,
                "userId": parseInt(localStorage.getItem("userId"))
            }
        }

        console.log(address_payload);
        console.log(payload);

        axios.post("http://localhost:9000/addAddress", address_payload).then(response => console.log(response));
        axios.post("http://localhost:9000/addOrder", payload).then(response => console.log(response));
        axios.get(`http://localhost:9000/clearCart/${userOd}`, payload.headers).then(response => {
            getCart();
            window.location.href = '/';
        });

    };

    return (
        <div>
            <h1 className='products-heading'>Checkout</h1>

            <h2 className='products-heading'>Your Order</h2>
            <div style={{display: 'inline'}}>
            {cartItems.length >= 1 && cartItems.map((item) => (

                    <div style={{display: 'inline'}}  key={item.key} >
                 <img src={item.img} className='small-images-container' style={{width:'10%', height: '10%'}}></img>
                    <div>
                    <h5>{item.name}</h5>
                    <h4>${ item.price}</h4>
                    <h5 className='num' >x{item.amount }</h5>

                    </div>
            </div>
            ))}
            </div>

            <h3 className='products-heading'>Total: ${ totalPrice }</h3>


            <h2 className='products-heading'>Shipping Details</h2>
            <div style={login_style}>
                <form onSubmit={handleData}>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> Name </label>
                    <input style={input_style} type="text" name="name" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> surname </label>
                    <input style={input_style} type='text' name='surname' required />
                    </div>
                    <p>      </p>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>address </label>
                    <input style={input_style} type="text" name="address" required />
                    <label style={{  'font-size': '22px'}}>house </label>
                    <input style={input_style} type="number" name="house" required />
                    <label style={{  'font-size': '22px'}}>flat </label>
                    <input style={input_style} type="number" name="flat" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>postalcode </label>
                    <input style={input_style} type='text' name='postalcode' required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>country </label>
                    <input style={input_style} type='text' name='country' required />
                </div>
                    <h2 className='products-heading'>Payment Method</h2>
                    <div className='payment-method' style={{ 'align-items': 'center' }}>
                        <input type="radio" style={ radio_button} id="1" checked='true' name="payment" value='Cash On Delivery'/>
                    <label for="1" style={{  'font-size': '22px'}} >Cash On Delivery</label>
                    </div>
                <button className="btn" type="submit" >Place Order</button>
                </form>
            </div>
            

        </div>
    )
}

export default Checkout;
