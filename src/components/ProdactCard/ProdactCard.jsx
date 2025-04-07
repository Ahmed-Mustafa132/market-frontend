import style from "./ProdactCard.module.css";
import { MdOutlineStar } from "react-icons/md";

export default function ProdactCard({ product }) {
    return (
      <div className={style.card}>
        <div className={style.image}>
          <img src={product.image.url} alt="prodact" />
        </div>
        <h3> {product.title}</h3>
        <p>{product.description} </p>
        <div className={style.priceAndRate}>
          <p className={style.rate}>
            {" "}
            {product.averageRating} <MdOutlineStar />
          </p>
          <p>${product.price}</p>
        </div>
      </div>
    );
}