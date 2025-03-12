import Sidebar from "@/components/features/home/sidebar";
import ProfileCard from "@/components/features/home/profilecard";
import SearchHeader from "@/components/features/home/search_header";
import SuggestedUsers from "@/components/features/home/users_card";
import ChallengeHeader from "@/components/features/home/challengeHeader";
import { ChallengeCard } from "@/components/features/home/challenge_card";
import { mockChallengeData } from "@/constants/mock";
import TrendingChallenges from "@/components/features/home/trending_challenges";
import { useEffect, useState } from "react";
import { Challenge } from "@/types/challenge";
import { getAllChallenges } from "@/api/challenge";
import { formatDate } from "@/utils/dateFormater";
import { messaging } from "@/services/firebase";
import { onMessage } from "firebase/messaging";
import { requestForToken } from "@/services/request_fcm_token";
import { registerDevice } from "@/api/user";

export default function Dashboard() {

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

  console.log("WORKING:!!!");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  // const challenges = [
  //   {
  //     id: 1,
  //     imageUrl: '/images/image.png',
  //     title: 'Challenge Title',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     participants: 230,
  //     timeLeft: '2 days left',
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/images/image.png',
  //     title: 'Another Challenge',
  //     description: 'Suspendisse efficitur, lorem sed luctus gravida...',
  //     participants: 120,
  //     timeLeft: '5 days left',
  //   },
  // ]

  useEffect(() => {
   

    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await getAllChallenges();
      setChallenges(response.challenges);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handlePostedComments = () =>{
    fetchChallenges()
  }

  return (
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <section className="flex flex-col gap-2 ml-68">
        <SearchHeader />
        <section className="flex gap-4">
          <section className="w-full">
            <ChallengeHeader />
            {challenges.map((ch) => (
              <ChallengeCard
              key={ch.id}
               // user={ch.createdBy}
               title={ch.title}
               date={formatDate(ch.created_at._seconds, 'long')}
               status={ch.status}
               description={ch.description}
               tags={ch.tags}
            //   media={ch.attachments}
               endDate={formatDate(ch.endDate._seconds, 'short')}
               timing={ch.timeLimit.toString()}
               reward={ch.reward}
               attachments={ch.attachments}
               comments={ch.comments}
               challengeId={ch.id}
               
            //   reviewers={ch.revi}
            // participants={ch.inviteLinks.participants.link}


                onFollowClick={() => console.log("Follow")}
                onMenuClick={() => console.log("Menu")}
                onJoinClick={() => console.log("Join")}
                onLikeClick={() => console.log("Like")}
                onCommentClick={() => console.log("Comment")}
                onShareClick={() => console.log("Share")}
                onCommentPosted={handlePostedComments}
              />
            ))}
          </section>
          <section className="flex flex-col max-w-2/5 gap-4">
            <ProfileCard
              name="Alane Johan"
              username="userhandle"
              followers="2.3k"
              following="400"
              challenges="80"
              imageUrl="/images/Avatar.png"
            />
            <SuggestedUsers />
            <TrendingChallenges />
          </section>
        </section>
      </section>
    </main>
  );
}
