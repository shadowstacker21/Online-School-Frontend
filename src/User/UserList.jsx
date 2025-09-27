import  { useEffect, useState } from 'react';
import authApiClient from '../Services/auth-api-client';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';

const UserList = () => {
    const [user,setUser]=useState([]);
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState("")
    const [msg,setMsg]=useState("")
    useEffect(()=>{
     const fetchUser = async () => {
        setLoading(true)
      try {
        const res = await authApiClient.get("/user/");
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };

    fetchUser();
    },[])

    if(loading){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }

    return (
       <div className="overflow-x-auto">
        {err&&(
          <ErrorAlert error={err}/>
        )}
        {msg&&(
          <SuccessAlert success={msg}/>
        )}
  <table className="table table-xs table-zebra">
    <thead>
      <tr>
        <th>SL No.</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>Role</th>
        <th>Change Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {user.map((u,index)=>(
             <tr key={index}>
        <th>{index+1}</th>
        <td>{u.email}</td>
        <td>{u.first_name}</td>
        <td>{u.last_name}</td>
        <td>{u.phone_number}</td>
        <td>{u.address}</td>
        <td className='capitalize'>{u.role}</td>
        <td>
            <Link to={`/dashboard/change/role/${u.id}`} className='btn btn-xs btn-primary text-white'>
                Change Role
            </Link>
            </td>
            <td>
              <DeleteUser setErr={setErr} setMsg={setMsg} id={u.id}/>
            </td>
      </tr>
        ))}
     
    </tbody>
 
  </table>
</div>
    );
};

export default UserList;