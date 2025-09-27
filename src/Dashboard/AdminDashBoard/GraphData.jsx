import React from 'react';
import { CartesianGrid,ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Legend } from "recharts";
const GraphData = ({ info }) => {


  const purchaseData = [
    { name: "Last Week", purchases: info.purchase_last_week || 0 },
    { name: "Last Month", purchases: info.purchase_last_month || 0 },
  ];

  // Prepare sales data
  const salesData = [
    { name: "Previous Month", sales: info.Sales?.previous_month_sale || 0 },
    { name: "Current Month", sales: info.Sales?.current_month_sale || 0 },
  ];

  // Revenue overview including total revenue
  const revenueData = [
    { name: "Previous Month", revenue: info.Sales?.previous_month_sale || 0 },
    { name: "Current Month", revenue: info.Sales?.current_month_sale || 0 },
    { name: "Total Revenue", revenue: info.Sales?.total_revenue || 0 },
  ];


    return (
             <div>
             <div className="flex flex-col md:flex-row lg:flex-row">
             <h2>Purchase Counts</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={purchaseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="purchases" fill="black" />
        </BarChart>
      </ResponsiveContainer>


      <h2>Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Bar dataKey="sales" fill="black" />
        </BarChart>
      </ResponsiveContainer>

     
  </div>

 
      <h2>Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="revenue" fill="black" />
        </BarChart>
      </ResponsiveContainer>


 

             </div>

    );
};

export default GraphData;