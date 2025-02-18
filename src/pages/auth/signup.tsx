import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/services/supabase";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { signupSchema } from "@/schema/signup_schema";

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
    <div className="flex h-screen">
      <div className="hidden w-1/2 flex-col bg-[#F5F7FC] p-8 lg:flex">
        <Button
          variant="ghost"
          className="mb-4 w-fit"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
        <div className="mt-auto mb-auto">
          <h1 className="text-3xl font-bold">Scramble</h1>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <Card className="w-full max-w-sm">
          <Header
            bodyLabel="
              Enter your Email or Phone number to sign in to your account or create your account
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email or phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary">
                  Continue
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Or sign up with
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Button variant="outline" className="border border-highlight" onClick={signInWithGoogle}>
                    Google
                  </Button>
                  <Button variant="outline" onClick={signInWithFacebook}>
                    Facebook
                  </Button>
                  <Button variant="outline" onClick={signInWithTwitter}>
                    X
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
