import React, { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import SuccessAlert from "../Alert/SuccessAlert";
import ErrorAlert from "../Alert/ErrorAlert";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const [disable,setDisable]=useState(false)
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userProfileUpdate, errorMsg, successMsg, user } = useAuthContext();


  const onSubmit = async (data) => {
    setDisable(true)
    try {
     
      await userProfileUpdate(data); 
      navigate('/dashboard/profile')
    } catch (error) {
      console.error("Update failed:", error);
    }finally{
        setDisable(false)
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-base-200'>
            <div className='card w-full max-w-md bg-base-100 shadow-xl'>
                {successMsg&&(
                    <SuccessAlert success={successMsg}/>
                )}
                {errorMsg&&(
                    <ErrorAlert error={errorMsg}/>
                )}
                <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     

              <div className="form-control flex flex-col items-center">
            
            {user?.profile_picture && (
               <div className="avatar">
                <div className="w-24 rounded-xl">
                 <img
                src={user.profile_picture} 
                alt="Profile"
                className=" w-24 h-24 rounded-full object-cover mb-2"
                />
               </div>
               </div>
            )}
           
            </div>


      <div className="form-control">
        <label className="label">First Name</label>
        <input
          type="text"
          defaultValue={user?.first_name}
          className="input input-bordered bg-base-200 w-full"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500">{errors.first_name.message}</p>
        )}
      </div>

     
      <div className="form-control">
        <label className="label">Last Name</label>
        <input
          type="text"
          defaultValue={user?.last_name}
          className="input input-bordered bg-base-200 w-full"
          {...register("last_name")}
        />
      </div>

     
      <div className="form-control">
        <label className="label">Email Address</label>
        <input
          type="email"
          defaultValue={user?.email}
          disabled
          className="input input-bordered bg-base-200 w-full"
          {...register("email")}
        />
      </div>

     
      <div className="form-control">
        <label className="label">Address</label>
        <input
          type="text"
          defaultValue={user?.address}
          className="input input-bordered bg-base-200 w-full"
          {...register("address")}
        />
      </div>

     
      <div className="form-control">
        <label className="label">Phone Number</label>
        <input
          type="number"
          defaultValue={user?.phone_number}
          className="input input-bordered bg-base-200 w-full"
          {...register("phone_number")}
        />
      </div>


     
      <button
      disabled={disable}
        type="submit"
        className="btn btn-primary w-full mt-4"
      >
        Save Changes
      </button>
    </form>
    </div>
    </div>
    </div>
  );
};

export default UpdateProfile;
