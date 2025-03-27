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

export default function SidebarRep() {

  return (
    <section>
      <div className={style.sidebar}>
        <div className={style.item}>
          <div className={style.icon}>
            <FaHome />
          </div>
          <p>الرئيسية</p>
        </div>

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

        <div className={style.item}>
          <div className={style.icon}>
            <FaUsers />
          </div>
          <p>العملاء</p>
        </div>
        <Link to="/dashboard/market/products">
        <div className={style.item}>
          <div className={style.icon}>
            <FaShoppingCart />
          </div>
          <p> المنتجات</p>
        </div>
        </Link>
      </div>
    </section>
  );
}
