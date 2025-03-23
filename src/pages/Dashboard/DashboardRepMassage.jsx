import { useEffect, useState } from "react";
import axiosConfige from "../../Config/axiosConfige";
import style from "./Dashboard.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
export default function Massages() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axiosConfige.get("/massage").then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
    } catch (error) {
        setLoading(false);
        setError(error)
    }
  }, []);
    
    if (loading) return <LoadingSpinner/>
    if (error) return <h1>{error.Massage}</h1>

    return (
        <main>
        <section>
              <h1>الرسائل</h1>
          {data.map((item) => {
              console.log(item)
                return (
                  <div className={style.massage} key={item._id}>
                    <h1> من {item.manger[0].name}</h1>
                    <p> {item.content}</p>
                  </div>
                );
            })}
      </section>
            </main>
  );
}
