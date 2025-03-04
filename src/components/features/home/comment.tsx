import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/types/authentication';
export interface CommentProps {
    user: Pick<User,"username"|"profile_picture">;
    content: string;
    time: string;
    replyCount?: number;
    isCurrentUser?: boolean;
  }
export const Comment = ({ user, content, time, replyCount, isCurrentUser = false }:CommentProps) => {
  return (
    <div className="py-3">
      <div className="flex gap-3 mb-1">
        <Avatar className="h-10 w-10">
          <AvatarImage src={"/images/Avatar3.png"} alt={user.username} />
          <AvatarFallback>{user.username[0] }</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className={`p-3 rounded-lg ${isCurrentUser ? 'bg-blue-50 ml-auto' : 'bg-gray-50'}`}>
            <h4 className="font-medium text-gray-700 mb-1">
              {isCurrentUser ? 'You' : user.username}
            </h4>
            <p className="text-gray-600 text-sm">
              {content}
            </p>
          </div>
          <div className="flex mt-1 text-xs text-gray-500">
            <span>{time}</span>
            <Button variant="link" className="px-2 py-0 h-auto text-xs text-gray-500">
              reply
            </Button>
            {replyCount as number > 0 && (
              <span>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};