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
    const [showdetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState([]);
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

  const deleteId = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف المندوب؟")) {
      axiosConfige
        .delete(`/auth/user/${id}`)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const viewDetails = async (id) => {
    try {
      axiosConfige.get(`/auth/user/${id}`).then((res) => {
        setDetails(res.data.data);
        setShowDetails(!showdetails);
      });
    } catch {
      setError(error.response.data.massage);
    }
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
                    <FaCheckSquare onClick={() => viewDetails(item._id)} />
                    <FaTrashAlt onClick={() => deleteId(item.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showdetails && (
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>تفاصيل المندوب</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المندوب</p>
                  <p>{details.name}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> البريد الالكتروني</p>
                  <p>{details.email}</p>
                </div>
              </div>
              <button onClick={() => setShowDetails(!showdetails)}>
                اغلاق
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
