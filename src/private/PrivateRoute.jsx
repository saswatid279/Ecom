import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
//import { useLocation } from "react-router-dom";

export default function PrivateRoute({ path, ...props }) {
  const { isUserLoggedin } = useAuth();

  return isUserLoggedin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
