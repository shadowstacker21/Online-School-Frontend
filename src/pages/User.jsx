import React from 'react';
import UserList from '../User/UserList';
import useAuthContext from '../hooks/useAuthContext';

const User = () => {
    const {user}=useAuthContext()
    return (
        <div>
            {user.role==='admin'?<UserList/>:(
                <div className='text-3xl font-bold text-white bg-red-500'>You have No Permission</div>
            )}
        </div>
    );
};

export default User;