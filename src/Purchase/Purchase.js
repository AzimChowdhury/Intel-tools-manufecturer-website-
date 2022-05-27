import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';


function Purchase() {

    const [user, loading] = useAuthState(auth);
    const { id } = useParams();
    const { data, isLoading } = useQuery('product', () => fetch(`http://localhost:5000/purchase/${id}`).then(res => res.json()))
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    if (isLoading || loading) {
        return <Spinner></Spinner>
    }


    const { _id, name, image, price, description, minimum, available } = data;

    const handlePurchase = ({ city, number, streetAddress, quantity }) => {
        const order = {
            productId: _id,
            productName: name,
            buyerEmail: user?.email,
            quantity,
            address: { streetAddress, city, number },
            cost: price * quantity,
            status: 'unpaid'
        }
        fetch('http://localhost:5000/order', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast(`successfully ordered ${quantity} piece ${name} processor in ${price * quantity} USD`)
                reset()
            })


    }
    return (
        <div>
            <h1 className='mt-4 text-3xl text-center'>Confirm your purchase order</h1>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center mt-8 lg:mx-20'>

                <div class="card card-side block w-96 lg:max-h-lg bg-base-100 mb-4 shadow-2xl">
                    <figure className='p-10 w-full'><img src={image} alt="intel" /></figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold text-2xl">{name}</h2>
                        <p><small>{description}</small></p>
                        <p className='p-0 m-0'>Available: <span className='font-bold'>{available} </span> piece</p>
                        <p className='p-0 m-0'>Minimum order: <span className='font-bold'>{minimum} </span>  piece</p>
                        <p className='p-0 m-0'>Price:<span className='font-bold'> $ {price} </span> </p>

                    </div>
                </div>

                <form onSubmit={handleSubmit(handlePurchase)} class="card card-side  w-96 lg:max-h-lg bg-base-100 mb-4 shadow-2xl">
                    <div class="card-body">
                        <p className='text-xl font-semibold'>{user.displayName ? <span>Name :  {user.displayName}</span> : ""}</p>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" value={user?.email} disabled class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Street address</span>
                            </label>
                            <input name='streetAddress' type="text" placeholder="Street address" class="input input-bordered"
                                {...register("streetAddress", {
                                    required: {
                                        value: true,
                                        message: 'street Address Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.streetAddress?.type === 'required' && <span className="label-text-alt text-red-500">{errors.streetAddress.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">City</span>
                            </label>
                            <input name='city' type="text" placeholder="City" class="input input-bordered"
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: 'city Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.city?.type === 'required' && <span className="label-text-alt text-red-500">{errors.city.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="number" placeholder="phone number" class="input input-bordered"
                                {...register("number", {
                                    required: {
                                        value: true,
                                        message: 'number Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.number?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input type="number" name='quantity' placeholder="Quantity" class="input input-bordered"
                                {...register("quantity", {
                                    required: {
                                        value: true,
                                        message: 'quantity Required'
                                    },

                                    min: {
                                        value: minimum,
                                        message: `you have to order more than ${minimum} piece`
                                    },
                                    max: {
                                        value: available,
                                        message: `you can order less then ${available} piece`
                                    },
                                })}
                            />
                            <label className="label">

                                {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                                {errors.quantity?.type === 'max' ? <span className="label-text-alt text-red-500">{errors.quantity.message}</span> : ""}
                                {errors.quantity?.type === 'min' ? <span className="label-text-alt text-red-500">{errors.quantity.message}</span> : ""}
                            </label>

                        </div>

                        <div class="form-control mt-6">
                            <input type="submit" value="Purchase" className='btn btn-primary text-white' />
                        </div>
                    </div>
                </form>



            </div>

        </div>
    )
}

export default Purchase;
