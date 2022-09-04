import React from 'react';

const FooterBanner = () => {
    return (
        <div className='footer-banner-container'>
            <div className='banner-desc'>
                <div className='left'>
                    <p>23% OFF</p>
                    <h3>SMOOTH</h3>
                    <h3>SKIN</h3>
                </div>
                <div className='right'>
                    <p>23% OFF</p>
                    <h3>SMOOTH</h3>
                    <p>23% OFF</p>
                    <button href="/product/1">Shop now</button>
                </div>
                <img src='https://haircle.pl/userdata/public/gfx/1337/vital-c-hydrating-serum-no-background.jpg' width={250} height={250 } />

            </div>
    </div>
    )
}

export default FooterBanner;
