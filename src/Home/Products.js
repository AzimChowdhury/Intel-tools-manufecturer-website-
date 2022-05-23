import React, { useState, useEffect } from 'react';
// import { useQuery } from 'react-query';



const Products = () => {
    // const { data } = useQuery('items', fetch('processor.json').then(res => res.json()))
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center mt-12'>
                {
                    products.map(product => <>
                        <div class="card card-side max-w-xl bg-base-100 mb-4 shadow-2xl">
                            <figure className='p-4'><img src={product.image} alt="intel" /></figure>
                            <div class="card-body">
                                <h2 class="card-title text-2xl">{product.name}</h2>
                                <p><small>{product.description}</small></p>
                                <p className='py-1 m-0'>Available: {product.available} piece</p>
                                <p  className='py-1 m-0'>Price: $ {product.price}</p>
                                <div class="card-actions justify-start">
                                    <button class="btn btn-primary text-white">Purchase</button>
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