import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardMangerUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/user")
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

  const handelsearch = () => {
    if (search == "") setSearch(undefined);
    axiosConfige
      .get(`/auth/user/searsh/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.massage);
      });
  };

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
            <input
              type="text"
              placeholder="بحث "
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <label htmlFor="search" onClick={() => handelsearch()}>
              <p>يحث</p>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>المستخدم </th>
              <th> التفاعلات</th>
              <th>حجم المشتريات</th>
              <th>تقرير المشتريات</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              {
                console.log(item);
              }
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>
                    <button className="tableBtn">انشاء تقرير مبيعات</button>
                  </td>
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
