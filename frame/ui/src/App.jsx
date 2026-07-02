import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import InvestigateApp from "./pages/InvestigateApp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/investigate" element={<InvestigateApp />} />
    </Routes>
  );
}
