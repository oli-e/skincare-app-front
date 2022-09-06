import '../index.css';

import React from 'react';

const login_style = {
    'background-color': 'white',
    'padding': '2rem',
    'box-shadow':
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    'align-items': 'center',
  };

const Checkout = () => {

    return (
        <div  style={login_style}>
            <h1 className='products-heading'>Checkout</h1>

            <h2 className='products-heading'>Your Order</h2>
            <div className='layout'>
                <p>Product 1</p>
                <p>Product 2</p>
                <p>Product 3</p>
                <h3 className='total h3'>Total: 5</h3>
            </div>

            <h2 className='products-heading'>Shipping Details</h2>
            <div className='checkout-form' style={{'align-text': 'center'}}>
                <form>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> Name </label>
                    <input className='checkout-input' type="text" name="name" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}> surname </label>
                    <input class="checkout-input" type="text" name="surname" required />
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
                    <label style={{  'font-size': '22px'}}>Username </label>
                    <input className='checkout-input' type="text" name="postalcode" required />
                </div>
                <div className='checkout-input-form'>
                    <label style={{  'font-size': '22px'}}>Username </label>
                    <input className='checkout-input' type="text" name="country" required />
                </div>
                </form>
            </div>
            
            <h2 className='products-heading'>Payment Method</h2>
            <div className='payment-method' style={{'align-items': 'center'}}>
                <p>Cash On Delivery</p>
            </div>

            <button type='button' className="btn">Place Order</button>
        </div>
    )
}

export default Checkout;
