import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init'
import Spinner from '../Shared/Spinner';


function Register() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        gUser,
        gLoading,
        gError
    ] = useSignInWithGoogle(auth);

    const handleRegister = data => {
        createUserWithEmailAndPassword(data.email, data.password)
    }
    if (loading || gLoading) {
        <Spinner />
    }

    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'

    if (user || gUser) {
        const intelUser = {
            email: user?.user?.email || gUser?.user?.email,
            role: 'user'
        }
        fetch('http://localhost:5000/user', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(intelUser)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && navigate(from, { replace: true });
            })


    }
    return (

        <div class="card lg:w-1/4 mx-auto mt-4  shadow-2xl bg-base-100">
            <div class="card-body">
                <h2 className='text-2xl text-center'>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input name='name' type="text" placeholder="Name" class="input input-bordered"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name please'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email please'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Invalid Email'
                                }
                            })}
                        />
                        <label className="label">

                            {errors.email?.type === 'required' ?
                                <p className="label-text-alt text-red-500">{errors.email.message}</p> : ''}
                            {errors.email?.type === 'pattern' ?
                                <p className="label-text-alt text-red-500">{errors.email.message}</p> : ""}

                        </label>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="password" class="input input-bordered"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password please'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>

                    </div>
                    <p className='text-sm  mt-2'>Already have an account? <Link to='/login'>Login now</Link> </p>
                    <p className='text-sm text-red-600'>{error ? error.message : ""}</p>
                    <p className='text-sm text-red-600'>{gError ? gError.message : ""}</p>
                    <div class="form-control  mt-6">
                        <input type='submit' value='Register' class="btn btn-primary text-white" />
                    </div>
                </form>
                <div className='divider'>or</div>
                <button onClick={() => signInWithGoogle()} className='btn btn-ghost '>Sign in with Google </button>
            </div>
        </div>

    )
}

export default Register;
