import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("token")}`
    }
});
export default axiosConfige;
