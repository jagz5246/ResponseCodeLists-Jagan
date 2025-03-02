import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      let userData;
      if (isLogin) {
        userData = await signInWithEmailAndPassword(auth, email, password);
      } else {
        if(password.length > 6 && password  === cnfpassword) {
          userData = await createUserWithEmailAndPassword(auth, email, password);
        }
        else if(password.length < 6) {
          setError("Password must be at least 6 characters long");
          return;
        }
        else if(password !== cnfpassword) {
          setError("Passwords do not match");
          return;
        }
      }
      navigate('/lists');
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="loginContainer">
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
