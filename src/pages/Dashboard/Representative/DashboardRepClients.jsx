import { useEffect, useState } from "react";
import axiosConfig from "../../../Config/axiosConfige";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Select from "react-select";
import styles from "../Dashboard.module.css";
import { FaEye } from "react-icons/fa";
export default function DashboardRepClients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orderData, setOrderData] = useState({
    client: null,
    quantity: null,
    phone: null,
    address: null,
    note: null,
  });
  const [prodactData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    value: null,
    label: "اختر المنتج",
  });

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
  const handelSubmet = async () => {
    console.log(orderData);
    const orderSubmit = {
      client: orderData.client,
      productId: selectedProduct.value,
      quantity: orderData.quantity,
      phone: orderData.phone,
      address: orderData.address,
      note: orderData.note,
    };
    try {
      const response = await axiosConfig.post("/order", orderSubmit);
      console.log(response.data);
      setShowAddOrder(false);
    } catch (error) {
      console.log(error);
    }
    setShowAddOrder(false);
  };

  const showAddOrderFun = () => {
    setShowAddOrder(!showAddOrder);
    try {
      axiosConfig
        .get(`/product`)
        .then((res) => {
          setProductData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
                })
                .catch((error) => {
                    setError(error.response.data);
                    setLoading(false);
                });
        }
    };
  const productOptions = prodactData.map((item) => ({
    value: item._id,
    label: item.title,
  }));

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
        <div className="filter">
          <button onClick={() => showAddOrderFun()}> اضافة امر شراء</button>
        </div>
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
        {showAddOrder && (
          <div className={styles.addOrder} onClick={() => showAddOrderFun()}>
            <div
              className={styles.addOrderForm}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.addOrderFormHeader}>
                <h2>اضافة امر شراء</h2>
              </div>
              <form>
                <div className={styles.addOrderFormInput}>
                  <label htmlFor="client">العميل</label>
                  <input
                    type="text"
                    name="client"
                    id="client"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="addOrderFormInput">
                  <label htmlFor="product">المنتج</label>
                  <Select
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    options={productOptions}
                    placeholder="اختر المنتج"
                    isSearchable={true}
                    isClearable={true}
                  />
                </div>
                <div className={styles.addOrderFormInput}>
                  <label htmlFor="quantity">الكمية</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.addOrderFormInput}>
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.addOrderFormInput}>
                  <label htmlFor="address">العنوان</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.addOrderFormInput}>
                  <label htmlFor="price">ملاحظات</label>
                  <textarea
                    name="note"
                    id="note"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              <button onClick={() => handelSubmet()}>اضافة</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
