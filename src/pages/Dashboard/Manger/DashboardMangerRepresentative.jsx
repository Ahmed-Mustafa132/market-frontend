import { useEffect, useState, useRef } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
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
  const [search, setSearch] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const [location, setLocation] = useState([]);
  const [showIdentity, setShowIdentity] = useState(false)
  const [identity, setIdentity] = useState([]);
    const [showdetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState([]);
  const position = [
    location?.latitude || 30.0444,
    location?.longitude || 31.2357,
  ];

  const handelsearch = () => {
    if (search == "") setSearch(undefined);
    axiosConfige
      .get(`/auth/representative/searsh/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.massage);
      });
  };
  const getIdentity = async (id) => {
      axiosConfige.get(`/auth/representative/${id}`).then((res) => {
        setShowIdentity(true);
        setIdentity(res.data);
        console.log(res.data)
      });
  }
  const getLocation = async (id) => {
    axiosConfige.get(`/auth/representative/${id}`).then((res) => {
      setShowMap(true);
      setLocation(res.data.location);
    });
  };
  useEffect(() => {
    try {
      axiosConfige
        .get("/auth/representative/")
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data.massage);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };
  const closeMap = () => {
    setShowMap(false); // إخفاء الخريطة عند استدعاء closeMap
  };
  const closeIdentity = ()=>{
    setShowIdentity(false)
  }
    if (loading) return <LoadingSpinner />;
    if (error) return <h1>{error}</h1>;
  return (
    <main>
      <section>
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
                    <button className="tableBtn">حسابات و مستحقات</button>
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
                    <FaCheckSquare onClick={() => viewDetails(item.id)} />
                    <FaTrashAlt onClick={() => deleteId(item.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showMap && (
          <div className={style.drower} onClick={closeMap}>
            {console.log(position)}
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
            {console.log(identity)}
            <img
              src={identity.identityFront}
              alt="img"
              style={{ width: "70%" }}
            />
            <img
              src={identity.identityBack}
              alt="img"
              style={{ width: "70%" }}
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
                </div>{" "}
                <div className={style.detailsItem}>
                  <p> رقم الهاتف</p>
                  <p>{details.phone}</p>
                </div>
              </div>
              <button onClick={() => setShowDetails(!showdetails)}>
                اغلاق
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
