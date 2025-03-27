import { useEffect, useState } from "react";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardMangerMission() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [showAddMission, setShowAddMission] = useState(false);
  const [mission,setMissoin] = useState({
    title: "",
    description: "",
    market_id: "",
    representative_id: "",
  });

  useEffect(() => {
    try {
      axiosConfige
        .get("/mission/manger")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const deleteId = async (id) => {
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
  };
  const getCompletMission = async () => {
    axiosConfige
      .get("/mission/manger/state/true")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };
  const getUnCompletMission = async () => {
    axiosConfige
      .get("/mission/manger/state/false")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };
  const viewDetails = async (id) => {
    try {
      
      axiosConfige.get(`/mission/${id}`).then((res) => {
        setDetails(res.data.data[0]);
        setShowDetails(!showdetails);
      });
    } catch {
      setError(error)
      console.log(error)
    }
  };
  const addMission = async () => {
  setShowAddMission(!showAddMission);
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => getCompletMission()}> مهام مكتملة</button>
          <button onClick={() => getUnCompletMission()}>
            مهام تحت التنفيذ
          </button>
          <button onClick={() => addMission()}> اضافة مهمة </button>
          <button> انشاء تقرير </button>
        </div>
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
                      console.log(item);
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
        {showAddMission && (
          <div className={style.addMission}>
            <div className={style.addMissionContainer}>
              <h1>اضافة مهمة</h1>
              <form>
                <div className={style.addMissionItem}>
                  <label htmlFor="market"> اسم المتجر</label>
                  <input type="text" name="market" />
                </div>
                <div className={style.addMissionItem}>
                  <label htmlFor="representative"> اسم المندوب</label>
                  <input type="text" name="representative" />
                </div>
                <div className={style.addMissionItem}>
                  <label htmlFor="products"> المنتجات</label>
                  <input type="text" name="products" />
                </div>
                <div className={style.addMissionItem}>
                  <label htmlFor="quantity"> الكمية</label>
                  <input type="text" name="quantity" />
                </div>
              </form>
              <button>اضافة</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
