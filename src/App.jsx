import React, { lazy, Suspense } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const Home = lazy(() => import("./pages/Home/Home"));
const SingupMarket = lazy(() => import("./pages/Singup/SingupMarket"));
const SingupRep = lazy(() => import("./pages/Singup/SingupRep"));

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
          <Route path="/register-store" element={<SingupMarket />} />
          <Route path="/register-representative" element={<SingupRep />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
