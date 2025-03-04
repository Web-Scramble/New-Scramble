import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  MoreHorizontal, 
  CalendarClock, 
  Share2, 
  Play, 
  FileText,
  DollarSignIcon
} from 'lucide-react';
import { CommentModal } from './comment_modal';
import { User } from '@/types/authentication';
import  Comments from "@/assets/comments.svg"
import Leaderboard from "@/assets/leaderboard.svg"

type AvatarGroupProps ={
    users:User[];
    count:number;
    onAddClick:()=>void
}
export interface ChallengeCardProps {
    user: User;
    date: string;
    title: string;
    status: string;
    description: string;
    tags: string[];
    media: Media;
    reviewers: {
        users:User[];
        count:number;
    };
    participants: {
        users:User[];
        count:number;
    };
    endDate: string;
    timing: string;
    reward: number;
    onFollowClick: () => void;
    onMenuClick: () => void;
    onJoinClick: () => void;
    onLikeClick: () => void;
    onCommentClick: () => void;
    onShareClick: () => void;
  }
  export interface MediaFile {
    name: string;
  }
  
  export interface Media {
    images: string[];
    video: {
      thumbnail: string;
    };
    files: MediaFile[];
  }
const AvatarGroup = ({ users, count, onAddClick }:AvatarGroupProps) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {users.slice(0, 2).map((user, index) => (
          <Avatar key={index} className="border-2 border-white w-8 h-8">
            <AvatarImage src={user.profile_picture||"images"} alt={user.username} />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      {count > 0 && (
        <span className=" relative -left-3 text-xs text-blue-500 bg-blue-50 w-9 h-9 border-4 border-white rounded-full font-medium flex items-center">+{count}</span>
      )}
      <Button variant="outline" size="sm" className="rounded-full w-7 h-7 p-0 border-dashed border-blue-300">
        <Plus className="h-4 w-4 text-blue-300" onClick={onAddClick} />
      </Button>
    </div>
  );
};

 export const ChallengeCard = ({ 
  user, 
  date,
  title, 
  status, 
  description, 
  tags, 
  media,
  reviewers, 
  participants, 
  endDate, 
  timing, 
  reward,
//   onFollowClick,
//   onMenuClick,
  onJoinClick,
//   onLikeClick,
  onCommentClick,
  onShareClick
}:ChallengeCardProps) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
    <Card className="w-full max-w-4xl shadow-none rounded-lg overflow-hidden border-none">
      {/* Card Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={user.profile_picture||"images"} alt={user.username} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-500 font-normal">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className=" text-blue-500  px-4">
            <Plus className="h-4 w-4 mr-1" />
            Follow
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="border rounded-full h-10 w-10">
                <MoreHorizontal className="h-5 w-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Edit Challenge</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4">
        {/* Challenge Title & Status */}
        <div className="flex items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-500 mr-3">{title}</h2>
          <Badge className="bg-green-100 text-green-600 hover:bg-green-100 px-3">{status}</Badge>
        </div>

        {/* Challenge Description */}
        <p className="text-gray-400 mb-3 text-xs text-left">{description}</p>

        {/* Challenge Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-600 hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        {/* Media Section */}
        <div className="grid grid-cols-12 gap-3 mb-6">
          {/* Left media section - 2 items */}
          <div className="col-span-3 flex flex-col gap-3">
            <div className="h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img src={media.images[0]} alt="Media content" className="w-full h-full object-cover" />
            </div>
            <div className="h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img src={media.images[1]} alt="Media content" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Center - Video */}
          <div className="col-span-6 relative rounded-lg overflow-hidden">
            <img src={media.video.thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/80 p-4 backdrop-blur-sm">
                <Play className="h-6 w-6 text-purple-500 fill-purple-500" />
              </div>
            </div>
          </div>
          
          {/* Right - PDF files */}
          <div className="col-span-3 flex flex-col gap-3">
            {media.files.map((file, index) => (
              <div key={index} className="border-2 border-blue-300 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                <div className="bg-blue-100 p-2 rounded-lg mb-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-center text-sm text-gray-600">{file.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="flex flex-wrap justify-between items-center border-t border-b py-4">
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-left font-bold text-gray-500 mb-2">Reviewers</p>
              <AvatarGroup 
                users={reviewers.users} 
                count={reviewers.count} 
                onAddClick={() => console.log('Add reviewer')} 
              />
            </div>
            <div>
              <p className="text-sm text-left font-bold text-gray-500 mb-2">Participants</p>
              <AvatarGroup 
                users={participants.users} 
                count={participants.count} 
                onAddClick={() => console.log('Add participant')} 
              />
            </div>
            <div>
              <p className="flex items-center text-sm text-left font-bold text-gray-500 mb-2">
                <CalendarClock className="h-4 w-4 text-gray-500 mr-1" />
                End date</p>
              <div className="flex items-end mt-4">
                <span className="text-sm text-gray-400">{endDate}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-left font-bold text-gray-500 mb-2">Timing</p>
              <div className="flex items-end mt-4">
                <span className="text-sm text-gray-400">{timing}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="flex items- justify-end text-sm text-right font-bold text-gray-500 mb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500" />
                Reward</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-300">${reward}</span>
              <Button variant="outline" size="sm" className="ml-2 rounded-full w-7 h-7 p-0 border-dashed border-blue-300">
                <Plus className="h-4 w-4 text-blue-300" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="px-4 py-3 flex justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto" onClick={()=>setIsOpen(true)}>
            {/* <MessagesSquare className="h-5 w-5 text-gray-500" /> */}
            <Comments />
            <span className="text-gray-500">15</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto" onClick={onCommentClick}>
            <Leaderboard  />
            <span className="text-gray-500">56</span>
          </Button>
          <Button variant="ghost" className="flex items-center p-0 h-auto " onClick={onShareClick}>
            <Share2 className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6" onClick={onJoinClick}>
          Join Challenge
        </Button>
      </CardFooter>
    </Card>
    <CommentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>

  );
};
