import style from "../DashboardManger.module.css";
import { useState, useEffect } from "react";
import axiosConfig from "../../../Config/axiosConfige";

export default function DashboardManger() {
  const [dashboardStats, setDashboardStats] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
    
      axiosConfig.get("/auth/market/dashboard").then((res) => {
        setDashboardStats(res.data.data);
        console.log(res.data.data);
      });
    } catch (error) { 
      setError(error.response.data.message);
    }
  }, []);
  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <main>
      <section>
        <div className={style.dashboardStats}>
          <div className={style.statCard}>
            <h2> اجمالي المستحقات</h2>
            <p>{dashboardStats.accounts}</p>
          </div>
          <div className={style.statCard}>
            <h2> الطلبات</h2>
            <p>{dashboardStats.orders}</p>
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
