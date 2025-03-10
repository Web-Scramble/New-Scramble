import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authStore } from "@/store/authstore";




const UserProfile = () => {
  const {user} = authStore()
  return (
    <section className="rounded-xl bg-white p-6 shadow-xs">
      <div className="bg-[#F9F9FA] p-4">
      <figure className="flex justify-center">
        <Avatar className="h-12 w-12">
            <AvatarImage src={user.profile_picture|| "asd"} alt={"user profile picture"} />
            <AvatarFallback className="capitalize">{user.username.substring(0,2)}</AvatarFallback>
        </Avatar>
      </figure>


      {/* User Info */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">{user.username}</h2>
        <p className="text-sm text-gray-500 font-light">@{user.username}</p>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-around w-full gap-4">
        <div className="border-r-1 pr-4">
          <p className="text-center font-semibold">{user.followers_count}</p>
          <p className="text-center text-xs text-gray-500 font-light">Followers</p>
        </div>
        <div className=" border-r-1 pr-4">
          <p className="text-center font-semibold">{user.followings_count}</p>
          <p className="text-center text-xs text-gray-500 font-light">Following</p>
        </div>
        <div>
          <p className="text-center font-semibold">{0}</p>
          <p className="text-center text-xs text-gray-500 font-light">Challenges</p>
        </div>
      </div>
      </div>

      {/* Update Profile Button */}
      <div className="mt-8">
        <Button
          variant={"ghost"}
          className="w-full bg-[#2E77FA]/20 text-primary rounded-sm"
        >
          Update Profile
        </Button>
      </div>
    </section>
  );
};

export default UserProfile;
