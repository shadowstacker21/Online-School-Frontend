import React, { useState } from 'react';
import authApiClient from '../Services/auth-api-client';
import { MdDelete } from 'react-icons/md';

const DeleteUser = ({id,setErr,setMsg,  fetchUser}) => {

  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
    if (!password) {
      setErr("Please enter your current password");
      return;
    }
     if (!password) {
      setErr("Please enter your current password");
      return;
    }

    setLoading(true);
    try {
      await authApiClient.delete(`/auth/users/${id}/`, {
     
        data: {
          current_password: password,
        },
      });

     
      setMsg("User Deleted Successfully");
      fetchUser()
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErr(
          error.response.data?.detail ||
            JSON.stringify(error.response.data)
        );
      } else {
        setErr("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
    return (
        <div>
      {!showInput ? (
        <button onClick={() => setShowInput(true)}>
          <MdDelete className="w-6 h-6 cursor-pointer text-red-500" />
        </button>
      ) : (
        <div className="mt-2 p-3 border rounded bg-gray-50 w-64">
          <input
            type="password"
            placeholder="Enter current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      )}
    </div>
    );
};

export default DeleteUser;