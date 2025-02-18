import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/features/auth/header";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function OtpSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Successful account verification", {
      description:
        "You have successfully verified your account. Please enter your personal details to continue.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl justify-center">
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-white rounded-xl">
        <Card className="w-full max-w-sm border-none shadow-none text-center">
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="p-3 bg-[#12B76A] text-white rounded-sm">
              <Check className="h-6 w-6" />
            </div>
          </CardContent>
          <Header
            bodyLabel="Continue to provide your personal details."
            headerLabel="You have successfully verified your account"
          />

          <CardFooter className="flex flex-col space-y-4 items-center">
            <Button
              onClick={() => navigate("/personal-details")}
              className="w-full bg-primary"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
