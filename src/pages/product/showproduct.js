import "./product.css";
import { Link } from "react-router-dom";

export default function Showproducts(item) {
  return (
    <>
      <Link
        to={`/product/${item._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="productcard">
          <img src={item.url} alt="not available" width="100%" />
          <div class="card-content">
            <h4>{item.name}</h4>
            <p>Rs.{item.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
