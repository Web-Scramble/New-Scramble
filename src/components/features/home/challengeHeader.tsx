import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const ChallengeHeader = () => {
  return (
    <div className="w-full max-w-4xl">
      {/* Challenge Creation Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm mb-6">
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
          className=" border-2 border-primary hover:bg-blue-600 text-primary font-bold h-12 px-4 flex items-center justify-start"
        >
          <Plus className="h-12 w-12 mr-2 text-primary" />
          <span>New Challenge</span>
        </Button>
      </div>

      {/* Featured Challenges Header */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-700">Featured Challenges</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <span className="mr-2">Sort by:</span>
          <span className="font-medium">Active</span>
          <Plus className="h-4 w-4 ml-1 rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChallengeHeader;