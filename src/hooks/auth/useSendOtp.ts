import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {  sendOtp} from "@/api/auth";
import { SendOtpPayload} from "@/types/authentication";

import { AxiosError } from "axios";

export const useSendOtp=()=> {
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
