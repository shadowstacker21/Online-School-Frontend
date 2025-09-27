import React, { useState } from 'react';
import authApiClient from '../../Services/auth-api-client';


const DeleteDepartment = ({id, setMsg, setError}) => {
    const [loading,setLoading]=useState(false)


    const handleDelete=async()=>{
        setMsg("")
        setError("")
        setLoading(true)
        try{
           await  authApiClient.delete(`/departments/${id}`)
           setTimeout(()=>{
            setMsg("Department Deleted Successfully")
           })
        }catch(err){
            console.log(err);
            setError("Failed to delete department")
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div>
            <button
            onClick={handleDelete}
            disabled={loading}
            className='btn btn-error text-white'
            >Delete</button>
        </div>
    );
};

export default DeleteDepartment;