import  { useEffect, useState } from 'react';
import authApiClient from '../Services/auth-api-client';
import MakePayment from './MakePayment';

const CoursePurchase = () => {
    const [course,setCourse]=useState([])
    const [loading,setLoading]=useState(false)
       useEffect(() => {
    const checkPurchase = async () => {
      setLoading(true)
      try {
        const res = await authApiClient.get('/my-purchases/');
        setCourse(res.data)
      
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    };
    checkPurchase();
  }, []);
  

      if(loading){
          return (
             <div className='flex justify-center items-center py-10 min-h-screen'>
                        <span className="loading loading-spinner loading-xl text-secondary"></span>
                     </div>
          )
        }


    return (
        <div id="purchase-table" className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>SL.</th>
        <th>Course Name</th>
        <th>Purchase At</th>
        <th>Status</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      
     {course.map((crs,index)=>(
         <tr key={index}>
        <td>{index + 1}</td>
        <td>{crs.course_title}</td>
        <td> {new Date(crs.purchased_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
            })}
     </td>
        <td className={crs.status === 'PENDING' ? "badge badge-warning mt-4" : "badge badge-neutral mt-4"}>{crs.status}</td>
        <td>
            <MakePayment course={crs}/>
        </td>
      </tr>
     ))}
     
    </tbody>
  </table>
</div>
    );
};

export default CoursePurchase;