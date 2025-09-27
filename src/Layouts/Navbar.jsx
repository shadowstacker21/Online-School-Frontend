import { GiGraduateCap } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    
        <div className="navbar bg-base-100 shadow-sm">
         <div className="flex-1 ">
        <div className='flex gap-4'>
            <div>
           <GiGraduateCap className='w-12 h-12 bg-blue-600 rounded-lg text-white'/>
        </div>
            <div className='flex-row justify-center items-center'>
            <a className="text-xl font-bold">Online School</a>
            <p className='text-sm font-semibold text-gray-400'>Learn.Grow</p>
        </div>
        
        </div>
        
    </div>
    <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
        <li><Link to='/login' className='text-lg text-gray-500 font-semibold'>Sign in</Link></li>
        <li>
           <Link to='/register'><button className='btn btn-primary bg-blue-600 rounded-sm'>Get Started</button></Link>
        </li>
        </ul>
    </div>
    </div>
    );
};

export default Navbar;