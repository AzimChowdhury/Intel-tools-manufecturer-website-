import React from 'react'
import { Link, Outlet } from 'react-router-dom';


function Dashboard() {

    return (
        <div>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    {/* <!-- Page content here --> */}

                    <Outlet></Outlet>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard'>My profile</Link></li>
                        <li><Link to='/dashboard/myOrder'>My orders</Link></li>
                        <li><Link to='/dashboard/addReview'>Add a review</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
