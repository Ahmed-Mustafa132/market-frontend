import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfige from "../../Config/axiosConfige";
import Style from "./ProductView.module.css";
import { useAuth } from "../../Context/AuthContext";
import  LoadingSpinner  from "../../components/LoadingSpinner/LoadingSpinner";

export default function ProductView() {
    const { isAuthenticated, user } = useAuth();

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const [orderData, setOrderData] = useState({
    phone: "",
    address: "",
    productId: id,
    quantity: 1,
    totalAmount: 0,
  });

  useEffect(() => {
    const fetchProductAndStore = async () => {
      try {
        const productResponse = await axiosConfige.get(`/product/${id}`).then((res) => {
          setProduct(res.data.data);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductAndStore();
  }, [id]);

  const handleRating = async (e) => {
    console.log(e);
    try {
      await axiosConfige.post(`/product/${id}/review`, {
        rating: e,
      }).then((res) => {
        alert("تم تقييم المنتج بنجاح");
      });
    }catch (err) {
      console.log(err);
    }
  };
  const showBuy = () => {
    if (isAuthenticated) {
      if (user == "user") {
        setShowToggle(!showToggle);
      } else {
        alert("لا يمكنك شراء المنتج لأنك لست موظف في المتجر");
      }
    };
  }

  const submitOrder = () => {
    axiosConfige
      .post("/order", orderData)
      .then((res) => {
        alert("تم اصدار الطلب بنجاح");
      })
        .catch((err) => {
          alert("حدث خطأ أثناء اصدار الطلب");
        });
  } 
    if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Style.container}>
      <div className={Style.textContainer}>
        <h1>{product.title}</h1>
        <p className={Style.marketName}> {product.market}</p>
        <p className={Style.description}> {product.description}</p>
        <h2 className={Style.price}>السعر: {product.price}</h2>
        <button onClick={() => showBuy()}> اصدار امر شراء</button>
        <div className={Style.ratingContainer}>
          <h3>تقييم المنتج</h3>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={Style.star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                color:
                  star <= (hover || selectedRating) ? "#ffd700" : "#e4e5e9",
              }}
            >
              ★
            </span>
          ))}
          {selectedRating > 0 && <p>تقييمك: {selectedRating} نجوم</p>}
        </div>
      </div>
      <div className={Style.imageContainer}>
        <img src={product.image.url} alt={product.name} />
      </div>
      {showToggle && (
        <div
          className={Style.buyContainer}
          onClick={() => setShowToggle(false)}
        >
          <div className={Style.buy} onClick={(e) => e.stopPropagation()}>
            <h2>اصدار امر شراء</h2>
            <form>
              <div className={Style.inputContainer}>
                <label htmlFor="phone">رقم الهاتف:</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  min="1"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                    phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style.inputContainer}>
                <label htmlFor="address"> العنوان:</label>
                <input
                  type="phone"
                  id="address"
                  name="address"
                  min="1"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style.inputContainer}>
                <label htmlFor="quantity">الكمية:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      quantity: e.target.value,
                      totalAmount: product.price * e.target.value,
                    })
                  }
                />
              </div>
              <p>السعر الكلي: {orderData.totalAmount}</p>

              <button onClick={() => submitOrder()}>اصدار امر شراء</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
