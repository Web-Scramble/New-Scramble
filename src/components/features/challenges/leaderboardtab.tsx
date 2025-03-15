import { QuestionAnswer, Game } from "@/assets/icon";
import { Puzzle } from "lucide-react";
import { useState } from "react";


export const LeaderBoardTab = () => {

    const [activeType, setActiveType] = useState(0);

    return (
        <>
            
            <div className="flex gap-2.5 items-center">
              {Types.map((type, index) => {
                const isActive = activeType === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveType(index)}
                    className={`h-[40px] px-6 justify-center gap-2.5 flex rounded-[6px] cursor-pointer items-center rounded-2  ${
                      isActive
                        ? "bg-white text-[#343538]"
                        : "bg-[#F9F9FA] text-[#989CA7]"
                    }`}
                  >
                    <div>
                      <p className="text-xs mt-1">{type}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </>
    )
}



const Types = [
  "Active","Finished","Drafts"
  
];
