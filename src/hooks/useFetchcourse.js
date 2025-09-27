
import { useEffect, useState } from 'react';
import authApiClient from '../Services/auth-api-client';

const useFetchcourse = (searchquery, filterdept,currentPage) => {
    const [courses,setCourses]=useState([])
    const [loading,setLoading]=useState(false)
    const [totalPages,setTotalPages]=useState(0)


    useEffect(()=>{
        const fetchCourses=async()=>{
           
            setLoading(true)
            let url = `/courses/?search=${searchquery}&page=${currentPage}&page_size=10`
             if (filterdept) {
                    url += `&department__name=${encodeURIComponent(filterdept)}`;
                }
            try{
                const response = await authApiClient.get(url)
                const data = await response.data
                setCourses(data.results)
                setTotalPages(Math.ceil(data.count/10))
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        fetchCourses();
    },[searchquery,filterdept,currentPage])


    return {courses,loading,totalPages}
       
};

export default useFetchcourse;