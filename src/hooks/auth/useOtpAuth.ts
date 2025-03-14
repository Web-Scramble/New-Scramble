import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { OtpAuth } from "@/api/auth";
import { OtpAuthPayload } from "@/types/authentication";

import { AxiosError } from "axios";

export function useOtpAuth() {
  return useMutation({
    mutationFn: (value: OtpAuthPayload) => OtpAuth(value),
    onSuccess: () => {
      // toast.success("Login successfully");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        //@ts-expect-error // Extend axios error object later
        error.response?.data?.message
      // "Phone number required!"
      console.log(errorMessage);
      if(errorMessage)
      toast.error(errorMessage);
      //   toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
}