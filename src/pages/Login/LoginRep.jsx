import { useEffect, useState } from "react";
import Style from "./Login.module.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axiosConfige from "../../axiosConfige/axiosConfige";
export default function LoginRep() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axiosConfige.post("/user/representative/login", user);
      setError(null);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.formContainer}>
        <h1>تسجيل الدخول</h1>
        {error && (
          <p>{error && "البريد الإلكتروني أو كلمة المرور غير صالحة"}</p>
        )}
        <form>
          <label htmlFor="email">البريد الالكتروني</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="البريد الإلكتروني"
            id="email"
          />
          <label htmlFor="password">كلمة السر</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="كلمة المرور"
            id="password"
          />
          <button
            type="button"
            className={Style.submitBtn}
            onClick={handelSubmit}
          >
            تسجيل الدخول
          </button>
        </form>
        <Link>
          {" "}
          <p>هل نسيت كلمة السر؟</p>
        </Link>
        <div className={Style.orDivider}>
          <span>أو</span>
        </div>
        <Link to={"/register/representative"}>
          <p>ليس لدي حساب</p>
        </Link>
      </div>
    </div>
  );
}
