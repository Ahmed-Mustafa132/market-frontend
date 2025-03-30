import style from "../DashboardManger.module.css";
import { useState, useEffect } from "react";
import axiosConfig from "../../../Config/axiosConfige";



export default function DashboardManger() {
  const [dashboardStats, setDashboardStats] = useState([]);
  useEffect(() => {
    axiosConfig.get("/auth/representative/dashboard").then((res) => {
      setDashboardStats(res.data.data.dashboardStats);
      setTopMarkets(res.data.data.topMarkets);
      setTopRepresentatives(res.data.data.topRepresentatives);
      console.log(res.data.data);
    });
  }, []);


  return (
    <main>
      <section>
        <div className={style.dashboardStats}>
          <div className={style.statCard}>
            <h2>صافي الارباح </h2>
            <p>5644</p>
          </div>
          <div className={style.statCard}>
            <h2>المنتجات المباعة </h2>
            <p>25</p>
          </div>
          <div className={style.statCard}>
            <h2> العملاء</h2>
            <p>10</p>
          </div>
          <div className={style.statCard}>
            <h2>المهام الغير مكتملة</h2>
            <p>{dashboardStats.pendingMissions}</p>
          </div>
          <div className={style.statCard}>
            <h2> المهام المكتملة</h2>
            <p>{dashboardStats.completedMissions}</p>
          </div>
          <div className={style.statCard}>
            <h2>كل المهام</h2>
            <p>{dashboardStats.totalMissions}</p>
          </div>
        </div>  
      </section>
    </main>
  );
}
