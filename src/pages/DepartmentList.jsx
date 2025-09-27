import Department from '../Create/Department'
import useAuthContext from '../hooks/useAuthContext';

const DepartmentList = () => {
    const {user}=useAuthContext()
    return (
        <div>
           {(user.role === 'admin' || user.role === 'teacher') ? (
       <Department/>
      ) : (
        <div className="text-2xl text-white font-bold bg-red-500 p-4 rounded">
          You have no permission
        </div>
      )}
           
        </div>
    );
};

export default DepartmentList;