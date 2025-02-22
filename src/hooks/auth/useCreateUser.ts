import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {createUser} from "@/api/auth";
import { CreateUserPayload } from "@/types/authentication";

import { AxiosError } from "axios";

export const useCreateUser=()=> {
  return useMutation({
    mutationFn: (value:CreateUserPayload) =>createUser(value),
    onSuccess: () => {
      toast.success("User created");
    },
    onError: (error: AxiosError) => {
        const errorMessage =
        //@ts-expect-error // Extend axios error object
        error.response?.data?.message || "Failed to create user";
        console.log(errorMessage)
      toast.error(errorMessage);
    //   toast.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
}