import React, { lazy, Suspense } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const Home = lazy(() => import("./pages/Home/Home"));
const SingupMarket = lazy(() => import("./pages/Singup/SingupMarket"));
const SingupRep = lazy(() => import("./pages/Singup/SingupRep"));
const SingupUser = lazy(() => import("./pages/Singup/SingupUser"));
const LoginUser = lazy(() => import("./pages/Login/LoginUser"));
const LoginRep = lazy(() => import("./pages/Login/LoginRep"));
const LoginMarket = lazy(() => import("./pages/Login/LoginMarket"));
const LoginManger = lazy(() => import("./pages/Login/LoginManger"));
const ProductView = lazy(() => import("./pages/ProductView/ProductView"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <div className="loader">.</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductView />} />
          {/* login  */}
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/representative" element={<LoginRep />} />
          <Route path="/login/market" element={<LoginMarket />} />
          <Route path="/login/manger" element={<LoginManger />} />
          {/* singup  */}
          <Route path="/register/representative" element={<SingupRep />} />
          <Route path="/register/market" element={<SingupMarket />} />
          <Route path="/register/user" element={<SingupUser />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
