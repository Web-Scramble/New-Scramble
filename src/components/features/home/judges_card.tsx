import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/authentication";
import { Badge } from "@/components/ui/badge";

interface JudgesProps {
  user: Pick<
    User,
    "username" | "profile_picture" | "followers_count" | "followings_count"
  >;
  rightIcon: React.ReactNode;
  onClick: () => void;
  role?: string;
}

export const JudgesCard = ({
  user,
  rightIcon: RightIcon,
  onClick,
  role,
}: JudgesProps) => {
  return (
    <div className="flex justify-between py-3 w-full">
      <div className="flex items-center gap-4">
        
        <Avatar className="h-12 w-12">
          <AvatarImage src={"/images/Avatar3.png"} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4 items-center">
            <span className="font-sm text-gray-800 text-left">
              {/* {user.username} */}
              Judge Name
            </span>
            {role && (
              <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-100 px-2 py-1 font-normal">
                {role || "participant"}
              </Badge>
            )}

            <div className="flex gap-2 bg-linear-to-r from-[#2E77FA] to-[#BED5FD] py-[2px] px-[8px] rounded-[4px] text-white items-center">
              <span className="text-[#EAF1FF] text-[8px]">Score:</span>
              <span className="text-[#FFFFFF] text-[14px] font-bold">
                4.2 <span className="text-[#EAF1FF] text-[8px] font-notmal">/10</span>{" "}
              </span>
              <span></span>
            </div>
          </div>
          <div className="h-[56px] w-[1px] bg-[#B1B1B1]">

          </div>
          <div className="flex flex-col items-start text-[12px] text-gray-500 gap-2 w-[60%]">
            <span className="flex flex-row font-bold">
              Remarks
            </span>
            
            <span className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada. </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className=" bg-blue-100 text-blue-500 h-10 w-fit py-[8px] px-[12px]"
        onClick={() => onClick()}
      >
        View User Submission
      </Button>
    </div>
  );
};
