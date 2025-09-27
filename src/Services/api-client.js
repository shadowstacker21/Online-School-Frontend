import axios from "axios";

const apiClient = axios.create({
    baseURL:"https://online-school-management-system-nine.vercel.app/api/v1"
})
export default apiClient