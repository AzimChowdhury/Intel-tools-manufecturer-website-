import React from 'react';
import Slider from './Slider';
import Products from './Products';
import Summary from './Summary';
import Review from './Review';


function Home() {
    return (
        <div>
            <Slider></Slider>
            <Products></Products>
            <Summary></Summary>
            <Review></Review>
            
        </div>
    )
}

export default Home
