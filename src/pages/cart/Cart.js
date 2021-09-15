import { useEffect, useState } from "react";
import { useCart } from "../../context/cart-context";
import axios from "axios";
import { ReactComponent as Emptybag } from "../../images/shopping-basket.svg";
import "./cart.css";
import { useWishlist } from "../../context/wishlist-context";
export default function Cart() {
  const { itemsInCart, dispatch } = useCart();
  const { wishlistdispatch } = useWishlist();
  const [total_price, settotalprice] = useState(0);

  useEffect(() => {
    if (itemsInCart.length !== 0)
      settotalprice(itemsInCart.reduce(calcprice, 0));
  });
  function calcprice(total, item) {
    total = total + parseInt(item.quantity, 10) * parseInt(item.price, 10);
    console.log("total=", total);
    return total;
  }
  // const removefromcart = (id) => {
  //   (async () => {
  //     const { success, product: data } = await axios
  //       .delete(`https://homedecor.saswatidas.repl.co/cart/${id}`)
  //       .then((response) => {
  //         return response.data;
  //       });
  //     if (success) {
  //       dispatch({ type: "remove", payload: id });
  //     } else {
  //       console.log("error occured while removing item");
  //     }
  //   })();
  // };
  const increaseqty = (item) => {
    (async () => {
      const { success, product: data } = await axios
        .post(`https://homedecor.saswatidas.repl.co/cart/${item._id}`, {
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
        .get(`https://homedecor.saswatidas.repl.co/cart/${item._id}`)
        .then((response) => {
          return response.data;
        });
      if (cartitem.quantity > 1) {
        const { success, product: data } = await axios
          .post(`https://homedecor.saswatidas.repl.co/cart/${item._id}`, {
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
        .delete(`https://homedecor.saswatidas.repl.co/cart/${item._id}`)
        .then((response) => {
          console.log("remove", response.data);
          return response.data;
        });
      if (success) {
        dispatch({ type: "remove", payload: item._id });
      } else {
        console.log("error occured while removing item");
      }
    })();

    (async () => {
      console.log("wishlist");
      const { success, product: data } = await axios
        .post("https://homedecor.saswatidas.repl.co/wishlist", {
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
      //console.log(data);
      //console.log(success);
      if (success) {
        wishlistdispatch({ type: "addtowishlist", payload: item });
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
          style={{
            border: `1px solid black`,
            padding: `1rem`,
            margin: `1rem`,
            width: "auto",
          }}
        >
          <div className="left">
            <img src={item.url} width="100rem" />
          </div>
          <div className="right">
            <li key={item.id}> {item.name}</li>
            <p>Price: Rs.{item.price}</p>
            <p>
              Quantity: {item.quantity}
              <button className="qty-btn" onClick={() => increaseqty(item)}>
                +
              </button>
              <button className="qty-btn" onClick={() => decreaseqty(item)}>
                -
              </button>
            </p>
            <span>
              {/* <button className=" " onClick={() => increaseqty(item)}>
                +
              </button>
              <button className=" " onClick={() => decreaseqty(item)}>
                -
              </button> */}
              {/* <button className="btn" onClick={() => removefromcart(item._id)}>
                Remove
              </button>
              <button className="btn" onClick={() => movetowishlist(item)}>
                Move to wishlist
              </button> */}
            </span>
          </div>
        </div>
      </>
    );
  }

  if (itemsInCart.length !== 0) {
    return (
      <>
        {itemsInCart.map(Showitem)}
        <p>Total Price={total_price}</p>
      </>
    );
  } else {
    return (
      <div className="emptycart-container">
        <Emptybag width="8rem" height="8rem" />
        <div style={{ marginTop: "2rem", color: "gray" }}>
          <p>Your bag is empty</p>
        </div>
        <a href="/product/:productId" className="link-btn">
          Add some items
        </a>
      </div>
    );
  }
}
