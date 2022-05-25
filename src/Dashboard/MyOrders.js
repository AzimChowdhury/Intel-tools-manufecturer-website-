import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';


function MyOrders() {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading } = useQuery('orders', () => fetch(`https://intel-server-azim.herokuapp.com/myOrder/${user.email}`).then(res => res.json()))
    // console.log(data)
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
                                        <button className='btn-ghost'>Cancel</button>
                                        : 'Paid'}</td>
                                </tr>
                            </>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders;
