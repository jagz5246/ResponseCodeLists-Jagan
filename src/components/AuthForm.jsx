import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Toast from "./Toast";
import Loader from "./Loader";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      let userData;
      setIsLoading(true);
      if (isLogin) {
        userData = await signInWithEmailAndPassword(auth, email, password);
      } else {
        if(password.length > 6 && password  === cnfpassword) {
          userData = await createUserWithEmailAndPassword(auth, email, password);
          setMessage("Account created succefully");
          setShowToast(true);
        }
        else if(password.length < 6) {
          setError("Password must be at least 6 characters long");
          setIsLoading(false);
          return;
        }
        else if(password !== cnfpassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
      }      
      setIsLoading(false);
      setTimeout(()=> navigate('/lists'), 2000)
      
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="loginContainer">
      {showToast && <Toast message={message}/>}
      {isLoading && <Loader />}
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }} />
        {!isLogin && <label htmlFor="password">Confirm Password:</label>}
        {!isLogin && <input type="password" name="cnfpassword" placeholder="Confirm Password" onChange={(e) => {
          setCnfPassword(e.target.value);
          setError("");
        }}/>}
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      {isLogin ? <p>Don't have an account? <a className="loginLink" onClick={() => setIsLogin(!isLogin)}>Sign up</a></p> : <p>Already have an account? <a className="loginLink" onClick={() => setIsLogin(!isLogin)}>Log in</a></p>}
      {/* <a onClick={() => setIsLogin(!isLogin)}>{isLogin ? "First time here? Create an account" : "Already have an account? Log In"}</a> */}
    </div>
  );
};

export default AuthForm;
