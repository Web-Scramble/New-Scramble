import { useLocation } from "react-router";
import { cn } from "@/lib/utils"; // Utility function for conditional classes

const steps = [
  { id: 1, path: "/", label: "Provide Phone number or Sign up with Social.", description: "Enter your Email or Phone number to sign in to your account or create your account" },
  { id: 2, path: "/verify_otp", label: "Verify Phone number", description: "Enter your Email or Phone number to sign in to your account or create your account" },
  { id: 3, path: "/create_account", label: "Create User name", description: "Enter your Email or Phone number to sign in to your account or create your account" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-0 items-start w-full max-w-[320px] h-full bg-primary-background p-2">
      {/* Logo & Back Button */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#133269]">Scramble</h1>
      </div>

      <div className="flex flex-col justify-between h-full">
      {/* Steps */}
      <div className="flex flex-col space-y-4 items-start">
        {steps.map((step, index) => {
          const isActive = location.pathname === step.path;
          return (
            <div key={index} className="flex flex-col ">
              <div className={cn("flex items-start gap-3 text-gray-400", !isActive && "opacity-25")}>
                <span className={cn(
                  "w-12 h-8 px-4 text-center flex justify-center items-center rounded-md bg-[#2154B2] text-white"
                )}>
                  {step.id}
                </span>
                <div>
                  <p className={cn("font-semibold text-left text-[#2154B2] text-xl font-grotesk",isActive &&" ")}>{step.label}</p>
                  <p className={cn("text-xs text-[#2154B2]/75 text-left",isActive &&"")}>{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center space-x-3 mt-6 w-full">
        {steps.map((step, index) => {
          const isActive = location.pathname === step.path;
          return (
            <div key={index} className={cn(
              "h-1 w-full rounded-full bg-gray-300 transition-all",
              isActive && "bg-primary"
            )}></div>
          );
        })}
      </div>
      </div>

    </div>
  );
}
