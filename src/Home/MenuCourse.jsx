import React from 'react';
import { Clock, Users, BookOpen } from "lucide-react";
import img1 from '../assets/image/course1.jpg'
import img2 from '../assets/image/course2.jpg'
import img3 from '../assets/image/course3.jpg'



const MenuCourse = () => {
    const coursemenu=[
        {
            image:img1,
            title:"IT Statistics Data Science And Business Analysis",
            lesson:10,
            time:"19h 30m",
            students:20,
            price:2200,
            regular:3200,
            rating:4.8,
            name:"Development"
            

        },
        {
            image:img2,
            title:"Graphic Design Masterclass - Learn Graphic Design",
            lesson:12,
            time:"15h 45m",
            students:25,
            price:3500,
            regular:4200,
            rating:4.5,
            name:"Designer"
        },
        {
            image:img3,
            title:"The Complete Digital Marketing Course - 12 Courses in 1",
            lesson:15,
            time:"23h 45m",
            students:40,
            price:1500,
            regular:2200,
            rating:4.7,
            name:"Marketing"
        }

    ]
    return (
       <div className='grid grid-cols-1 md:grid-cols-3'>
     {coursemenu.map((course,index)=>(
        <div key={index} className="max-w-sm bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden ">
                {/* Image */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          {course.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Rating */}
        <div className="flex items-center text-emerald-500 text-sm">
          <span>⭐⭐⭐⭐☆</span>
          <span className="ml-2 text-gray-500">({course.rating})</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 leading-snug hover:text-emerald-600 cursor-pointer">
          {course.title}
        </h2>

        {/* Info */}
        <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
          <div className="flex items-center gap-1">
            <BookOpen size={16} /> Lesson {course.lesson}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} /> {course.time}
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> Students {course.students}+
          </div>
        </div>

       

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3">
          <div className="text-xl font-bold text-gray-800">
            <span className="text-emerald-600">{course.price}tk</span>{" "}
            <span className="line-through text-gray-400 text-base">{course.regular}tk</span>
          </div>
          <button className="flex items-center gap-2 btn btn-primary hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
             Enroll Now
          </button>
        </div>
      </div>
    </div>
        
     ))}
     </div>
    );
};

export default MenuCourse;