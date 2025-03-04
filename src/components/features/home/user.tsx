import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UserCard = ({ user, rightIcon: RightIcon, onClick }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={"/images/Avatar3.png"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-sm text-gray-800 text-left">{user.name}</span>
          <div className="flex text-[10px] text-gray-500 gap-1">
            <span className='flex flex-row'>{user.followers} Followers</span>
            <span className="mx-1">•</span>
            <span>{user.following} Following</span>
            {/* <span className="mx-1">•</span> */}
            {/* <span>{user.challenges} Challenges</span> */}
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-blue-100 text-blue-500 h-10 w-10"
        onClick={() => onClick(user)}
      >
        <RightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};