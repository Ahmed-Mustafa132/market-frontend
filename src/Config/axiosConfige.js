import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("token")}`
    }
});
export default axiosConfige;
