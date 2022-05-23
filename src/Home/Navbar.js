import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const menu = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='login'>Login</Link></li>
        <li><Link to='register'>Register</Link></li>
        <li><Link to='profile'>My Profile</Link></li>
    </>
    return (
        <div class="navbar bg-primary text-white py-2">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabIndex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to='/'><p class="  normal-case text-5xl font-semibold  ml-24">Intel</p></Link>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0 text-xl">
                    {menu}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;