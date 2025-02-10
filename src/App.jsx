import { BrowserRouter, Routes, Route } from "react-router-dom"
import Singuprep from "./pages/singup/singup"
import "./app.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/singuprep" element={<Singuprep />} />
      </Routes>
    </BrowserRouter>
  );
} 