import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const onAdd = (product, quantity) => {
        const productInCart = cartItems.find((item) => item.id === product.id);
        setTotalPrice((prevTotal) => prevTotal + product.price * quantity); 
        setTotalQuantities((prevQuant) => prevQuant + quantity);

        if (productInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => { 
                if (cartProduct.id === product.id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            });
            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added to the cart!`);

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
                setShowCart
            }}>
            { children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);