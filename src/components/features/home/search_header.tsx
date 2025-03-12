import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchBar } from "./search";
import { authStore } from "@/store/authstore";
import { useLocation, Link } from "react-router";

export default function SearchHeader() {
  const { user } = authStore();
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname === "/home") return "Welcome, Nde";
    if (location.pathname.startsWith("/mychallenges")) return "My Challenges";
    return "Welcome, Nde";
  };

  const breadcrumb = () => {
    if (location.pathname.startsWith("/mychallenges")) {
      return (
        <nav className="mt-1 text-sm text-gray-400 text-left">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {" → "}
          <span className="capitalize">My Challenges</span>
          {" → "}
          <span className="text-blue-400">Edit challenge</span>
        </nav>
      );
    }
    return (
      <nav className="mt-1 text-sm text-gray-400 text-left">
        Pages → <span className="text-blue-400">Home</span>
      </nav>
    );
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 p-4 bg-white">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-black font-grotesk">
          {pageTitle()}
        </h2>
        {breadcrumb()}
      </div>

      <div className="flex items-center space-x-1 p-2 rounded-md bg-white w-1/2">
        <div className="relative flex-1">
          <SearchBar />
        </div>

        <Button variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.profile_picture || "not found"}
              alt={"user profile picture"}
            />
            <AvatarFallback className="capitalize">
              {user.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
