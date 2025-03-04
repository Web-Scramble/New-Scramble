import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/authentication';
interface UserCardProps {
    user: Pick<User,"username"|"profile_picture"|"followers_count"|"followings_count">;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }
  

export const UserCard = ({ user, rightIcon: RightIcon, onClick }:UserCardProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={"/images/Avatar3.png"} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-sm text-gray-800 text-left">{user.username}</span>
          <div className="flex text-[10px] text-gray-500 gap-1">
            <span className='flex flex-row'>{user.followers_count} Followers</span>
            <span className="mx-1">•</span>
            <span>{user.followings_count} Following</span>
            {/* <span className="mx-1">•</span> */}
            {/* <span>{user.challenges} Challenges</span> */}
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-blue-100 text-blue-500 h-10 w-10"
        onClick={() => onClick()}
      >
        {RightIcon}
      </Button>
    </div>
  );
};