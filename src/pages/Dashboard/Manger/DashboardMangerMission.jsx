import { useEffect, useState } from "react";
import { FaTrashAlt, FaEye , FaCheck } from "react-icons/fa";
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
  const [mission, setMission] = useState({
    title: "",
    description: "",
    marketid: "",
    representativeid: "",
    products: [],
  });
  const [product, setProduct] = useState({
    product: "",
    quantity: 0,
  });
  const [markets, setMarkets] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMissions();

    // Fetch markets, representatives, and products when component mounts
    axiosConfige
      .get("/auth/market/approved/true")
      .then((res) => setMarkets(res.data.data))
      .catch((err) => console.error(err));

    axiosConfige
      .get("/auth/representative/approved/true")
      .then((res) => setRepresentatives(res.data.data))
      .catch((err) => console.error(err));
    axiosConfige
      .get("/product/approved/true")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchMissions = () => {
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
  };

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
    setLoading(true);
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
    setLoading(true);
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
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const addMission = async () => {
    setShowAddMission(!showAddMission);
  };

  // Handle input change for mission details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMission({
      ...mission,
      [name]: value,
    });
  };

  // Handle input change for product details
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Add product to mission
  const addProductToMission = () => {
    if (product.product && product.quantity > 0) {
      setMission({
        ...mission,
        products: [
          ...mission.products,
          { product: product.product, quantity: parseInt(product.quantity) },
        ],
      });
      // Reset product form
      setProduct({ product: "", quantity: 0 });
    } else {
      alert("الرجاء اختيار منتج وتحديد كمية صحيحة");
    }
  };

  // Remove product from mission
  const removeProductFromMission = (index) => {
    const updatedProducts = [...mission.products];
    updatedProducts.splice(index, 1);
    setMission({
      ...mission,
      products: updatedProducts,
    });
  };

  // Submit mission to backend
  const submitMission = async () => {
    try {
      // Validate form
      if (
        !mission.marketid ||
        !mission.representativeid ||
        mission.products.length === 0
      ) {
        alert("الرجاء إكمال جميع البيانات المطلوبة");
        return;
      }

      // Get current user ID for manger field
      const missionData = {
        representative: mission.representativeid,
        market: mission.marketid,
        products: mission.products,
        complete: false,
      };

      const response = await axiosConfige.post("/mission", missionData, {
        header: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        alert("تم إضافة المهمة بنجاح");
        setShowAddMission(false);
        // Reset mission form
        setMission({
          title: "",
          description: "",
          marketid: "",
          representativeid: "",
          products: [],
        });
        // Refresh missions list
        fetchMissions();
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة المهمة");
    }
  };
const completeMission = async (id) => {
  if (window.confirm("هل أنت متأكد من تغيير حالة المهمة إلى مكتملة؟")) {
    try {
      const response = await axiosConfige.patch(`/mission/${id}/complete`, {
        complete: true,
      });

      if (response.status === 200) {
        // Update the mission in the local state
        const updatedData = data.map((mission) => {
          if (mission.id === id) {
            return { ...mission, complete: true };
          }
          return mission;
        });

        setData(updatedData);
        alert("تم تغيير حالة المهمة بنجاح");
      }
    } catch (error) {
      console.error("Error completing mission:", error);
      alert("حدث خطأ أثناء تغيير حالة المهمة");
    }
  }
  };
  
  const handleSearch = () => {
          axiosConfige
            .get(`/mission/search/true?search=${search}`)
            .then((res) => {
              console.log(res.data.data);
              setData(res.data.data);
            })
            .catch((error) => {
              console.log(error)
              setError(error.response.massage);
            });
        };
  // Find product name by ID
  const getProductName = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.title : productId;
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
        </div>
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
                    <FaEye onClick={() => viewDetails(item.id)} />
                    {!item.complete && (
                      <FaCheck
                        onClick={() => completeMission(item.id)}
                        style={{ color: "green", cursor: "pointer" }}
                        title="تغيير الحالة إلى مكتملة"
                      />
                    )}
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
                      return (
                        <li key={item.product._id}>
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
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>اضافة مهمة</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اختر المتجر</p>
                  <select
                    name="marketid"
                    value={mission.marketid}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر المتجر</option>
                    {markets.map((market) => (
                      <option key={market.id} value={market.id}>
                        {market.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.detailsItem}>
                  <p>اختر المندوب</p>
                  <select
                    name="representativeid"
                    value={mission.representativeid}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر المندوب</option>
                    {representatives.map((rep) => (
                      <option key={rep.id} value={rep.id}>
                        {rep.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={style.detailsItem}>
                  <p>اختر المنتج</p>
                  <select
                    name="product"
                    value={product.product}
                    onChange={handleProductChange}
                  >
                    <option value="">اختر المنتج</option>
                    {products.map((prod) => (
                      <option key={prod._id} value={prod._id}>
                        {prod.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={style.detailsItem}>
                  <p>الكمية</p>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleProductChange}
                    min="1"
                  />
                </div>

                <button
                  className={style.addButton}
                  onClick={addProductToMission}
                  disabled={!product.product || product.quantity <= 0}
                >
                  إضافة المنتج للمهمة
                </button>

                {/* Display added products */}
                {mission.products.length > 0 && (
                  <div className={style.detailsItemList}>
                    <p>المنتجات المضافة:</p>
                    <ul>
                      {mission.products.map((item, index) => (
                        <li key={index}>
                          <p>{getProductName(item.product)}</p>
                          <p>{item.quantity}</p>
                          <button
                            className={style.removeButton}
                            onClick={() => removeProductFromMission(index)}
                          >
                            حذف
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={style.buttonGroup}>
                <button
                  onClick={submitMission}
                  disabled={
                    !mission.marketid ||
                    !mission.representativeid ||
                    mission.products.length === 0
                  }
                >
                  إضافة المهمة
                </button>
                <button onClick={() => setShowAddMission(false)}>إلغاء</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
