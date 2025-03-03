import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserPlus } from 'lucide-react';
import { UserCard } from './user';

// Main 
const SuggestedUsers = () => {
  // Sample user data
  const users = [
    {
      id: 1,
      name: "User Name",
      followers: "2.3k",
      following: 400,
      challenges: 80,
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "User Name",
      followers: "2.3k",
      following: 400,
      challenges: 80,
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "User Name",
      followers: "2.3k",
      following: 400,
      challenges: 80,
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 4,
      name: "User Name",
      followers: "2.3k",
      following: 400,
      challenges: 80,
      avatar: "/api/placeholder/50/50"
    }
  ];

  const handleUserClick = (user) => {
    console.log("User clicked:", user);
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
              rightIcon={UserPlus}
              onClick={handleUserClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedUsers;