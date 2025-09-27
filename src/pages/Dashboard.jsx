import React from 'react';
import CoursePurchase from '../Purchase/CoursePurchase';
import useAuthContext from '../hooks/useAuthContext';
import AdminDashBoard from '../Dashboard/AdminDashBoard/AdminDashBoard';
import TeacherDashBoard from '../Dashboard/TeacherDashboard/TeacherDashBoard';

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
           {user.role==='teacher'&&(
             <TeacherDashBoard/>
           )}
        </div>
    );
};

export default Dashboard;