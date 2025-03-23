import style from "./DashboardManger.module.css";
import { useState, useEffect } from "react";
import axiosConfig from "../../../Config/axiosConfige";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 14,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16,
        },
      },
    },
  },
};
export default function DashboardManger() {
  const [dashboardStats, setDashboardStats] = useState([]);
  const [topMarkets, setTopMarkets] = useState([]);
  const [topRepresentatives, setTopRepresentatives] = useState([]);
  useEffect(() => {
    axiosConfig.get("/auth/manger/mangerDashboard").then((res) => {
      setDashboardStats(res.data.data.dashboardStats);
      setTopMarkets(res.data.data.topMarkets);
      setTopRepresentatives(res.data.data.topRepresentatives);
      console.log(res.data.data);
    });
  }, []);

  const statsChartData = {
    labels: ["المهام", "المتاجر", "المندوبين", "المنتجات"],
    datasets: [
      {
        label: "إحصائيات عامة",
        data: [
          dashboardStats.totalMissions,
          dashboardStats.totalMarkets,
          dashboardStats.totalRepresentatives,
          dashboardStats.totalProducts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

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
            <h2>عدد المندوبين</h2>
            <p>{dashboardStats.totalRepresentatives}</p>
          </div>
          <div className={style.statCard}>
            <h2>عددالمنتجات</h2>
            <p>{dashboardStats.totalProducts}</p>
          </div>
          <div className={style.statCard}>
            <h2>عدد المديرين</h2>
            <p>{dashboardStats.totalMangers}</p>
          </div>
          <div className={style.statCard}>
            <h2>عدد المتاجر</h2>
            <p>{dashboardStats.totalMarkets}</p>
          </div>
        </div>

        <div className={style.dashboardChart}>
          <h3>إحصائيات عامة</h3>
          <div style={{ height: "400px", width: "800px", margin: "auto" }}>
            <Bar data={statsChartData} options={options} />
          </div>

        </div>
        <div className={style.dashboardLists}>
          <div className={style.listCard}>
            <h3>أفضل المتاجر</h3>
            <ul>
              {topMarkets.map((market) => (
                <li key={market._id}>
                  <p>{market.name}</p>
                  <p>{market.missionCount}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.listCard}>
            <h3>أفضل المندوبين</h3>
            <ul>
              {topRepresentatives.map((representative) => (
                <li key={representative._id}>
                  <p>{representative.name}</p>
                  <p>{representative.missionCount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
