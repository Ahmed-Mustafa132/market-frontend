import axios from "axios";

const API_URL = "https://market-backend-wheat.vercel.app/auth/user/google"; 

export const loginWithGoogle = async (token) => {
    const { data } = await axios.post(API_URL, { token });
    localStorage.setItem("token", data.token); 
    return data.user;
};