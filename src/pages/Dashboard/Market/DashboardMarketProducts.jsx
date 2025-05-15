import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Card from "../../../components/ProdactCard/ProdactCard";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEye, FaCheck, FaEdit } from "react-icons/fa";

export default function DashboardProdacte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addProduct, setAddProduct] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
           
        });
    } catch (error) {
      setLoading(false);
       
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
      const productsResponse = await axiosConfige.get(
        "/product/market/prodact"
      );
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
  const deleteId = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا  المنتج ؟")) {
      axiosConfige
        .delete(`/product/${id}`)
        .then((res) => {
          setData(data.filter((item) => item._id !== id));
          if (selectedProduct && selectedProduct._id === id) {
            setShowDetails(false);
            setSelectedProduct(null);
          }
        })
        .catch((error) => {
          setError(error.response?.massage || "Error deleting product");
        });
    }
  };
  const viewDetails = async (id) => {
    try {
      const marketRes = await axiosConfige.get(`/product/${id}`);
      setDetails(marketRes.data.data);

      // Find the product details from the data array
      const product = data.find((item) => item._id === id);
      setSelectedProduct(product);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSaveEdit = async () => {
    const formData = {
      title: selectedProduct.title,
      description: selectedProduct.description,
      price: selectedProduct.price,
      market: selectedProduct.market,
      image: selectedFile,
    };
    try {
      // Use FormData in the request
      await axiosConfige.patch(`/product/${selectedProduct._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Update the product in the data array
      setData(
        data.map((item) =>
          item._id === selectedProduct._id ? selectedProduct : item
        )
      );
      setIsEditing(false);
      alert("تم تحديث المنتج بنجاح");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("حدث خطأ أثناء تحديث المنتج");
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
    setIsEditing(false);
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
        {showdetails && selectedProduct && (
          <div className={style.productDetailsOverlay}>
            <div className={style.productDetailsModal}>
              <button className={style.closeButton} onClick={closeDetails}>
                ×
              </button>

              <div className={style.productDetailsContent}>
                <div className={style.productImageContainer}>
                  {selectedProduct.image && (
                    <img
                      src={selectedProduct.image.url}
                      alt={selectedProduct.title}
                      className={style.productImage}
                    />
                  )}
                </div>

                <div className={style.productInfo}>
                  {isEditing ? (
                    <>
                      <div className={style.formGroup}>
                        <label>اسم المنتج:</label>
                        <input
                          type="text"
                          name="title"
                          value={selectedProduct.title || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={style.formGroup}>
                        <label>الوصف:</label>
                        <textarea
                          name="description"
                          value={selectedProduct.description || ""}
                          onChange={handleInputChange}
                          rows="4"
                        />
                      </div>

                      <div className={style.formGroup}>
                        <label>السعر:</label>
                        <input
                          type="number"
                          name="price"
                          value={selectedProduct.price || 0}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={style.formGroup}>
                        <label>الصورة:</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {selectedProduct.image && !selectedFile && (
                          <div className={style.currentImage}>
                            <p>الصورة الحالية:</p>
                            <img
                              src={selectedProduct.image.url}
                              alt="Current product"
                              style={{
                                width: "100px",
                                height: "auto",
                                marginTop: "5px",
                              }}
                            />
                          </div>
                        )}
                        {selectedFile && (
                          <div className={style.previewImage}>
                            <p>الصورة الجديدة:</p>
                            <img
                              src={URL.createObjectURL(selectedFile)}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "auto",
                                marginTop: "5px",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className={style.actionButtons}>
                        <button
                          className={style.saveButton}
                          onClick={handleSaveEdit}
                        >
                          حفظ التغييرات
                        </button>
                        <button
                          className={style.cancelButton}
                          onClick={() => setIsEditing(false)}
                        >
                          إلغاء
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>{selectedProduct.title}</h2>

                      <p className={style.description}>
                        {selectedProduct.description}
                      </p>
                      <p className={style.price}>
                        السعر: {selectedProduct.price} جنيه
                      </p>
                      <p className={style.rating}>
                        التقييم:{" "}
                        {selectedProduct.averageRating || "لا يوجد تقييم"}
                      </p>

                      {selectedProduct.reviews &&
                        selectedProduct.reviews.length > 0 && (
                          <div className={style.reviews}>
                            <h3>
                              التقييمات ({selectedProduct.reviews.length})
                            </h3>
                          </div>
                        )}

                      <div className={style.actionButtons}>
                        <button
                          className={style.editButton}
                          onClick={handleEdit}
                        >
                          <FaEdit /> تعديل المنتج
                        </button>
                        <button
                          className={style.deleteButton}
                          onClick={() => deleteId(selectedProduct._id)}
                        >
                          <FaTrashAlt /> حذف المنتج
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>اسم المنتج </th>
              <th> التقييم </th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.averageRating || "لا يوجد"}</td>
                  <td className={style.icon}>
                    <FaEye
                      onClick={() => viewDetails(item._id)}
                      title="عرض التفاصيل"
                    />
                    <FaEdit
                      onClick={() => {
                        viewDetails(item._id).then(() => setIsEditing(true));
                      }}
                      title="تعديل المنتج"
                    />
                    <FaTrashAlt
                      onClick={() => deleteId(item._id)}
                      title="حذف المنتج"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
