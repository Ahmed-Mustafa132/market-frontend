import { useState } from "react";
import Style from "../Login/Login.module.css";
import { Link,useNavigate } from "react-router-dom";
import axiosConfige from "../../Config/axiosConfige";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../Config/authConfig";



export default function Login() {
  const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
  }); 
    

    const handelSubmit = async (e) => {
        e.preventDefault();
      console.log(user);
      if (user.password != user.confirmPassword) {
        setError(true)
      }
        try {
            setLoading(true);
            const res = await axiosConfige.post("/auth/user/register", user);
            console.log(res);
            setLoading(false);
          setError(null);
          
        } catch (err) {
            setLoading(false);
            setError(err.response.data.message);
        }
    };

    return (
      <div className={Style.container}>
        <div className={Style.formContainer}>
          <h1>تسجيل الدخول</h1>
          <p>{ error && "تاكد من صحة البيانات"}</p>
          <form>
            <label htmlFor="name">الاسم</label>
            <input type="text" id="name" onChange={(e) => setUser({...user,name:e.target.value})} />
            <label htmlFor="email"> البريد الاكتروني</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="البريد الإلكتروني"
            />
            <label htmlFor="password"> كلمة السر </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="كلمة المرور"
            />
            <label htmlFor="confirmPassword">اعد كتابة كلمة السر</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="اعد كتابة كلمة المرور"
            />
            <button
              type="button"
              className={Style.submitBtn}
              onClick={handelSubmit}
            >
              {loading ? "جاري التسجيل ... " : "تسجيل الدخول"}
            </button>
          </form>
          <Link>
            {" "}
            <p>هل نسيت كلمة السر؟</p>
          </Link>
          <div className={Style.orDivider}>
            <span>أو</span>
          </div>
          {/* <div className={Style.btns}>
            <GoogleOAuthProvider clientId="1015142731368-v92q279f20boeaiomgve2s6psoh7nogj.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await loginWithGoogle(
                      credentialResponse.credential
                    );
                    setUser(res);
                    navigate('/dashboard')
                    console.log(res)
                  } catch (error) {
                    console.error("Login Failed:", error);
                  }
                }}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>
          </div> */}
          <Link to={"/login/user"}>ليس لدي حساب</Link>
        </div>
      </div>
    );
}
