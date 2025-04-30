import { lazy, Suspense } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";

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
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import AuthChecker from "./components/AuthChecker/AuthChecker";
// representative import
import SidebarRep from "./components/Sidebar/SidebarRep";
import DashboardRep from "./pages/Dashboard/Representative/DashboardRep";
import DashboardRepCompletMission from "./pages/Dashboard/Representative/DashboardRepCompletMission";
import DashboardRepUnCompletMission from "./pages/Dashboard/Representative/DashboardRepUnCompletMission";
import Massages from "./pages/Dashboard/Representative/DashboardRepMassage";
import DashboardRepClients from "./pages/Dashboard/Representative/DashboardRepClients";
// manger import
import SidebarManger from "./components/Sidebar/SidebarManger";
import DashboardManger from "./pages/Dashboard/Manger/DashboardManger";
import DashboardMangerMission from "./pages/Dashboard/Manger/DashboardMangerMission";
import DashboardMangerRepresentative from "./pages/Dashboard/Manger/DashboardMangerRepresentative";
import DashboardMangerUsers from "./pages/Dashboard/Manger/DashboardMangerUsers";
import DashboardMangerMangers from "./pages/Dashboard/Manger/DashboardMangerMangers";
import DashboardMangerMarkets from "./pages/Dashboard/Manger/DashboardMangerMarkets";
import DashboardMangerOrder from "./pages/Dashboard/Manger/DashboardMangerOrder";
import DashboardMangerProducts from "./pages/Dashboard/Manger/DashboardMangerProducts";
import DashboardMangerMassage from "./pages/Dashboard/Manger/DashboardMangerMassage";

// market import
import SidebarMarket from "./components/Sidebar/SidebarMarket";
import DashboardMarketCompletMission from "./pages/Dashboard/Market/DashboardMarketCompletMission";
import DashboardMarketUnCompletMission from "./pages/Dashboard/Market/DashboardMarketUnCompletMission";
import DashboardMarketProducts from "./pages/Dashboard/Market/DashboardMarketProducts";
import DashboardMarket from "./pages/Dashboard/Market/DashboardMarket";
import DashboardMarketClients from "./pages/Dashboard/Market/DashboardMarketClients";
import DashboardMarketMassage from "./pages/Dashboard/Market/DashboardMarketMassage";
import NotFound from "./pages/NotFound/NotFound";
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return children;
}
const DashboardMarketLayout = ({ children }) => {
  return (
    <div>
      <SidebarMarket />
      {children}
    </div>
  );
};

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
            {/* Rep route */}
            <Route
              path="/dashboard/representative/"
              element={
                <DashboardRepresentativeLayout>
                  <DashboardRep />
                </DashboardRepresentativeLayout>
              }
            />
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
              path="dashboard/representative/clients"
              element={
                <DashboardRepresentativeLayout>
                  <DashboardRepClients />
                </DashboardRepresentativeLayout>
              }
            />
            <Route
              path="/Dashboard/representative/massages"
              element={
                <DashboardRepresentativeLayout>
                  <Massages />
                </DashboardRepresentativeLayout>
              }
            />
            {/* manger Route  */}
            <Route
              path="/Dashboard/manger"
              element={
                <DashboardMangerLayout>
                  <DashboardManger />
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
            <Route
              path="/dashboard/manger/orders"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerOrder />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="/dashboard/manger/Products"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerProducts />
                </DashboardMangerLayout>
              }
            />
            <Route
              path="/dashboard/manger/massages"
              element={
                <DashboardMangerLayout>
                  <DashboardMangerMassage />
                </DashboardMangerLayout>
              }
            />
            {/* market Route  */}
            <Route
              path="/dashboard/market/"
              element={
                <DashboardMarketLayout>
                  <DashboardMarket />
                </DashboardMarketLayout>
              }
            />
            <Route
              path="/dashboard/market/completmission"
              element={
                <DashboardMarketLayout>
                  <DashboardMarketCompletMission />
                </DashboardMarketLayout>
              }
            />
            <Route
              path="/dashboard/market/uncompletmission"
              element={
                <DashboardMarketLayout>
                  <DashboardMarketUnCompletMission />
                </DashboardMarketLayout>
              }
            />
            <Route
              path="/dashboard/market/products"
              element={
                <DashboardMarketLayout>
                  <DashboardMarketProducts />
                </DashboardMarketLayout>
              }
            />
            <Route
              path="/dashboard/market/Clients"
              element={
                <DashboardMarketLayout>
                  <DashboardMarketClients />
                </DashboardMarketLayout>
              }
            />
            <Route
              path="dashboard/market/massages"
              element={
                <DashboardMarketLayout>
                  <DashboardMarketMassage />
                </DashboardMarketLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
