import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const ChallengeHeader = () => {
  return (
    <div className="w-full max-w-4xl">
      {/* Challenge Creation Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg p-3 drop-shadow-sm mb-6">
        <div className="flex items-center flex-1 mr-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src="/images/Avatar.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Input 
            className="border-none bg-gray-100 text-gray-500 h-12 rounded-lg px-4 text-base"
            placeholder="Create a new challenge."
          />
        </div>
        <Button 
        variant={"outline"}
          className=" border-2 border-primary text-primary font-bold h-12 px-4 flex items-center justify-start"
        >
          <Plus className="h-12 w-12 mr-2 text-primary" />
          <span>New Challenge</span>
        </Button>
      </div>

      {/* Featured Challenges Header */}
      <div className="flex items-center justity-start gap-2 pb-4">
        <h2 className="text-lg font-medium text-gray-700 ">Featured Challenges</h2>
        <div style={{height:"1px",width:"100%",backgroundColor:"#E6EBF1",flex:1}}></div>
        <div className="flex items-center justify-end text-gray-500 text-sm">
          <span className="text-xs">Sort by:</span>
          <span className="font-medium text-xs">Active</span>
          <Plus className="h-4 w-4 ml-1 rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChallengeHeader;