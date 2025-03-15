import Sidebar from "@/components/features/home/sidebar";
import SearchHeader from "@/components/features/home/search_header";
import { mockChallengeData } from "@/constants/mock";

import { useState, useEffect } from "react";
import { messaging } from "@/services/firebase";
import { onMessage } from "firebase/messaging";
import { requestForToken } from "@/services/request_fcm_token";
import { registerDevice } from "@/api/user";
import { ChallengeStats } from "@/components/features/challenges/challengeStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChallengesCard } from "@/components/features/challenges/challenges_card";

export default function AllChallenges() {
  const [token, setToken] = useState("");
  const [activeType, setActiveType] = useState(0);
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
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <section className="w-full flex flex-col gap-8 ml-68">
        <SearchHeader page="Home" />
        <section className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4 items-start">
            <h3 className="text-[#343538] leading-[40px] text-[32px] font-bold tracking-[-0.64px]">
              Your Challenge Stats
            </h3>
            <p className="text-xs leading-[14px] text-[#989CA7]">
              Manage all the challenges you have created on scramble
            </p>

            <div className="w-[95%] flex justify-between">
              <div className="w-full flex justify-start gap-16">
                <ChallengeStats amount="2.3k" title="Total Created" />
                <ChallengeStats amount="2.3k" title="Total Created" />
                <ChallengeStats amount="2.3k" title="Total Created" />
              </div>

              <Button
                variant={"outline"}
                className=" border-2 border-primary rounded-sm text-primary font-bold h-12 px-4 flex items-center justify-start"
              >
                <Plus className="h-12 w-12 mr-2 text-primary" />
                <span>New Challenge</span>
              </Button>
            </div>

            <div className="flex gap-4 items-center mt-8">
                {Types.map((type, index) => {
                  const isActive = activeType === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveType(index)}
                      className={`w-fit h-fit  justify-center gap-2.5 flex rounded-[8px] cursor-pointer items-center py-[12px] px-[24px] ${
                        isActive
                          ? "bg-[#ffffff] text-[#343538]"
                          : "bg-[none] text-[#989CA7]"
                      }`}
                    >
                      
                      <div>
                        <h4 className="text-sm font-bold">{type.text.title}</h4>

                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
          <ChallengesCard
            {...mockChallengeData}
            onFollowClick={() => console.log("Follow")}
            onMenuClick={() => console.log("Menu")}
            onJoinClick={() => console.log("Join")}
            onLikeClick={() => console.log("Like")}
            onCommentClick={() => console.log("Comment")}
            onShareClick={() => console.log("Share")}
          />
        </section>
        {/* <section className="flex flex-col max-w-2/5 gap-4">
            <ProfileCard
            />
            <SuggestedUsers />
            <TrendingChallenges/>
          </section> */}
      </section>
    </main>
  );
}


const Types = [
    {
      
      text: { title: "Active" },
    },
    {
      
      text: { title: "Finished" },
    },
    {
     
      text: { title: "Draft" },
    },
  ];