import  { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import apiClient from '../Services/api-client';

const Register = () => {
    const {register,handleSubmit,formState:{errors},setValue,watch}=useForm()
    const {registerUser,errorMsg,setErrorMsg}=useAuthContext()
    const [Msg,setMsg]=useState("")
    const [scsMsg,setScsMsg]=useState("")
    const [err,setErr]=useState("")
    const [registeredEmail,setRegisteredEmail]=useState(null)
    const [disable,setDisable]=useState(false)
    const [isdisable,setIsDisable]=useState(false)
    const [count,setCount]=useState(0)
    // const navigate=useNavigate()
    useEffect(() => {
    if (errorMsg) {
        const timer = setTimeout(() => setErrorMsg(""), 3000);
        return () => clearTimeout(timer);
        }
    }, [err,errorMsg]);

    useEffect(() => {
        if (scsMsg) {
            const timer = setTimeout(() => setScsMsg(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [scsMsg]);

    const onSubmit=async(data)=>{
       
        delete data.confirm_password
          const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("address", data.address);
        formData.append("phone_number", data.phone_number);
        formData.append("profile_picture", data.profile_picture[0]);
        setDisable(true)
        try{
            const response = await registerUser(formData)
           
            if(response.success){
                setScsMsg(response.message)
                setRegisteredEmail(response.data.email)
               
                
            }
            //  setTimeout(() => {
            //     navigate('/login');
            //     }, 10000);
        }catch(error){
            console.log("Registration Failed",error);
        }finally{
            setDisable(false)
        }
    }


    const resendCode=async()=>{
        
        if(!registeredEmail){
            return;
        }
        setMsg("")
        setErr("")
        setIsDisable(true)
        setCount(15)
        try{
            await apiClient.post("/auth/users/resend_activation/",{email:registeredEmail})
            setMsg("Activation email resend successfully. Please check your email")
        }catch(error){
            setErr("Failed to resend activation mail. Try Again")
            console.log(error.response?.data||error.message);
        }
    }

    useEffect(()=>{
        if(count===0){
            setIsDisable(false)
            return
        }
        const timer=setInterval(()=>{
            setCount(prev=>prev-1)
        },1000)
        return ()=>clearInterval(timer)
    },[count])


    return (
        <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-base-200'>
           <div className='card w-full max-w-md bg-base-100 shadow-xl'>
            <div className='card-body'>
                {errorMsg&&(
                    <ErrorAlert error={errorMsg}/>
                )}
                {scsMsg&&(
                    <SuccessAlert success={scsMsg}/>
                )}
                {err&&(
                    <ErrorAlert error={err}/>
                )}
                {Msg&&(
                    <SuccessAlert success={Msg}/>
                )}
                <h1 className='card-title text-2xl font-bold'>Sign up</h1>
                <p className='text-base-content/70'>
                    Create an account to get started
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>First Name</span>
                       </label>
                       <input
                        type="text"
                        id='first_name'
                        placeholder='john'
                        className='input input-bordered w-full' 
                        {...register('first_name',{required:"This field is required"})}
                       />
                       {errors.first_name&&(
                         <span className='label-text-alt text-error'>{errors.first_name.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Last Name</span>
                       </label>
                       <input
                        type="text"
                        id='last_name'
                        placeholder='doe'
                        className='input input-bordered w-full' 
                        {...register('last_name',{required:"This field is required"})}
                       />
                        {errors.last_name&&(
                         <span className='label-text-alt text-error'>{errors.last_name.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Email</span>
                       </label>
                       <input
                        type="email"
                        id='email'
                        placeholder='name@gmail.com'
                        className='input input-bordered w-full' 
                        {...register('email',{required:"This field is required"})}
                       />
                        {errors.email&&(
                         <span className='label-text-alt text-error'>{errors.email.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Password</span>
                       </label>
                       <input
                        type="password"
                        id='password'
                        placeholder='******'
                        className='input input-bordered w-full' 
                        {...register('password',{required:"This field is required",minLength:{
                            value:8,
                            message:"Password must be at least 8 characters"
                        }})}
                       />
                        {errors.password&&(
                         <span className='label-text-alt text-error'>{errors.password.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Confirm Password</span>
                       </label>
                       <input
                        type="password"
                        id='confirm_password'
                        placeholder='******'
                        className='input input-bordered w-full' 
                        {...register('confirm_password',{required:"This field is required",
                            validate:(value)=>value===watch("password")||"Password do not match"
                        })}
                       />
                        {errors.confirm_password&&(
                         <span className='label-text-alt text-error'>{errors.confirm_password.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Address</span>
                       </label>
                       <input
                        type="text"
                        id='address'
                        placeholder='7/B Sirajganj'
                        className='input input-bordered w-full' 
                        {...register('address',{required:"This field is required"})}
                       />
                        {errors.address&&(
                         <span className='label-text-alt text-error'>{errors.address.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Phone Number</span>
                       </label>
                       <input
                        type="number"
                        id='number'
                        placeholder='017********'
                        className='input input-bordered w-full' 
                        {...register('phone_number',{required:"This field is required"})}
                       />
                        {errors.phone_number&&(
                         <span className='label-text-alt text-error'>{errors.phone_number.message}</span>
                       )}
                    </div>
                    <div className='form-control'>
                       <label htmlFor='' className='label'>
                        <span className='label-text'>Image</span>
                       </label>
                       <input 
                       type="file"
                      
                       accept="image/*"
                       className="file-input file-input-bordered w-full" 
                        {...register('profile_picture',{
                            required:"This field is required",})}
                        
                     />
                      {errors.profile_picture&&(
                         <span className='label-text-alt text-error'>{errors.profile_picture.message}</span>
                       )}
                    </div>
                    <button disabled={disable} type='submit' className='btn btn-primary w-full'>Sign up</button>
                </form>
                     <button
                    onClick={resendCode}
                    disabled={!registeredEmail || isdisable}
                    
                    className='link link-primary font-semibold' >
                       {isdisable?`Resend in ${count}s`:"Resend Code"}
                        </button>
                <div className='text-center mt-4'>
                    <p className='text-base-content/70'>
                        Already have an account?{" "}
                        <Link to='/login' className='link link-primary'>
                           Sign in
                        </Link>
                    </p>
                </div>

            </div>

            </div> 
        </div>
    );
};

export default Register;