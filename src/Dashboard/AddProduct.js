import React from 'react'
import { toast } from 'react-toastify';

function AddProduct() {

    const handleAddProduct = (e) => {
        e.preventDefault();
        const image = e.target.image.value;
        const name = e.target.name.value;
        const minimum = e.target.minimum.value;
        const available = e.target.available.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const product = { image, name, minimum, available, description, price };
        // console.log(product)
        fetch('https://intel-server-azim.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast.success('successfully added a product')
                e.target.reset();
            })
    }

    return (
        <div className='w-3/4 mx-auto my-10'>
            <h2 className='text-3xl text-center font-semibold mb-8 text-primary'>Add a product</h2>
            <form onSubmit={handleAddProduct} className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10'>
                <div>
                    <p className='mt-3'>Select an image <br />
                        <input className='input input-bordered w-96' placeholder='image url' required type="text" name="image" />
                    </p>
                    <p className='mt-3'>Product Name <br />
                        <input className='input input-bordered w-96' required type="text" placeholder='product name' name="name" />
                    </p>
                    <p className='mt-3'>Minimum order quantity <br />
                        <input className='input input-bordered w-96' required type="number" placeholder='minimum order quantity' name="minimum" />
                    </p>
                    <p className='mt-3'>Available <br />
                        <input className='input input-bordered w-96' required type="number" placeholder='available product' name="available" />
                    </p>
                </div>
                <div>
                    <p className='mt-3'>Description <br />
                        <textarea className='textarea textarea-bordered w-96' required type="text" placeholder='product description' name="description" />
                    </p>
                    <p className='mt-3'>Price <br />
                        <input className='input input-bordered w-96' required type="number" placeholder='price' name="price" />
                    </p>
                    <p>
                        <input className='btn btn-primary w-96 mt-16' required type="submit" value='Add Product' />
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;
