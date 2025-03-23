import { useState } from "react";
import Style from "./Login.module.css";
import { Link } from "react-router-dom";

import axiosConfige from "../../Config/axiosConfige";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../Config/authConfig";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);
      const res = await axiosConfige.post("/auth/user/login", user);
        localStorage.setItem("token", res.data.token);
        
      setLoading(false);
      setSuccess(true);
      setError(null);
      navigate("/Dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      setSuccess(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (success) return <div>Success: {success}</div>;
  return (
    <div className={Style.container}>
      <div className={Style.formContainer}>
        <h1>تسجيل الدخول</h1>
        <form>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="البريد الإلكتروني"
          />
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="كلمة المرور"
          />
          <Link>
            {" "}
            <p>هل نسيت كلمة السر؟</p>
          </Link>
          <button
            type="button"
            className={Style.submitBtn}
            onClick={handelSubmit}
          >
            تسجيل الدخول
          </button>
        </form>
        <div className={Style.orDivider}>
          <span>أو</span>
        </div>
        <div className={Style.btns}>
          <GoogleOAuthProvider clientId="1015142731368-v92q279f20boeaiomgve2s6psoh7nogj.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await loginWithGoogle(
                    credentialResponse.credential
                  );
                  setUser(res);
                  navigate("/dashboard");
                  console.log(res);
                } catch (error) {
                  console.error("Login Failed:", error);
                }
              }}
              onError={() => console.log("Login Failed")}
            />
          </GoogleOAuthProvider>
        </div>
        <Link to={"/register/user"}>ليس لدي حساب</Link>
      </div>
    </div>
  );
}
