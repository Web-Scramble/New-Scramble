import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { ParticipantsCard } from "../home/participants_card";

type ParticipantsProps = {
  isOpen: boolean;
  onClose: () => void;
};
// Main
const ChallengeUsers = ({ isOpen }: ParticipantsProps) => {
  const users = [
    {
      id: 1,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
      //   challenges: 80,
      profile_picture: "/api/placeholder/50/50",
      submission: `for (var i=1; i <= 20; i++)/n
      {
  if (i % 15 == 0)/n
    console.log("FizzBuzz is the new code for equation");/n
  else/n
    console.log(i);/n
}`,
      solution: [
        "Set the variables for the equation",
        "Create a loop to iterate through the variables",
        "Compute the output for each of the iterations",
      ],
    },
    {
      id: 2,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
      //   challenges: 80,
      profile_picture: "/api/placeholder/50/50",
    },
    {
      id: 3,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
      //   challenges: 80,
      profile_picture: "/images/Avatar2.png",
      submission: `for (var i=1; i <= 20; i++)/n
      {
  if (i % 15 == 0)/n
    console.log("FizzBuzz is the new code for equation");/n
  else/n
    console.log(i);/n
}`,
      solution: [
        "Set the variables for the equation",
        "Create a loop to iterate through the variables",
        "Compute the output for each of the iterations",
      ],
    },
    {
      id: 4,
      username: "User ",
      followers_count: 2.3,
      followings_count: 400,
      //   challenges: 80,
      profile_picture: "/api/placeholder/50/50",
      submission: `for (var i=1; i <= 20; i++)/n
      {
  if (i % 15 == 0)/n
    console.log("FizzBuzz is the new code for equation");/n
  else/n
    console.log(i);/n
}`,
      solution: [
        "Set the variables for the equation",
        "Create a loop to iterate through the variables",
        "Compute the output for each of the iterations",
      ],
    },
  ];

  const handleUserClick = () => {
    console.log("User clicked:");
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };

  return (
    isOpen && (
      <section className="w-full  border rounded-lg bg-white">
        <div className="p-5 w-full ">
          <div className="divide-y divide-gray-100 w-[100%] ">
            {users.map((user) => (
              <ParticipantsCard
                key={user.id}
                user={user}
                rightIcon={<UserPlus className="h-5 w-full" />}
                onClick={handleUserClick}
                solution={user.solution}
                submission={user.submission}
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
    )
  );
};

export default ChallengeUsers;
