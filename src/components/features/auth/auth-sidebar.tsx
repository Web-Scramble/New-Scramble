import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    path: "/signup",
    label: "Provide Phone number or Sign up with Social.",
    description:
      "Enter your Email or Phone number to sign in to your account or create your account",
  },
  {
    id: 2,
    path: "/verify_otp",
    label: "Verify Phone number",
    description:
      "Enter your Email or Phone number to sign in to your account or create your account",
  },
  {
    id: 3,
    path: "/create_account",
    label: "Create User name",
    description:
      "Enter your Email or Phone number to sign in to your account or create your account",
  },
];
// const socialSteps = [
//   { id: 1, path: "/signup", label: "Provide Phone number or Sign up with Social.", description: "Enter your Email or Phone number to sign in to your account or create your account" },
//   { id: 2, path: "/add_phone", label: "Add Phone number", description: "Enter your Email or Phone number to sign in to your account or create your account" },
// ];

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-0 items-start w-full md:max-w-[320px] h-full bg-primary-background p-2">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#133269] text-left">
          Scramble
        </h1>
      </div>

      <div className="flex flex-col justify-between md:h-full">
        <div className="flex flex-col md:space-y-4 items-start">
          {steps.map((step, index) => {
            const isActive = location.pathname.startsWith(step.path);
            return (
              <div
                key={index}
                className={cn("hidden md:flex flex-col", isActive && "flex")}
              >
                <div
                  className={cn(
                    "flex items-start gap-3 text-gray-400",
                    !isActive && "opacity-25 "
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 px-4 text-center flex justify-center items-center rounded-md bg-[#2154B2] text-white font-bold"
                    )}
                  >
                    {step.id}
                  </span>
                  <div>
                    <p
                      className={cn(
                        "font-bold text-left text-[#2154B2] text-base md:text-xl font-grotesk ",
                        isActive && " "
                      )}
                    >
                      {step.label}
                    </p>
                    <p
                      className={cn(
                        "text-xs text-[#2154B2]/50 text-left font-medium",
                        isActive && ""
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       <div className="md:h-56 lg:h-0">

       </div>
        <div className="flex items-center justify-center space-x-3 mt-6 w-full">
          {steps.map((step, index) => {
            const isActive = location.pathname.startsWith(step.path);
            return (
              <div
                key={index}
                className={cn(
                  "h-1 w-full rounded-full bg-[#BED5FD] transition-all",
                  isActive && "bg-primary"
                )}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
