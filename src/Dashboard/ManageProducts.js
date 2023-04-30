import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../Shared/Spinner';
function ManageProducts() {
    const [confirm, setConfirm] = useState(false);
    const [product, setProduct] = useState('');

    const { data, isLoading, refetch } = useQuery('products', () => fetch('https://intel-server.onrender.com/products').then(res => res.json()))

    if (isLoading) {
        return <Spinner></Spinner>
    }


    if (confirm && product) {
        fetch(`https://intel-server.onrender.com/product/${product}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.acknowledged && toast.success('successfully deleted a product. ')
                refetch();
            })
        setConfirm(false)
        setProduct('')
    }
    return (
        <div>
            <div>
                <h2 className='text-center text-2xl text-primary'>Manage Products </h2>

                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th>no.</th>
                                <th>Product Name</th>
                                <th>Available</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            {
                                data?.map((d, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{d?.name}</td>
                                        <td>{d.available} piece</td>
                                        <td>
                                            <label onClick={() => { setProduct(d._id); setConfirm(false) }} htmlFor="my-modal" className='btn btn-primary btn-xs text-white'>Delete</label>
                                        </td>

                                    </tr>
                                </>)
                            }

                        </tbody>
                    </table>
                </div>
                {
                    <>
                        {/* <!-- Put this part before </body> tag --> */}
                        <input type="checkbox" id="my-modal" class="modal-toggle" />
                        <div class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Are you sure that you want to delete this Product ?</h3>
                                <p class="py-4">Once you delete this, you will not be able to get it back. It will be permanently deleted.</p>
                                <div className='flex justify-between mx-4'>
                                    <div class="modal-action">
                                        <label onClick={() => setConfirm(false)} for="my-modal" class="btn btn-outline btn-success">No</label>
                                    </div>
                                    <div class="modal-action">
                                        <label onClick={() => setConfirm(true)} for="my-modal" class="btn btn-outline btn-error">Delete</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ManageProducts;
