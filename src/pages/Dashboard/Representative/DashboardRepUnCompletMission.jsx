import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



export default function DashboardRepUnCompletMission() {
  const [data, setData] = useState([]);
      const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
      axiosConfige
        .get("/mission/state/false")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data);
          setLoading(false);
        });
    
  }, []);
  const viewMission = async (id) => {
    // axiosConfige.get(`/mission/${id}`).then((res)=>{
    //     setMissionData(res.data)
    // })
    // showMission()
    console.log(id);
  };

  if (loading) return <LoadingSpinner />
  if (error) return <h1 style={{textAlign:"center"}}>{error.massage}</h1>;  
  return (
    <main>
      <section>
        <div className="search">
          <div className="searchInput">
            <input type="text" placeholder="بحث " name="search" />
            <label htmlFor="search">
              <CiSearch />
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>المدير</th>
              <th>المتجر</th>
              <th>عدد المنتجات</th>
              <th>الاجراء</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              const totalQuantity = data.products.reduce((acc, current) => {
                return acc + current.quantity;
              }, 0);
              return (
                <tr key={data.id}>
                  <td>{data.manger}</td>
                  <td>{data.market}</td>
                  <td>{totalQuantity}</td>
                  <td className={style.icon}>
                    <FaCheckSquare onClick={() => viewMission(data)} />
                    <FaTrashAlt onClick={() => deleteMission(data.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <div className={style.viewMission}></div>
    </main>
  );
}

