import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import CreateCourse from '../Create/CreateCourse';

const AddCourse = () => {
    const {user}=useAuthContext()
    // const [loading,setLoading]=useState(false)
    return (
        <div>
              {(user.role==='admin' || user.role=='teacher') &&(
                          <CreateCourse/>

            ) }
        </div>
    );
};

export default AddCourse;