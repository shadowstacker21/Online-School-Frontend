import React from 'react';
import MenuCourse from './MenuCourse';
import { FaArrowRight } from 'react-icons/fa6';

const TopCourse = () => {
    return (
        <div className='mt-10 mb-10 bg-gray-200 '>
        <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-10 ">
            <p className="bg-success text-success-content/80 h-8 w-48 flex items-center justify-center rounded-full text-sm font-medium shadow">
            Top Popular Course
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Students of the Histudy Course are welcome to join us.
            </h1>
        </div>
        
        
         <div className=''>
              <MenuCourse/>
         </div>
           <div className='flex justify-center'>
            <p className="mt-10 mb-10 bg-success text-success-content/80 h-8 w-48 flex items-center justify-center text-center rounded-full text-sm font-medium shadow">
            Learn More Course <FaArrowRight size={20}/>
            </p>
           
           </div>
          </div>
        </div>
    );
};

export default TopCourse;