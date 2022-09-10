import '../index.css';

import React from 'react';

import {useStateContext} from '../context/StateContext';

const login_style = {
  'background-color': 'white',
  'padding': '2rem',
  'align-items': 'center',
};

const Checkout = () => {
    const { totalPrice, totalQuantities, cartItems } = useStateContext();

    const handleData = (event) => {
        event.preventDefault();
        console.log('wysylam dane o zamówieniu');

        var { name, surname, address, house, flat, postalcode, country } = document.forms[0];
        
        console.log(name.value, surname.value, address.value, house.value, flat.value, postalcode.value, country.value);
    };

    return (
        <div>
            <h1 className='products-heading'>Checkout</h1>

            <h2 className='products-heading'>Your Order</h2>
            {cartItems.length >= 1 && cartItems.map((item) => (
                <div style={login_style} key={ item.key}>
                 <img src={item.img} className='cart-product-image' style={{ width: '12%', height: '12%'}}></img>
                <div className='item-desc'>
                <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${ item.price}</h4>
                </div>
                    <div className='flex bottom'>
                    <h5 className='num' >x{item.amount }</h5>
                    </div>
                </div>
            </div>
            ))}

            <h3 className='total h3'>Total: { totalPrice }</h3>


            <h2 className='products-heading'>Shipping Details</h2>
            <div className='checkout-form' style={{'align-text': 'center'}}>
                <form onSubmit={handleData}>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> Name </label>
                    <input className='checkout-input' type="text" name="name" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> surname </label>
                    <input class='checkout-input' type='text' name='surname' required />
                    </div>
                    <p>      </p>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>address </label>
                    <input className="checkout-input" type="text" name="address" required />
                    <label style={{  'font-size': '22px'}}>house </label>
                        <input className='checkout-input' type="text" name="house" required />
                    <label style={{  'font-size': '22px'}}>flat </label>
                    <input className='checkout-input' type="text" name="flat" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>postalcode </label>
                    <input className='checkout-input' type='text' name='postalcode' required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>country </label>
                    <input className='checkout-input' type='text' name='country' required />
                </div>
                    <h2 className='products-heading'>Payment Method</h2>
                    <div className='payment-method' style={{ 'align-items': 'center' }}>
                    <input type='radio' value='Cash On Delivery' checked='true'/>Cash On Delivery
                    </div>
                <button className="btn" type="submit">Place Order</button>
                </form>
            </div>
            

        </div>
    )
}

export default Checkout;
