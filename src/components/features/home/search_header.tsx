import {  Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchBar } from "./search"

export default function SearchHeader() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 p-4 ">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-black font-grotesk">
          Welcome, Nde
        </h2>
        <nav className="mt-1 text-sm text-gray-400 text-left">
          Pages → <span className="text-blue-400">Home</span>
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
            <AvatarImage src="/images/Avatar.png" alt="@nde" />
            <AvatarFallback>ND</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
