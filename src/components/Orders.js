import React from 'react';

const Orders = () => {
    const noOrders = false;
    const status = "In progress";
    const date = "10-02-2022";
    const price = 145;

    const orders = [
        {
            status: "In progress",
            date: "10-02-2022",
            price: 145
        },        {
            status: "In progress",
            date: "07-02-2022",
            price: 16
        },
        {
            status: "Ended",
            date: "05-01-2022",
            price: 36
        }
    ]

    return (
        <div className="product-detail-container" >
            <div><h1>Your Orders</h1></div>
            {noOrders && 
               <div className="products-container"><h2>You have no orders yet. Make some</h2></div>
            }
            <h2>hehehe</h2>
            {!noOrders && orders.map((order) => (
                    <div className="products-container">
                    <h3>Status: { order.status } </h3>
                    <h3>Date: {order.date  } </h3>
                    <h3>Total: ${ order.price } </h3>
                </div>
            ))

            }

        </div>
    )
}

export default Orders;
