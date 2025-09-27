import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../Services/api-client';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';

const ConfirmForgotPassword = () => {
    const {uid,token}=useParams()
    const navigate=useNavigate()
    const [msg,setMsg]=useState("")
    const [err,setErr]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const [showPassword1,setShowPassword1]=useState(false)
    const [disable,setDisable]=useState(false)


    const handleSubmit=async(e)=>{
        setDisable(true)
        e.preventDefault();
        setMsg("")
        setErr("")
        if (newPassword!=confirmPassword){
            setErr("Password do not match")
            return;
        }
        try{
         await apiClient.post("/auth/users/reset_password_confirm/",{
            uid,
            token,
            new_password:newPassword
         })
         setMsg("Password Reset Done. Redirecting...")
         setTimeout(()=>setMsg(""),3000)
         setTimeout(()=>navigate("/login"),5000)
        }catch(error){
         setErr(error.response.data.new_password.flat().join("\n"));
        }finally{
            setDisable(false)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen  bg-base-200'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    {msg&&(
                        <SuccessAlert success={msg}/>
                    )}
                    {err&&(
                        <ErrorAlert error={err}/>
                    )}
                  <h2 className='card-title text-2xl font-bold'>Forgot Password</h2>
                  <p className='text-base-content/70'>
                    Enter your new password
                  </p>
                  <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
                    <div className='form-control'>
                        <label className='label' htmlFor="password">
                            <span className='label-text'>New Password</span>
                        </label>
                        <div className='relative'>
                            <input
                             type={showPassword?"text":"password"}
                             id='newpassword'
                             placeholder='*********'
                             value={newPassword}
                             onChange={(e)=>setNewPassword(e.target.value)}
                             className='input input-bordered w-full'

                            />
                             <button
                            type='button'
                            className='absolute right-2 top-2 text-gray-500'
                            onClick={()=>setShowPassword(!showPassword)}
                           >
                            {showPassword?<FiEyeOff className='w-6 h-6'/>:<FiEye className='w-6 h-6'/>}

                           </button>

                        </div>

                    </div>
                    <div className='form-control'>
                        <label className='label' htmlFor="password">
                            <span className='label-text'>Confirm Password</span>
                        </label>
                        <div className='relative'>
                            <input
                              type={showPassword1?"text":"password"}
                             id='confirmpassword'
                             placeholder='*********'
                             value={confirmPassword}
                             onChange={(e)=>setConfirmPassword(e.target.value)}
                             className='input input-bordered w-full'

                            />
                           <button
                            type='button'
                            className='absolute right-2 top-2 text-gray-500'
                            onClick={()=>setShowPassword1(!showPassword1)}
                           >
                            {showPassword1?<FiEyeOff className='w-6 h-6'/>:<FiEye className='w-6 h-6'/>}

                           </button>
                        </div>

                    </div>
                       <button disabled={disable} type='submit' className='btn btn-primary w-full'>Reset Password</button>
                  </form>
                </div>

            </div>
            
        </div>
    );
};

export default ConfirmForgotPassword;