import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTimesCircle, FaEye } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardRepUnCompletMission() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
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

  const handleSearch = () => {
    axiosConfige
      .get(`/mission/search/false?search=${search}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const viewDetails = async (id) => {
    try {
      axiosConfige.get(`/mission/${id}`).then((res) => {
        setDetails(res.data.data[0]);
        setShowDetails(!showdetails);
      });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const rejectedMission = (id) => {
    if (window.confirm("هل انت متاكد من رفض المهمة")) {
      try {
        axiosConfige.patch(`/mission/${id}/approved`).then((res) => {
          setData(data.filter((item) => item.id !== id));
        });
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <main>
        <h1 style={{ textAlign: "center" }}>{error.massage}</h1>
      </main>
    );
  
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
            <label htmlFor="search" onClick={() => handleSearch()}>
              <p>بحث</p>
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
                    <FaEye onClick={() => viewDetails(data.id)} />
                    <FaTimesCircle onClick={() => rejectedMission(data.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showdetails && (
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>تفاصيل المهمة</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المتجر</p>
                  <p>{details.market}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> اسم المدير</p>
                  <p>{details.manger}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> اسم لمندوب</p>
                  <p>{details.representative}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> الحالة</p>
                  <p>{details.complete ? "مكتملة" : "تحت التنفيذ"}</p>
                </div>

                <div className={style.detailsItemList}>
                  <p> المنتجات </p>
                  <ul>
                    {details.products.map((item) => {
                      return (
                        <li key={item.product.id}>
                          <p>{item.product.title}</p>
                          <p>{item.quantity}</p>
                        </li>
                      );
                    })}
                  </ul>
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
