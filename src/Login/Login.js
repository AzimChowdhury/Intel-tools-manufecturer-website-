import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
      if(user){
          navigate('/')
      }
    const handleLogin = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
    }

    return (

        <div class="card lg:w-1/4 mx-auto mt-4  shadow-2xl bg-base-100">
            <div class="card-body">
                <h2 className='text-2xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input name='email' type="text" placeholder="email" class="input input-bordered"
                          {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input name='password' type="text" placeholder="password" class="input input-bordered" 
                          {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is Required'
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
                            <p className='text-sm  mt-2'>New in Intel ? <Link to='/register'>Register now</Link> </p>
                    </div>
                    <p className='text-sm text-red-600'>{error ? error.message : ""}</p>
                    <div class="form-control  mt-6">
                        <input type='submit' value='Login' class="btn btn-primary text-white" />
                    </div>
                </form>
                <div className='divider'>or</div>
                <button className='btn btn-ghost '>Sign in with Google </button>
            </div>
        </div>

    )
}

export default Login;
