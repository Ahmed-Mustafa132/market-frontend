import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
export default function DashboardMangerMangers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(undefined);
    const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
    const [Id, setId] = useState(null);
  
      const [accountTogele, setAccountTogele] = useState(false);
      const [account, setAccount] = useState([""]);
  const [showAddManger, setShowAddManger] = useState(false);
  const [addManger, setAddManger] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    identityFront: null,
    identityBack: null,
  });

  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/manger")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data.massage);
          setLoading(false);
        });
    } catch (error) {
       
    }
  }, []);

  const handelsearch = () => {
    if (search == "") setSearch(undefined);
    axiosConfige
      .get(`/auth/manger/searsh/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
         
        setError(error.massage);
      });
  };
  const showaddMangerTogale = () => {
    setShowAddManger(true);
  };
const handelSubmite = (e) => {
  e.preventDefault();
  if (addManger.password !== addManger.confirmPassword) { 
    alert("كلمة السر غير متطابقة");
    return;
  }
  // إنشاء كائن FormData لإرسال الملفات والبيانات معًا
  const formData = new FormData();

  // إضافة جميع البيانات إلى FormData
  formData.append("name", addManger.name);
  formData.append("email", addManger.email);
  formData.append("password", addManger.password);
  formData.append("confirmPassword", addManger.confirmPassword);
  formData.append("phone", addManger.phone);

  // إضافة الملفات إذا كانت موجودة
  if (addManger.identityFront) {
    formData.append("identityFront", addManger.identityFront);
  }

  if (addManger.identityBack) {
    formData.append("identityBack", addManger.identityBack);
  }


  // إرسال البيانات باستخدام FormData مع تحديد نوع المحتوى المناسب
  axiosConfige
    .post("/auth/manger/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setShowAddManger(false);
    })
    .catch((error) => {
      console.log("Error:", error.response?.data || error);
      setError(error.response?.data?.massage || "حدث خطأ في إرسال البيانات");
    });
};
  const viewDetails = async (id) => {
    axiosConfige.get(`/auth/manger/${id}`).then((res) => {
      setDetails(res.data.data);
      setShowDetails(!showdetails);
    });
  };

   const openAccountTogele = (id) => {
     setId(id);
     setAccountTogele(!accountTogele);
   };
   const SubmitAccount = () => {
     const accountData = {
       id: Id,
       account: account,
     };
     axiosConfige.put(`/auth/manger/account/`, accountData).then((res) => {
       console.log(res.data);
       setAccountTogele(false);
     });
  };
  const deleteManger = (id) => {
    if (window.confirm("هل انت متأكد من حذف هذا المدير؟")) {
      axiosConfige.delete(`/auth/manger/${id}`).then((res) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      });
    }else{
      return;
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => showaddMangerTogale()}> اضافة مدير</button>
        </div>
        <div className="search">
          <div className="searchInput">
            <input
              type="text"
              placeholder="بحث "
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <label htmlFor="search" onClick={() => handelsearch()}>
              <p>بحث</p>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>المدير </th>
              <th> المهام</th>
              <th> حسابات و مستحقات</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.missions}</td>
                  <td>
                    <button
                      className="tableBtn"
                      onClick={() => openAccountTogele(item.id)}
                    >
                      حسابات و مستحقات
                    </button>
                  </td>
                  <td className={style.icon}>
                    <FaEye onClick={() => viewDetails(item.id)} />
                    <FaTrashAlt onClick={() => deleteManger(item.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showAddManger && (
          <div className={style.addManger}>
            <div className={style.addMangerContent}>
              <div className={style.addMangerHeader}>
                <h1>اضافة مدير</h1>
                <button onClick={() => setShowAddManger(false)}>
                  <i className="fa-solid fa-xmark"></i>
                  <span>اغلاق</span>
                </button>
              </div>
              <div className={style.addMangerBody}>
                <div className={style.addMangerBodyInput}>
                  <label htmlFor="name">الاسم</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) =>
                      setAddManger({ ...addManger, name: e.target.value })
                    }
                  />
                </div>
                <div className={style.addMangerBodyInput}>
                  <label htmlFor="email">البريد الالكتروني</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) =>
                      setAddManger({ ...addManger, email: e.target.value })
                    }
                  />
                </div>
                <div className={style.addMangerBodyInput}>
                  <label htmlFor="password">كلمة المرور</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) =>
                      setAddManger({
                        ...addManger,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={style.addMangerBodyInput}>
                  <label htmlFor="confirmPassword">
                    اعد كتابة كلمة المرور{" "}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) =>
                      setAddManger({
                        ...addManger,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>{" "}
                <div className={style.addMangerBodyInput}>
                  <label htmlFor="phone">رقم الهاتف </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    onChange={(e) =>
                      setAddManger({
                        ...addManger,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={style.btnGroup}>
                  <input
                    type="file"
                    id="identityFront"
                    name="identityFront"
                    className={style.IDBtn}
                    onChange={(e) =>
                      setAddManger({
                        ...addManger,
                        identityFront: e.target.files[0],
                      })
                    }
                    accept="image/*"
                  />
                  <label htmlFor="identityFront">
                    صورة البطاقة الشخصية <br /> من الامام
                  </label>
                  <input
                    type="file"
                    id="identityBack"
                    name="identityBack"
                    className={style.IDBtn}
                    onChange={(e) =>
                      setAddManger({
                        ...addManger,
                        identityBack: e.target.files[0],
                      })
                    }
                    accept="image/*"
                  />
                  <label htmlFor="identityBack">
                    صورة البطاقة الشخصية <br /> من الخلف
                  </label>
                </div>
                <button onClick={(e) => handelSubmite(e)}>اضافة</button>
              </div>
            </div>
          </div>
        )}
        {showdetails && (
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>تفاصيل المدير</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المدير</p>
                  <p>{details.name}</p>
                </div>
                <div className={style.detailsItem}>
                  <p>رقم الهاتف</p>
                  <p>{details.phone}</p>
                </div>
                <div className={style.detailsItem}>
                  <p>البريد الإلكتروني</p>
                  <p>{details.email}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> الحساب</p>
                  <p>{details.accounts}</p>
                </div>

                <div className={style.detailsItem}>
                  <p> الجانب الامامي من البطاقة </p>
                  <img
                    src={import.meta.env.VITE_API_URL +"/"+ details.identityFront}
                    alt="img"
                  />
                </div>
                <div className={style.detailsItem}>
                  <p> الجانب الخلفي من البطاقة </p>
                  <img
                    src={import.meta.env.VITE_API_URL + "/"+details.identityBack}
                    alt="img"
                  />
                </div>
              </div>
              <button onClick={() => setShowDetails(!showdetails)}>
                اغلاق
              </button>
            </div>
          </div>
        )}
        {accountTogele && (
          <div
            className={style.accountTogele}
            onClick={() => setAccountTogele(!accountTogele)}
          >
            <div
              className={style.accountTogeleContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <h1>حسابات</h1>
              <input
                type="number"
                placeholder=""
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <button onClick={() => SubmitAccount()}>ارسال</button>
          </div>
        )}
      </section>
    </main>
  );
}
