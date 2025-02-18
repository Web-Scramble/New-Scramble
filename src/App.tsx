import "./App.css";
import { Routes, Route } from "react-router";
import { Signup,VerifyOtp,OtpSuccess } from "./pages/auth";
import { Toaster} from 'sonner'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/verify_otp" element={<VerifyOtp />} />
      <Route path="/success_otp" element={<OtpSuccess />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
