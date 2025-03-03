import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { X, Paperclip, Image, Smile, Send } from 'lucide-react';
import { Comment } from './comment';

type CommentModalProps = {
    isOpen:boolean;
    onClose:()=>void;
}

const CommentForm = () => {
  return (
    <div className="flex items-center gap-3 mt-4 pb-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/api/placeholder/40/40" alt="Your avatar" />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div className="flex-1 relative bg-blue-50 rounded-lg overflow-hidden">
        <Input 
          className="border-0 bg-transparent py-6 px-4 shadow-none focus-visible:ring-0 w-full" 
          placeholder="Write a comment" 
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Smile className="h-5 w-5" />
          </Button>
          <Button className="h-8 w-8 p-0 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Send className="h-4 w-4" />
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
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Add Comment to Challenge</DialogTitle>
          {/* <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"> */}
            {/* <X className="h-4 w-4" /> */}
          {/* </Button> */}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Write your comment and interact with others about the challenge.
        </p>
        <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
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

// For demonstration purposes
const CommentModalDemo = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show Comments</Button>
      <CommentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default CommentModalDemo;