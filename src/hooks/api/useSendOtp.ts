import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SendOtpPayload, sendOtp} from "@/api/auth";
import { AxiosError } from "axios";

export function useSendOtp() {
  return useMutation({
    mutationFn: (phone: SendOtpPayload) => sendOtp(phone),
    onSuccess: () => {
      toast.success("OTP sent successfully");
    },
    onError: (error: AxiosError) => {
        const errorMessage =
        //@ts-expect-error // Extend axios error object
        error.response?.data?.message || "Failed to send OTP";
        console.log(errorMessage)
      toast.error(errorMessage);
    //   toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
}
