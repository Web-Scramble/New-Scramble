import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddPhone } from "@/api/auth";
import { SocialAddPhonePayload } from "@/types/authentication";

import { AxiosError } from "axios";

export function useAddPhone() {
  return useMutation({
    mutationFn: (value: SocialAddPhonePayload) => AddPhone(value),
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        //@ts-expect-error // Extend axios error object later
        error.response?.data?.message;
      console.log(errorMessage);
      if(errorMessage)
        toast.error(errorMessage);
    },
  });
}
