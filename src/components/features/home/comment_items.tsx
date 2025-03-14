import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { Comment } from "./comment";
import { authStore } from "@/store/authstore";

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CommentForm = () => {
  const { user } = authStore();

  return (
    <div className="flex items-center gap-3 pb-4 w-full">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.profile_picture || ""} alt="user avatar" />
        <AvatarFallback className="capitalize">
          {user.username.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 relative bg-blue-50 rounded-lg overflow-hidden">
        <Input
          className="border-0 bg-transparent py-6 px-4 shadow-none focus-visible:ring-0 w-full"
          placeholder="Write a comment"
          multiple
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Smile className="h-5 w-5" />
          </Button> */}
          <Button className="h-8 w-8 p-0 rounded-full">
            <SendHorizontal className="h-4 w-4 bg-transparent" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CommentItems = ({ isOpen, onClose }: CommentModalProps) => {
  const comments = [
    {
      id: 1,
      user: {
        username: "User username",
        profile_picture: "/api/placeholder/40/40",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.",
      time: "2 days ago",
      replyCount: 3,
      isCurrentUser: false,
    },
    {
      id: 2,
      user: {
        username: "User username",
        profile_picture: "/api/placeholder/40/40",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.",
      time: "2 days ago",
      replyCount: 2,
      isCurrentUser: false,
    },
    {
      id: 3,
      user: {
        username: "User username",
        profile_picture: "/api/placeholder/40/40",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.",
      time: "2 days ago",
      replyCount: 0,
      isCurrentUser: false,
    },
    {
      id: 4,
      user: {
        username: "Current User",
        profile_picture: "/api/placeholder/40/40",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.",
      time: "2 days ago",
      replyCount: 3,
      isCurrentUser: true,
    },
    {
      id: 5,
      user: {
        username: "User Name",
        profile_picture: "/api/placeholder/40/40",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.",
      time: "2 days ago",
      replyCount: 3,
      isCurrentUser: false,
    },
  ];

  return (
    isOpen && (
      <div className="w-full">
        <div className=" w-full max-h-[40vh] flex items-start gap-4 flex-col bg-[#F9F9FA]">
          <p className="text-gray-500 text-sm -mt-2">View all comments</p>
          <div className="w-full  overflow-y-auto pr-2 custom-scrollbar bg-white">
            <div className="space-y-1 ">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  user={comment.user}
                  content={comment.content}
                  time={comment.time}
                  replyCount={comment.replyCount}
                  isCurrentUser={comment.isCurrentUser}
                />
              ))}
            </div>
          </div>
          <CommentForm />
        </div>
      </div>
    )
  );
};
