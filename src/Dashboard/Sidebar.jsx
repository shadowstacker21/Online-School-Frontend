import { BookOpen, CirclePlus, LayoutDashboard } from 'lucide-react';

import { CgProfile } from 'react-icons/cg';

import { GiGraduateCap } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { FcDepartment } from 'react-icons/fc';
import { FaUserGroup } from 'react-icons/fa6';



const Sidebar = () => {
    const {user}=useAuthContext();
    const userMenus = [
        {to:"/dashboard",icon:LayoutDashboard,label:"Dashboard"},
        {to:"/dashboard/course",icon:BookOpen,label:"Course"},
        {to:"/dashboard/profile",icon:CgProfile,label:"Profile"},
       
    ]
    const teacherMenus=[
        {to:"/dashboard",icon:LayoutDashboard,label:"Dashboard"},
        {to:"/dashboard/course",icon:BookOpen,label:"Course"},
        {to:"/dashboard/add/course",icon:CirclePlus,label:"Add Course"},
         {to:"/dashboard/department",icon:FcDepartment,label:"Department"},
          {to:"/dashboard/profile",icon:CgProfile,label:"Profile"},
       
    ]
    const adminMenus=[
        {to:"/dashboard",icon:LayoutDashboard,label:"Dashboard"},
        {to:"/dashboard/course",icon:BookOpen,label:"Course"},
        {to:"/dashboard/add/course",icon:CirclePlus,label:"Add Course"},
        {to:"/dashboard/department",icon:FcDepartment,label:"Department"},
        {to:"/dashboard/add/department",icon:CirclePlus,label:"Add Department"},
        {to:"/dashboard/user",icon:FaUserGroup,label:"User"},
         {to:"/dashboard/profile",icon:CgProfile,label:"Profile"},
    ]

   const menus =
  user.role === 'student'
    ? userMenus
    : user.role === 'teacher'
    ? teacherMenus
    : adminMenus
    ;
    return (
        <div className='drawer-side z-10'>
            <label htmlFor="drawer-toggle"
            aria-label='close-sidebar'
            className='drawer-overlay'>

            </label>
            <aside className='menu bg-base-200 w-g4 min-h-full p-4 text-base-content'>
                <div className='flex items-center gap-2 mb-6 px-2'>
                    <GiGraduateCap className='w-6 h-6'/>
                    <h1 className='text-xl font-bold'>Online School</h1>
                </div>
                <ul className='menu menu-md gap-2'>
                    {menus.map((item,index)=>(
                        <li key={index}>
                            <Link to={item.to} className='flex items-center'>
                            <item.icon className='h-6 w-6' />
                            <span>{item.label}</span>
                            </Link>

                        </li>
                    ))}

                </ul>
                 <div className="mt-auto pt-6 text-xs text-base-content/70">
            @ 2025 Online School Admin

            </div>

            </aside>
            
        </div>
    );
};

export default Sidebar;