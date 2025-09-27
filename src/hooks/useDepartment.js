import { useEffect, useState } from "react"
import authApiClient from "../Services/auth-api-client"

const useDepartment =()=>{
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        authApiClient.get('/departments/')
        .then(res=>setCategories(res.data))
    },[])
    return categories;
}
export default useDepartment;