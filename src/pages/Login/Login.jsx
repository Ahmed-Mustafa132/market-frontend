import { useState } from "react";
import Style from "./Login.module.css";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import axiosConfige from "../../axiosConfige/axiosConfige";


export default function Login() {
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

        const res = await axiosConfige.post("/user", user)
        console.log(res)
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
                    <button type="button" onClick={handelSubmit}>
                        تسجيل الدخول
                    </button>
                </form>
                <div className={Style.orDivider}>
                    <span>أو</span>
                </div>
                <div className={Style.btns}>

                <button>
                    تسجيل الدخول باستخدام جوجل
                    <FaGoogle />
                </button>
                <button>
                    تسجيل الدخول باستخدام فيسبوك
                    <FaFacebook />
                </button>
                </div>
                <p>ليس لدي حساب</p>

            </div>
        </div>
    );
}
