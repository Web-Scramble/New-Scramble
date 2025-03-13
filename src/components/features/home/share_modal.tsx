import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SendHorizontal} from "lucide-react";
import { UserCard } from "./user";
import  Copy from "@/assets/copy.svg"


interface ShareChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareChallengeModal = ({ isOpen, onClose }: ShareChallengeModalProps) => {
  const [linkCopied, setLinkCopied] = useState(false);

  // Example challenge link
  const challengeLink = "https://example.com/challenge/123";

  // Example user list
  const mockUsers = [
    {
      id: 1,
      username: "User Name",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      challenges_count: 80,
    },
    {
      id: 2,
      username: "User Name",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      challenges_count: 80,
    },
    {
      id: 3,
      username: "User Name",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      challenges_count: 80,
    },
    {
      id: 4,
      username: "User Name",
      profile_picture: "/api/placeholder/100/100",
      followers_count: 2.3,
      followings_count: 400,
      challenges_count: 80,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F9F9FA] rounded-lg shadow-lg flex flex-col w-full max-w-md mx-auto max-h-[90vh]">
        <div className="flex justify-between items-center -mb-4">
          <DialogTitle className="text-2xl font-bold font-grotesk">
            Share Challenge
          </DialogTitle>
        </div>
        <p className="text-xs text-gray-400 font-normal">
          Share challenge with other users and on social media
        </p>

        {/* Social media icons */}
        <div className="bg-white rounded-md p-2">

        <div className="text-xs text-gray-600 mb-2">Share on social media</div>
        <div className="flex items-center justify-evenly gap-3 mb-4 w-full border-b pb-4">
          {/* Existing social media buttons with images */}
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 p-0 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-blue-300"
          >
            <img src="/images/discord.png" alt="Discord" className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 p-0 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-blue-300"
          >
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className="h-6 w-6"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 p-0 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-blue-300"
          >
            <img
              src="/images/linkedin.png"
              alt="LinkedIn"
              className="h-6 w-6"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 p-0 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-blue-300"
          >
            <img src="/images/twitter.png" alt="Twitter" className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 p-0 rounded-lg bg-gray-50 hover:bg-gray-100 border-2 border-blue-300"
          >
            <img
              src="/images/snapchat.png"
              alt="Snapchat"
              className="h-6 w-6"
            />
          </Button>
        </div>

        {/* Share with other users */}
        <div className="text-xs text-gray-600 mb-2">Share with other users</div>
        <div className="space-y-2 max-h-44 overflow-y-auto scrollbar">
          {mockUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              role=""
              rightIcon={<SendHorizontal className="h-5 w-5 text-gray-400" />}
              onClick={() => console.log("Share with user:", user.username)}
            />
          ))}
        </div>

        {/* Copy link section */}
        <div className="mt-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Click here to copy the link</p>
            <Button
              variant="outline"
              className="bg-blue-100 text-blue-500 hover:bg-blue-200"
              onClick={handleCopyLink}
            >
              {linkCopied ? "Copied!" : "Copy"} <Copy/>
            </Button>
          </div>
        </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ShareChallengeModal;
