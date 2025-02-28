import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/features/auth/header";
import { authStore } from "@/store/authstore";
import Sidebar from "@/components/features/home/Sidebar";


export default function Dashboard() {
  const {user } = authStore();

  return (
    <div className="flex h-screen bg-primary-background p-4 gap-4">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <div className="mb-6">
          <Header 
            headerLabel="Dashboard" 
            bodyLabel={`Welcome back, ${user.username}!`} 
          />
        </div>

        {/* User Credentials Card */}
        <div className="mb-6 flex justify-center">
          <Card className="w-full max-w-sm border-none shadow-none">
            <CardContent>
              <h2 className="text-xl font-bold text-[#133269]">Your Credentials</h2>
              <p className="text-gray-600">Username: {user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Role: {user.role}</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-[#133269]">Stat 1</h2>
              <p className="text-gray-600">Placeholder data for statistic 1.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-[#133269]">Stat 2</h2>
              <p className="text-gray-600">Placeholder data for statistic 2.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="flex flex-col space-y-2">
              <h2 className="text-xl font-bold text-[#133269]">Stat 3</h2>
              <p className="text-gray-600">Placeholder data for statistic 3.</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <Card className="w-full border-none shadow-none">
            <CardContent>
              <h2 className="text-2xl font-bold text-[#133269]">
                Recent Activity
              </h2>
              <p className="text-gray-600">
                No recent activity available at this time.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-primary">View More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
