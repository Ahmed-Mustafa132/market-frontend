import axios from "axios";

const API_URL = "http://localhost:3000/auth/user/google"; // عدّل الرابط حسب سيرفرك

export const loginWithGoogle = async (token) => {
    const { data } = await axios.post(API_URL, { token });
    localStorage.setItem("token", data.token); // حفظ الـ JWT
    return data.user;
};