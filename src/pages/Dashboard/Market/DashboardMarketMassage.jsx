import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
export default function DashboardMarketMassage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [massage, setMassage] = useState();
  const [SendMassage, setSendMassage] = useState(false);
  const [MangerID, setMangerID] = useState(null);

  useEffect(() => {
    try {
      axiosConfige.get("/massage/messages").then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);
  const massageSubmite = async () => {
    const massageSend = {
      managerId: MangerID,
      massage: massage,
    };
    try {
      axiosConfige
        .post(`/massage/sendMessages/manger`, massageSend)
        .then((res) => {
          console.log(res.data.data);
        });
      setSendMassage(!SendMassage);
    } catch (error) {
      window.alert("حدث خطأ");
    }
  };
  const openSendMassage = (id) => {
    setMangerID(id);
    setSendMassage(!SendMassage);
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error.Massage}</h1>;

  return (
    <main>
      <section>
        <h1>الرسائل</h1>
        {data.map((item) => {
          return (
            <div className={style.massage} key={item._id}>
              <h1> من {item.manger.name}</h1>
              <p> {item.massage}</p>
              <button
                className={style.replyButton}
                onClick={() => openSendMassage(item.manger._id)}
              >
                رد
              </button>
            </div>
          );
        })}
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
      </section>
    </main>
  );
}
