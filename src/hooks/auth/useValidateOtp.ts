import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {validateOtp} from "@/api/auth";
import { ValidateOtpPayload } from "@/types/authentication";

import { AxiosError } from "axios";

export const useValidateOtp=()=> {
  return useMutation({
    mutationFn: (value:ValidateOtpPayload) =>validateOtp(value),
    onSuccess: () => {
      toast.success("OTP Validated successfully");
    },
    onError: (error: AxiosError) => {
        const errorMessage =
        //@ts-expect-error // Extend axios error object
        error.response?.data?.message || "Error Validating OTP";
        console.log(errorMessage)
      toast.error(errorMessage);
    //   toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
}