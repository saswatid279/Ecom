import { createContext, useState } from "react";
import { useContext } from "react";
import axios from "axios";
//import { cartReducer } from "../reducers/cartreducer";
export const AuthContext = createContext();

async function loginService(Email, Password) {
  const response =await axios.post("https://Homedecor.saswatidas.repl.co/user/login", {
    email: Email,
    password: Password
  });
  console.log(response.data);
  return response.data;
}

export const AuthProvider = ({ children }) => {
  // const loginStatus = JSON.parse(localStorage?.getItem("login"));
  //   loginStatus?.isUserLoggedin && setisUserLoggedin(true);

  const { isUserLoggedIn, token: savedToken } = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null };

  const [token, setToken] = useState(savedToken);
  const [userLogin, setLogin] = useState(isUserLoggedIn);
  //const user = { username: "saswati", password: "charlie" };

  // useEffect(() => {

  // }, []);

  async function loginWithDetails(Email, password) {
    // if (isUserLoggedin) {
    //   setisUserLoggedin(false);
    //   localStorage?.removeItem("login");
    // } else {
    //   if (user.username === username && user.password === password) {
    //     setisUserLoggedin((isUserLoggedin) => !isUserLoggedin);

    //     localStorage?.setItem(
    //       "login",
    //       JSON.stringify({ isUserLoggedin: true })
    //     );
    //   } else console.log("error in username or password");
    // }
    try {
      const response = await loginService(Email, password);
      console.log(response.data);
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("Wrong email and password", error);
    }

    function loginUser({ token }) {
      setToken(token);
      setLogin(true);
      localStorage?.setItem(
        "login",
        JSON.stringify({ isUserLoggedIn: true, token })
      );
    }
  }
  function logout() {
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        loginWithDetails,
        logout,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
