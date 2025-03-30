import { useEffect, useState } from "react";
import axiosConfige from "../../../Config/axiosConfige";
import style from "../Dashboard.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
export default function DashboardRepMassage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

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

  if (loading) return <LoadingSpinner />;
  if (error) return <h1>{error.Massage}</h1>;

  return (
    <main>
      <section>
        <h1>الرسائل</h1>
        {data.map((item) => {
          return (
            <div className={style.massage} key={item.id}>
              <h1> من {item.manger.name}</h1>
              <p> {item.massage}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
