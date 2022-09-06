import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {FooterBanner, HeroBanner, Product} from './components';

const Home = () => {

  const [products, getProducts] = useState([]);
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");

  const getServerSide = useCallback(async () => {
    const products = await fetch(`http://localhost:9000/products`)
        .then(products => products.json())
    console.log(products);
    getProducts(products);

    if (document.cookie != "") {
      setLoginStatus(true);
    }

    setUserName("Olena");
  }, [])

  useEffect(() => {
    getServerSide();
}, [getServerSide])

  return (
    <>
      {isLoggedIn ? (
        <h1>Welcome back, {userName}</h1>
      ) : (
        <h1></h1>
      )}
        
      <HeroBanner product= {products[0]} />
        <div className='products-heading'>
          <h2>Best Selling Products</h2>
          <p>Speakers that will change the world</p>
      </div>     
      
      <div className='products-container'>
        {products?.map((product) => <Product key={product.id} product={ product } /> )}
      </div>

      <FooterBanner />
      </>
    );
}



export default Home;
