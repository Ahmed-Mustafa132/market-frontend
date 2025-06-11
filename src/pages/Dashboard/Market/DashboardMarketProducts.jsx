import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import imageCompression from "browser-image-compression"; // Import the compression library
import { FaTrashAlt, FaEye, FaCheck, FaEdit } from "react-icons/fa";

export default function DashboardProdacte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressing, setCompressing] = useState(false);

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
  
  // Image compression function
  const compressImage = async (imageFile) => {
    if (!imageFile) return null;
    
    setCompressing(true);
    
    try {
      const options = {
        maxSizeMB: 1, // Max file size in MB
        maxWidthOrHeight: 1024, // Max width/height in pixels
        useWebWorker: true,
        fileType: imageFile.type
      };
      
      const compressedFile = await imageCompression(imageFile, options);
      console.log('Original image size:', imageFile.size / 1024 / 1024, 'MB');
      console.log('Compressed image size:', compressedFile.size / 1024 / 1024, 'MB');
      
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return imageFile; // Return original file if compression fails
    } finally {
      setCompressing(false);
    }
  };
  
  const handleFileChangeForAdd = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedImage = await compressImage(file);
      setFormData({ ...formData, image: compressedImage });
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedImage = await compressImage(file);
      setSelectedFile(compressedImage);
    }
  };
  
  const postData = async () => {
    try {
      setLoading(true);

      // Create FormData object to send data with files
      const formDataToSend = new FormData();

      // Add text data
      formDataToSend.append("title", formData.title);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("quantity", formData.quantity);

      // Add the compressed file
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axiosConfige.post("/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reload data after adding
      const productsResponse = await axiosConfige.get(
        "/product/market/prodact"
      );
      setData(productsResponse.data.data);

      // Close form and reset data
      setShowAddProduct(false);
      setFormData({
        title: "",
        price: "",
        description: "",
        quantity: "",
        image: null,
      });

      // Show success message
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
      // setDetails(marketRes.data.data); // This line seems to be using an undefined function

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
    try {
      setLoading(true);
      
      // Create FormData for the request
      const formDataToSend = new FormData();
      formDataToSend.append("title", selectedProduct.title);
      formDataToSend.append("description", selectedProduct.description);
      formDataToSend.append("price", selectedProduct.price);
      formDataToSend.append("market", selectedProduct.market);
      
      // Add the compressed file if selected
      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }
      
      // Update the product
      await axiosConfige.patch(`/product/${selectedProduct._id}`, formDataToSend, {
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
    } finally {
      setLoading(false);
    }
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
                      src={import.meta.env.VITE_API_URL +'/' +selectedProduct.image}
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
                        {compressing && <p>جاري ضغط الصورة...</p>}
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
                          disabled={compressing}
                        >
                          {compressing ? "جاري الضغط..." : "حفظ التغييرات"}
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
                  accept="image/*"
                  onChange={handleFileChangeForAdd}
                />
                {compressing && <p>جاري ضغط الصورة...</p>}
                {formData.image && (
                  <div className={style.previewImage}>
                    <p>معاينة الصورة:</p>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "5px",
                      }}
                    />
                    <p>حجم الصورة: {(formData.image.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
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
                disabled={compressing}
              >
                {compressing ? "جاري ضغط الصورة..." : "اضافة"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
