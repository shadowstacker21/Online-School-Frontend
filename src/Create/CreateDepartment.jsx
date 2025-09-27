import  {  useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import authApiClient from '../Services/auth-api-client';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';

const CreateDepartment = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [disable,setDisable]=useState(false)
    const [msg,setMsg]=useState("")
    const navigate=useNavigate()


 

    const handleCreateDepartment=async(data)=>{
        setDisable(true)
        try{
            await authApiClient.post("/departments/",data)
            setMsg("Department Created Successfully")
            setTimeout(()=>{
                navigate("/dashboard/department")
            },4000)
        }catch(err){
            console.log(err);
        }finally{
            setDisable(false)
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
                    <h1 className='card-title'>Create Department</h1>
                  <form onSubmit={handleSubmit(handleCreateDepartment)} action="" className='space-y-4 mt-4'>
                     <label htmlFor="" className='label'>
                        <span className='label-text'>Department Name</span>
                     </label>
                     <input type="text" 
                     placeholder='dept_name'
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
                     <button disabled={disable} type='submit' className='btn btn-primary w-full'>Submit</button>
                  </form>
            </div>
           </div>
        </div>
    );
};

export default CreateDepartment;