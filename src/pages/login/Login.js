import { useAuth } from "../../context/AuthProvider";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const { userLogin, loginWithDetails, logout } = useAuth();
  const Navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  console.log({ state });
  function clickHandler(name, password) {
    userLogin ? logout() : loginWithDetails(email, password);
    Navigate(state?.from ? state.from : "/");
  }
  return (
    <div className="login-container">
      <div>
        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="input"
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button className="btn" onClick={() => clickHandler(email, password)}>
          {userLogin ? "Logout" : "Login"}
        </button>
        <span className="signup">Create a new account</span><Link to="/signup"><button className="signup-btn">Sign up</button></Link>
      </div>
      
    </div>
  );
}
