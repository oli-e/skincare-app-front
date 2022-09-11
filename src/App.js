import React, {useCallback, useEffect, useState} from 'react';


import {FooterBanner, HeroBanner, Product} from './components';

const Home = () => {

  const [products, getProducts] = useState([]);
  const [isLoggedIn, setLoginStatus] = useState(false);

  const getServerSide = useCallback(async () => {
    const products = await fetch(`http://localhost:9000/products`)
        .then(products => products.json())
    getProducts(products);

    if (document.cookie.includes("authenticator")) {
      setLoginStatus(true);
    }
  }, [])

  useEffect(() => {
    getServerSide();
}, [getServerSide])

  return (
    <>
      <HeroBanner product= {products[0]} />
        <div className='products-heading'>
          <h2>Our Products</h2>
          <p>Skincare products that will change your life</p>
      </div>     
      
      <div className='products-container'>
        {products?.map((product) => <Product key={product.id} product={ product } /> )}
      </div>

      <FooterBanner />
      </>
    );
}



export default Home;
