import React, { useEffect, useState } from 'react';
import authApiClient from '../../Services/auth-api-client';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessAlert from '../../Alert/SuccessAlert';

const UpdateDepartment = () => {
    const {id}=useParams()
     const {register,handleSubmit,formState:{errors}}=useForm()
     const [msg,setMsg]=useState("")
     const [value,setValue]=useState("")
     const [loading,setLoading]=useState(false)
     const navigate=useNavigate()

     useEffect(() => {
    
    authApiClient.get(`/departments/${id}/`)
      .then(res => setValue(res.data.name))
      .catch(err => console.error(err));
  }, [id, setValue]);


    const handleupdate=async(data)=>{
        setLoading(true)
       try{
         await authApiClient.patch(`/departments/${id}/`,data)
         setMsg("Department Updated Successfully")
         setTimeout(()=>{
            navigate("/dashboard/department")
         },5000)
       }catch(err){
        console.log(err);
       }finally{
        setLoading(false)
       }
    }

      useEffect(()=>{
            if(msg){
                const timer=setTimeout(()=>setMsg(""),3000)
                return ()=>clearTimeout(timer)
    
            }
        },[msg])

    return (
        <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-base-200'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    {msg&&(
                       <SuccessAlert success={msg}/>
                    )}
                    <h1 className='card-title'>Update Department</h1>
                  <form onSubmit={handleSubmit(handleupdate)} action="" className='space-y-4 mt-4'>
                     <label htmlFor="" className='label'>
                        <span className='label-text'>Department Name</span>
                     </label>
                     <input type="text" 
                     
                     defaultValue={value}
                     className='input input-bordered w-full'
                     {...register("name",{required:"This Field is required",
                           pattern: {
                        value: /^[A-Za-z\s-_]+$/, 
                        message: "Only letters are allowed"
                    }
                     })}
                     />
                     {errors.name&&(
                              <span className='label-text-alt text-error'>{errors.name.message}</span>    
                          )}
                     <button disabled={loading}  type='submit' className='btn btn-primary w-full'>{loading?"Updating":'Submit'}</button>
                  </form>
            </div>
           </div>
        </div>
    );
};

export default UpdateDepartment;