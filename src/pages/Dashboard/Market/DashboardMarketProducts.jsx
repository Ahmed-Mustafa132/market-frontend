import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Card from "../../../components/ProdactCard/ProdactCard";
import { Link } from "react-router-dom";
export default function DashboardProdacte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addProduct, setAddProduct] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    image: null,
  });
  useEffect(() => {
    try {
      axiosConfige
        .get("/product/market/prodact")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data);
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);
  const showAdd = () => {
    setShowAddProduct(!showAddProduct);
  };
const postData = async () => {
  try {
    setLoading(true);

    // إنشاء كائن FormData لإرسال البيانات مع الملفات
    const formDataToSend = new FormData();

    // إضافة البيانات النصية
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity);

    // إضافة الملف
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    const response = await axiosConfige.post("/product", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // إعادة تحميل البيانات بعد الإضافة
    const productsResponse = await axiosConfige.get("/product/market/prodact");
    setData(productsResponse.data.data);

    // إغلاق نموذج الإضافة وإعادة تعيين البيانات
    setShowAddProduct(false);
    setFormData({
      title: "",
      price: "",
      description: "",
      quantity: "",
      image: null,
    });

    // إظهار رسالة نجاح (يمكنك إضافة مكون للإشعارات)
    alert("تمت إضافة المنتج بنجاح");
  } catch (error) {
    console.error("خطأ في إضافة المنتج:", error);
    alert("حدث خطأ أثناء إضافة المنتج");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <h1 style={{ textAlign: "center" }}>{error.massage}</h1>;
  }
  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => showAdd()}> اضافة منتج</button>
        </div>
        <div className={style.prodactsContener}>
          {data.map((prodact) => (
            <Link to={`/product/${prodact._id}`} key={prodact._id}>
              <Card product={prodact} />
            </Link>
          ))}
          <div></div>
        </div>
        {showAddProduct && (
          <div className={style.addProduct} onClick={() => showAdd()}>
            <div
              className={style.addProductForm}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={style.addProductFormContent}>
                <label>اسم المنتج</label>
                <input
                  type="text"
                  name="title"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className={style.addProductFormContent}>
                <label>السعر</label>
                <input
                  type="number"
                  name="price"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className={style.addProductFormContent}>
                <label>الوصف</label>
                <textarea
                  name="description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className={style.addProductFormContent}>
                <label>الصورة</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </div>
              <div className={style.addProductFormContent}>
                <label htmlFor="quantity">الكمية</label>
                <input
                  type="number"
                  name="quantity"
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => {
                  postData();
                }}
              >
                اضافة
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
