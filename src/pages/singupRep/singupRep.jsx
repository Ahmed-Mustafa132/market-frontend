import React, { useState } from "react";
import style from "./singupRep.module.css";
import logo from "../../assets/logo.png";
import axiosConfige from "../../axiosConfige/axiosConfige";

const Singuprep = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    IDfront: "",
    IDback: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      axiosConfige.post("/register", formData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form action="post">
          <h1>تسجيل كمندوب</h1>
          <div className={style.formGroup}>
            <label htmlFor="email"> الاسم بالكامل</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="يرجي ادخال الاسم بالكامل"
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="يرجي ادخال البريد الالكتروني"
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="يرجي ادخال كلمة المرور"
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="password">اعد كتابة كلمة المرور</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="يرجي اعادة ادخال كلمة المرور"
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="يرجي ادخال رقم الهاتف"
              onChange={handleChange}
            />
          </div>
          <div className={style.btnGroup}>
            <input
              type="file"
              id="IDfront"
              name="IDfront"
              className={style.IDBtn}
            />
            <label htmlFor="IDfront">صورة البطاقة الشخصية <br /> من الامام</label>

            <input
              type="file"
              id="IDback"
              name="IDback"
              className={style.IDBtn}
            />
            <label htmlFor="IDback">صورة البطاقة الشخصية <br /> من الخلف</label>
          </div>
          <button type="button" className={style.submitBtn}>
            تسجيل
          </button>
        </form>
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
