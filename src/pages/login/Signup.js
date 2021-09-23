import { useState,useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate,useLocation } from "react-router";
import "./login.css"

export default function Signup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const { state } = useLocation();
    const { createUser,userLogin } = useAuth();
    const Navigate = useNavigate();

   

    function clickHandler(Name,Email,Password){
        console.log("click",Email)
        createUser(Name,Email,Password);
    }
    useEffect(() => {
        console.log("userlogin"+userLogin)
        if (userLogin) {
           Navigate(state?.from ? state.from : "/");
        }
      }, [userLogin, Navigate,state]);
    return(
        <div className="login-container">
            <div>
            <label>
                Username:
                <input className="input" type="text"  onChange={(e)=>{setName(e.target.value)}}  placeholder="Enter your username"/>
            </label>
            <label>
                Email:
                <input className="input" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
            </label>
            <label>
                Password:
                <input className="input" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password"/>
            </label>
            
            <button className="btn" onClick={()=>clickHandler(name,email,password)}>Create account</button>
            </div>
        </div>
    );
}