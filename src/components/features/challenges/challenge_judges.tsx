import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { ParticipantsCard } from '../home/participants_card';
import { JudgesCard } from '../home/judges_card';


type ParticipantsProps = {
    isOpen: boolean;
    onClose: () => void;
  };
// Main 
const ChallengeJudges = ({isOpen}:ParticipantsProps) => {
  const users = [
    {
      id: 1,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
    //   challenges: 80,
      profile_picture: "/api/placeholder/50/50"
    },
    {
      id: 2,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
    //   challenges: 80,
      profile_picture: "/api/placeholder/50/50"
    },
    {
      id: 3,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
    //   challenges: 80,
      profile_picture: "/images/Avatar2.png"
    },
    {
      id: 4,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
    //   challenges: 80,
      profile_picture: "/api/placeholder/50/50"
      
    }
  ];

  const handleUserClick = () => {
    console.log("User clicked:", );
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };

  return (
    isOpen &&
    <section className="w-full  border rounded-lg bg-white">
      <div className="p-5 w-full ">
        
        <div className="divide-y divide-gray-100 w-[100%] ">
          {users.map(user => (
            <JudgesCard
              key={user.id}
              user={user}
              rightIcon={<UserPlus className="h-5 w-full" />}
              onClick={handleUserClick}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          
          <Button 
            variant="ghost" 
            className="text-gray-500 font-normal"
            onClick={handleSeeAllClick}
          >
            View all participants
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengeJudges;