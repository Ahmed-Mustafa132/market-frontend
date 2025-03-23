import React, { createContext, useState, useEffect, useContext } from "react";
import axiosConfige from "../Config/axiosConfige";

// إنشاء السياق
const AuthContext = createContext();

// مزود السياق (Provider)
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // دالة للتحقق من المصادقة
const checkAuth = async () => {
  try {
    const response = await axiosConfige.get("/auth/user/checkauth");
    if (response.status === 200) {
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    setUser(null);
    setIsAuthenticated(false);
  }
};


  // التحقق من المصادقة عند تحميل التطبيق
  useEffect(() => {
    checkAuth();
  }, []);

  // دالة لتسجيل الخروج
  const logout = async () => {
    try {
      // استدعاء نقطة نهاية تسجيل الخروج إذا كانت موجودة
      localStorage.removeItem("token");
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // القيم التي سيتم توفيرها للتطبيق
  const value = {
    isAuthenticated,
    user,
    checkAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// دالة مساعدة لاستخدام سياق المصادقة
export function useAuth() {
  return useContext(AuthContext);
}
