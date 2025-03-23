import React, { lazy, Suspense, useEffect } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
import DashboardRepCompletMission from "./pages/Dashboard/Representative/DashboardRepCompletMission";
import DashboardRepUnCompletMission from "./pages/Dashboard/Representative/DashboardRepUnCompletMission";
import Massages from "./pages/Dashboard/DashboardRepMassage";
import SidebarRep from "./components/Sidebar/SidebarRep";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import SidebarManger from "./components/Sidebar/SidebarManger";
import DashboardManger  from "./pages/Dashboard/Manger/DashboardManger"
import DashboardMangerMission from "./pages/Dashboard/manger/DashboardMangerMission";
import DashboardMangerRepresentative from "./pages/Dashboard/manger/DashboardMangerRepresentative";
import DashboardMangerUsers from "./pages/Dashboard/manger/DashboardMangerUsers";
import DashboardMangerMangers from "./pages/Dashboard/manger/DashboardMangerMangers";
import DashboardMangerMarkets from "./pages/Dashboard/manger/DashboardMangerMarkets";
import AuthChecker from "./components/AuthChecker/AuthChecker";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return children;
}

const DashboardRepresentativeLayout = ({ children }) => {
  return (
    <div>
      <SidebarRep />
      {children}
    </div>
  );
};
const DashboardMangerLayout = ({ children }) => {
  return (
    <div>
      <SidebarManger />
      {children}
    </div>
  );
};
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthChecker />
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/representative/completmission"
              element={
                <DashboardRepresentativeLayout>
                  <DashboardRepCompletMission />
                </DashboardRepresentativeLayout>
              }
            />
            <Route
              path="/dashboard/representative/uncompletmission"
              element={
                <DashboardRepresentativeLayout>
                  <DashboardRepUnCompletMission />
                </DashboardRepresentativeLayout>
              }
            />
            <Route
              path="/Dashboard/massages"
              element={
                <DashboardRepresentativeLayout>
                  <Massages />
                </DashboardRepresentativeLayout>
              }
            />
            <Route
              path="/Dashboard/manger"
              element={<DashboardMangerLayout>
                <DashboardManger/>
              </DashboardMangerLayout>
              }
            />
            <Route
              path="/dashboard/manger/mission"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerMission />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="dashboard/manger/representative"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerRepresentative />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="dashboard/manger/users"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerUsers />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="dashboard/manger/manger"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerMangers />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="/dashboard/manger/market"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerMarkets />
                </DashboardMangerLayout>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
