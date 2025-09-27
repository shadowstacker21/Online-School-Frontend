import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import Filter from './Filter';
import useFetchcourse from '../hooks/useFetchcourse';
import useDepartment from '../hooks/useDepartment';
import Pagination from './Pagination';

const Coursepage = () => {
     const [searchquery,setSearchQuery]=useState("")
     const [filterdept,setfilterdept] = useState("")
     const [currentPage,setCurrentPage]=useState(1)
    const {courses,loading,totalPages}=useFetchcourse(searchquery,filterdept,currentPage)
    const department=useDepartment()

     useEffect(() => {
    setCurrentPage(1);
  }, [searchquery, filterdept]);
    if(loading){
        return (
            <div className='flex justify-center items-center py-10 min-h-screen'>
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                 </div>
        )
    }
    console.log(courses);
    return (
        <div>
            <Filter 
            searchquery={searchquery}
            handleSearchQuery={setSearchQuery}
            departments={department}
            filterdept={filterdept}
            handleFilter={setfilterdept}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {courses.map((course,index)=>(
                <CourseList key={index} course={course} loading={loading}/>
            ))}
            </div>
            <Pagination totalPages={totalPages} 
            currentPage={currentPage}
             handleSetPage={setCurrentPage} />
        </div>
    );
};

export default Coursepage;