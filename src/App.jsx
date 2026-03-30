import VantaBackground from "./VantaBackground";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Loginpage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* GLOBAL BACKGROUND */}
      <VantaBackground />

      {/* ALL PAGES */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;