import { useNavigate } from "react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/features/auth/header";
import Sidebar from "@/components/features/auth/sidebar";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup"); // Navigates to the signup screen
  };

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl gap-4">
      <Sidebar />
      <div className="flex w-full flex-col items-center justify-center p-8 bg-white rounded-xl">
        <Card className="w-full max-w-sm border-none shadow-none">
          <Header
            headerLabel="Welcome to Scramble"
            bodyLabel="Your ultimate challenge awaits! Join us and elevate your skills."
          />
          <CardContent className="flex flex-col space-y-6">
            <p className="text-center text-gray-700">
              Explore our exciting challenges and become the best version of yourself.
              Ready to get started? Click the button below to sign up.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 items-center">
            <Button type="button" className="w-full bg-primary" onClick={handleGetStarted}>
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
