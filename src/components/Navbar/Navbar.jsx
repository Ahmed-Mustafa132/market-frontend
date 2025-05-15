import style from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "../../Context/AuthContext";


export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showDrower = () => {
    const drower = document.querySelector(`.${style.drawer}`);
    drower.classList.toggle(style.show);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className={style.menuIcon} onClick={toggleMenu}>
          <IoMenu />
        </div>
        <nav>
          <ul className={isMenuOpen ? style.active : ""}>
            {isAuthenticated ? (
              ""
            ) : (
              <li>
                <button className={style.btn} onClick={() => showDrower()}>
                  تسجيل
                </button>
              </li>
            )}
            <li>تواصل معنا</li>
            <li>تعرف علينا</li>
            {isAuthenticated && user !== "user" && (
              <li onClick={() => navigate("/dashboard")}>لوحة التحكم </li>
            )}
            {isAuthenticated ? (
              <li onClick={() => logout()}>تسجيل الخروج</li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div className={style.logo} onClick={() => navigate("/")}>
          <img src={Logo} alt="logo" />
        </div>
      </header>

      <div className={style.drawer} onClick={() => showDrower()}>
        <div>
          <h1>ليس لدي حساب</h1>
          <button
            onClick={() => navigate("/register/representative")}
            className={style.drawerBtn}
          >
            تسجيل كمندوب
          </button>
          <button
            onClick={() => navigate("/register/market")}
            className={style.drawerBtn}
          >
            تسجيل كمتجر
          </button>

          <button
            onClick={() => navigate("/register/user")}
            className={style.drawerBtn}
          >
            تسجيل كمستخدم
          </button>
        </div>
        <div>
          <h1>لدي حساب بالفعل</h1>
          <button
            onClick={() => navigate("/login/representative")}
            className={style.drawerBtn}
          >
            تسجيل كمندوب
          </button>
          <button
            onClick={() => navigate("/login/market")}
            className={style.drawerBtn}
          >
            تسجيل كمتجر
          </button>

          <button
            onClick={() => navigate("/login/user")}
            className={style.drawerBtn}
          >
            تسجيل كمستخدم
          </button>
        </div>
      </div>
    </>
  );
}
