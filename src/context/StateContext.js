import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Context = createContext();

const headers_dict = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'X-CSRF-Token': sessionStorage.getItem("csrfToken")
    }
};

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);


    const countProducts = (data) => {
        let price = 0;
        console.log(data);
        data.map(obj => {
            console.log(obj.amount);
            price += obj.amount;
        }
        );
        setTotalQuantities(price);
    };

    const countPrice = (data) => {
        let price = 0;
        data.map(obj => {
            price += obj.price * obj.amount;
        }
        );
        setTotalPrice(price);
    };

    const getCart = useCallback(async () => {
        if ("userId" in localStorage) {
            let userId = parseInt(localStorage.getItem("userId"));
            axios.get(`http://localhost:9000/getProducts/${userId}`, headers_dict)
                .then(response => {
                    // console.log(response.data);
                    setCartItems(response.data);
                    countProducts(response.data);
                    countPrice(response.data);
                }
                );
        }
    }, [])

    useEffect(() => {
        getCart();
    }, [getCart])


    const onAdd = (product, quantity) => {

        if (!document.cookie.includes("authenticator")) {
            toast.error(`You have to sign in to buy products`);
        } else {

        let userId = localStorage.getItem("userId");
        // axios POST TO /cart
        const requestOptions = {
            // method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'X-CSRF-Token': sessionStorage.getItem("csrfToken")
            },
            body: {
                "userId": parseInt(localStorage.getItem("userId")),
                "productId": product.id,
                "amount": quantity
            }
        };
        axios.post('http://localhost:9000/addToCart', requestOptions)
            .then(response => {
                getCart();
            });

          

        const productInCart = cartItems.find((item) => item.id === product.id);
        setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
        toast.success(`${quantity} ${product.name} added to the cart!`);
        // window.location.reload(true);
    }
    }

    const increaseQuantity = () => {
        setQuantity((prevQuant) => prevQuant + 1); 
    }

    const decreaseQuantity = () => {
        setQuantity((prevQuant) => {
            if (prevQuant - 1 < 1) return 1;
            return prevQuant - 1;
        });
             
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice, 
                totalQuantities,
                quantity,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                setShowCart,
                setTotalQuantities,
                getCart
            }}>
            { children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);