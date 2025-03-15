


import SearchHeader from "@/components/features/home/search_header";
import Sidebar from "@/components/features/home/sidebar";

import {Plus} from "lucide-react"
import { LeaderBoardTab } from "@/components/features/challenges/leaderboardtab";
import { SortByIcon } from "@/assets/icon";
import { UserRankings } from "@/components/features/challenges/userrankings";


export default function LeaderBoard() {

  return (
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <div className="flex gap-3 flex-col min-h-[100vh] ml-68 w-full">
        <SearchHeader page="Edit Challenge" />
        <div className="flex flex-col gap-2 items-start">
          <h3 className="text-[#343538] leading-[40px] text-[24px] font-bold tracking-[-0.64px]">
            Your Challenges Stats
          </h3>
          <p className="text-xs leading-[14px] text-[#989CA7]">
            Manage all the challenges you have created on scramble
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div className="px-4 py-3 rounded-[8px]  border border-[#E6EBF1] flex">
            <div className="flex flex-col justify-center">
              <span className="text-[#2E77FA] font-bold text-[20px] leading-[28px]">
                2.3k
              </span>
              <span className="text-[#80848D] text-xs leading-3.5">
                Total Created
              </span>
            </div>
            <div className="h-[42px] mx-[20px] w-[0.5px] bg-[#E6EBF1]"></div>
            <div className="flex flex-col justify-center">
              <span className="text-[#2E77FA] font-bold text-[20px] leading-[28px]">
                400
              </span>
              <span className="text-[#80848D] text-xs leading-3.5">
                Reviewers submissions
              </span>
            </div>
            <div className="h-[42px] mx-[20px] w-[0.5px] bg-[#E6EBF1]"></div>
            <div className="flex flex-col justify-center">
              <span className="text-[#2E77FA] font-bold text-[20px] leading-[28px]">
                80
              </span>
              <span className="text-[#80848D] text-xs leading-3.5">
                User submissions
              </span>
            </div>
          </div>
          <button className="outline-none  w-[177px] h-[44px] flex gap-[8px] items-center rounded-[4px] text-[#2E77FA] border-[#2E77FA] border-[2px] justify-center text-base leading-[20px] font-semibold mr-4">
            <Plus color="#2E77FA" />
            <span>New Challenge</span>
          </button>
        </div>
        <div className="mt-[40px] flex flex-col gap-6 pr-4">
          <LeaderBoardTab />
          <div className="flex items-center gap-2.5">
            <h3 className="text-2xl font-bold leading-8 text-black">All Challenges Record</h3>
            <div className="h-[1px] bg-[#E6EBF1] grow"></div>
            <div className="flex items-center gap-1">
                <span className="text-[#B5BCC5] text-xs leading-3.5">Sort by:</span>
                <span className="text-[#686C71] text-xs leading-3.5">Recent</span>
                <SortByIcon />
            </div>
          </div>
          <UserRankings />
        </div>
      </div>
    </main>
  );
}
