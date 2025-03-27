import { useState,useEffect } from "react";

import style from "./Home.module.css";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/ProdactCard/ProdactCard";
import axiosConfige from "../../Config/axiosConfige";
import {Link, useNavigate} from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosConfige.get("/product").then((res) => {
      setProducts(res.data.data);
      setLoading(false);
    });
  }, []); 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const selectSearchType = (type) => {
    setSearchType(type);
    setIsDropdownOpen(false);
  };
    return (
      <section>
        <div className="filter">
          <button> الاكثر مبيعا</button>
          <button> المنتجات الجديدة</button>
        </div>
        <div className=
        'search'>
          <div className='searchInput'>
            <input type="text" placeholder="بحث " name="search" />
            <label htmlFor="search">
              <CiSearch />
            </label>
          </div>
          <div className={style.searchTypeContainer}>
            <p onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              البحث في {searchType}
            </p>
            {isDropdownOpen && (
              <div className={style.searchDropdown}>
                <div onClick={() => selectSearchType("المنتجات")}>
                  بحث عن المنتجات
                </div>
                <div onClick={() => selectSearchType("المتاجر")}>
                  بحث عن المتاجر
                </div>
              </div>
            )}
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
