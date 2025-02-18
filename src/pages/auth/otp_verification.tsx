import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPSlot} from "@/components/ui/input-otp";
import Header from "@/components/features/auth/header";
import { otpSchema } from "@/schema/auth_schemas";


type OtpFormValues = {
  otp: string;
};

export default function VerifyOtp() {
  const navigate = useNavigate();

  const form = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const handleNavigate = ()=>{
    navigate("verify_otp")
  }
  const onSubmit = (values: OtpFormValues) => {
    console.log("OTP Submitted:", values.otp);
    navigate("/success_otp");
  };

  return (
    <div className="flex h-screen bg-primary-background p-4 rounded-xl justify-center">
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-white rounded-xl">
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
                              <InputOTPSlot key={index} index={index} className="rounded-sm h-12 w-12"/>
                            ))}
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 items-center">
                <Button type="submit" className="w-full bg-primary" onClick={handleNavigate}>
                  Verify →
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Resend code in <span className="text-highlight">05:00</span> minutes
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
