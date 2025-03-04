import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { Comment } from './comment';

type CommentModalProps = {
    isOpen:boolean;
    onClose:()=>void;
}

const CommentForm = () => {
  return (
    <div className="flex items-center gap-3 pb-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/images/Avatar.png" alt="Your avatar" />
        <AvatarFallback>Y</AvatarFallback>
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

 export const CommentModal = ({ isOpen, onClose }:CommentModalProps) => {
  const comments = [
    {
      id: 1,
      user: { username: 'User username', profile_picture: '/api/placeholder/40/40' },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.',
      time: '2 days ago',
      replyCount: 3,
      isCurrentUser: false
    },
    {
      id: 2,
      user: { username: 'User username', profile_picture: '/api/placeholder/40/40' },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.',
      time: '2 days ago',
      replyCount: 2,
      isCurrentUser: false
    },
    {
      id: 3,
      user: { username: 'User username', profile_picture: '/api/placeholder/40/40' },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.',
      time: '2 days ago',
      replyCount: 0,
      isCurrentUser: false
    },
    {
      id: 4,
      user: { username: 'Current User', profile_picture: '/api/placeholder/40/40' },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.',
      time: '2 days ago',
      replyCount: 3,
      isCurrentUser: true
    },
    {
      id: 5,
      user: { username: 'User Name', profile_picture: '/api/placeholder/40/40' },
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lectus a metus dignissim malesuada.',
      time: '2 days ago',
      replyCount: 3,
      isCurrentUser: false
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] flex flex-col bg-[#F9F9FA]">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold font-grotesk">Add Comment to Challenge</DialogTitle>
        </div>
        <p className="text-gray-500 text-sm -mt-2">
          Write your comment and interact with others about the challenge.
        </p>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar bg-white">
          <div className="space-y-1">
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
      </DialogContent>
    </Dialog>
  );
};
