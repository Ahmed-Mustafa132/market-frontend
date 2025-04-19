import { Link } from "react-router-dom";
import {
  FaUser,
  FaTasks,
  FaUserTie,
  FaUserCog,
  FaStore,
  FaHome,
  FaBox,FaShoppingBag 
} from "react-icons/fa";
import style from "./Sidebar.module.css";
import SidebarWrapper from "./SidebarWrapper";
import { useAuth } from "../../Context/AuthContext";

export default function SidebarManger() {
    const { isAuthenticated, user } = useAuth();
 
  return (
    <SidebarWrapper>
      {isAuthenticated && user === "admin" && (
        <Link to="/Dashboard/manger">
          <div className={style.item}>
            <div className={style.icon}>
              <FaHome />
            </div>
            <p>الرئيسية</p>
          </div>
        </Link>
      )}

      <Link to="/Dashboard/manger/mission">
        <div className={style.item}>
          <div className={style.icon}>
            <FaTasks />
          </div>
          <p> المهام</p>
        </div>
      </Link>

      <Link to="/dashboard/manger/representative">
        <div className={style.item}>
          <div className={style.icon}>
            <FaUserTie />
          </div>
          <p> المندوبين </p>
        </div>
      </Link>

      <Link to="/dashboard/manger/users">
        <div className={style.item}>
          <div className={style.icon}>
            <FaUser />
          </div>
          <p> المستخدمين</p>
        </div>
      </Link>
      {isAuthenticated && user === "admin" && (
        <Link to={"/dashboard/manger/manger"}>
          <div className={style.item}>
            <div className={style.icon}>
              <FaUserCog />
            </div>
            <p> المديرين</p>
          </div>
        </Link>
      )}

      <Link to={"/dashboard/manger/market"}>
        <div className={style.item}>
          <div className={style.icon}>
            <FaStore />
          </div>
          <p> المتاجر </p>
        </div>
      </Link>
      <Link to={"/dashboard/manger/orders"}>
        <div className={style.item}>
          <div className={style.icon}>
            <FaBox />
          </div>
          <p> الطلبات </p>
        </div>
      </Link>
      {isAuthenticated && user === "admin" && (
        <Link to={"/dashboard/manger/products"}>
          <div className={style.item}>
            <div className={style.icon}>
              <FaShoppingBag />
            </div>
            <p> المنتجات</p>
          </div>
        </Link>
      )}
    </SidebarWrapper>
  );
}
