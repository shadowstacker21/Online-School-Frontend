import React from "react";
import { FaTrophy } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";


const TopORMost = ({topCourse,topStudent}) => {
    

     const rankColors = ["#FFC107", "#9C27B0"];
     if(!topCourse || !topStudent){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }
    return (
       <div className="flex flex-col lg:flex-row gap-6 p-4">
      
      {/* Top Courses */}
      <div className="bg-white text-black shadow-xl rounded-lg p-6 flex-1">
        <div className="flex items-center mb-4">
          <FaTrophy className="text-yellow-400 mr-2" />
          <h2 className="font-bold text-lg">Top Courses</h2>
        </div>
        <ul className="space-y-3">
          {topCourse.map((course, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
                  style={index%2==1?{ backgroundColor: rankColors[0]}:{backgroundColor: rankColors[1]} }
                >
                  {index + 1}
                </span>
                <div>
                  <p>{course.course__title}</p>
                  <span className="text-gray-400 text-sm">{course.total} purchases</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-white text-sm bg-red-500">Top {index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Students */}
      <div className="bg-white text-black shadow-xl rounded-lg p-6 flex-1">
        <div className="flex items-center mb-4">
          <IoTrendingUp className="text-green-400 mr-2" />
          <h2 className="font-bold text-lg">Top Students</h2>
        </div>
        <ul className="space-y-3">
          {topStudent.map((student, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold"
                style={index%2==1?{ backgroundColor: rankColors[0]}:{backgroundColor: rankColors[1]} }
                >
                  {student.student__email.split(".")[0]?.[0]?.toUpperCase()}{student.student__email.split(".")[1]?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p>{student.student__email}</p>
                  <span className="text-gray-400 text-sm">{student.total} courses purchased</span>
                </div>
              </div>
              <span 
                className="px-2 py-1 rounded text-white text-sm"
                style={{ backgroundColor: rankColors[index] }}
              >
                #{index + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
    );
};

export default TopORMost;