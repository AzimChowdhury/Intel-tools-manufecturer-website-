import React from 'react';
import Slider from './Slider';
import Products from './Products';
import Summary from './Summary';
import Review from './Review';
import Footer from './Footer';

function Home() {
    return (
        <div>
            <Slider></Slider>
            <Products></Products>
            <Summary></Summary>
            <Review></Review>
            <Footer/>
        </div>
    )
}

export default Home
