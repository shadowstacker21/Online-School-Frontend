import  {  useState } from 'react';
import authApiClient from '../Services/auth-api-client';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';



const Enroll = ({course,setMessage}) => {
     const {user}=useAuthContext()
     const navigate = useNavigate();
      const [enrolling, setEnrolling] = useState(false);
     
     



    const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    setMessage("");
    try {
      await authApiClient.post(`/courses/${course.id}/purchases/`);
    
      
      setMessage("Successfully Enrolled!");
      navigate('/dashboard')
    } catch (err) {
      
      if (err.response && err.response.data) {
        setMessage(err.response.data);
       
      } else {
        setMessage(" Something went wrong.");
      }
    } finally {
      setEnrolling(false);
    }
    
  };
    return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-center">
            <button className="text-sm text-gray-500">Enroll Now</button>
            <p className="text-2xl font-extrabold text-green-600 mt-2">{course.price} tk</p>
            <p className="text-xs text-gray-400 mt-1">One-time payment</p>


            <button className= "mt-6 hover:cursor-pointer hover:bg-gray-800 w-full py-3 rounded-md  text-white bg-black  font-medium hover:opacity-95  disabled:bg-gray-400 disabled:cursor-not-allowed "
            onClick={handleEnroll}
            disabled={enrolling || user.role!=='student'}
            >{user.role==='student'?"Enroll Now":"Manage Course"}</button>
            <button className="mt-3 w-full py-2 hover:cursor-pointer rounded-md border border-gray-200 text-gray-700">Add to Wishlist</button>


            <p className="text-xs text-gray-400 mt-4">30-day money-back guarantee</p>
            </div>
            </div>
    );
};

export default Enroll;