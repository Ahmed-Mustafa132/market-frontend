import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosConfige from "../../axiosConfige/axiosConfige";
import Style from "./ProductView.module.css";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    store_id: "",
  });
  const [selectedRating, setSelectedRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndStore = async () => {
      try {
        const productResponse = await axiosConfige.get(`/product/${id}`);
        setProduct(productResponse.data);
        console.log(productResponse.data);
        const storeResponse = await axiosConfige.get(
          `/user/${productResponse.data.market}`
        );
        setStoreName(storeResponse.data.name);
        console.log(storeResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductAndStore();
  }, [id]);

  const handleRating = async (value) => {
    console.log(value);
    setSelectedRating(value);
  };

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <div className="loader">.</div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Style.container}>
      <div className={Style.textContainer}>
        <h1>{product.title}</h1>
        <p className={Style.marketName}> {storeName}</p>
        <p className={Style.description}> {product.description}</p>
        <h2 className={Style.price}>السعر: {product.price}</h2>
        <button> اصدار امر شراء</button>
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
        <img src={product.image} alt={product.name} />
      </div>
    </div>
  );
}
