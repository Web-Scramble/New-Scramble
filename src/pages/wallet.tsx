import { useState } from "react";
// import { useNavigate } from "react-router";
import Sidebar from "@/components/features/home/sidebar";
import SearchHeader from "@/components/features/home/search_header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  DollarSign,
  MoreVertical,
  PlusCircle,
  Wallet as WalletIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WalletDashboard() {
//   const navigate = useNavigate();
  const [balance, setBalance] = useState(2500.75);
  
  // Mock transaction data
  const transactions = [
    {
      id: "1",
      description: "Challenge Reward",
      date: "12 Mar 2025",
      amount: 500.00,
      type: "credit"
    },
    {
      id: "2",
      description: "Withdrawal to Bank",
      date: "10 Mar 2025",
      amount: 200.00,
      type: "debit"
    },
    {
      id: "3",
      description: "Top-up from Card",
      date: "05 Mar 2025",
      amount: 1000.00,
      type: "credit"
    },
    {
      id: "4",
      description: "Challenge Reward",
      date: "28 Feb 2025",
      amount: 350.00,
      type: "credit"
    },
    {
      id: "5",
      description: "Withdrawal to PayPal",
      date: "22 Feb 2025",
      amount: 150.00,
      type: "debit"
    }
  ];

  return (
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <section className="flex flex-col gap-4 ml-68 w-full p-4">
        <SearchHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wallet Balance Card */}
          <Card className="md:col-span-1 bg-white shadow-none border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <WalletIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <h2 className="text-3xl font-bold">${balance.toFixed(2)}</h2>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2 bg-primary">
                    <PlusCircle className="h-4 w-4" /> Top Up
                  </Button>
                  <Button className="flex-1 gap-2" variant="outline">
                    <ArrowDownCircle className="h-4 w-4" /> Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Stats Cards */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white shadow-none border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <ArrowUpCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">$1,850.00</h2>
                    <p className="text-sm text-gray-500">+12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-none border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-full mr-4">
                    <ArrowDownCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">$350.00</h2>
                    <p className="text-sm text-gray-500">-5% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Transactions History */}
        <Card className="bg-white mt-4 shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={()=>setBalance(2500.17)}>
                <Calendar className="h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "credit" 
                            ? "bg-green-100" 
                            : "bg-orange-100"
                        }`}>
                          {transaction.type === "credit" ? (
                            <ArrowUpCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownCircle className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                    <TableCell className={transaction.type === "credit" ? "text-green-600" : "text-orange-600"}>
                      {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Payment Methods */}
        <Card className="bg-white mt-4 shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" /> Add New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 04/26</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Default
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Account</p>
                    <p className="text-sm text-gray-500">Zenith Bank ••••5678</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Set Default
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}