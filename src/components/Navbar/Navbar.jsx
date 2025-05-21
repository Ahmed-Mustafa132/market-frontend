import style from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "../../Context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const showDrower = () => {
    const drower = document.querySelector(`.${style.drawer}`);
    drower.classList.toggle(style.show);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (path, action) => {
    // Only close menu if on mobile
    if (isMobile) {
      setIsMenuOpen(false);
    }

    // Navigate if path provided
    if (path) {
      navigate(path);
    }

    // Execute action if provided
    if (action) {
      action();
    }
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
                <button className={style.btn} onClick={showDrower}>
                  تسجيل
                </button>
              </li>
            )}
            <li onClick={() => handleNavItemClick("/contactUS")}>تواصل معنا</li>
            <li onClick={() => handleNavItemClick("/about-us")}>تعرف علينا</li>
            {isAuthenticated && user !== "user" && (
              <li onClick={() => handleNavItemClick("/dashboard")}>
                لوحة التحكم{" "}
              </li>
            )}
            {isAuthenticated ? (
              <li onClick={() => handleNavItemClick(null, logout)}>
                تسجيل الخروج
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div className={style.logo} onClick={() => navigate("/")}>
          <img src={Logo} alt="logo" />
        </div>
      </header>

      <div className={style.drawer} onClick={showDrower}>
        <div>
          <h1>ليس لدي حساب</h1>
          <button
            onClick={() => handleNavItemClick("/register/representative")}
            className={style.drawerBtn}
          >
            تسجيل كمندوب
          </button>
          <button
            onClick={() => handleNavItemClick("/register/market")}
            className={style.drawerBtn}
          >
            تسجيل كمتجر
          </button>

          <button
            onClick={() => handleNavItemClick("/register/user")}
            className={style.drawerBtn}
          >
            تسجيل كمستخدم
          </button>
        </div>
        <div>
          <h1>لدي حساب بالفعل</h1>
          <button
            onClick={() => handleNavItemClick("/login/representative")}
            className={style.drawerBtn}
          >
            تسجيل كمندوب
          </button>
          <button
            onClick={() => handleNavItemClick("/login/market")}
            className={style.drawerBtn}
          >
            تسجيل كمتجر
          </button>

          <button
            onClick={() => handleNavItemClick("/login/user")}
            className={style.drawerBtn}
          >
            تسجيل كمستخدم
          </button>
        </div>
      </div>
    </>
  );
}
