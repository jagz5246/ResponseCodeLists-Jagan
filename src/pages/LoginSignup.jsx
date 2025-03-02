import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginSignup = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate('/lists');
  })
  return (
    <div>
      <h1>Welcome</h1>
      <AuthForm />
    </div>
  );
};

export default LoginSignup;
