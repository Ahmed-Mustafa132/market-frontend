import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: 'https://market-backend-wheat.vercel.app',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
    }
});
export default axiosConfige;
