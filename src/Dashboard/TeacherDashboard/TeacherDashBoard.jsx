import React, { useEffect, useState } from 'react';
import authApiClient from '../../Services/auth-api-client';

const TeacherDashBoard = () => {
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState([])

    useEffect(()=>{
        setLoading(true)
        authApiClient.get("/teacher_courses/")
        .then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false)
        })
    },[])

       if(loading){
          return (
             <div className='flex justify-center items-center py-10 min-h-screen'>
                        <span className="loading loading-spinner loading-xl text-secondary"></span>
                     </div>
          )
        }

    return (
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra">
        <thead>
            <tr>
                <th>SL No.</th>
                <th>Course Id</th>
                <th>Title</th>
                <th>Department Name</th>
                <th>Total Purchase</th>
               
            </tr>
            </thead>
            <tbody>
           {data.map((course,index)=>(
             <tr key={index}>
                <th>{index+1}</th>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.dept_name}</td>
                <td>{course.student_count}</td>
                
            </tr>
           ))}
           
            </tbody>
        
     </table>
    </div>
    );
};

export default TeacherDashBoard;