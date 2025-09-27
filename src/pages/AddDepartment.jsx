import React from 'react';
import CreateDepartment from '../Create/CreateDepartment';
import useAuthContext from '../hooks/useAuthContext';

const AddDepartment = () => {
    const {user}=useAuthContext()
    return (
        <div>
            {user.role==='admin'?(
                <CreateDepartment/>
            ):
            <div className='text-2xl text-white font-bold bg-red-500'>You have no permission</div>
            }
            
        </div>
    );
};

export default AddDepartment;