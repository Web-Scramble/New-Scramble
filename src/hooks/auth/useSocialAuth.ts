import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { socialAuth } from "@/api/auth";
import { SocialAuthPayload } from "@/types/authentication";

import { AxiosError } from "axios";

export function useSocialAuth() {
  return useMutation({
    mutationFn: (value: SocialAuthPayload) => socialAuth(value),
    onSuccess: () => {
      toast.success("Login successfully");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        //@ts-expect-error // Extend axios error object later
        error.response?.data?.message || "Error Validating OTP";
      console.log(errorMessage);
      toast.error(errorMessage);
      //   toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
}
