import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Signup, VerifyOtp, CreateAccount, LandingPage,AddPhone } from "@/pages/auth";
import Dashboard from "@/pages/home";
import WalletDashboard from "./pages/wallet";
import { Toaster } from "sonner";
import { TOKEN, USER_DATA } from "@/constants/keys";
import { getItemFromLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { authStore } from "./store/authstore";

function App() {
  const { token, reloading, setReloading, updateToken, updateUser } =
    authStore();

  useEffect(() => {
    const getSavedToken = async () => {
      const oldToken = await getItemFromLocalStorage(TOKEN);
      if (oldToken) {
        updateToken(oldToken);
      }
      console.log("reload", oldToken);
      const oldUser = await getItemFromLocalStorage(USER_DATA);
      if (oldUser) {
        updateUser(oldUser);
        console.log("reloaduser", oldUser);
      }
      setReloading(false);
    };
    getSavedToken();
  }, []);

  function RequireAuth({
    children,
    redirectTo,
  }: {
    children: React.ReactNode;
    redirectTo: string;
  }) {
    const location = useLocation();
    return token ? (
      children
    ) : (
      <Navigate
        to={redirectTo}
        replace={true}
        state={{ path: location.pathname }}
      />
    );
  }
  if (reloading) {
    return null;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify_otp/:phone" element={<VerifyOtp />} />
        <Route path="/create_account/:phone" element={<CreateAccount />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add_phone" element={<AddPhone />} />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo={"/signup"}>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/wallet"
          element={
            <RequireAuth redirectTo={"/signup"}>
              <WalletDashboard />
            </RequireAuth>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
