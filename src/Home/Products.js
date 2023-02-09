import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Shared/Spinner';
// import { useQuery } from 'react-query';



const Products = () => {
    // const { data } = useQuery('items', fetch('processor.json').then(res => res.json()))
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://intel-server.vercel.app/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    if (products.length === 0) {
        return <Spinner />
    }


    return (
        <div>
            <h1 className='mt-16 text-3xl text-center'>Choose the best processor for your brand</h1>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center mt-12 lg:mx-10 mx-3'>
                {
                    products?.map(product => <>
                        <div class="card card-side max-w-xl   max-h-96 bg-base-100 mb-4 shadow-2xl">
                            <figure className='lg:p-4 sm:p-1'>
                                <img className=' lg:w-48 w-32' src={product.image} alt="intel" />
                            </figure>
                            <div class="card-body mt-1 pt-2">
                                <h2 class="card-title font-bold text-2xl">{product.name}</h2>
                                <p><small>{product.description}</small></p>
                                <p className='p-0 m-0'>Available: <span className='font-bold'>{product.available} </span> piece</p>
                                <p className='p-0 m-0'>Minimum order: <span className='font-bold'>{product.minimum} </span>  piece</p>
                                <p className='p-0 m-0'>Price:<span className='font-bold'> $ {product.price} </span> </p>
                                <div class="card-actions justify-start">
                                    <Link to={`/purchase/${product._id}`}> <button class="btn btn-sm btn-primary text-white">Purchase</button></Link>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};


export default Products;