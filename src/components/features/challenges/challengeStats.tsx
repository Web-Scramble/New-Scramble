type ChallengeStatProps = {
  amount: string;
  title: string;
};
export const ChallengeStats = ({ amount, title }: ChallengeStatProps) => {
  return (
    <div className=" flex flex-col gap-4 items-center">
      <p className="text-lg text-[#5892FB] font-[700]">{amount}</p>
      <p className="text-sm text-[#80848D] ">{title}</p>
    </div>
  );
};
