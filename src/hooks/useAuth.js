import { useEffect, useState } from "react"
import apiClient from "../Services/api-client"


const useAuth=()=>{
  const [user,setUser]=useState(null)
  const [errorMsg,setErrorMsg]=useState("")
  const [successMsg,setSuccessMsg]=useState("")
  const [loading,setloading]=useState(true)
  
   useEffect(() => {
    if (errorMsg||successMsg) {
        const timer = setTimeout(() => setErrorMsg("")||setSuccessMsg(""), 3000);
        return () => clearTimeout(timer);
        }
    }, [errorMsg,successMsg]);

   const getToken = () =>{
      const token = localStorage.getItem("authTokens")
      return token?JSON.parse(token):null
   }

   const [authTokens,setAuthtokens] = useState(getToken())
   
    useEffect(()=>{
        if(authTokens?.access){
        fetchUserProfile(authTokens.access);
        }else {
    setUser(null);
    setloading(false)
  }
    },[authTokens])
   
   const handleApiError = (error,defaultMsg="Something went wrong! Try Again")=>{
      if (error.response && error.response.data){
         const errorMsg=Object.values(error.response.data)
         setErrorMsg(errorMsg)
         return {success:false,message:errorMsg}

      }
      setErrorMsg(defaultMsg)
      return{
         success:false,
         message:defaultMsg
      }
   }
   // Refresh token
   const refreshToken = async () => {
  try {
    const res = await apiClient.post("/auth/jwt/refresh/", {
      refresh: authTokens?.refresh,
    });
    const newTokens = {
      access: res.data.access,
      refresh: authTokens.refresh,
    };
    setAuthtokens(newTokens);
    localStorage.setItem("authTokens", JSON.stringify(newTokens));
    return newTokens.access;
  } catch (err) {
    console.log("Refresh token expired", err);
    logout(() => window.location.replace("/login"));
    return null;
  }
};

   //Fetch Profile means everytime login exception logout
  const fetchUserProfile = async (token) => {
  setloading(true);
  try {
    const res = await apiClient.get("/auth/users/me/", {
      headers: { Authorization: `JWT ${token}` },
    });
    setUser(res.data);
  } catch (error) {
    console.log("Access token failed, trying refresh...",error);
    const newAccess = await refreshToken();
    if (newAccess) {
      try {
        const res = await apiClient.get("/auth/users/me/", {
          headers: { Authorization: `JWT ${newAccess}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log("User fetch failed after refresh", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  } finally {
    setloading(false);
  }
};


   //login user
   const loginUser = async(userData)=>{
      setErrorMsg("");
     try{
         const response =  await apiClient.post("/auth/jwt/create/",userData)
      setAuthtokens(response.data)
      localStorage.setItem("authTokens",JSON.stringify(response.data))
      await fetchUserProfile(response.data.access)
      setSuccessMsg("Login Successfully")
      return {success:true}
     }catch(error){
        console.log(error);
        setErrorMsg(error.response.data?.detail)
        return {success:false}
     }
   }
   // Register User
   const registerUser = async(userData)=>{
      setErrorMsg("")
      try{
        const res = await apiClient.post("/auth/users/",userData,
            {
      headers: { "Content-Type": "multipart/form-data" },
      })
         return {success:true,data:res.data,message:"Registration Successfully. Please check your email to activate your account. Redirecting..."}
      }catch(error){
         return handleApiError(error,"Registration Failed! Try Again")
      }
   }
   // Logout user
   const logout=(navigate)=>{
     setAuthtokens(null)
     setUser(null)
     localStorage.removeItem("authTokens")
      if (typeof navigate === "function") {
      navigate("/login");
   } else {
      window.location.replace("/login");
   }
   }
  //  Update User
  const userProfileUpdate=async(data)=>{
    setErrorMsg("")
    try{
       await apiClient.patch("/auth/users/me/",data,{
          headers:{
            Authorization:`JWT ${authTokens?.access}`
          }
        })
       fetchUserProfile()
       return { success: true };
    }catch(error){
      return handleApiError(error)
    }
  }
  // Password Change
      const changePassword= async(data)=>{
        setErrorMsg("");
        try{
          await apiClient.post("auth/users/set_password/",data,{headers:{
                Authorization:`JWT ${authTokens?.access}`
            }})
            setSuccessMsg("Password Change Successfully!")
            
        }catch(error){
            return handleApiError(error)
        }

    }


   return {user,loading,errorMsg,setErrorMsg,successMsg,loginUser,userProfileUpdate,registerUser,logout,changePassword}
}
export default useAuth;