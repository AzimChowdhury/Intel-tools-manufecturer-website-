import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner';

function AddReview() {
    const [user, loading] = useAuthState(auth)
    if (loading) {
        return <Spinner></Spinner>
    }

    const addReview = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const rating = e.target.ratings.value;
        const comment = e.target.comment.value;
        const review = { email: user.email, name, rating, comment }
        fetch('https://intel-server-azim.herokuapp.com/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast.success('successfully added a review')
                e.target.reset()
            })
    }
    return (
        <div>
            <h2 className='text-3xl text-center font-semibold m-4 text-primary'>Add a Review</h2>
            <form onSubmit={addReview} className='w-2/4 mx-auto'>
                <p className='mt-3'>Name: <br />
                    <input className='input input-bordered w-full' type="text" name="name" placeholder='Your Name' required />
                </p>
                <p className='mt-3'>Ratings: <br />
                    <input className='input input-bordered w-full' type="number" min={1} max={5} name="ratings" placeholder='Ratings' required />
                </p>
                <p className='mt-3'>Comment: <br />
                    <textarea className='textarea textarea-bordered w-full ' type="text" name="comment" placeholder='Add your comment' required />
                </p>
                <div>
                    <input className='btn btn-primary w-full mt-5 text-white' type="submit" value="Add Review" />
                </div>
            </form>
        </div>
    )
}

export default AddReview;
