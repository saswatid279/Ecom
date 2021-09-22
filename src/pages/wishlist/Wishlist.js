import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { useWishlist } from "../../context/wishlist-context";
// import { useCart } from "../../context/cart-context";
import "./wishlist.css";
 import axios from "axios";
// import { ReactComponent as Wishlistsvg } from "../../images/wishlist.svg";

export default function Wishlist() {
  const { wishlist,wishlistdispatch } = useWishlist();
  const {userLogin}= useAuth()
  const navigate =useNavigate();
  //const { dispatch } = useCart();

  useEffect(() => {
    (async () => {
      const { success, products: data } = await axios
        .get("https://homedecor.saswatidas.repl.co/wishlist")
        .then((response) => {
          return response.data;
        });
        if(success)
      wishlistdispatch({ type: "fetch", payload: data });
    })();
  }, [wishlistdispatch]);

  const removefromwishlist = (id) => {
    (async () => {
      const { success, product:data } = await axios
        .delete(`https://homedecor.saswatidas.repl.co/wishlist/${id}`)
        .then((response) => {
          return response.data;
        });
      if (success) {
        wishlistdispatch({ type: "remove", payload: data._id });
      } else {
        console.log("error occured while removing item");
      }
    })();
  };
  // const Addtocart = (item) => {
  //   console.log(item._id);
  //   (async () => {
  //     const { success, product: data } = await axios
  //       .post("https://homedecor.saswatidas.repl.co/cart", {
  //         _id: item._id,
  //         info: item.info,
  //         name: item.name,
  //         price: item.price,
  //         quantity: 1,
  //         url: item.url,
  //         fastdelivery: item.fastdelivery,
  //         instock: item.instock
  //       })
  //       .then((response) => {
  //         return response.data;
  //       });

  //     if (success) {
  //       dispatch({ type: "add", payload: item });
  //     } else {
  //       console.log("error");
  //     }
  //   })();
  // };
  useEffect(()=>{
    if(!userLogin){
      navigate("/login")
    }
  },[userLogin,navigate])
  function Showiteminwishlist(item) {
    if (wishlist !== " ")
      return (
        <div className="productcard">
          <img src={item.url} alt="not available" width="100%" />
          <div class="card-content">
            <h4>{item.name}</h4>
            <p>Rs.{item.price}</p>
            <button className="remove-btn" onClick={() => removefromwishlist(item._id)}>
              Remove
             </button>
          </div>
        </div>

        // <div
        //   style={{
        //     border: `1px solid black`,
        //     padding: `1rem`,
        //     margin: `1rem`
        //   }}
        // >
        //   <li key={item._id}> {item.name}</li>
        //   <p>{item.price}</p>
        //   <span>
        //     <button className=" " onClick={() => removefromwishlist(item._id)}>
        //       Remove
        //     </button>
        //     <button className=" " onClick={() => Addtocart(item)}>
        //       Add to Cart
        //     </button>
        //   </span>
        // </div>
      );
    else return <div></div>;
  }
  if (wishlist.length !== 0)
    return (
      <div class="productcard-container">
        {wishlist.map(Showiteminwishlist)}
      </div>
    );
  else {
    return (
      <div class="wishlist-container">
        <div className="card-w">
          <p>Your wishlist is empty</p>
          <div>
            <a href="/product/:productId" className="link-btn">
              Start shopping
            </a>
          </div>
        </div>
      </div>
    );
  }
}
