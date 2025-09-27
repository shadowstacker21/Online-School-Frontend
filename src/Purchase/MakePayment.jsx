import React, { useState } from 'react';
import authApiClient from '../Services/auth-api-client';

const MakePayment = ({course}) => {
   
   
    const[loading,setLoading]=useState(false)

     const handlePayment=async()=>{
        setLoading(true)
        try{
          const response = await authApiClient.post("/payment/initiate/",{
            amount:course.course_price,
            purchase_id:course.id
            
        })
        
        if (response.data.payment_url){
            setLoading(false)
            window.location.href = response.data.payment_url
        }else{
            alert("Payment Failed")
        }
        }catch(error){
            console.log(error);
        }
    }
  
    return (
        <div>
          <button
          onClick={handlePayment}
            className={`px-3 py-1 rounded font-medium ${
                course.status === 'PENDING'
                ? 'btn btn-secondary '
                : 'bg-gary-500 text-black cursor-not-allowed hover:bg-green-600'
            }`}
            disabled={course.status !== 'PENDING' ||loading} 
            >
            {course.status === 'PENDING' ? "Payment Now" : "Payment Success"}
     </button>
        </div>
    );
};

export default MakePayment;