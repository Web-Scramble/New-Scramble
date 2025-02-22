import "./App.css";
import { Routes, Route } from "react-router";
import { Signup,VerifyOtp,CreateAccount ,AccountSuccess} from "./pages/auth";
import { Toaster} from 'sonner'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/verify_otp/:phone" element={<VerifyOtp />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/account_success" element={<AccountSuccess />} />
    </Routes>
    <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
