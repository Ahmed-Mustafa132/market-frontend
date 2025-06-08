import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaEye, FaCheck } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { useAuth } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function DashboardMangerMarkets() {
      const { isAuthenticated, user } = useAuth();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [SendMassage, setSendMassage] = useState(false);
  const [marketId, setMarketId] = useState(null);
  const [massage, setMassage] = useState("");
    const [accountTogele, setAccountTogele] = useState(false);
  const [account, setAccount] = useState([""]);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/market/approved/true")
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data.massage);
          setLoading(false);
        });
    } catch (error) {
       
    }
  }, []);

  const deleteId = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا  المتجر")) {
      axiosConfige
        .delete(`/auth/market/${id}`)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {});
    }
  };
  const viewDetails = async (id) => {
    axiosConfige.get(`/auth/market/${id}`).then((res) => {
      setDetails(res.data.data);
      setShowDetails(!showdetails);
    });
  };
  const massageSubmite = async () => {
    const massageSend = {
      id: marketId,
      massage: massage,
    };
    try {
      axiosConfige
        .post(`/massage/sendMessages/market`, massageSend)
        .then((res) => {
          console.log(res.data.data);
        });
      setSendMassage(!SendMassage);
    } catch (error) {
      window.alert("حدث خطأ");
    }
  };
  const viewSendMassage = async (id) => {
    setMarketId(id);
    setSendMassage(!SendMassage);
  };
   const openAccountTogele = (id) => {
     setMarketId(id);
     setAccountTogele(!accountTogele);
   };
   const SubmitAccount = () => {
     const accountData = {
       id: marketId,
       account: account,
     };
     axiosConfige
       .put(`/auth/market/account/`, accountData)
       .then((res) => {
         console.log(res.data);
         setAccountTogele(false);
       });
  };
  const approvedData = () => {
    axiosConfige
      .get("/auth/market/approved/true")
      .then((res) => {
        setData(res.data.data);
        setApproved(false);
      })
      .catch((error) => {
         
      });
  };
  const UnApprovedData = () => {
    axiosConfige
      .get("/auth/market/approved/false")
      .then((res) => {
        setData(res.data.data);
        setApproved(true);
      })
      .catch((error) => {
         
      });
  };
  const approvData = (id)=>{
    axiosConfige.get(`/auth/market/approvedData/${id}`).then((res) => {
      setData(data.filter((item) => item.id !== id));
        })
    .catch((error) => {
       
    });
  }
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => approvedData()}> المتاجر </button>
          <button onClick={() => UnApprovedData()}>المتاجر قيد الانتظار</button>
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
              <th>المتجر </th>
              <th> المهام</th>
              <th> حسابات و ارصدة </th>
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
                      حسابات و ارصدة
                    </button>
                  </td>
                  <td className={style.icon}>
                    {approved && (
                      <FaCheck onClick={() => approvData(item.id)} />
                    )}
                    <BsChatDots onClick={() => viewSendMassage(item.id)} />
                    <FaEye onClick={() => viewDetails(item.id)} />
                    {isAuthenticated && user == "admin" && (
                      <FaTrashAlt onClick={() => deleteId(item.id)} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showdetails && (
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>تفاصيل المتجر</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المتجر</p>
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
                  <p> السجل التجاري </p>
                  <img
                    src={import.meta.env.VITE_API_URL + details.BusinessRecords}
                    alt="img"
                  />
                </div>
                <div className={style.detailsItem}>
                  <p>البطاقة الضريبية </p>
                  <img
                    src={import.meta.env.VITE_API_URL+details.taxID}
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
        {SendMassage && (
          <div
            className={style.SendMassage}
            onClick={() => setSendMassage(!SendMassage)}
          >
            <div
              className={style.SendMassageContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <h1>ارسال رسالة</h1>
              <div className={style.SendMassageItem}>
                <p>الرسالة</p>
                <textarea
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setMassage(e.target.value)}
                ></textarea>
              </div>
              <button onClick={() => massageSubmite()}>ارسال الرسالة</button>
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
