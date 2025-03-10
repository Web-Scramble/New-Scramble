import { useState } from "react"
import { NavLink } from "react-router"
import {
  Wallet,
  CircleUserRound,
  Bell,
  MessageSquareWarning,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
import { authStore } from "@/store/authstore";
import { TOKEN, USER_DATA } from "@/constants/keys";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import  Users from "@/assets/users.svg"
import  Home from "@/assets/home.svg"
import  Challenge from "@/assets/challenge.svg"



import { cn } from "@/lib/utils"
import { setItemToLocalStorage } from "@/utils/localStorage";

type NavItem = {
  label: string
  icon: React.ElementType|string;
  to?: string
  subItems?: { label: string; to: string }[]
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: Home,
    to: "/home",
  },
  {
    label: "Challenges",
    icon: Challenge,
    subItems: [
      { label: "New Challenges", to: "/challenges/new" },
      { label: "All Challenges", to: "/challenges/all" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    to: "/users",
  },
  {
    label: "Wallet",
    icon: Wallet,
    to: "/wallet",
  },
  {
    label: "Profile",
    icon: CircleUserRound,
    to: "/profile",
  },
  {
    label: "Notifications",
    icon: Bell,
    to: "/notifications",
  },
  {
    label: "Report",
    icon: MessageSquareWarning,
    to: "/report",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
]

export default function Sidebar() {
  const [openChallenges, setOpenChallenges] = useState(false)
  const { updateToken, updateUser } = authStore();
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    updateToken("")
    updateUser({
      id: "",
      username: "",
      email: "",
      phone:"",
      balance:0,
      profile_picture:"",
      role:"",
      created_at: "" ,
      updated_at: "",
      firebase_uid:"" ,
      fcm_token: "" ,
      followers_count:0,
      is_suspended: false,
      background_picture:"" ,
      followings_count: 0,
    })
    setItemToLocalStorage(TOKEN,"")
    setItemToLocalStorage(USER_DATA,"")
    navigate("/");
  }

  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r fixed border-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-black text-left">Scramble</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon

            if (item.subItems) {
              return (
                <Collapsible
                  key={item.label}
                  open={openChallenges}
                  onOpenChange={setOpenChallenges}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {openChallenges ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 ml-4 space-y-1">
                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.to}
                        className={({ isActive }) =>
                          cn(
                            "block",
                            "rounded-md px-2 py-1 text-sm transition-colors",
                            isActive
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          )
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <NavLink
                key={item.label}
                to={item.to!}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md transition-colors hover:bg-gray-100 text-grey-text",
                    isActive && "bg-blue-500 text-white "
                  )
                }
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    "!bg-transparent",
                    "!shadow-none",
                    "!border-none",
                    "!ring-0",
                    "font-normal",
                  )}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              </NavLink>
            )
          })}
        </div>
      </ScrollArea>

      <div className="px-2 py-3 space-y-2 border-t border-gray-200">
        <NavLink
          to="/help"
          className={({ isActive }) =>
            cn(
              "block rounded-md transition-colors",
              isActive && "bg-gray-100 text-gray-700"
            )
          }
        >
          <Button variant="ghost" className="w-full justify-start text-grey-text font-normal">
            <HelpCircle className="mr-2 h-5 w-5 text-grey-text" />
            Help
          </Button>
        </NavLink>

        <NavLink
          to="/"
          className="block rounded-md transition-colors hover:bg-gray-100 "
        >
          <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogOut}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </NavLink>
      </div>
    </aside>
  )
}
