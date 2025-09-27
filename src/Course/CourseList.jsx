import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const CourseList = ({course}) => {
    
    const {user}=useAuthContext();
   

    
    return (
      
         <Link to={`/dashboard/course/${course.id}`}>
         
              <div  className="card  bg-base-100 w-96  h-96 shadow-sm">
        <figure className="px-10 pt-10">
            <img
            src={course.image}
            alt={course.title}
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{course.title}</h2>
           
            
            <p className="text-sm font-semibold">{course.dept_name}</p>
            <p className="font-bold text-red-900">{course.price} tk</p>
            <div className="card-actions">
            <button className="btn btn-primary">{user.role==='student'?"Enroll Now":"Manage Course"}</button>
            </div>
        </div>
        </div>
         </Link>
          
           
        
        
    );
};

export default CourseList;