import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { followUser } from "@/services/user_api";

export const QUERY_KEY = ["FOLLOW"] as const;

export const useFollow = () => {
  const { toast } = useToast();
  //   const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: string) => followUser(data),
    onSuccess: (data) => {
      console.log(data)
      toast({
        description: "followed user successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "followed user failed, try again",
      });
    },
  });
};
