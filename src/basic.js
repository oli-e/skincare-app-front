import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './App';
import {Cart, Layout, SignIn, SignUp, Checkout, Orders} from './components';
import ProductDetails from './components/ProductDetails';

const Basic = () => {

    const [products, getProducts] = useState([]);

    const getServerSide = useCallback(async () => {
        const products = await fetch(`http://localhost:9000/products`)
            .then(products => products.json())
        getProducts(products);
    }, [])

  useEffect(() => {
    getServerSide();
}, [getServerSide])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout><Home/></Layout>} exact />
                
                <Route path='/product/:id' element={<Layout><ProductDetails products={products} /></Layout>} exact />
                
                <Route path='/cart' element={<Layout><Cart /></Layout>} exact />
                
                <Route path='/sign-in' element={<Layout><SignIn /></Layout>} exact />
                
                <Route path='/sign-up' element={<Layout><SignUp /></Layout>} exact />
                
                <Route path='/checkout' element={<Layout><Checkout /></Layout>} exact />

                <Route path='/orders' element={<Layout><Orders /></Layout>} exact />
                
            </Routes>

        </BrowserRouter>
    );
}

export default Basic;
