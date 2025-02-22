import { useMutation } from "@tanstack/react-query";
import { joinChallenge } from "@/services/challenge_api";
import { ChallengeFormData } from "@/types/challenge";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { authStore } from "@/store/authstore";


export const useJoinChallenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedId} = authStore();

  //   const queryClient = useQueryClient();
  // let urlId:string|void
  return useMutation({
    mutationFn: (id) => joinChallenge(id),
    onSuccess: (data) => {
      console.log(data)
      toast({
        description: "challenge joined successfully.",
      });
      navigate(`/submission/${selectedId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: " failed to join challenges",
      });
    },
  });
};
