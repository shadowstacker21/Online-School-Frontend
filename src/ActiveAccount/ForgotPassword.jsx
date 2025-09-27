import React, { useEffect, useState } from 'react';
import apiClient from '../Services/api-client';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';

const ForgotPassword = () => {
    const [scsMsg,setScsMsg]=useState("")
    const [err,setErr]=useState("")
    const [email,setEmail]=useState(null)
    const [count,setCount]=useState(0)
    const [disable,setDisable]=useState(false)

    const sendMail=async(e)=>{
        e.preventDefault()
        setScsMsg("")
        setErr("")
        setDisable(true)
        setCount(15)
        try{
           await apiClient.post("/auth/users/reset_password/",{email:email})
           setScsMsg("Reset Password sent your email.Please check")
           setTimeout(()=>setScsMsg("",5000))
        }catch(error){
            if(error){
                setErr(error.response.data?.email[0])
            }else{
                setErr("Password reset failed. Please Try again")

            }
            setDisable(false)
            setTimeout(()=>setErr("",5000))
        }
    }

    useEffect(()=>{
        if(count===0){
            setDisable(false)
        }
        const timer = setInterval(()=>{
            setCount(prev=>prev-1)
        },1000)
        return ()=>clearInterval(timer)
    },[count])

    return (
        <div className='flex min-h-screen items-center px-4 py-12 bg-base-200 justify-center'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    {scsMsg&&(
                        <SuccessAlert success={scsMsg}/>
                    )}
                    {err&&(
                        <ErrorAlert error={err}/>
                    )}
                    <h2 className='card-title text-2xl font-bold'>Forgotn Password</h2>
                    <p className='text-base-content/70'>
                        Enter email to forgot your password
                    </p>
                    <form className='space-y-4 mt-4'>
                        <div className='form-control'>
                            <label className='label' htmlFor="email">
                               <span className='label-text'>Email</span>
                            </label>
                            <input
                             type="email"
                             id='email'
                             placeholder='name@gmail.com'
                             className='input input-bordered w-full'
                             value={email}
                             onChange={(e)=>setEmail(e.target.value)}

                            />

                        </div>
                        <button disabled={disable} type='submit' onClick={sendMail} className='btn btn-primary w-full'>{disable?`Resend in ${count}s`:"Send Mail"}</button>

                    </form>

                </div>

            </div>
            
        </div>
    );
};

export default ForgotPassword;