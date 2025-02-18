import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/services/supabase";
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

type SignupFormValues = {
  Phone: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      Phone: "",
    },
  });

  const handleNavigate = ()=>{
    navigate("verify_otp")
  }

  async function onSubmit(values: SignupFormValues) {
    try {
      if (isValidEmail(values.Phone)) {
        const { data, error } = await supabase.auth.signUp({
          email: values.Phone,
          password: "tempPassword123",
        });
        if (error) throw error;
        console.log("Sign up successful with email:", data);
      } else {
        const { data, error } = await supabase.auth.signUp({
          phone: values.Phone,
          password: "tempPassword123",
        });
        if (error) throw error;
        console.log("Sign up successful with phone:", data);
      }
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

  function isValidEmail(value: string): boolean {
    // Very basic regex for demonstration
    return /\S+@\S+\.\S+/.test(value);
  }

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl justify-center">
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-white rounded-xl">
        <Card className="w-full max-w-sm border-none shadow-none">
          <Header
            bodyLabel="
              Enter your Phone number to sign in or create your account
          "
            headerLabel="Sign up"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="Phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-left">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary" onClick={handleNavigate}>
                  Continue
                </Button>

                <div className=" w-full text-center text-sm text-gray-500 flex gap-1 justify-between items-center">
                  <div
                    className="bg-gray-500 w-full"
                    style={{
                      height: "1px",
                    }}
                  ></div>
                  <div className="w-full">Or sign up with</div>
                  <div
                    className="bg-gray-500 w-full"
                    style={{
                      height: "1px",
                    }}
                  ></div>
                </div>

                <div className=" w-full flex flex-row justify-between">
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
                      alt="facebook"
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
