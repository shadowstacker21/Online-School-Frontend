import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import authApiClient from '../Services/auth-api-client';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';
import useAuthContext from '../hooks/useAuthContext';

const CreateCourse = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
   
    const [error,setError]=useState("")
    const [msg,setMsg]=useState("")
    const [Department,setDepartment]=useState([])
    const [teacher,setTeacher]=useState([])
    const navigate=useNavigate()
    const {user}=useAuthContext();

    useEffect(()=>{
      authApiClient.get("/user/")
      .then((res)=>{
          const teacherList = res.data.filter(user => user.role === 'teacher');
            setTeacher(teacherList);
      }).catch(err=>{
        console.log(err);
      })
 
    },[])
 console.log(teacher);

    useEffect(()=>{
      authApiClient.get("/departments/")
      .then((res)=>{
        setDepartment(res.data)
    })
    },[]);
      useEffect(() => {
    if (error||msg) {
        const timer = setTimeout(() => setError("")||setMsg(""), 3000);
        return () => clearTimeout(timer);
        }
    }, [error,msg]);
    const onSubmit = async(data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("department", data.department);
   
    if(data.image && data.image[0]) formData.append("image", data.image[0]);
    if(data.teacher) formData.append("teacher",data.teacher)
        
    
    try {
        const res = await authApiClient.post("/courses/", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(res.data);
        setMsg("Course Created Successfully")
        setTimeout(() => {
            navigate("/dashboard/course");
        }, 5000);
    } catch(error) {
        setError(error);
    }
}
    return (
      <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-base-200'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    {msg&&(
                        <SuccessAlert success={msg}/>
                    )}
                       {error&&(
                        <ErrorAlert error={error}/>
                       )}
                    <h1 className='card-title text-2xl font-bold'>Add New Course</h1>
                   <form action="" onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                     <div className='form-control'>
                            <label htmlFor="title" className='label'>
                                <span className='label-text'>Title</span>
                            </label>
                            <input type="text" 
                            id='title'
                            placeholder='Title'
                            className='input input-bordered w-full'
                            {...register("title",{required:"Title is required"})}
                            />
                          {errors.title&&(
                              <span className='label-text-alt text-error'>{errors.title.message}</span>    
                          )}
                        </div>
                        <div className='form-control'>
                            <label htmlFor="description" className='label'>
                                <span className='label-text'>Description</span>
                            </label>
                            <textarea type="text" 
                            id='description'
                            placeholder='Description'
                            className='textarea textarea-bordered w-full'
                            {...register("description",{required:"Description is required"})}
                            />
                            {errors.description&&(
                                <span className='label-text-alt text-error'>{errors.description.message}</span>    
                            )}

                        </div>

                        <div className='form-control'>
                          <label htmlFor="price" className='label'>
                            <span className='label-text'>Price</span>

                          </label>
                            <input 
                                
                                className="input input-bordered w-full"
                                placeholder="Price"
                                type="text"
                                {...register("price",{required:true,validate:(value)=>{
                                const parsedValue=parseFloat(value)
                                return !isNaN(parsedValue)
                                }})}
                                ></input>
                                {errors.price&& errors.price.type==="required"&&(
                                    <p className="text-red-500 text-xs">This field is required</p>
                                )}
                                {errors.price&& errors.price.type==="validate"&&(
                                    <p className="text-red-500 text-xs">Please Enter a Valid number</p>
                                )}
                        </div>

                        {/* Choose Department */}
                        <div className='form-control'>
                             <label htmlFor="price" className='label'>
                            <span className='label-text'>Department</span>

                          </label>
                           <select
                          {...register("department",{required:true})}
                          className="select select-bordered w-full"
                       >
                       <option value="">Select a Department</option>
                      {Department.map((dep)=>(
                        <option key={dep.id} value={dep.id}>
                            {dep.name}
                        </option>
                    ))}

                </select>
                {errors.department&&(
                    <p className="text-red-500 text-xs">This field is required</p>
                   )}
                        </div> 

                   {user.role==='admin'&&(
                      <div className='form-control'>
                             <label htmlFor="price" className='label'>
                            <span className='label-text'>Department</span>
                          </label>
                          <select 
                          {...register("teacher",{required:true})}
                          className='select slect-bordered w-full'
                          >
                            <option value="">Select Teacher</option>
                            {teacher.map((teach)=>(
                                <option key={teach.id} value={teach.id}>
                                    {teach.first_name} {teach.last_name}
                                </option>
                            ))}

                          </select>
                           {errors.teacher&&(
                                <p className="text-red-500 text-xs">This field is required</p>
                            )}
                      </div>   
                   )}     



                 <div className='form-control'>
                    <h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
                  <input
                type="file"
                {...register("image")}  
                accept="image/*"
                className="file-input file-input-bordered w-full"
                />
                     
                </div>       
                     <button type='submit' className='btn btn-primary w-full'>Submit</button>
                   </form>
                 </div>
            </div>
        </div>            
    );
};

export default CreateCourse;