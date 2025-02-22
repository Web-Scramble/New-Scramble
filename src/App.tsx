import "./App.css";
import { Routes, Route } from "react-router";
import { Signup,VerifyOtp,CreateAccount,LandingPage} from "@/pages/auth";
import { Toaster} from 'sonner'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/verify_otp/:phone" element={<VerifyOtp />} />
      <Route path="/create_account/:phone" element={<CreateAccount />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
