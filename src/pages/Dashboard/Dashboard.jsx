import { useEffect, useState } from "react";
import axiosConfige from "../../Config/axiosConfige";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (user == "manger") navigate("manger");

    if (user == "representative") navigate("representative");

    if (user == "user") navigate("user");

    if (user == "market") navigate("market");
  }, []);

  return <div> مرحبا بك لوحة التحكم </div>;
}
