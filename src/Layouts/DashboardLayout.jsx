import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarProfile from '../Dashboard/NavbarProfile';
import DashboardSidebar from '../Dashboard/DashboardSidebar';

const DashboardLayout = () => {
    const [sidebarOpen,setSidebarOpen]=useState(false)
    const toggleSidebar=()=>{
        setSidebarOpen(!sidebarOpen)
    }
    return (
        <div className='drawer lg:drawer-open'>
            <input 
            type="checkbox" 
            id='drawer-toggle'
            className='drawer-toggle'
            checked={sidebarOpen}
            onChange={toggleSidebar}
            />

            {/* Page Content */}
            <div className='drawer-content flex flex-col'>
                {/* Navbar */}
                <NavbarProfile sidebarOpen={sidebarOpen}/>
                
                <main className='p-6'>
                    <Outlet/>
                </main>


            </div>
        {/* Sidebar */}
        
        <DashboardSidebar/>

        </div>
    );
};

export default DashboardLayout;