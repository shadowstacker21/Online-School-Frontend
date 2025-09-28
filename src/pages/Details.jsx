import React, { useEffect, useState } from 'react';
import { FcDepartment } from 'react-icons/fc';

import { Link, useParams } from 'react-router-dom';
import authApiClient from '../Services/auth-api-client';
import { FaArrowLeft } from 'react-icons/fa';
import Enroll from '../Enroll/Enroll';
import ErrorAlert from '../Alert/ErrorAlert';
const Details = () => {
       const [course,setCourse]=useState(null);
        const [loading,setLoading]=useState(false)
         const [message, setMessage] = useState("");
        const {courseId}=useParams()
       
        useEffect(()=>{
            setLoading(true)
           
              authApiClient.get(`/courses/${courseId}/`)
               .then((res)=>{
                 setCourse(res.data)
               
                 setLoading(false)
               })
           
        },[courseId])

   useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => {
      setMessage("");
      }, 5000);

      return () => clearTimeout(timeout); 
    }, [message]);

         if(loading){
          return (
             <div className='flex justify-center items-center py-10 min-h-screen'>
                        <span className="loading loading-spinner loading-xl text-secondary"></span>
                     </div>
          )
        }
        if(!course) return <div>Course Not Found</div>
    return (
        
            <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
               {message &&(
                <ErrorAlert error={message} />
              )}
             <div className='mb-6'>
              
                
            <Link 
            to='/dashboard/course'
            className='flex items-center text-sm text-base-content/70
            hover:text-base-content transition-colors'>
             
              <FaArrowLeft className='mr-2 h-4 w-4'/>
              Back to Products
            </Link>
        
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Navbar Section */}
            <div className="navbar flex flex-col gap-4 bg-gradient-to-r from-blue-600 to-purple-600 mb-6 shadow-sm lg:col-span-3 rounded-xl p-6">
            <div className='flex justify-center text-center gap-2'>
            <FcDepartment className='w-6 h-6' />
            <h3 className='text-white text-xl font-semibold'>{course.dept_name}</h3>
            </div>
            <h1 className='text-white text-3xl font-bold text-center'>{course.title}</h1>
            <h3 className='text-white text-xl font-semibold text-center'>Learn and Explore this course</h3>
            </div>


            {/* Main image + details (left two columns) */}
            <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-sm bg-white">
            <img src={course.image} alt={course.title} className="w-full h-[420px] object-cover" />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17h10" />
            </svg>
            Course Overview
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            {course.description}
            </p>
            </div>


            <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">About the Instructor</h3>
            <div className="mt-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-white font-semibold">{course.teacher_name?.slice(0,2).toUpperCase()}</div>
            <div>
            <p className="font-medium">{course.teacher_name}</p>
            <p className="text-sm text-gray-500">Senior Lecturer </p>
            </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Highly educated instructor with extensive experience in on this course principles and modern development practices. Specializes in guiding students through real-world projects, research-based learning, and advanced problem-solving techniques used in the industry.</p>
            </div>
            </div>


            <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">What you'll learn</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
            Comprehensive understanding of core concepts
            </li>
            <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
             Practical skills through real-world projects
            </li>
            <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
            Critical thinking and problem-solving
            </li>
            <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
            Collaboration and professional growth
            </li>
            </ul>
            </div>
            </div>


            {/* Sidebar (right column) */}
            <aside className="space-y-6">
        <Enroll course={course} setMessage={setMessage}/>


            <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Course Features</h4>
            <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-green-500" /> Live lectures</li>
            <li className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-blue-500" /> Hands-on projects</li>
            <li className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-purple-500" /> Assignment feedback</li>
            <li className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-orange-400" /> Certificate of completion</li>
            <li className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-red-500" /> Lifetime access</li>
            </ul>
            </div>


            <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-3">Details</h4>
            <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between"><span>Duration</span><span>8 weeks</span></div>
            <div className="flex justify-between"><span>Level</span><span>Advanced</span></div>
            <div className="flex justify-between"><span>Language</span><span>English</span></div>
            </div>
            </div>
            </aside>
            </div>
            </div>
    );
};

export default Details;