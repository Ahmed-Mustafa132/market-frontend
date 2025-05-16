import { useState } from "react";
import style from "./Singup.module.css";
import logo from "../../assets/logo.png";
import axiosConfige from "../../Config/axiosConfige";
import { Link } from "react-router-dom";

const Singuprep = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    identityFront: null,
    identityBack: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (
      formData.password.length < 6 ||
      formData.password.length > 20 ||
      !/[a-zA-Z]/.test(formData.password)
    ) {
      newErrors.password = `كلمة المرور يجب أن تكون 6 أحرف على الأقل
    و يجب ان تحتوي علي حروف كبيرة و صغيرة و أرقام`;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صالح";
    }

    if (!formData.identityFront)
      newErrors.identityFront = "صورة البطاقة الأمامية مطلوبة";
    if (!formData.identityBack)
      newErrors.identityBack = "صورة البطاقة الخلفية مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files && files.length > 0) {
      // التحقق من نوع الملف وحجمه
      const file = files[0];
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // تحويل إلى MB

      if (!fileType.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, [name]: "يجب أن يكون الملف صورة" }));
        return;
      }

      if (fileSize > 5) {
        // حد أقصى 5 ميجابايت
        setErrors((prev) => ({
          ...prev,
          [name]: "حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)",
        }));
        return;
      }

      // إزالة أي خطأ سابق لهذا الحقل
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitMessage({ type: "error", message: "يرجى تصحيح الأخطاء" });
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();

      // إضافة البيانات النصية
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);

      // معالجة خاصة للصور
      if (formData.identityFront) {
        // تحويل الصورة إلى Blob إذا لزم الأمر
        const frontBlob =
          formData.identityFront instanceof Blob
            ? formData.identityFront
            : await fetch(URL.createObjectURL(formData.identityFront)).then(
                (r) => r.blob()
              );

        formDataToSend.append("identityFront", frontBlob, "identity_front.jpg");
      }

      if (formData.identityBack) {
        const backBlob =
          formData.identityBack instanceof Blob
            ? formData.identityBack
            : await fetch(URL.createObjectURL(formData.identityBack)).then(
                (r) => r.blob()
              );

        formDataToSend.append("identityBack", backBlob, "identity_back.jpg");
      }

      const response = await axiosConfige.post(
        "/auth/representative/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmitMessage({
        type: "success",
        message: "تم التسجيل بنجاح!",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      setSubmitMessage({
        type: "error",
        message: error.response?.data?.message || "حدث خطأ أثناء التسجيل",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>تسجيل كمندوب</h1>

          {submitMessage.message && (
            <div className={`${style.message} ${style[submitMessage.type]}`}>
              {submitMessage.message}
            </div>
          )}

          <div className={style.formGroup}>
            <label htmlFor="name">الاسم بالكامل</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="يرجى ادخال الاسم بالكامل"
              onChange={handleChange}
              className={errors.name ? style.errorInput : ""}
            />
            {errors.name && (
              <span className={style.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="email">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="يرجى ادخال البريد الالكتروني"
              onChange={handleChange}
              className={errors.email ? style.errorInput : ""}
            />
            {errors.email && (
              <span className={style.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="يرجى ادخال كلمة المرور"
              onChange={handleChange}
              className={errors.password ? style.errorInput : ""}
            />
            {errors.password && (
              <span className={style.errorText}>{errors.password}</span>
            )}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="يرجى اعادة ادخال كلمة المرور"
              onChange={handleChange}
              className={errors.confirmPassword ? style.errorInput : ""}
            />
            {errors.confirmPassword && (
              <span className={style.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="يرجى ادخال رقم الهاتف"
              onChange={handleChange}
              className={errors.phone ? style.errorInput : ""}
            />
            {errors.phone && (
              <span className={style.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={style.btnGroup}>
            <input
              type="file"
              id="identityFront"
              name="identityFront"
              className={style.IDBtn}
              onChange={handleChange}
              accept="image/*"
              capture="environment" // إضافة خاصية capture للتحكم في مصدر الصورة
            />
            <label htmlFor="identityFront">
              صورة البطاقة الشخصية <br /> من الامام
            </label>
            {errors.identityFront && (
              <span className={style.errorText}>{errors.identityFront}</span>
            )}

            <input
              type="file"
              id="identityBack"
              name="identityBack"
              className={style.IDBtn}
              onChange={handleChange}
              accept="image/*"
              capture="environment" // إضافة خاصية capture للتحكم في مصدر الصورة
            />
            <label htmlFor="identityBack">
              صورة البطاقة الشخصية <br /> من الخلف
            </label>
            {errors.identityBack && (
              <span className={style.errorText}>{errors.identityBack}</span>
            )}
          </div>

          <button
            type="submit"
            className={`${style.submitBtn} ${isLoading ? style.loading : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "جاري التسجيل..." : "تسجيل"}
          </button>
        </form>
        <div className={style.textContainer}>
          <p>
            <span>
              لديك حساب بالفعل؟
              <Link to="/login/representative">تسجيل الدخول</Link>
            </span>
          </p>
        </div>
      </div>

      <div className={style.textContainer}>
        <div className={style.imgContainer}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.text}>
          <h2>لماذا تنضم كمندوب معنا؟</h2>
          <ul>
            <li>تشتغل حسب وقتك وتفضيلاتك</li>
            <li>المهام قريبة من مكانك</li>
            <li>لا لتكلفة الانتقال و هدر الوقت</li>
            <li>دخل اضافي مجزي</li>
            <li>نسبة من اجمالي مبيعاتك</li>
            <li>امكانية الانضمام كعضو مستدام</li>
            <li>بامتياز التعيين</li>
            <li>مرتب ثابت +عمولة - تامينات</li>
          </ul>
          <div className={style.inmarket}>
            <span className={style.intext}>في </span>
            <span className={style.markettext}>السوق</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singuprep;
