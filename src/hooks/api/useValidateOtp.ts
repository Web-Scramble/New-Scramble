import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {ValidateOtpPayload,validateOtp} from "@/api/auth";
import { AxiosError } from "axios";

export function useValidateOtp() {
  return useMutation({
    mutationFn: (value:ValidateOtpPayload) =>validateOtp(value),
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