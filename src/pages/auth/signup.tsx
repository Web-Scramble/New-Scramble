import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/services/supabase";
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
import Sidebar from "@/components/features/auth/sidebar";
import { useState } from "react";
import { CountrySelect } from "@/components/features/auth/country_select";

type SignupFormValues = {
  phone: string;
};


export default function Signup() {
  const navigate = useNavigate();
  const [selectedDialCode, setSelectedDialCode] = useState("+1");

  const form = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleNavigate = () => {
    navigate("verify_otp");
  };

  async function onSubmit(values: SignupFormValues) {
    try {
      // Combine the dial code with the entered phone number
      const formattedPhone = `${selectedDialCode}${values.phone}`;
      const { data, error } = await supabase.auth.signUp({
        phone: formattedPhone,
        password: "tempPassword123",
      });
      if (error) throw error;
      console.log("Sign up successful with phone:", data);
    } catch (error) {
      navigate("");
      console.error("Sign up error:", error);
    }
  }

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      console.log("Google OAuth data:", data);
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  }

  async function signInWithFacebook() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });
      if (error) throw error;
      console.log("Facebook OAuth data:", data);
    } catch (error) {
      console.error("Facebook sign in error:", error);
    }
  }

  async function signInWithTwitter() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
      });
      if (error) throw error;
      console.log("Twitter (X) OAuth data:", data);
    } catch (error) {
      console.error("Twitter sign in error:", error);
    }
  }

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl gap-4">
      <Sidebar />
      <div className="flex w-full flex-col items-center justify-center p-8 bg-white rounded-xl">
        <Card className="w-full max-w-sm border-none shadow-none">
          <Header
            bodyLabel="Enter your Phone number to sign in or create your account"
            headerLabel="Sign up"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-left">Phone Number</FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-primary"
                  onClick={handleNavigate}
                >
                  Continue
                </Button>

                <div className="w-full text-center text-sm text-gray-500 flex gap-1 justify-between items-center">
                  <div className="bg-gray-500 w-full" style={{ height: "1px" }}></div>
                  <div className="w-full">Or sign up with</div>
                  <div className="bg-gray-500 w-full" style={{ height: "1px" }}></div>
                </div>

                <div className="w-full flex flex-row justify-between">
                  <Button
                    variant="outline"
                    className="border-2 border-primary-border p-6 px-8"
                    onClick={signInWithGoogle}
                  >
                    <img
                      src={"/images/google.png"}
                      alt="google"
                      width={25}
                      height={25}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-primary-border p-6 px-8"
                    onClick={signInWithFacebook}
                  >
                    <img
                      src={"/images/facebook.png"}
                      alt="facebook"
                      width={25}
                      height={25}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-primary-border p-6 px-8"
                    onClick={signInWithTwitter}
                  >
                    <img
                      src={"/images/twitter.png"}
                      alt="twitter"
                      width={25}
                      height={25}
                    />
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  By continuing I agree to Scramble's{" "}
                  <Link to="#" className="text-highlight underline">
                    terms & condition
                  </Link>{" "}
                  and their{" "}
                  <Link to="#" className="text-highlight underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
