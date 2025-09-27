import React, { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
     const [showPassword,setShowPassword]=useState(false)
     const {changePassword,errorMsg,successMsg}=useAuthContext()
     const navigate=useNavigate()
       const {
         register,
         handleSubmit,
         formState: { errors },watch,} = useForm();
   const onSubmit=async(data)=>{
         try{
            await changePassword({
                current_password:data.current_password,
                new_password:data.new_password
            })
            navigate('dashboard/profile')
         }catch(error){
            console.log(error);
         }
       }
    return (
            <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-base-200'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    {errorMsg&&(
                        <ErrorAlert error={errorMsg}/>
                    )}
                    {successMsg&&(
                        <SuccessAlert success={successMsg}/>
                    )}
            {/* Current Password */}
            <h1 className='card-title'>Change Password</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
                <label htmlFor="" className="label">Current Password</label>
                <div className="relative">
                    <input 
                    type={showPassword?"text":"password"}
                    className="input input-bordered bg-base-200 w-full pr-10"
                   
                    {...register("current_password",{
                        required:"Current Password is required"
                    })}
                    
                    />
                </div>
                {errors.current_password &&(
                    <p className="text-red-500 text-sm mt-1">
                        {errors.current_password.message}
                    </p>
                )}
            </div>
            {/* New Password */}
             <div className="form-control">
                <label htmlFor="" className="label">New Password</label>
                <div className="relative">
                    <input 
                    type={showPassword?"text":"password"}
                    className="input input-bordered bg-base-200 w-full pr-10"
                   
                    {...register("new_password",{
                        required:"New Password is required",
                        minLength:{
                            value:8,
                            message:"Password must be at least 8 characters"
                        }
                    })}
                    
                    />
                </div>
                {errors.new_password &&(
                    <p className="text-red-500 text-sm mt-1">
                        {errors.new_password.message}
                    </p>
                )}
            </div>
            {/* Confirm Password */}
             <div className="form-control">
                <label htmlFor="" className="label">Confirm New Password</label>
                <div className="relative">
                    <input 
                    type={showPassword?"text":"password"}
                    className="input input-bordered bg-base-200 w-full pr-10"
                   
                    {...register("confirm_password",{
                        validate:(value)=>
                            value === watch("new_password") || "Password do not match"
                    })}
                    
                    />
                </div>
                {errors.confirm_password &&(
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirm_password.message}
                    </p>
                )}
            </div>
            {/* Show Password Checkbox */}
         
                <div className="form-control">
                    <label htmlFor="" className="label cursor-pointer">
                        <span className="labeel-text">Show Password</span>
                        <input type="checkbox" className="toggle" checked={showPassword} onChange={()=>setShowPassword(!showPassword)}/>
                    </label>
                    

                </div>
                <button
    
        type="submit"
        className="btn btn-primary w-full mt-4"
      >
        Change Password
      </button>
           </form>
        </div>
     </div>
        </div>
    );
};

export default ChangePassword;