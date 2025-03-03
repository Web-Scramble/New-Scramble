import Sidebar from "@/components/features/home/sidebar";
import ProfileCard from "@/components/features/home/profilecard";
import SearchHeader from "@/components/features/home/search_header";
import SuggestedUsers from "@/components/features/home/users_card";
import ChallengeHeader from "@/components/features/home/challengeHeader";
import { ChallengeCard } from "@/components/features/home/challenge_card";
import { mockChallengeData } from "@/constants/mock";

export default function Dashboard() {
  // const {user } = authStore();

  return (
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <section className="w-full flex flex-col gap-2">
        <SearchHeader />
        <section className="flex gap-4">
          <section className="w-full">
        <ChallengeHeader/>
            <ChallengeCard
              {...mockChallengeData}
              onFollowClick={() => console.log('Follow')}
              onMenuClick={() => console.log('Menu')}
              onJoinClick={() => console.log('Join')}
              onLikeClick={() => console.log('Like')}
              onCommentClick={() => console.log('Comment')}
              onShareClick={() => console.log('Share')}
            />
            </section>
          <section className="flex flex-col w-2/5 gap-4">
            <ProfileCard
              name="Alane Johan"
              username="userhandle"
              followers="2.3k"
              following="400"
              challenges="80"
              imageUrl="/images/Avatar.png"
            />
            <SuggestedUsers />
          </section>
        </section>
      </section>
    </main>
  );
}
