import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import Header from "@/components/features/auth/header";
import { otpSchema } from "@/schema/auth_schemas";
import Sidebar from "@/components/features/auth/auth-sidebar";
import { useEffect, useState } from "react";
// import { useValidateOtp } from "@/hooks/auth/useValidateOtp";
import { useSendOtp } from "@/hooks/auth/useSendOtp";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { authStore } from "@/store/authstore";
import { useOtpAuth } from "@/hooks/auth/useOtpAuth";
import { setItemToLocalStorage } from "@/utils/localStorage";
import { TOKEN, USER_DATA } from "@/constants/keys";

type OtpFormValues = {
  otp: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();
  const { phone } = useParams();
  const [success, setSuccess] = useState(false);
  const { updateToken, updateUser ,updateFirebaseToken} = authStore();
  // const [Loading, setLoading] = useState(second)

  const form = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // const { mutate: validateOtpMutation, isPending: validating } =
  //   useValidateOtp();
  const { mutate: otpAuthmutation, isPending: authenticating } =
    useOtpAuth();
  const { mutate: resendOtp, isPending: resending } = useSendOtp();

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // const onSubmit = (values: OtpFormValues) => {
  //   if (!phone) {
  //     toast.error("Phone number is missing");
  //     return;
  //   }
  //   const payload = { phone, otp: values.otp };
  //   validateOtpMutation(payload, {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       if (data.message === "Complete registration required") {
  //         setSuccess(true);
  //       }
  //       if (data.message === "Login successful") {
  //         setItemToLocalStorage(USER_DATA, data.user);
  //         setItemToLocalStorage(TOKEN, data.token);
  //         updateToken(data.token);
  //         updateUser(data.user);
  //         navigate("/home");
  //       }
  //     },
  //   });
  // };
  const onSubmit = (values: OtpFormValues) => {
    if (!window.confirmationResult) {
      toast.error("OTP confirmation result is not available. Please request a new OTP.");
      return;
    }
  window.confirmationResult.confirm(values.otp).then((result) => {
    otpAuthmutation(
      //@ts-expect-error firebase types donot include this property
      {idToken:result._tokenResponse.idToken},{
        onSuccess:(data)=>{
          console.log(data);
                if (data.message === "Complete registration required") {
                  setSuccess(true);
                  updateFirebaseToken(data?.registrationData.firebaseUID)
                }
                if (data.message === "Authenticated successfully") {
                  setItemToLocalStorage(USER_DATA, data.user);
                  setItemToLocalStorage(TOKEN, data.token);
                  updateToken(data.token);
                  updateUser(data.user);
                  navigate("/home");
                }
        }
      }
    )
    // updateUser(user);
    // navigate("/home");
    // toast.success("OTP verified successfully!");
  })
  .catch((error) => {
    console.error("Error verifying OTP:", error);
    toast.error("Invalid or expired OTP. Please try again.");
  });
  };

  const handleResend = () => {
    if (!phone) {
      toast.error("Phone number is missing");
      return;
    }
    resendOtp(
      { phone },
      {
        onSuccess: () => {
          toast.success("OTP resent successfully");
          setTimeLeft(60);
        },
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full lg:h-screen bg-primary-background p-4 rounded-xl gap-4">
      <Sidebar />
      {success ? (
        <div className="flex w-full flex-col items-center justify-center p-2 md:p-8 bg-white rounded-xl">
          <Card className="w-full max-w-sm border-none shadow-none text-center">
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="p-3 bg-[#12B76A] text-white rounded-sm">
                <Check className="h-6 w-6" />
              </div>
            </CardContent>
            <Header
              bodyLabel="Continue to provide your personal details."
              headerLabel="You have successfully verified your account"
            />

            <CardFooter className="flex flex-col space-y-4 items-center">
              <Button
                onClick={() => navigate(`/create_account/${phone}`)}
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
              bodyLabel="We sent a verification code to your email/phone number. Enter the code below to continue."
              headerLabel="Verify your account"
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="flex flex-col items-center space-y-6">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={field.onChange}
                            className="flex justify-center gap-2"
                          >
                            {[...Array(6)].map((_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="rounded-sm h-8 md:h-12 w-8 md:w-12"
                              />
                            ))}
                          </InputOTP>
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
                    disabled={authenticating}
                  >
                    {authenticating ? "Verifying..." : "Verify →"}
                  </Button>

                  {timeLeft > 0 ? (
                    <p className="text-center text-sm text-gray-500">
                      Resend code in{" "}
                      <span className="text-highlight">
                        {formatTime(timeLeft)}
                      </span>{" "}
                      minutes
                    </p>
                  ) : (
                    <Button
                      variant="link"
                      onClick={handleResend}
                      disabled={resending}
                    >
                      {resending ? "Resending..." : "Resend Code"}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
}
