import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { UserCard } from "./user";

type AddParticipantsModalProps = {
    isOpen:boolean;
    onClose:()=>void;
}

const AddParticipantsModal = ({isOpen,onClose}:AddParticipantsModalProps) => {
  const [activeTab, setActiveTab] = useState("reviewers");
  const [searchQuery, setSearchQuery] = useState("");

  const mockUsers = [
    {
      id: 1,
      username: "User ",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      role: "reviewer",
    },
    {
      id: 2,
      username: "User ",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      role: "reviewer",
      rightIcon:<UserPlus />

    },
    {
      id: 3,
      username: "User ",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      role: "reviewer",
      rightIcon:<UserPlus />
    },
    {
      id: 4,
      username: "User ",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      role: "reviewer",
    },
    {
      id: 5,
      username: "User ",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      role: "reviewer",
    },
  ];

  const handleAddUser = () => {
    console.log("Adding user:", );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white rounded-lg shadow-lg flex flex-col w-full max-w-md mx-auto max-h-[90vh]">
      <div className="flex justify-between items-center">
        <DialogTitle className="text-2xl font-bold font-grotesk">Add Reviewers to Challenge</DialogTitle>
      </div>

      <p className="text-gray-500">
        Invite others to participate in the challenge.
      </p>

      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="search"
          className="pl-10 bg-gray-100 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs
        defaultValue="reviewers"
        value={activeTab}
        onValueChange={setActiveTab}
        className="overflow-y-auto scrollbar"
      >
        <TabsList className="w-full mb-6 bg-transparent border-b border-gray-200">
          <TabsTrigger
            value="reviewers"
            className={`px-4 py-2 ${
              activeTab === "reviewers"
                ? "border-b-2 border-blue-500 text-blue-500 rounded-none shadow-none"
                : "text-gray-400"
            }`}
          >
            Reviewers
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            className={`px-4 py-2 ${
              activeTab === "participants"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Participants
          </TabsTrigger>
          <TabsTrigger
            value="pendingApproval"
            className={`px-4 py-2 ${
              activeTab === "pendingApproval"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Pending Approval
          </TabsTrigger>
          <TabsTrigger
            value="added"
            className={`px-4 py-2 ${
              activeTab === "added"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Added
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviewers" className="border-none p-0 flex-1 h-1/3">
          <div className="divide-y divide-gray-100 ">
            {mockUsers.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleAddUser}  rightIcon={<UserPlus/>} role={"judge"}/>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="participants" className="border-none p-0">
          <div className="divide-y divide-gray-100">
            {mockUsers
              .map((user) => ({ ...user, role: "participant" }))
              .map((user) => (
                <UserCard key={user.id} user={user} onClick={handleAddUser} rightIcon={<UserPlus/>} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pendingApproval" className="border-none p-0 flex-1">
          <p className="text-center text-gray-500 py-8">
            No users pending approval
          </p>
        </TabsContent>

        <TabsContent value="added" className="border-none p-0">
          <p className="text-center text-gray-500 py-8">No users added yet</p>
        </TabsContent>
      </Tabs>

      <button className="text-blue-500 mt-6 font-medium">View all users</button>
    </DialogContent>
    </Dialog>
  );
};

export default AddParticipantsModal;
