import { createContext, useState } from "react";
import { useContext } from "react";
import axios from "axios";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {


  const { isUserLoggedIn, token: savedToken } = JSON.parse(
    localStorage?.getItem("login")
  ) || { isUserLoggedIn: false, token: null };

  const [token, setToken] = useState(savedToken);
  const [userLogin, setLogin] = useState(isUserLoggedIn);
 
  async function createUser(Username,Email,Password){
    try {
      console.log("createuser")
      const response = await axios.post(
        "BASE_URL/user",
        {
          username:Username,
          email: Email,
          password: Password,
        }
      );
      
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("Unable to Sign up", error);
    }
  }

  

  async function loginWithDetails(Email, Password) {
   
    try {
      const response = await axios.post(
        "BASE_URL/user/login",
        {
          email: Email,
          password: Password,
        }
      );
      
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("Wrong email and password", error);
    }
   
  }

  //login
  function loginUser({ token }) {
    console.log("token", token);
    setToken(token);
    setLogin(true);
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token })
    );
  }


  function logout() {
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        createUser,
        userLogin,
        loginWithDetails,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
