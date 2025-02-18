import "./App.css";
import { Routes, Route } from "react-router";
import { Signup,VerifyOtp,OtpSuccess } from "./pages/auth";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/verify_otp" element={<VerifyOtp />} />
      <Route path="/success_otp" element={<OtpSuccess />} />
    </Routes>
  );
}

export default App;
