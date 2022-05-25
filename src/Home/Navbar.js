import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../firebase.init';
import userIcon from '../images/user.png';
import useAdmin from '../Hooks/useAdmin';

const Navbar = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user?.email)
    console.log(admin)

    const menu = <>
        <li><Link to='/'>Home</Link></li>
        <li>{user ? <Link to='/dashboard'>Dashboard</Link> : ""}</li>
        <li><Link to='/portfolio'>Developer's Portfolio</Link></li>
        <li>{
            user ?
                <div class="dropdown dropdown-hover dropdown-end bg-primary">
                    <label tabindex="0" class=" rounded-full">
                        {user.photoURL ?
                            <img className='w-16 rounded-full' src={user?.photoURL} alt='' />
                            :
                            <img className='w-16 rounded-full' src={userIcon} alt='' />}
                    </label>
                    <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-primary rounded-box w-52 mt-40 ">
                        {user.displayName ? <li><p>{user?.displayName}</p></li> : ''}
                        <li><p className='text-sm'>{user?.email}</p></li>
                        <li><button className='btn btn-secondary' onClick={() => signOut(auth)}>Log Out</button></li>
                    </ul>
                </div>
                :
                <Link to='login'>Login</Link>
        }</li>

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

            <div class="navbar-end hidden  lg:flex">
                <ul class="menu menu-horizontal p-0 text-xl">
                    {menu}
                </ul>
            </div>
            <div className='navbar-end'>
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;