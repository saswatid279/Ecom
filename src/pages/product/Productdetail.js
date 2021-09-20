import { useCart } from "../../context/cart-context";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Productdetails() {
  let { productId } = useParams();
  const [item, setitem] = useState({});
  const { dispatch } = useCart();
  useEffect(() => {
    (async () => {
      const { product: productdata } = await axios
        .get(`https://homedecor.saswatidas.repl.co/product/${productId}`)
        .then((response) => {
          // console.log(response.data);
          return response.data;
        });
      console.log(productdata);
      setitem(productdata);
    })();
  },[productId]);
  const Addtocart = (item) => {
    (async () => {
      const { success, product: data } = await axios
        .post("https://Homedecors.saswatidas.repl.co/cart", {
          _id: item._id,
          info: item.info,
          name: item.name,
          price: item.price,
          quantity: 1,
          url: item.url,
          fastdelivery: item.fastdelivery,
          instock: item.instock
        })
        .then((response) => {
          return response.data;
        });
      if (success) {
        dispatch({ type: "add", payload: data });
      } else {
        console.log("error");
      }
    })();
  };
  const Addtowishlist = (item) => {
    (async () => {
      const { success, product: data } = await axios
        .post("https://Homedecors.saswatidas.repl.co/wishlist", {
          _id: item._id,
          info: item.info,
          name: item.name,
          price: item.price,
          url: item.url,
          fastdelivery: item.fastdelivery,
          instock: item.instock
        })
        .then((response) => {
          return response.data;
        });
      if (success) {
        dispatch({ type: "ADD_TO_WISHLIST", payload: data });
      } else {
        console.log("error");
      }
    })();
  };
  
  return (
    <div class="productdetail-container">
      <div className="productdetail-img">
        <img src={item.url} alt="not available" />
      </div>
      <div className="productdetail-info">
        <h4>{item.name}</h4>
        <p>{item.info}</p>
        <button className="button" onClick={() => Addtocart(item)}>Add to Cart</button>
        <button className="button" onClick={() => Addtowishlist(item)}>Add to Wishlist</button>
      </div>
    </div>
  );
}
