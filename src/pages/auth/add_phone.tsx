import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import Sidebar from "@/components/features/auth/auth-sidebar";
import { useCreateUser } from "@/hooks/auth/useCreateUser";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { authStore } from "@/store/authstore";
import { CountrySelect } from "@/components/features/auth/country_select";

type AddPhoneFormValues = {
  phone: string;
};

export default function AddPhone() {
  const navigate = useNavigate();
  // const { phone } = useParams();
  const { updateToken, updateUser, user } = authStore();
  const [success, setSuccess] = useState(false);
  const [selectedDialCode, setSelectedDialCode] = useState("+1");

  const form = useForm<AddPhoneFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { phone: "" },
  });

  const { mutate: createUserMutation, isPending } = useCreateUser();

  const onSubmit = (values: AddPhoneFormValues) => {
    // if (!phone) return;
    const payload = {
      phone: `${selectedDialCode}${values.phone}`,
      email: user.email,
      username: user.username,
    };
   console.log(payload)
    createUserMutation(payload, {
      onSuccess: (data) => {
        console.log(data)
        setSuccess(true);
        setItemToLocalStorage("USER_DATA", data.user);
        setItemToLocalStorage("TOKEN", data.token);
        updateToken(data.token);
        updateUser({...data.user,profile_picture:user.profile_picture});
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full lg:h-screen bg-primary-background p-4 rounded-xl gap-4">
      <Sidebar />
      {success ? (
        <div className="flex w-full flex-col items-center justify-center md:p-8 bg-white rounded-xl">
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
                onClick={() => navigate("/home")}
                className="w-full bg-primary"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center md:p-8 bg-white rounded-xl">
          <Card className="w-full max-w-sm border-none shadow-none">
            <Header
              bodyLabel="Add a Phone Number to your Account"
              headerLabel="Add Phone"
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-left text-black">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-gray-300 rounded py-1 space-x-2">
                            <CountrySelect
                              selectedDialCode={selectedDialCode}
                              setSelectedDialCode={setSelectedDialCode}
                            />
                            <input
                              type="text"
                              placeholder="Enter Number"
                              {...field}
                              className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-0 text-base font-normal"
                            />
                          </div>
                        </FormControl>
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
