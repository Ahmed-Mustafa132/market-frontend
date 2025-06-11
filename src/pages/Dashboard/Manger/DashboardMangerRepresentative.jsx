import { useEffect, useState, useRef } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaEye, FaCheck } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { useAuth } from "../../../Context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}
export default function DashboardMangerRepresentative() {
      const { isAuthenticated, user } = useAuth();
  
  const [search, setSearch] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const [location, setLocation] = useState([]);
  const [showIdentity, setShowIdentity] = useState(false);
  const [identity, setIdentity] = useState([]);
  const [showdetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [SendMassage, setSendMassage] = useState(false);
  const [Id, setId] = useState(null);
  const [massage, setMassage] = useState("");
  const [accountTogele, setAccountTogele] = useState(false);
  const [account, setAccount] = useState([""]);
  const [approved, setApproved] = useState(false);

  const position = [
    location?.latitude || 30.0444,
    location?.longitude || 31.2357,
  ];
  const massageSubmite = async () => {
    const massageSend = {
      id: Id,
      massage: massage,
    };
    try {
      axiosConfige
        .post(`/massage/sendMessages/representative`, massageSend)
        .then((res) => {
          console.log(res.data);
        }).catch((error) => {
           
        });
      setSendMassage(!SendMassage);
    } catch (error) {
       
      window.alert("حدث خطأ");
    }
  };
  const viewSendMassage = async (id) => {
    setId(id);
    setSendMassage(!SendMassage);
  };

  const handelsearch = () => {
    if (search == "") setSearch(undefined);
    axiosConfige
      .get(`/auth/representative/searsh/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
         
        setError(error.massage);
      });
  };
  const getIdentity = async (id) => {
    axiosConfige.get(`/auth/representative/${id}`).then((res) => {
      setShowIdentity(true);
      setIdentity(res.data);
      console.log(res.data);
    });
  };
  const getLocation = async (id) => {
    axiosConfige.get(`/auth/representative/${id}`).then((res) => {
      setShowMap(true);
      setLocation(res.data.location);
    });
  };
  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/representative/approved/true")
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
  const deleteId = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف المندوب؟")) {
      axiosConfige
        .delete(`/auth/representative/${id}`)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const viewDetails = async (id) => {
    try {
      axiosConfige.get(`/auth/representative/${id}`).then((res) => {
        setDetails(res.data);
        setShowDetails(!showdetails);
      });
    } catch {
      setError(error);
       
    }
  };
  const closeMap = () => {
    setShowMap(false); // إخفاء الخريطة عند استدعاء closeMap
  };
  const closeIdentity = () => {
    setShowIdentity(false);
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
    axiosConfige
      .put(`/auth/representative/account/`, accountData)
      .then((res) => {
        console.log(res.data);
        setAccountTogele(false);
      });
  };
    const approvedData = () => {
      axiosConfige
        .get("/auth/representative/approved/true")
        .then((res) => {
          setData(res.data.data);
          setApproved(false);
        })
        .catch((error) => {
           
        });
    };
    const UnApprovedData = () => {
      axiosConfige
        .get("/auth/representative/approved/false")
        .then((res) => {
          setData(res.data.data);
          setApproved(true);
        })
        .catch((error) => {
           
        });
  };
   const approvData = (id) => {
     axiosConfige
       .get(`/auth/representative/approvedData/${id}`)
       .then((res) => {
         setData(data.filter((item) => item.id !== id));
       })
       .catch((error) => {
          
       });
   };
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
        <div className="filter">
          <button onClick={() => approvedData()}> المندوبين </button>
          <button onClick={() => UnApprovedData()}>
            المندوبين قيد الانتظار
          </button>
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
              <th>اسم المندوب</th>
              <th> المهام المكتملة</th>
              <th>المهام قيد التنفيذ</th>
              <th>حسابات و مستحقات</th>
              <th>مكان المندوب</th>
              <th>صور الهوية</th>
              <th>الاجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.missionComplet}</td>
                  <td>{item.missionUnComplet}</td>
                  <td>
                    <button
                      className="tableBtn"
                      onClick={() => openAccountTogele(item.id)}
                    >
                      حسابات و مستحقات
                    </button>
                  </td>
                  <td>
                    <button
                      className="tableBtn"
                      onClick={() => getLocation(item.id)}
                    >
                      مكان المندوب
                    </button>
                  </td>
                  <td>
                    <button
                      className="tableBtn"
                      onClick={() => getIdentity(item.id)}
                    >
                      صور الهوية
                    </button>
                  </td>
                  <td className={style.icon}>
                    <BsChatDots onClick={() => viewSendMassage(item.id)} />

                    <FaEye onClick={() => viewDetails(item.id)} />
                    {isAuthenticated && user == "admin" && approved && (
                      <FaCheck onClick={() => approvData(item.id)} />
                    )}
                    {isAuthenticated && user == "admin" && (
                      <FaTrashAlt onClick={() => deleteId(item.id)} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showMap && (
          <div className={style.drower} onClick={closeMap}>
            {typeof window !== "undefined" && (
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "50%", width: "50%" }}
                ref={mapRef}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>موقع المندوب</Popup>
                </Marker>
                <ChangeMapView center={position} />
              </MapContainer>
            )}
          </div>
        )}
        {showIdentity && (
          <div
            className={style.drower}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
            onClick={closeIdentity}
          >
            <img
              src={import.meta.env.VITE_API_URL + "/"+identity.identityFront}
              alt="img"
            />
            <img
              src={import.meta.env.VITE_API_URL+"/"+identity.identityBack}
              alt="img"
            />
          </div>
        )}
        {showdetails && (
          <div className={style.details}>
            <div className={style.detailsContainer}>
              <h1>تفاصيل المندوب</h1>
              <div className={style.detailsContent}>
                <div className={style.detailsItem}>
                  <p>اسم المندوب</p>
                  <p>{details.name}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> البريد الالكتروني</p>
                  <p>{details.email}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> رقم الهاتف</p>
                  <p>{details.phone}</p>
                </div>
                <div className={style.detailsItem}>
                  <p> الحساب</p>
                  <p>{details.accounts}</p>
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
