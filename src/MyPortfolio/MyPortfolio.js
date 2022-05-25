import React from 'react';

function MyPortfolio() {
    return (
        <div className='text-center mx-24 my-10'>
            <h1 className='text-5xl pb-4 text-primary font-semibold'>Hi, I am Azim Chowdhury.</h1>
            <h3 className='text-2xl pb-4 font-semibold'>Email - azimchy994@gmail.com</h3>
            <h5 className='text-2xl font-semibold'>I passed the Dakhil/socondery from Madrasa Board in 2018. And in 2020 I passed higher secondary under Chittagong Education Board. Currently, I am  a BBA Honors first year student in the Department of Management at the National University.
                Basically I'm a frontend (React.js) developer. I  also know Node.js, Express.js and Mongodb.
                I want to be a full (MERN) stack developer in future.</h5>
            <h2 className='text-2xl font-semibold mt-8' >Here is one of my project I have develop using MERN.</h2>
            <a className='text-2xl font-semibold mt-4 text-primary link-hover' href='https://pi-electronics.web.app' rel='noreferrer' target='_blank'>Pi Electronics warehouse management website</a>
        </div>
    )
}

export default MyPortfolio;