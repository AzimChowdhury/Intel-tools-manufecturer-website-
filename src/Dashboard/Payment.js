import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../Shared/Spinner';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L3fM0DC4YjKBBRKbab7AOfqaclffBBDwXIOBqyObEnQQnkwGWIlJuuqSoms3YbHA930WxfmHPtngpsbxWXdEEpL00yWzGBUGn')


function Payment() {
    const { id } = useParams()
    const { data, isLoading } = useQuery('product', () => fetch(`http://localhost:5000/product/${id}`).then(res => res.json()))
    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h2 className='text-3xl  text-center font-semibold text-primary m-8'>Pay ${data.cost} for {data.quantity} piece {data.productName} </h2>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mx-20 my-20'>
                <div>
                    <div class="card w-96 bg-base-100 shadow-xl">

                        <div class="card-body">
                            <h2 class="card-title">{data.productName}</h2>
                            <p>Quantity: {data.quantity} piece</p>
                            <p>cost: ${data.cost} </p>

                        </div>
                    </div>
                </div>
                <div>
                    <div class="card w-96 bg-base-100 shadow-xl">

                        <div class="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm data={data} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
