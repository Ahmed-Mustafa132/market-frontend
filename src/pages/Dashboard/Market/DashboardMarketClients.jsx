import { useEffect, useState } from "react";
import axiosConfig from "../../../Config/axiosConfige";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import styles from "../Dashboard.module.css";
import { FaEye } from "react-icons/fa";
export default function DashboardRepClients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  useEffect(() => {
    axiosConfig
      .get("/order")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  }, []);
  const handleShowDetails = (id) => {
    setShowDetails(true);
    console.log(id);
    axiosConfig.get(`/order/${id}`).then((res) => {
      console.log(res.data.data);
      setSelectedOrder(res.data.data);
    });
    };
    const handelsearch = () => {
        if (search === "") {
            axiosConfig
              .get(`/order`)
              .then((res) => {
                setData(res.data.data);
                setLoading(false);
              })
              .catch((error) => {
                setError(error.response.data);
                setLoading(false);
              });
        }
        else {
            axiosConfig
                .get(`/order/search/${search}`)
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                    console.log(res.data.data); 
                })
                .catch((error) => {
                    setError(error.response.data);
                    setLoading(false);
                     
                });
        }
    };


  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <main style={{ textAlign: "center" }}>
        <section>{error.message}</section>
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
            <label htmlFor="search" onClick={() => handelsearch()}>
              <p >بحث</p>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>العميل</th>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.client}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td onClick={() => handleShowDetails(item.id)}>
                  <FaEye />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDetails && (
          <div
            className={styles.addOrder}
            onClick={() => setShowDetails(false)}
          >
            <div
              className={styles.addOrderForm}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.addOrderFormHeader}>
                <h2>تفاصيل عملية الشراء</h2>
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.detailRow}>
                  <span>اسم العميل:</span>
                  <span>{selectedOrder.client}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>رقم الهاتف:</span>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>العنوان:</span>
                  <span>{selectedOrder.address}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>المنتج:</span>
                  <span>{selectedOrder.product}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>الكمية:</span>
                  <span>{selectedOrder.quantity}</span>
                </div>
              </div>
              <button onClick={() => setShowDetails(false)}>إغلاق</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
