import "./App.css";
import { Routes, Route } from "react-router";
import { Signup } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
}

export default App;
