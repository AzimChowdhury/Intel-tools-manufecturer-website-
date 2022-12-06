import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../Shared/Spinner';

function AllOrders() {
    const [confirm, setConfirm] = useState(false);
    const [product, setProduct] = useState('');

    const { data, isLoading, refetch } = useQuery('order', () => fetch('https://intel-server.vercel.app/orders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
        }
    }).then(res => res.json()))




    if (confirm && product) {
        fetch(`https://intel-server.vercel.app/order/${product}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.acknowledged && toast.success('successfully deleted an order. ')
                refetch();
            })
        setConfirm(false)
        setProduct('')
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }
    const deliverOrder = (id) => {
        fetch(`https://intel-server.vercel.app/deliver/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast('successfully  delivered an order')
                refetch()
            })
    }
    return (
        <div>
            <h2 className='text-2xl font-semibold text-center text-primary my-3'>Total {data?.length} Orders</h2>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Buyer Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {



                            data?.map((d, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{d.productName}</td>
                                    <td>{d.quantity}</td>
                                    <td>{d.buyerEmail}</td>
                                    <td>{
                                        d.status === 'unpaid' ?
                                            <label onClick={() => { setProduct(d._id); setConfirm(false) }} for="my-modal" class="btn btn-xs text-white btn-primary modal-button">Delete order</label>
                                            : d?.delivery === 'pending' ?
                                                <button onClick={() => deliverOrder(d._id)} className='btn btn-primary btn-sm text-white'>Delivery</button> : 'Shipped'
                                    }</td>
                                </tr>
                            )

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
                            <h3 class="font-bold text-lg">Are you sure that you want to delete this order ?</h3>
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

        </div >
    )
}

export default AllOrders;
