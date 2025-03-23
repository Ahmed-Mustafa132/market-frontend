import { useEffect, useState } from "react";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardMangerMission() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      axiosConfige
        .get("/mission/manger")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data.massage);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const deleteMission = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف المهمة؟")) {
      axiosConfige
        .delete(`/mission/${id}`)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(id);
  };
  const viewMission = async (id) => {
    
    // axiosConfige.get(`/mission/${id}`).then((res)=>{
    //     setMissionData(res.data)
    // })
    // showMission()
    console.log(id);
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
        <div className="search">
          <div className="searchInput">
            <input type="text" placeholder="بحث " name="search" />
            <label htmlFor="search">
             <p>بحث</p>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>المدير</th>
              <th>المندوب</th>
              <th>المتجر</th>
              <th>عدد المنتجات</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              let totalQuantity = 0;
              item.products.map((acc) => {
                totalQuantity = totalQuantity + acc.quantity;
              });

              return (
                <tr key={item.id}>
                  <td>{item.manger}</td>
                  <td>{item.representative}</td>
                  <td>{item.market}</td>
                  <td>{totalQuantity}</td>
                  <td className={style.icon}>
                    <FaCheckSquare onClick={() => viewMission(item.id)} />
                    <FaTrashAlt onClick={() => deleteMission(item.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
