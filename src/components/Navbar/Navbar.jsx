import style from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setLogin(!!token);
    };

    // Check token status
    checkToken();
  }, [location.pathname]);

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
            <li>
              <button className={style.btn} onClick={() => showDrower()}>
                تسجيل
              </button>
            </li>
            <li>تواصل معنا</li>
            <li>تعرف علينا</li>
            {login ? (
              <li onClick={() => navigate("/dashboard")}>لوحة التحكم </li>
            ) : (
              ""
            )}
            <li onClick={() => navigate("/")}>منتجاتنا</li>
          </ul>
        </nav>
        <div className={style.logo} onClick={() => navigate("/")}>
          <img src={Logo} alt="logo" />
        </div>
      </header>

      <div className={style.drawer} onClick={() => showDrower()}>
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
        {login ? (
          <button
            className={style.drawerBtn}
            onClick={() => navigate("/dashboard")}
          >
            لوحة التحكم{" "}
          </button>
        ) : (
          ""
        )}

        <button
          onClick={() => navigate("/register/user")}
          className={style.drawerBtn}
        >
          تسجيل كمستخدم
        </button>
      </div>
    </>
  );
}
