import ProductListing from "./pages/product/Product";
import Cart from "./pages/cart/Cart.js";
import Wishlist from "./pages/wishlist/Wishlist";
// import Address from "./private/Address";
import Nomatch from "./pages/Nomatch";
import { useWishlist } from "./context/wishlist-context";
import { useCart } from "./context/cart-context";
import PrivateRoute from "./private/PrivateRoute";
import Home from "./pages/home/Home";
import "./route.css";
import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Productdetails from "./pages/product/Productdetail";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";


export default function Routepath() {
  const { wishlist } = useWishlist();
  const { itemsInCart } = useCart();
  const { userLogin } = useAuth();

  return (
    <>
      <div className="parent-container">
        <nav className="navbar">
          <div className="navbar-left">Home Decor</div>
          <div>
            <NavLink end className="navbar-right" activeStyle={{}} to="/">
              Home
            </NavLink>
            <NavLink
              end
              className="navbar-right"
              activeStyle={{}}
              to="/product"
            >
              Products
            </NavLink>
            <NavLink className="navbar-right" activeStyle={{}} to="/cart">
              Cart{itemsInCart.length}
            </NavLink>
            <NavLink className="navbar-right" activeStyle={{}} to="/wishlist">
              Wishlist {wishlist.length}
            </NavLink>
            {/* <NavLink className="navbar-right" activeStyle={{}} to="/address">
              Address
            </NavLink> */}
            <NavLink className="navbar-right" activeStyle={{}} to="/login">
              Login
            </NavLink>
            {/* <NavLink className="navbar-right" activeStyle={{}} to="/login">
              Login
            </NavLink> */}
          </div>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductListing />} />
          <Route path="/product/:productId" element={<Productdetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <PrivateRoute path="/cart" login={userLogin} element={<Cart />} />
          <PrivateRoute path="/wishlist" login={userLogin} element={<Wishlist />} />
          {/* <PrivateRoute
            path="/address"
            login={userLogin}
            element={<Address />}
          /> */}
          <Route path="*" element={<Nomatch />} />
        </Routes>
      </div>
    </>
  );
}
