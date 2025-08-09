import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">تواصل معنا</h1>
      <p className="contact-text">
        يمكن مراسلتنا من كل أنحاء العالم على البريد الإلكتروني:{" "}
        <a href="mailto:info@a-souq.com">info@a-souq.com</a>
      </p>
      <p className="contact-text">
        سوف يتم الرد على بريدك الالكترونى برجاء توضيحه وإرسال بيانات التواصل
        وطرقها من خلال وكلاءنا حسب بلدك و شكرا.
      </p>
    </div>
  );
}
