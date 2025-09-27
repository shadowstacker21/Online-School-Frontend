import React from 'react';
import CoursePurchase from '../Purchase/CoursePurchase';
import useAuthContext from '../hooks/useAuthContext';
import AdminDashBoard from '../Dashboard/AdminDashBoard/AdminDashBoard';

const Dashboard = () => {
    const {user}=useAuthContext()
    return (
        <div>
           {user.role==='student'&&(
             <CoursePurchase/>
           )}
           {user.role==='admin'&&(
            <AdminDashBoard/>
           )}
        </div>
    );
};

export default Dashboard;