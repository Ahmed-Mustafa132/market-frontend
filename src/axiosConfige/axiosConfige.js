import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: 'https://market-backend-eight.vercel.app',
    headers: {
        "token": localStorage.getItem("token")

    }
    

});

export default axiosConfige ;
