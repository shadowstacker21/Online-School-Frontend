import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image/hero-2.png'

const HomeMain = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-center hero  bg-gradient-to-r from-blue-600/10 to-purple-600/10 mb-4">
        
        <div className="hero-content  text-center">
            <div className="max-w-md">
            <h1 className="text-5xl md:text-6xl font-bold  md:text-gray-800 mb-6">Transform Your Future with</h1>
            <span className='text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block'>Quality Education</span>
            <p className="py-6">
                Discover thousands of courses from expert instructors. Learn at your own pace, advance your career, and unlock your potential with our comprehensive learning platform.
            </p>
            <Link to="/register"><button className="btn btn-primary">Get Started</button></Link>
            </div>
        </div>
        <div>
         <img src={image} alt="" />
         </div>
        </div>
        
    );
};

export default HomeMain;