import  { useEffect, useState } from 'react';
import authApiClient from '../Services/auth-api-client';
import ErrorAlert from '../Alert/ErrorAlert';
import { Link } from 'react-router-dom';
import DeleteDepartment from './Update/DeleteDepartment';
import SuccessAlert from '../Alert/SuccessAlert';


const Department = () => {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const [dept,setDept]=useState([]);
    const [msg,setMsg]=useState("")

    useEffect(()=>{
        setLoading(true)
        authApiClient.get("/departments/")
        .then((res)=>{
           setDept(res.data);
        })
        .catch(error=>setError(error))
        .finally(()=>setLoading(false))
    },[msg])

    useEffect(()=>{
        if(msg||error){
            const timer=setTimeout(()=>setMsg("")||setError(""),3000)
            return ()=>clearInterval(timer)
        }
    })


     if(loading){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }
    return (
    <div className="overflow-x-auto">
          {error&&(
            <ErrorAlert error={error}/>
        )}
        {msg&&(
            <SuccessAlert success={msg}/>
        )}
   {dept.length>0?(
     <table className="table table-zebra">
        {/* head */}
        
        <thead>
        <tr>
            
            <th>Id No.</th>
            <th>Department Name</th>
            <th>Update </th>
            <th>Delete</th>
        
        </tr>
        </thead>
         <tbody>
         {dept.map((dept)=>(
        <tr key={dept.id} className="">
            <th>{dept.id}</th>
            <td>{dept.name}</td>
            <td>
                <Link to={`/dashboard/update/${dept.id}`} className='btn btn-primary'>Update</Link>
            </td>
           <td>
            <DeleteDepartment id={dept.id} setMsg={setMsg} setError={setError}/>
           </td>
            </tr>
        ))}
       
    
        </tbody>
    </table>
   
 
   
   ):
    ( <div className='text-2xl font-bold text-white bg-red-500'>No Department Yet</div>)
   }
    </div>
    );
};

export default Department;