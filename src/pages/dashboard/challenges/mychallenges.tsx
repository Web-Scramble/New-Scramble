import { Game, Puzzle, QuestionAnswer } from "@/assets/icon";
import { useState } from "react";

export default function MyChallenges() {
  const [activeType, setActiveType] = useState(0);

  return (
    <>
      <div className="flex min-h-[100vh] gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <h3 className="text-[#343538] leading-[40px] text-[32px] font-bold tracking-[-0.64px]">
            Edit challenge
          </h3>
          <p className="text-xs leading-[14px] text-[#989CA7]">
            Write your comment and interact with others about the challenge.
          </p>
        </div>
        <div className="flex mt-4 flex-col bg-white p-6 rounded-[14px]">
          <div className="flex flex-col gap-[10px]">
            <h6 className="text-base font-[500] leading-6">
              Select Challenge Type{" "}
              <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
            </h6>
            <div className="flex gap-4 items-center">
              {Types.map((type, index) => {
                const isActive = activeType === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveType(index)}
                    className={`w-[188px] h-[62px] justify-center gap-2.5 flex rounded-[8px] cursor-pointer items-center rounded-2  border ${
                      isActive
                        ? "border-[#2E77FA] text-[#2E77FA]"
                        : "border-[#B5BCC5] text-[#B5BCC5]"
                    }`}
                  >
                    {type.icon}
                    <div>
                      <h4 className="text-sm font-bold">{type.text.title}</h4>
                      <p className="text-xs mt-1">{type.text.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Types = [
  {
    icon: <QuestionAnswer />,
    text: { title: "Default", subtitle: "Default Challenge" },
  },
  {
    icon: <Game />,
    text: { title: "Game", subtitle: "Interactive Game" },
  },
  {
    icon: <Puzzle />,
    text: { title: "Puzzle", subtitle: "Solve Puzzles" },
  },
];
