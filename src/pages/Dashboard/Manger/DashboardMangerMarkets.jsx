import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";


export default function DashboardMangerMarkets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
 const [search, setSearch] = useState(undefined);
  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/market")
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
        .get(`/auth/market/searsh/${search}`)
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
    if (window.confirm("هل أنت متأكد من حذف هذا  المتجر")) {
      axiosConfige
        .delete(`/auth/market/${id}`)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {});
    }
  };
  const viewDetails = async (id) => {
    axiosConfige.get(`/auth/market/${id}`).then((res) => {
      console.log(res.data.data); 
      setDetails(res.data.data);
      setShowDetails(!showdetails);
    });
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
              <p>بحث</p>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>المتجر </th>
              <th> المهام</th>
              <th>حجم المبيعات</th>
              <th> حسابات و ارصدة </th>
              <th>انشاء تقرير</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.missions}</td>
                  <td>{item.totleSales}</td>
                  <td>
                    <button className="tableBtn">حسابات و ارصدة</button>
                  </td>
                  <td>
                    <button className="tableBtn">انشاء تقرير </button>
                  </td>
                  <td className={style.icon}>
                    <FaCheckSquare onClick={() => viewDetails(item.id)} />
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
              <h1>تفاصيل المتجر</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المتجر</p>
                  <p>{details.name}</p>
                </div>
                <div className={style.detailsItem}>
                  <p>رقم الهاتف</p>
                  <p>{details.phone}</p>
                </div>
                <div className={style.detailsItem}>
                  <p>البريد الإلكتروني</p>
                  <p>{details.email}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> السجل التجاري </p>
                  <img src={details.BusinessRecords} alt="img" />
                </div>
                <div className={style.detailsItem}>
                  <p>البطاقة الضريبية </p>
                  <img src={details.taxID} alt="img" />
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
