import { BrowserRouter, Routes, Route } from "react-router-dom"
import Singuprep from "./pages/singupRep/singupRep"
import SingupMarket from "./pages/singupMarket/singupMarket";
import "./app.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/singupRep" element={<Singuprep />} />
        <Route path="/singupMarket" element={<SingupMarket />} />
      </Routes>
    </BrowserRouter>
  );
} 
