import React from 'react';

import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const Navbar = ({sidebarOpen}) => {
    const {logout,user}=useAuthContext()
    const navigate=useNavigate()
    return (
        <div className='navbar bg-base-100 border-b'>
            <div className='flex-none lg:hidden'>
                <label htmlFor="drawer-toggle" className='btn btn-square btn-ghost'>
                   {sidebarOpen?(
                    <FiX className='w-6 h-6'/>
                   ):(
                    <FiMenu className='w-6 h-6'/>
                   )}
                </label>

            </div>
            <div className='flex-1'>
                <h2 className='text-lg font-semibold'>Dashboard</h2>

            </div>
  
            <div className='flex-none'>
                <div className='dropdown dropdown-end'>
                    <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                      <div className='w-10 rounded-full'>
                        <img src={user.profile_picture} alt="User avater" />

                      </div>
                    </label>
                    <ul tabIndex={0}
                     className='menu menu-sm dropdown-content mt-3 z-[-1] p-2 shadow bg-base-100 rounded-box w-52'

                    >
                        <li>
                            <Link to='/dashboard/profile' className="justify-between"> 
                             Profile 
                             <span className='badge'>New</span>
                            </Link>
                        </li>
                        <li>
                            <Link> 
                            Settings
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard'> 
                           Dashboard
                            </Link>
                        </li>
                        <li>
                           <button onClick={()=>logout(navigate)} >Log Out</button>
                        </li>
                      
                    </ul>

                </div>

            </div>
            
        </div>
    );
};

export default Navbar;