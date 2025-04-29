import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token || authStatus) {
        //Already Legged in...
    } else {
      navigate("/signin");
    }
  }, []);

  return <>{children}</>;
}

export default AuthLayout;
