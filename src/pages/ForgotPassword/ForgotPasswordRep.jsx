// ForgotPassword.jsx
import { useState } from "react";
import axiosConfige from "../../Config/axiosConfige";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    const Data = {
      email: email,
    };

    try {
      const res = await axiosConfige.post(
        "/auth/representative/forgot-password",
        Data
      );
      setMessage(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setMessage(err.response?.data?.message || "Error sending reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordCard}>
        <h2 className={styles.forgotPasswordTitle}>نسيت كلمة السر</h2>
        <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">نسيت كلمة السر </label>
            <input
              id="email"
              type="email"
              placeholder="من فضلك أدخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ?  "جاري الاسال" : "ارسال رابط إعادة تعيين كلمة السر"}
          </button>

          {message && (
            <div
              className={isError ? styles.errorMessage : styles.successMessage}
            >
              {message}
            </div>
          )}

          <div className={styles.message}>
            تذكرت كلمة السر؟  <Link to="/login">تسجيل الدخول</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
