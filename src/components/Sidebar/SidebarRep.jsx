import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUsers,
  FaHourglassHalf,
  FaCheckSquare,
  FaBell,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import style from "./Sidebar.module.css";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axiosConfige from "../../Config/axiosConfige";
import SidebarWrapper from "./SidebarWrapper";

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

export default function SidebarRep() {
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

  const position = [
    location?.latitude || 30.0444,
    location?.longitude || 31.2357,
  ];

  const uploudLocation = () => {
    const res = axiosConfige
      .put("/auth/representative", location)
      .then((res) => {
        console.log(res);
      });
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          setShowMap(true); // إظهار الخريطة عند تحديث الموقع
          console.log("تم تحديث الموقع:", newLocation);
          uploudLocation();
        },
        (error) => {
          console.error("خطأ في تحديد الموقع:", error);
          alert("حدث خطأ في تحديد الموقع: " + error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("متصفحك لا يدعم تحديد الموقع");
    }
  };
  const closeMap = () => {
    setShowMap(false); // إخفاء الخريطة عند استدعاء closeMap
  };

  return (
    <SidebarWrapper>
      <Link to="/dashboard/representative">
        <div className={style.item}>
          <div className={style.icon}>
            <FaHome />
          </div>
          <p>الرئيسية</p>
        </div>
      </Link>

      <Link to="/dashboard/representative/massages">
        <div className={style.item}>
          <div className={style.icon}>
            <FaBell />
          </div>
          <p>التنبيهات</p>
        </div>
      </Link>

      <Link to="/dashboard/representative/completmission">
        <div className={style.item}>
          <div className={style.icon}>
            <FaCheckSquare />
          </div>
          <p>المهام المكتملة</p>
        </div>
      </Link>

      <Link to="/dashboard/representative/uncompletmission">
        <div className={style.item}>
          <div className={style.icon}>
            <FaHourglassHalf />
          </div>
          <p>المهمام الجارية</p>
        </div>
      </Link>
      <Link to="/dashboard/representative/clients">
        <div className={style.item}>
          <div className={style.icon}>
            <FaUsers />
          </div>
          <p>العملاء</p>
        </div>
      </Link>
      <div className={style.item} onClick={getLocation}>
        <div className={style.icon}>
          <FaMapMarkerAlt />
        </div>
        <p>تحديد الموقع</p>
      </div>

      {showMap && (
        <div className={style.map} onClick={closeMap}>
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
    </SidebarWrapper>
  );
}
