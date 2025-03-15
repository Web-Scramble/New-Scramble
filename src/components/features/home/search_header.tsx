import {  Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchBar } from "./search"
import { authStore } from "@/store/authstore";
import { useLocation } from "react-router";


type SearchheaderProps ={
  page: string
}

export default function SearchHeader({page}:SearchheaderProps) {
    const {user} = authStore()
    const {pathname} = useLocation()


  
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 p-4 ">
      <div className="flex flex-col">
        <h2 className="text-[32px] font-semibold text-black font-grotesk">

          Welcome, {user.username}
        </h2>
        <nav className="mt-1 text-sm text-gray-400 text-left">
          Pages → <span className="text-blue-400">{pathname.split("/")[1]}</span>
        </nav>
      </div>

      <div className="flex items-center space-x-1 p-2 rounded-md bg-white w-1/2">
        <div className="relative flex-1">
          <SearchBar/>
        </div>

        <Button variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile_picture||"not found"} alt={"user profile picture"} />
            <AvatarFallback className="capitalize">{user.username.substring(0,2)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
