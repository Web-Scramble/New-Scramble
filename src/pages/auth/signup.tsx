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
import { useSendOtp } from "@/hooks/auth/useSendOtp";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useSocialAuth } from "@/hooks/auth/useSocialAuth";
import { authStore } from "@/store/authstore";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { TOKEN, USER_DATA } from "@/constants/keys";

type SignupFormValues = {
  phone: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [selectedDialCode, setSelectedDialCode] = useState("+1");
  const { updateToken, updateUser } = authStore();

  const form = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { mutate: sendOtp, isPending } = useSendOtp();
  const { mutate: socialAuth } = useSocialAuth();

  async function onSubmit(values: SignupFormValues) {
    const formattedPhone = `${selectedDialCode}${values.phone}`;
    sendOtp(
      { phone: formattedPhone },
      {
        onSuccess: () => {
          navigate(`/verify_otp/${formattedPhone}`);
        },
      }
    );
  }

  const SignupWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        console.error("Error in user Credential");
        return;
      }
      const token = credential.accessToken;
      const user = result.user;
      console.log(user, token);
      auth?.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) =>
        socialAuth(
          {
            token: idToken,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              setItemToLocalStorage(USER_DATA, data.user);
              setItemToLocalStorage(TOKEN, data.token);
              updateToken(data.token);
              updateUser(data.user);
              if (!data.user.phone) {
                navigate(`/verify_otp/`)
              }
              navigate(`/home`)
            },
          }
        )
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  };

  async function signInWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      if (!credential) {
        console.error("Error in user Credential");
        return;
      }
      const token = credential.accessToken;
      const user = result.user;
      console.log(user, token);
      auth?.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) =>
        socialAuth(
          {
            token: idToken,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              setItemToLocalStorage(USER_DATA, data.user);
              setItemToLocalStorage(TOKEN, data.token);
              updateToken(data.token);
              updateUser(data.user);
              if (!data.user.phone) {
                navigate(`/verify_otp/`)
              }
              navigate(`/home`)
            },
          }
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
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
            </form>
          </Form>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary"
              disabled={isPending}
            >
              {isPending ? "Sending OTP..." : "Continue"}
            </Button>

            <div className="w-full text-center text-sm text-gray-500 flex gap-1 justify-between items-center">
              <div
                className="bg-gray-500 w-full"
                style={{ height: "1px" }}
              ></div>
              <div className="w-full">Or sign up with</div>
              <div
                className="bg-gray-500 w-full"
                style={{ height: "1px" }}
              ></div>
            </div>

            <div className="w-full flex flex-row justify-between">
              <Button
                variant="outline"
                className="border-2 border-primary-border p-6 px-8"
                onClick={SignupWithGoogle}
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
        </Card>
      </div>
    </div>
  );
}
