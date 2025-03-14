import {
  AddParticipants,
  EmojiIcon,
  Game,
  ImageUploadIcon,
  MapIcon,
  Puzzle,
  QuestionAnswer,
  ScheduleIcon,
} from "@/assets/icon";
import { ScheduleModal } from "@/components/features/challenges/schedule_cahllenge_modal";
import { SearchBar } from "@/components/features/home/search";
import SearchHeader from "@/components/features/home/search_header";
import Sidebar from "@/components/features/home/sidebar";
import { Button } from "@/components/ui/button";
import DatePickerTooltip from "@/components/ui/calendar-input";
import TagSelector from "@/components/ui/challenge_tag";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/text-area";
import TimeLimitSelector from "@/components/ui/time-limit";
import { useState } from "react";
import RichTextEditor from "@/components/features/dashboard/richtexteditor";

export default function MyChallenges() {
  const [activeType, setActiveType] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex h-full gap-4 w-full bg-[#F9F9FA]">
      <Sidebar />
      <div className="flex gap-4 flex-col min-h-[100vh] ml-68 w-full">
        <SearchHeader page="Edit Challenge" />
        <div className="flex flex-col gap-2 items-start">
          <h3 className="text-[#343538] leading-[40px] text-[32px] font-bold tracking-[-0.64px]">
            Create New challenge
          </h3>
          <p className="text-xs leading-[14px] text-[#989CA7]">
            Write your comment and interact with others about the challenge.
          </p>
        </div>
        <div className="flex mt-4 flex-col bg-white p-6 rounded-[14px] gap-6">
          <div className="flex flex-col gap-[10px]">
            <h6 className="text-base font-[500] leading-6 self-start">
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

          <div className="flex flex-col gap-[10px]">
            <h6 className="text-base font-[500] leading-6 self-start">
              Challenge Description{" "}
            </h6>
            <div className="flex flex-col gap-4 items-center bg-[#F8F8F8] w-full p-[20px]">
              <Input
                placeholder="Challenge Title"
                name="title"
                type="text"
                className="text-3xl text-bold text-red border-none outline-none"
              />
              <TextArea
                placeholder="What is your challenge about?"
                className="bg-none w-full h-40 p-2 outline-none"
              />

              <div className="flex gap-4 w-full">
                <div className="w-fit">
                  <ImageUploadIcon />
                </div>
                <div className="w-fit">
                  <EmojiIcon />
                </div>
              </div>
            </div>
          </div>
            
          <div className="flex flex-col gap-[10px]">
            <h6 className="text-base font-[500] leading-6 self-start">
              Challenge details/contents
            </h6>
            <RichTextEditor />
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-4  w-full p-[20px] items-start">
              <div className="w-[25%] flex flex-col items-start gap-2">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Reward
                </h6>

                <TimeLimitSelector />
              </div>

              <div className="w-[25%] flex flex-col items-start gap-2">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Time Limit for submission
                  <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
                </h6>

                <TimeLimitSelector />
              </div>

              <div className="w-[25%] flex flex-col items-start gap-2">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Review Duration
                  <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
                </h6>
                <TimeLimitSelector />
              </div>

              <div className="w-[25%] flex flex-col items-start gap-2">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Ends On
                  <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
                </h6>

                <DatePickerTooltip />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-16 items-start w-full p-[20px]">
              <div className="flex flex-col gap-[12px]">
                <MapIcon />
                <h6 className="text-base font-[500] leading-6 self-start">
                  Invite Only
                  <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
                </h6>
              </div>

              <div className="flex flex-col gap-[12px] w-[40%]">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Add Participants
                </h6>

                <div className="flex gap-2 items-center">
                  <div className="flex justify-center items-center p-[8px] rounded-[8px] bg-[#BED5FD]">
                    <AddParticipants />
                  </div>

                  <div className="w-full">
                    <SearchBar />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[12px] w-[40%]">
                <h6 className="text-base font-[500] leading-6 self-start">
                  Add Reviewers
                </h6>

                <div className="flex gap-2 items-center">
                  <div className="flex justify-center items-center p-[8px] rounded-[8px] bg-[#BED5FD]">
                    <AddParticipants />
                  </div>

                  <div className="w-full">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h6 className="text-base font-[500] leading-6 self-start">
              Challenge Tags
              <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
            </h6>
            {/* <div className="flex flex-col gap-4 items-center bg-[#F8F8F8] w-full p-[20px]">
            
            </div> */}

            <TagSelector />
          </div>
        </div>

        <div className="w-full flex justify-between py-[24px]">
          <Button className="text-[#2E77FA] text-[18px] font-bold border-[#2E77FA] border-2 bg-[none] py-4 px-6"
          onClick={() => setIsOpen(true)}
          >
            <ScheduleIcon />
            <p>Schedule For later</p>
          </Button>

          <Button className=" text-[18px] font-bold  py-4 px-6 rounded-2 mr-4">
            Continue
          </Button>
        </div>
      </div>

      <ScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
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
