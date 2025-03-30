import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUsers,
  FaHourglassHalf,
  FaCheckSquare,
  FaBell,
  FaHome,
} from "react-icons/fa";
import style from "./Sidebar.module.css";
import SidebarWrapper from "./SidebarWrapper";

export default function SidebarMarket() {
  return (
    <SidebarWrapper>
      <Link to={"/dashboard/market"}>
        <div className={style.item}>
          <div className={style.icon}>
            <FaHome />
          </div>
          <p>الرئيسية</p>
        </div>
      </Link>

      <Link to="/Dashboard/market/massages">
        <div className={style.item}>
          <div className={style.icon}>
            <FaBell />
          </div>
          <p>التنبيهات</p>
        </div>
      </Link>

      <Link to="/dashboard/market/completmission">
        <div className={style.item}>
          <div className={style.icon}>
            <FaCheckSquare />
          </div>
          <p>المهام المكتملة</p>
        </div>
      </Link>

      <Link to="/dashboard/market/uncompletmission">
        <div className={style.item}>
          <div className={style.icon}>
            <FaHourglassHalf />
          </div>
          <p>المهمام الجارية</p>
        </div>
      </Link>
      <Link to="/dashboard/market/clients">
      <div className={style.item}>
        <div className={style.icon}>
          <FaUsers />
        </div>
        <p>العملاء</p>
      </div>
</Link>
      <Link to="/dashboard/market/products">
        <div className={style.item}>
          <div className={style.icon}>
            <FaShoppingCart />
          </div>
          <p> المنتجات</p>
        </div>
      </Link>
    </SidebarWrapper>
  );
}
