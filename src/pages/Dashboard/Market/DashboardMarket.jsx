import style from "../DashboardManger.module.css";
import { useState, useEffect } from "react";
import axiosConfig from "../../../Config/axiosConfige";

export default function DashboardMarket() {
  const [dashboardStats, setDashboardStats] = useState([]);

  useEffect(() => {
    axiosConfig.get("/auth/manger/mangerDashboard").then((res) => {
      setDashboardStats(res.data.data.dashboardStats);
      console.log(res.data.data);
    });
  }, []);



  return (
    <main>
      <section>
        <div className={style.dashboardStats}>
          <div className={style.statCard}>
            <h2>إجمالي الأرباح</h2>
            <p>5644</p>
          </div>
          <div className={style.statCard}>
            <h2>كل المهام</h2>
            <p>{dashboardStats.totalMissions}</p>
          </div>
          <div className={style.statCard}>
            <h2>عدد المنتجات </h2>
            <p>{dashboardStats.totalRepresentatives}</p>
          </div>
          <div className={style.statCard}>
            <h2> عددالمنتجات المباعة</h2>
            <p>{dashboardStats.totalProducts}</p>
          </div>
          <div className={style.statCard}>
            <h2>عدد العملاء </h2>
            <p>{dashboardStats.totalMangers}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
