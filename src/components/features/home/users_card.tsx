import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { UserCard } from './user';

// Main 
const SuggestedUsers = () => {
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
    <section className="w-full max-w-md border rounded-lg bg-white">
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Suggested Users</h2>
          <Button 
            variant="ghost" 
            className="text-gray-500 font-normal"
            onClick={handleSeeAllClick}
          >
            See all
          </Button>
        </div>
        <div className="divide-y divide-gray-100">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              rightIcon={<UserPlus className="h-5 w-5" />}
              onClick={handleUserClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedUsers;