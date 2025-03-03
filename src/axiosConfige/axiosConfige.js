import axios from 'axios';

const axiosConfige = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "token": localStorage.getItem("token")

    }
    

});

export default axiosConfige ;