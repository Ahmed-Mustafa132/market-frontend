import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">❗</div>

        <h1 className="error-code">404</h1>

        <h2 className="error-title">عفوا! لم يتم العثور على الصفحة</h2>

        <p className="error-message">
          ربما تمت إزالة الصفحة التي تبحث عنها أو تغيير اسمها أو غير متوفرة
          مؤقتا
        </p>

        <button className="home-button" onClick={() => navigate("/")}>
          عودة الي الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default NotFound;
