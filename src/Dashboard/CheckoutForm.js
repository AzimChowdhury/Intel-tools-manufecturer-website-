import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react'

function CheckoutForm({ data }) {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [trnxId, setTrnxId] = useState('');
    const { cost, _id, buyerEmail } = data;
    useEffect(() => {
        fetch('http://localhost:5000/createPaymentIntent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ cost })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })


    }, [cost])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setPaymentError(error.message)
        }
        else {
            setPaymentError('')
        }
        setSuccess('')

        //confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: buyerEmail,
                    },
                },
            },
        );

        if (intentError) {
            setPaymentError(intentError?.message)
        }
        else {
            setPaymentError('')
            setSuccess('Congratulations ! your payment is completed')
            setTrnxId(paymentIntent?.id)
            // console.log(paymentIntent.id, _id)

            fetch(`http://localhost:5000/payment/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(paymentIntent)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn btn-primary btn-sm mt-6 text-white' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {paymentError && <p className='text-red-600'>{paymentError}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            {trnxId && <p className='text-green-500'>your transaction id - <span className='text-red-600'>{trnxId}</span></p>}
        </>
    )
}

export default CheckoutForm;
