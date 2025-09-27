import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const {errorMsg,successMsg,loginUser}=useAuthContext()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const onSubmit =async(data)=>{
        setLoading(true)
        try{
           const res = await loginUser(data)
           if(res.success) navigate("/dashboard")
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false)
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
                     <h1 className='card-title text-2xl font-bold'>Sign in</h1>
                     <p className='text-base-content/70'>
                        Enter your email and password to access account
                     </p>
                     <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-control'>
                            <label htmlFor="email" className='label'>
                                <span className='label-text'>Email</span>
                            </label>
                            <input type="email" 
                            id='email'
                            placeholder='name@gmail.com'
                            className='input input-bordered w-full'
                            {...register("email",{required:"Email is required"})}
                            />
                          {errors.email&&(
                              <span className='label-text-alt text-error'>{errors.email.message}</span>    
                          )}
                        </div>
                        <div className='form-control'>
                            <label htmlFor="password" className='label'>
                                <span className='label-text'>Password</span>
                            </label>
                            <input type="password" 
                            id='password'
                            placeholder='********'
                            className='input input-bordered w-full'
                            {...register("password",{required:"Password is required"})}
                            />
                          {errors.password&&(
                              <span className='label-text-alt text-error'>{errors.password.message}</span>    
                          )}
                        </div>
                        <button type='submit'
                        disabled={loading}
                         className='btn btn-primary w-full mt-4'>
                            {loading?"Login in...":"Login"}
                            </button>
                     </form>
                    <Link to='/reset/password' className='link link-primary font-semibold'>Forgot Password?</Link>
                    <div className='text-center mt-4'>
                        <p className='text-base-content/70'>
                             Don&apos;t have an account?{""}
                             <Link to='/register' className='link link-primary'>Sign up</Link>
                        </p>

                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default Login;