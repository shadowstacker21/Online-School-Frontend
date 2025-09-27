import axios from "axios";

const authApiClient = axios.create({
    baseURL:"https://online-school-management-system-nine.vercel.app/api/v1"
})

authApiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("authTokens")
        if(token){
            config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)

export default authApiClient