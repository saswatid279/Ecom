import { useEffect, useState } from "react";
import { useCart } from "../../context/cart-context";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import {ReactComponent as Emptybag } from "../../images/emptybag.svg"
import "./cart.css";
import { useWishlist } from "../../context/wishlist-context";

export default function Cart() {
  const { itemsInCart, dispatch } = useCart();
  const { wishlistdispatch } = useWishlist();
  const [total_price, settotalprice] = useState(0);
  const {userLogin}= useAuth()
  const navigate =useNavigate();

  useEffect(() => {
    if (itemsInCart.length !== 0)
      settotalprice(itemsInCart.reduce(calcprice, 0));
  },[itemsInCart]);

  useEffect(()=>{
    if(!userLogin){
      navigate("/login")
    }
  },[userLogin,navigate])

  function calcprice(total, item) {
    total = total + parseInt(item.quantity, 10) * parseInt(item.price, 10);
    console.log("total=", total);
    return total;
  }
  const removefromcart = (id) => {
    (async () => {
      const { success, product: data } = await axios
        .delete(`https://homedecors.herokuapp.com/cart/${id}`)
        .then((response) => {
          return response.data;
        });
      if (success) {
        dispatch({ type: "remove", payload: data._id });
      } else {
        console.log("error occured while removing item");
      }
    })();
  };
  const increaseqty = (item) => {
    (async () => {
      const { success} = await axios
        .post(`https://homedecors.herokuapp.com/cart/${item._id}`, {
          quantity: item.quantity + 1,
        })
        .then((response) => {
          return response.data;
        });
      if (success) {
        dispatch({ type: "increase", payload: item });
      } else {
        console.log("error");
      }
    })();
  };
  const decreaseqty = (item) => {
    (async () => {
      const { product: cartitem } = await axios
        .get(`https://homedecors.herokuapp.com/cart/${item._id}`)
        .then((response) => {
          return response.data;
        });
      if (cartitem.quantity > 1) {
        const { success } = await axios
          .post(`https://homedecors.herokuapp.com/cart/${item._id}`, {
            quantity: item.quantity - 1,
          })
          .then((response) => {
            return response.data;
          });
        if (success) {
          dispatch({ type: "decrease", payload: item });
        } else {
          console.log("error");
        }
      }
    })();
  };

  const movetowishlist = (item) => {
    (async () => {
      const { success, product: data } = await axios
        .delete(`https://homedecors.herokuapp.com/cart/${item._id}`)
        .then((response) => {
          console.log("remove", response.data);
          return response.data;
        });
      if (success) {
        dispatch({ type: "remove", payload: data._id });
      } else {
        console.log("error occured while removing item");
      }
    })();

    (async () => {
      console.log("wishlist");
      const { success, product: data } = await axios
        .post("https://homedecors.herokuapp.com/wishlist", {
          _id: item._id,
          info: item.info,
          name: item.name,
          price: item.price,
          quantity: 1,
          url: item.url,
          fastdelivery: item.fastdelivery,
          instock: item.instock,
        })
        .then((response) => {
          console.log("addtowishlist", response.data);
          return response.data;
        });
      
      if (success) {
        wishlistdispatch({ type: "addtowishlist", payload: data });
      } else {
        console.log("error");
      }
    })();
  };
  function Showitem(item) {
    return (
      <>
        <div
          className="cart-container"
        >
          <div className="left">
            <img src={item.url} alt="not available" width="100rem" />
          </div>
          <div className="right">
            <h4> {item.name}</h4>
            <p>Price: Rs.{item.price}</p>
            <p>
              Quantity: {item.quantity}
              <button className="qty-btn" onClick={() => increaseqty(item)}>
               <b>+</b>
              </button>
              <button className="qty-btn" onClick={() => decreaseqty(item)}>
                <b>-</b>
              </button>
            </p>
            <span>
              
              <button className="qty-btn" onClick={() => removefromcart(item._id)}>
                Remove
              </button>
              <button className="qty-btn" onClick={() => movetowishlist(item)}>
                Move to wishlist
              </button>
            </span>
          </div>
        </div>
      </>
    );
  }

  if (itemsInCart.length !== 0) {
    return (
      <div className="total-container">
        {itemsInCart.map(Showitem)}
        <p>Total Price={total_price}</p>
      </div>
    );
  } else {
    return (
      <div className="emptycart-container">
        <Emptybag width="8rem" height="8rem" />
        <div style={{ marginTop: "2rem", color: "gray" }}>
          <p>Your bag is empty</p>
        </div>
        <a href="/product" className="link-btn">
          Add some items
        </a>
      </div>
    );
  }
}

