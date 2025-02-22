import { useNavigate, useParams } from "react-router";
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
import { signupSchema } from "@/schema/auth_schemas";
import Sidebar from "@/components/features/auth/sidebar";
import { useCreateUser } from "@/hooks/auth/useCreateUser";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { authStore } from "@/store/authstore";

type AddPhoneFormValues = {
  phone: string;
  fullName: string;
};

export default function AddPhone() {
  const navigate = useNavigate();
  const { phone } = useParams();
  const { updateToken, updateUser,user } = authStore();
  const [success, setSuccess] = useState(false);

  const form = useForm<AddPhoneFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { phone: "" },
  });

  const { mutate: createUserMutation, isPending } = useCreateUser();

  const onSubmit = (values: AddPhoneFormValues) => {
    if (!phone) return;
    const payload = {
      phone,
      email: user.email,
      username: user.username,
    };

    createUserMutation(payload, {
      onSuccess: (data) => {
        setSuccess(true);
        setItemToLocalStorage("USER_DATA", data.user);
        setItemToLocalStorage("TOKEN", data.token);
        updateToken(data.token);
        updateUser(data.user);
      },
    });
  };

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl gap-4 ">
      <Sidebar />
      {success ? (
        <div className="flex w-full flex-col items-center justify-center p-8 bg-white rounded-xl">
          <Card className="w-full max-w-sm border-none shadow-none text-center">
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="p-3 bg-[#12B76A] text-white rounded-sm">
                <Check className="h-6 w-6" />
              </div>
            </CardContent>
            <Header
              bodyLabel="Continue to your dashboard to view your challenges."
              headerLabel="You have successfully created your account"
            />

            <CardFooter className="flex flex-col space-y-4 items-center">
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-primary"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center p-8 bg-white rounded-xl">
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Enter Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Email" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left">Full Name</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          First name and Last name e.g Edga Alane or Alane Edga
                        </p>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 items-center">
                  <Button
                    type="submit"
                    className="w-full bg-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Creating Account..." : "Continue"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
}
