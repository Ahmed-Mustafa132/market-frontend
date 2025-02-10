import React, { useState } from "react";
import style from "./singupMarket.module.css";
import logo from "../../assets/logo.png";
import axiosConfige from "../../axiosConfige/axiosConfige";
import axios from "axios";

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
          <h1>تسجيل كمتجر</h1>
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
            <label htmlFor="IDfront">السجل <br />التجاري </label>

            <input
              type="file"
              id="IDback"
              name="IDback"
              className={style.IDBtn}
            />
            <label htmlFor="IDback">البطاقة الضريبية </label>
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
          <h2>لماذا تنضم كمتجر معنا؟</h2>
          <ul>
            <li>قسم تسويق كامل في خدمة شركتك</li>
            <li>
              الوصول لكل العملاء المحتملين في كل انحاء الجمهورية بدون تكاليف او
              مجهود
            </li>
            <li>
              مندوبين تسويف لمتبعة العملاء وعرض منتجك بدون حاجة لتدخل مباشر او
              اعباء إضافية
            </li>
            <li>حملات إعلانية ممنهجة و ممولة </li>
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
