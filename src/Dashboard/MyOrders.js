import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';


function MyOrders() {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery('orders', () => fetch(`https://intel-server-azim.herokuapp.com/myOrder/${user.email}`).then(res => res.json()))

    const [confirm, setConfirm] = useState(false);
    const [product, setProduct] = useState('');
    if (confirm && product) {
        fetch(`https://intel-server-azim.herokuapp.com/order/${product}`, {
            method: "DELETE",
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

    if (isLoading || loading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <h2 className='text-center text-2xl text-primary'>My Orders </h2>
            <h4 className='text-center text-xl text-primary'>{user?.email}</h4>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>no.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            data?.map((d, index) => <>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{d?.productName}</td>
                                    <td>{d.quantity}</td>
                                    <td>{d.cost}</td>
                                    <td>{d.status === 'paid' ? 'tranx id' :
                                        <button className='btn-ghost'>Pay now</button>}</td>
                                    <td>{d.status === 'unpaid' ?
                                        <label onClick={() => { setProduct(d._id); setConfirm(false) }} for="my-modal" class="btn btn-xs text-white btn-primary modal-button">Delete order</label>
                                        : 'Paid'}</td>
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
        </div>
    )
}

export default MyOrders;
