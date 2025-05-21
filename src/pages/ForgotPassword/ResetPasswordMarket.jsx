import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfige from "../../Config/axiosConfige";
import styles from "./ResetPassword.module.css";

// ResetPassword.jsx
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsError(false);

    const Data = {
      password: password,
    };

    try {
      const res = await axiosConfige.post(
        `/auth/market/reset-password/${token}`,
        Data
      );
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login/market");
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordCard}>
        <h2 className={styles.resetPasswordTitle}>تحديث كلمة السر الخاصة بك</h2>
        <form className={styles.resetPasswordForm} onSubmit={handleReset}>
          <div className={styles.formGroup}>
            <label htmlFor="password">كلمة السر الجديدة</label>
            <input
              id="password"
              type="password"
              placeholder="ادخل كلمة السر الجديدة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
            <div className={styles.passwordRequirements}>
              كلمة السر يجب ان تكون اكبر من 8 احرف وارقام 
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">اعد ادخال كلمة السر</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="اعد ادخال كلمة السر"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            className={styles.resetButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "جاري التحديث ..." : "تحديث كلمة السر"}
          </button>

          {message && (
            <div
              className={isError ? styles.errorMessage : styles.successMessage}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
