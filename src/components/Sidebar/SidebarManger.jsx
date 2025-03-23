import { Link } from "react-router-dom";
import {
  FaUser,
  FaTasks,
  FaUserTie,
  FaUserCog,
  FaStore,
  FaHome,
} from "react-icons/fa";
import style from "./Sidebar.module.css";
export default function SidebarManger() {

  return (
    <section>
      <div className={style.sidebar}>
      <Link to="/Dashboard/manger">
        <div className={style.item}>
          <div className={style.icon}>
            <FaHome />
          </div>
          <p>الرئيسية</p>
        </div>
      </Link>

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
        <Link to={"/dashboard/manger/manger"}>
          <div className={style.item}>
            <div className={style.icon}>
              <FaUserCog />
            </div>
            <p> المديرين</p>
          </div>
        </Link>
        <Link to={"/dashboard/manger/market"}>
          <div className={style.item}>
            <div className={style.icon}>
              <FaStore />
            </div>
            <p> المتاجر </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
