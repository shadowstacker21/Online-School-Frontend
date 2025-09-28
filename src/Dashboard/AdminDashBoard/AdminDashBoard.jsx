import { BsCurrencyDollar } from "react-icons/bs";
import TopStat from "./TopStat";
import { FiShoppingCart } from "react-icons/fi";
import { PiChartLineUpLight, PiShoppingCartThin } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import GraphData from "./GraphData";
import TopORMost from "./TopORMost";
import { useEffect, useState } from "react";
import authApiClient from "../../Services/auth-api-client";


const AdminDashBoard = () => {
  const [loading,setLoading]=useState(false)
  const [info,setInfo]=useState({})

  useEffect(()=>{
    setLoading(true)
   
        authApiClient.get("/admin-dashboard/")
            .then((res)=>{
              
                setInfo(res.data)
            }).catch((err)=>{
                console.log(err);
            }).finally(()=>{
                setLoading(false)
            })
  },[])



   if(loading){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }

    return (
     <div className="p-6 space-y-6 text-black bg-gradient-to-r from-blue-600/10 to-purple-600/10 min-h-screen">
        <h1 className="text-3xl font-bold">Course Analytics</h1>
        <p className="text-gray-400">Monitor your course performance and student engagement</p>
        
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TopStat icon1={FiShoppingCart} icon2={PiChartLineUpLight} title="Weekly Purchase" value={info.purchase_last_week} growth="12.5"/>
        <TopStat icon1={PiShoppingCartThin} icon2={PiChartLineUpLight} title="Monthly Purchase" value={info.purchase_last_month} growth="17.%"/>
        <TopStat icon1={BsCurrencyDollar} icon2={PiChartLineUpLight} title="Current Month Sale" value={info?.Sales?.total_revenue} growth={info?.Sales?.sales_growth_percent}/>
        <TopStat icon1={TbUsers} icon2={PiChartLineUpLight} title="Active Students" value={info?.active_users} growth="41.5"/>
       </div>

       {/* Chart or Graph Section */}
       <div className="flex flex-col gap-6 space-y-6  ">
          <GraphData info={ info }/>
     </div>
     {/* Top Purchase Course and Student */}
     <div className="mt-6">
        <TopORMost topCourse={info?.most_purchased_course} topStudent={info?.most_buy_student}/>
     </div>
     </div>

    );
};

export default AdminDashBoard;