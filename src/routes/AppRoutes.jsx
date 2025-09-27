
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Activate from '../ActiveAccount/Activate';
import ForgotPassword from '../ActiveAccount/ForgotPassword';
import ConfirmForgotPassword from '../ActiveAccount/ConfirmForgotPassword';
import PrivateRoute from '../Private/PrivateRoute';
import DashboardLayout from '../Layouts/DashboardLayout';
import Course from '../pages/Course';
import Details from '../pages/Details';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import UpdateProfile from '../Profile/UpdateProfile';
import ChangePassword from '../Profile/ChangePassword';

import AddCourse from '../pages/AddCourse';
import AddDepartment from '../pages/AddDepartment';
import DepartmentList from '../pages/DepartmentList';
import UpdateDepartment from '../Create/Update/UpdateDepartment';
import User from '../pages/User';
import ChangeRole from '../User/ChangeRole';

const AppRoutes = () => {
    return (
        
            <Routes>
                <Route element={<MainLayout/>}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='login' element={<Login/>}/>
                  <Route path='register' element={<Register/>}/>
                  <Route path='activate/:uid/:token' element={<Activate/>}/>
                  <Route path='reset/password' element={<ForgotPassword/>} />
                  <Route path='password/reset/confirm/:uid/:token' element={<ConfirmForgotPassword/>}/>
                  
                </Route>
                   
                   <Route path='dashboard' element={<PrivateRoute>
                    <DashboardLayout/>
                   </PrivateRoute>}>
                   <Route index element={<Dashboard/>}></Route>
                  <Route path='course' element={<Course/>}></Route>
                  <Route path='course/:courseId' element={<Details/>}></Route>
                  <Route path='profile' element={<Profile/>} />
                  <Route path='update' element={<UpdateProfile/>} />
                  <Route path='password/change' element={<ChangePassword/>} />
                  <Route path='add/course' element={<AddCourse/>}/>
                  <Route path='department' element={<DepartmentList/>}/>
                  <Route path='add/department' element={<AddDepartment/>}/>
                  <Route path='update/:id' element={<UpdateDepartment/>}/>
                  <Route path='user' element={<User/>}/>
                  <Route path='change/role/:changeId' element={<ChangeRole/>} />
                   </Route>
                
            </Routes>
        
    );
};

export default AppRoutes;