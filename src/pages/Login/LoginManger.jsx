import { useState } from "react";
import Style from "./Login.module.css";
import axiosConfige from "../../Config/axiosConfige";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manger, setManger] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(manger);
    try {
      setLoading(true);
      const res = await axiosConfige.post("/auth/manger/login", manger);
            localStorage.setItem("token", res.data.token);
      console.log(res);
      setLoading(false);
    
      setError(null);
      navigate("/dashboard")
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.formContainer}>
        <h1>تسجيل الدخول</h1>
        {error && <p className={Style.error}>{error}</p>}
        <form>
          <input
            type="text"
            onChange={(e) => setManger({ ...manger, email: e.target.value })}
            placeholder="البريد الإلكتروني"
          />
          <input
            type="password"
            onChange={(e) => setManger({ ...manger, password: e.target.value })}
            placeholder="كلمة المرور"
          />
          <button
            type="button"
            className={Style.submitBtn}
            onClick={handelSubmit}
            >
            {loading ? "جاري التسجيل" : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
