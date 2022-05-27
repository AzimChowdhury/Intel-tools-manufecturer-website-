import React from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../Shared/Spinner';

function AllUsers() {
    const { data, isLoading, refetch } = useQuery('user', () => fetch('https://intel-server-azim.herokuapp.com/users', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Spinner></Spinner>
    }
    const makeAdmin = (email) => {

        fetch(`https://intel-server-azim.herokuapp.com/makeAdmin/${email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${localStorage.getItem("JWT-token")}`
            }

        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast.success('successfully made an admin !')
                refetch();
            })
    }
    return (
        <div>
            <h2 className='text-3xl font-semibold text-primary text-center m-4'>Total  {data?.length} User</h2>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            data?.map((d, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{d?.name}</td>
                                    <td>{d.email}</td>
                                    <td>
                                        {
                                            d?.role === "admin" ? "Admin" :
                                                <button onClick={() => makeAdmin(d.email)} className='btn btn-primary btn-xs text-white'>Make Admin</button>
                                        }
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers;
