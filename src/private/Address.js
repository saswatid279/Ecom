import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Address() {
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://JWTAuthentication.saswatidas.repl.co/user",
          { headers: { authorization: token } }
        );

        setUser(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          return navigate("/login");
        }
        setUser("error");
      }
    })();
  }, [token]);
  return (
    <>
      {user === null && <p> loading.. </p>}
      {user === "error" && <p style={{ color: "red" }}> some error.. </p>}
      {user?.name && (
        <p>
          {" "}
          {user.name} || {user.pincode}{" "}
        </p>
      )}
      <h1> This is Cart </h1>
    </>
  );
}
