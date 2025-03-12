import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { Comment } from './comment';
import { CommentType } from '@/types/challenge';
import { formatDate } from '@/utils/dateFormater';
import React, { useState } from 'react';
import api from '@/api/interceptor';
import { authStore } from "@/store/authstore";

type CommentModalProps = {
    isOpen:boolean;
    onClose:()=>void;
    comments: CommentType[]
    challengeId: string;
    onCommentPosted: () => void
}

type CommentFormProps ={
  challengeId: string,
  onCommentPosted: () => void
}

const CommentForm = ({challengeId, onCommentPosted}:CommentFormProps) => {
  const {user} = authStore()

  const [message, setMessage ] = useState<string>("")

  

  const postComment = async(e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post(`/challenges/${challengeId}/comment`, {
        message, 
      });

      if (response.data) {
        setMessage(''); // Clear the input field
        onCommentPosted(); // Refresh the comments list
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
    
  }
  return (
    <form className="flex items-center gap-3 pb-4" onSubmit={postComment}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.profile_picture||""} alt="user avatar" />
        <AvatarFallback className="capitalize">{user.username.substring(0,2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 relative bg-blue-50 rounded-lg overflow-hidden">
        <Input 
          className="border-0 bg-transparent py-6 px-4 shadow-none focus-visible:ring-0 w-full" 
          placeholder="Write a comment" 
          multiple
          name='message'
          value={message}
          onChange={(e) =>setMessage(e.target.value)}
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
          <Button className="h-8 w-8 p-0 rounded-full" type='submit'>
            <SendHorizontal className="h-4 w-4 bg-transparent" />
          </Button>
        </div>
      </div>
    </form>
  );
};

 export const CommentModal = ({ isOpen, onClose, comments, challengeId, onCommentPosted }:CommentModalProps) => {


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
                user={comment?.username}
                content={comment.message}
                time={formatDate(comment.created_at._seconds, 'short')}
                replyCount={comment.like_count}
               // isCurrentUser={comment.userId}
              />
            ))}
          </div>
        </div>
        <CommentForm challengeId={challengeId} onCommentPosted={onCommentPosted}/>
      </DialogContent>
    </Dialog>
  );
};
