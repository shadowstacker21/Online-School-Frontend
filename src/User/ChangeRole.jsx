import  { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authApiClient from '../Services/auth-api-client';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import { FaArrowLeft } from 'react-icons/fa';

const ChangeRole = () => {
  const {changeId}=useParams()
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false)
  const [load,setLoad]=useState(false)

  useEffect(()=>{
      const fetchUser = async () => {
        setLoad(true)
      try {
        const res = await authApiClient.get(`/user/${changeId}/`);
        setRole(res.data.role);
      } catch (err) {
        setError("User Load Failed",err);
      }finally{
        setLoad(false)
      }
    };
    fetchUser();
  },[changeId])

  const handleRoleChange=async(e)=>{
    e.preventDefault();
    setMsg("")
    setError("")
    setLoading(true)
    try{
       const res= await authApiClient.put(`/user/${changeId}/change_role`,{role})
        setMsg(res.data.message)
        setTimeout(()=>{
            navigate("/dashboard/user")
        },3000)
    }catch(err){
        setError("Role Update Failed",err)
    }finally{
        setLoading(false)
    }

  }

  useEffect(()=>{
    if(msg||error){
        const timer=setTimeout(()=>setMsg("")||setError(""),2000)
        return ()=>clearInterval(timer)
    }
  },[msg,error])


   if(load){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }


    return (
         <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 bg-base-200">
        
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {msg && <SuccessAlert success={msg} />}
          {error && <ErrorAlert error={error} />}
          <h1 className="card-title">Change Role</h1>
          <form onSubmit={handleRoleChange} className="space-y-4 mt-4">
            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              value={role}
              defaultValue={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <button disabled={loading} type="submit" className="btn btn-primary w-full">
              Update Role
            </button>
          </form>
        </div>
      </div>
      <div className='mt-4 '>
         <Link 
            to='/dashboard/user'
            className='flex items-center text-sm text-base-content/70
            hover:text-base-content transition-colors'>
             
              <FaArrowLeft className='mr-2 h-4 w-4'/>
              Back to Users
            </Link>
      </div>
    </div>
    );
};

export default ChangeRole;