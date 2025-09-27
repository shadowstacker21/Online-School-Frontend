import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useAuthContext()
    if (loading) return <p>Loading...</p>
    return user ? children : <Navigate to='/login' replace></Navigate>
};

export default PrivateRoute;