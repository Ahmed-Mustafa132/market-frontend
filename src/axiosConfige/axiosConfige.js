import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: 'https://market-backend-eight.vercel.app',
    headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
});

export default axiosConfige ;
