import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/authentication";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface UserCardProps {
  user: Pick<
    User,
    "username" | "profile_picture" | "followers_count" | "followings_count"
  >;
  rightIcon: React.ReactNode;
  onClick: () => void;
  role?: string;
  submission: string | undefined;
  solution: string[] | undefined;
}

export const ParticipantsCard = ({
  user,
  rightIcon: RightIcon,
  onClick,
  role,
  submission,
  solution,
}: UserCardProps) => {

    const [showExtra, setShowExtra] = useState(false)
  return (
    <div className="flex justify-between py-3 w-full">
      <div className="flex items-center gap-4">
        <div className="bg-[#EAF1FF] rounded-3xl padding-[8px] flex items-center justify-center text-[#5892FB] text-sm font-[700]">
          13
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={"/images/Avatar3.png"} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <span className="font-sm text-gray-800 text-left">
              {user.username}
            </span>
            {role && (
              <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-100 px-2 py-1 font-normal">
                {role || "participant"}
              </Badge>
            )}

            <div className="flex gap-2 bg-linear-to-r from-[#2E77FA] to-[#BED5FD] py-[2px] px-[8px] rounded-[4px] text-white items-end">
              <span className="text-[#EAF1FF] text-[8px]">Score:</span>
              <span className="text-[#FFFFFF] text-[14px] font-bold">
                4.2{" "}
                <span className="text-[#EAF1FF] text-[8px] font-notmal">
                  /10
                </span>{" "}
              </span>
              <span></span>
            </div>
          </div>

          {
            showExtra &&

            <div className="w-[80%] flex flex-col gap-4 items-end self-end ml-10">
            <div className="flex flex-col gap-3 items-start align-right mt-4">
              <p className="text-[#686C71] text-[14px] self-start">
                Participant Submission
              </p>

              <div className="w-[80%] self-start align-left bg-[#ffffff] rounded-[8px] py-[8px] px-4">
                <p className="text-[#80848D] text-[14px] font-[400] align-left self-start">
                  {submission}
                </p>
              </div>
            </div>

            <div className="w-full items-start  flex flex-col gap-3">
              <p className="text-[#686C71] text-[14px]">
                How you arrived at solution
              </p>

              <div className="w-full bg-[#ffffff] rounded-[8px] py-[8px] px-4 flex items-start">
                <ol className="list-style-type-decimal">
                  {solution?.map((data) => (
                    <li key={data} className="text-[#80848D] text-[14px] font-[400] align-left list-style-type-decimal">
                      {data}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          }

          
          <div className="flex text-[12px] text-gray-500 gap-4">
            <span className="flex flex-row">Solved in 30 minutes</span>

            <span>24 Reviewed</span>
          </div>
        </div>
      </div>

      {
        showExtra? 
        <Button
        variant="ghost"
        size="icon"
        className=" bg-blue-100 text-blue-500 h-10 w-fit py-[8px] px-[12px]"
        onClick={() => setShowExtra(false)}
      >
        View Less
      </Button>

      :

      <Button
      variant="ghost"
      size="icon"
      className=" bg-blue-100 text-blue-500 h-10 w-fit py-[8px] px-[12px]"
      onClick={() => setShowExtra(true)}
    >
      View Submission
    </Button>
      }
     
    </div>
  );
};
