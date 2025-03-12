import Sidebar from "@/components/features/home/sidebar";
import ProfileCard from "@/components/features/home/profilecard";
import SearchHeader from "@/components/features/home/search_header";
import SuggestedUsers from "@/components/features/home/users_card";
import ChallengeHeader from "@/components/features/home/challengeHeader";
import { ChallengeCard } from "@/components/features/home/challenge_card";
import { mockChallengeData } from "@/constants/mock";
import TrendingChallenges from "@/components/features/home/trending_challenges";
import { useState, useEffect } from "react";
import { messaging } from "@/services/firebase";
import { onMessage } from "firebase/messaging";
import { requestForToken } from "@/services/request_fcm_token";
import { registerDevice } from "@/api/user";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await requestForToken();
        if (token) {
          setToken(token);
          (async () => {
            try {
              const data = await registerDevice({ fcm_token: token });
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          })();
        }
      }
    };
    console.log(token);
    const unsubscribe = onMessage(messaging, ({ notification }) => {
      if (notification) {
        new Notification(notification.title || "notification title", {
          body: notification?.body,
          icon: notification.icon,
        });
      }
    });

    window.addEventListener("click", getToken, { once: true });

    return () => {
      window.removeEventListener("click", getToken);
      unsubscribe();
    };
  }, []);

  return (
    <main className="flex h-full gap-4 w-full bg">
      <Sidebar />
      <section className="flex flex-col gap-2 ml-68 w-full">
        <SearchHeader />
        <div className="pl-0 p-6">
          <div className=" bg-[#F9F9FA] rounded-[12px] flex flex-col gap-4 p-6">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
