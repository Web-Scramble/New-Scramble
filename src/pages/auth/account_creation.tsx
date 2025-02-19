import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/features/auth/header";
import { Eye, EyeOff } from "lucide-react";
import { accountSchema } from "@/schema/auth_schemas";

type AccountFormValues = {
  email: string;
  fullName: string;
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [showFullName, setShowFullName] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: yupResolver(accountSchema),
    defaultValues: { email: "", fullName: "" },
  });

  const onSubmit = async (values: AccountFormValues) => {
    console.log("Account Data:", values);
    navigate("/dashboard"); 
  };

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl justify-center">
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-white rounded-xl">
        <Card className="w-full max-w-sm border-none shadow-none">
          <Header
            bodyLabel="Choose a unique username for your account. You can always change it later."
            headerLabel="Create your username"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="flex flex-col space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-left" >Enter Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email (+237693......)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-left" >Full Name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showFullName ? "text" : "password"}
                            placeholder="Enter your user name"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        First name and Last name e.g Edga Alane or Alane Edga
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 items-center">
                <Button type="submit" className="w-full bg-primary">
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
