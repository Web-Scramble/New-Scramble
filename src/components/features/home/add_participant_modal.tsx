import React, { useState } from "react";
import { Search, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const UserCard = ({ user, onClick }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">{user.name}</span>
            {user.role && (
              <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-100 px-2 py-1 font-normal">
                {user.role}
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {user.followers} Followers • {user.following} Following •{" "}
            {user.challenges} Challenges Reviewed
          </div>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="bg-blue-100 text-blue-500 rounded-md p-2 h-10 w-10"
        onClick={() => onClick(user)}
      >
        <UserPlus size={20} />
      </Button>
    </div>
  );
};

const AddReviewersModal = () => {
  const [activeTab, setActiveTab] = useState("reviewers");
  const [searchQuery, setSearchQuery] = useState("");

  const mockUsers = [
    {
      id: 1,
      name: "User Name",
      avatarUrl: "/api/placeholder/100/100",
      followers: "2.3k",
      following: "400",
      challenges: "80",
      role: "reviewer",
    },
    {
      id: 2,
      name: "User Name",
      avatarUrl: "/api/placeholder/100/100",
      followers: "2.3k",
      following: "400",
      challenges: "80",
      role: "reviewer",
    },
    {
      id: 3,
      name: "User Name",
      avatarUrl: "/api/placeholder/100/100",
      followers: "2.3k",
      following: "400",
      challenges: "80",
      role: "reviewer",
    },
    {
      id: 4,
      name: "User Name",
      avatarUrl: "/api/placeholder/100/100",
      followers: "2.3k",
      following: "400",
      challenges: "80",
      role: "reviewer",
    },
    {
      id: 5,
      name: "User Name",
      avatarUrl: "/api/placeholder/100/100",
      followers: "2.3k",
      following: "400",
      challenges: "80",
      role: "reviewer",
    },
  ];

  const handleAddUser = (user) => {
    console.log("Adding user:", user);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add Reviewers to Challenge</h2>
        <Button variant="ghost" size="sm" className="rounded-full">
          <X size={24} />
        </Button>
      </div>

      <p className="text-gray-500 mb-6">
        Invite others to participate in the challenge.
      </p>

      <div className="relative mb-6">
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
      >
        <TabsList className="w-full mb-6 bg-transparent border-b border-gray-200">
          <TabsTrigger
            value="reviewers"
            className={`px-4 py-2 ${
              activeTab === "reviewers"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
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

        <TabsContent value="reviewers" className="border-none p-0">
          <div className="divide-y divide-gray-100">
            {mockUsers.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleAddUser} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="participants" className="border-none p-0">
          <div className="divide-y divide-gray-100">
            {mockUsers
              .map((user) => ({ ...user, role: "participant" }))
              .map((user) => (
                <UserCard key={user.id} user={user} onClick={handleAddUser} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pendingApproval" className="border-none p-0">
          <p className="text-center text-gray-500 py-8">
            No users pending approval
          </p>
        </TabsContent>

        <TabsContent value="added" className="border-none p-0">
          <p className="text-center text-gray-500 py-8">No users added yet</p>
        </TabsContent>
      </Tabs>

      <button className="text-blue-500 mt-6 font-medium">View all users</button>
    </div>
  );
};

export default AddReviewersModal;
