import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';

function MyProfile() {
    const [user, loading] = useAuthState(auth);
    const updateInfo = (e) => {
        e.preventDefault();
        const email = user?.email;
        const name = e.target.name.value;
        const education = e.target.education.value;
        const location = e.target.location.value;
        const number = e.target.number.value;
        const userInfo = { email, name, education, location, number }
        console.log('userInfo', userInfo)
        fetch('https://intel-server.onrender.com/userInfo', {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && refetch();
                e.target.reset()
            })
    }
    const { data, isLoading, refetch } = useQuery('userInfo', () => fetch(`https://intel-server.onrender.com/userInfo/${user.email}`).then(res => res.json()))

    if (loading || isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className='text-center mt-4 mx-3'>
                <h1 className='text-primary text-4xl font-bold'>{user?.displayName || data.name}</h1>
                <h2 className='text-primary text-2xl font-semibold'>{user?.email}</h2>
                {data.education ? <span className='pr-6 text-primary'>Education : {data.education}</span> : ''}
                {data.location ? <span className='pr-6 text-primary'> Location : {data.location}</span> : ''}
                {data.number ? <span className='pr-6 text-primary'>Phone Number : {data.number}</span> : ''}
                <p>Update your information in this form </p>
            </div>
            <form onSubmit={updateInfo}>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-5  justify-items-center'>
                    <div>
                        <p className='mt-4'>Name: <br />
                            <input className='input input-bordered w-72 lg:w-96' type="text" name="name" placeholder='Name' required />
                        </p>
                        <p className='mt-4'>Education quality: <br />
                            <input className='input input-bordered w-72 lg:w-96' type="text" name="education" placeholder='Education quality' required />
                        </p>
                    </div>
                    <div>
                        <p className='mt-4'>Location: <br />
                            <input className='input input-bordered w-72 lg:w-96' type="text" name="location" placeholder='Location' required />
                        </p>
                        <p className='mt-4'>Phone number: <br />
                            <input className='input input-bordered w-72 lg:w-96' type="number" name="number" placeholder='Phone number' required />
                        </p>
                    </div>
                </div>
                <div className='w-full text-center'>
                    <input className='btn btn-primary text-white w-72 lg:w-36 m-4' type="submit" value="Update" />
                </div>
            </form>

        </div>
    )
}

export default MyProfile;
