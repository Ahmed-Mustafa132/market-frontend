import { useState,useEffect } from "react";

import style from "./Home.module.css";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/ProdactCard/ProdactCard";
import axiosConfige from "../../Config/axiosConfige";
import {Link, useNavigate} from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axiosConfige.get("/product/approved/true").then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      });
    }
    fetchData();
  }, []); 
      const handelsearch = () => {
      if (search == ""){ setSearch(undefined)};
      axiosConfige
        .get(`/product/search/${search}`)
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error.massage);
        });
    };
    return (
      <section>
        <div className="filter">
          <button> الاكثر مبيعا</button>
          <button> المنتجات الجديدة</button>
        </div>
        <div className="search">
          <div className="searchInput">
            <input
              type="text"
              placeholder="بحث "
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handelsearch();
                }
              }}
            />{" "}
            <label htmlFor="search">
              <CiSearch />
            </label>
          </div>
          <div className={style.searchTypeContainer}>
            <p onClick={()=>handelsearch()} style={{ cursor: "pointer" }}>
              بحث
            </p>
          </div>
        </div>
        <div className={style.products}>
          {loading && (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <div className="loader">.</div>
            </div>
          )}
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </section>
    );
}
