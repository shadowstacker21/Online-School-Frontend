import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import authApiClient from '../Services/auth-api-client';

const DeleteUser = ({id,setErr,setMsg}) => {
       const getToken = () =>{
          const token = localStorage.getItem("authTokens")
          return token?JSON.parse(token):null
       }
    
       const [authTokens,setAuthtokens] = useState(getToken())
       
   const handleDelete = async () => {
    try {
      const res = await authApiClient.delete(`/auth/users/${id}/`, {
     
        headers: {
    "Content-Type": "application/json",
    "Authorization": `JWT ${authTokens.access}`
  }
});
      console.log(res.data);
      setMsg("User Deleted Successfully");
    } catch (error) {
      console.error(error);
     
      if (error.response) {
        setErr(error.response.data?.detail || "Failed to delete the user");
      } else {
        setErr("Network error. Please try again.");
      }
    }
  };
    return (
        <div>
           <button onClick={handleDelete}><RiDeleteBin7Fill className='w-6 h-6 cursor-pointer text-red-500'/></button>
        </div>
    );
};

export default DeleteUser;