import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaEye, FaCheck, FaEdit } from "react-icons/fa";
import { useAuth } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardMangerProduct() {
  const { isAuthenticated, user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [approved, setApproved] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getData = async (state) => {
    await axiosConfige
      .get(`/product/approved/${state}`)
      .then((res) => {
        setData(res.data.data);
        setApproved(state);
      })
      .catch((error) => {
         
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axiosConfige.get(`/product/approved/true`).then((res) => {
          setData(res.data.data);
          setLoading(false);
          console.log(res.data.data);
        });
      } catch (error) {
        setLoading(false);
        setError(error.response?.massage || "Error fetching data");
      }
    };
    fetchData();
  }, []);

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

  const approvData = async (id) => {
    axiosConfige
      .patch(`/product/approvedData/${id}`)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
        if (selectedProduct && selectedProduct._id === id) {
          setShowDetails(false);
          setSelectedProduct(null);
        }
      })
      .catch((error) => alert("حدث خطأ"));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // Create a FormData object
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
      getData(approved);
      setIsEditing(false);
      alert("تم تحديث المنتج بنجاح");
      console.log(formData);
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
  const handelsearch = () => {
    if (search == "") setSearch(undefined);
    axiosConfige
      .get(`/product/search/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        setError(error.massage);
      });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;

  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => getData(true)}> المنتجات </button>
          <button onClick={() => getData(false)}>المنتجات قيد الانتظار</button>
        </div>
        <div className="search">
          <div className="searchInput">
            <input
              type="text"
              placeholder="بحث "
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <label htmlFor="search" onClick={handelsearch}>
              <p>بحث</p>
            </label>
          </div>
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

                      {/* Add file input for image upload */}
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
                          onClick={() => {
                            setIsEditing(false);
                            setSelectedFile(null);
                          }}
                        >
                          إلغاء
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>{selectedProduct.title}</h2>
                      <p className={style.marketName}>
                        المتجر: {selectedProduct.market}
                      </p>
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
                        {!approved && (
                          <button
                            className={style.approveButton}
                            onClick={() => approvData(selectedProduct._id)}
                          >
                            <FaCheck /> الموافقة على المنتج
                          </button>
                        )}
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
              <th> اسم المتجر</th>
              <th> التقييم </th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.market}</td>
                  <td>{item.averageRating || "لا يوجد"}</td>
                  <td className={style.icon}>
                    {!approved && (
                      <FaCheck
                        onClick={() => approvData(item._id)}
                        title="الموافقة على المنتج"
                      />
                    )}
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
                    {isAuthenticated && user === "admin" && (
                      <FaTrashAlt
                        onClick={() => deleteId(item._id)}
                        title="حذف المنتج"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
