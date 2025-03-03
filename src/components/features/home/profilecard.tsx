import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserProfileProps {
  name: string;
  username: string;
  followers: string;
  following: string;
  challenges: string;
  imageUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  username,
  followers,
  following,
  challenges,
  imageUrl,
}) => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-xs">
      <div className="bg-[#F9F9FA] p-4">
      <figure className="flex justify-center">
        <Avatar className="h-12 w-12">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{"AJ"}</AvatarFallback>
        </Avatar>
      </figure>


      {/* User Info */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-500 font-light">@{username}</p>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-around w-full gap-4">
        <div className="border-r-1 pr-4">
          <p className="text-center font-semibold">{followers}</p>
          <p className="text-center text-xs text-gray-500 font-light">Followers</p>
        </div>
        <div className=" border-r-1 pr-4">
          <p className="text-center font-semibold">{following}</p>
          <p className="text-center text-xs text-gray-500 font-light">Following</p>
        </div>
        <div>
          <p className="text-center font-semibold">{challenges}</p>
          <p className="text-center text-xs text-gray-500 font-light">Challenges</p>
        </div>
      </div>
      </div>

      {/* Update Profile Button */}
      <div className="mt-8">
        <Button
          variant={"ghost"}
          className="w-full bg-[#2E77FA]/20 text-primary"
        >
          Update Profile
        </Button>
      </div>
    </section>
  );
};

export default UserProfile;
