import { Button } from "@/components/ui/button";
import DatePickerTooltip from "@/components/ui/calendar-input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] w-[30%] max-h-[90vh] flex flex-col bg-[#F9F9FA] gap-8">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-semibold font-grotesk">
            Schedule Challenge
          </DialogTitle>
        </div>

        <div className="bg-[#ffffff] flex flex-col rounded-xl py-[24px] px-[16px] gap-8">
          <div className="w-full flex flex-col gap-4 items-center">
            <p className="text-gray-500 text-[20px] text-[#80848D] font-[700]">
              Add challenge Start date & time
            </p>

            <p className="text-gray-500 text-sm text-[#80848D]">
              When would you like the challenge to start.
            </p>
          </div>

          <div className="w-full flex flex-col gap-8 bg-white">
            <div className="w-full flex flex-col items-start gap-2">
              <h6 className="text-base font-[500] leading-6 self-start">
                Starts On
                <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
              </h6>

              <DatePickerTooltip />
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <h6 className="text-base font-[500] leading-6 self-start">
              End Date
              <span className="text-[#73A4FC] mb-4 ml-2.5">*</span>
            </h6>

            <DatePickerTooltip />
          </div>

          <div className="w-full">
          <Button type="submit" className="w-full text-[18px] font-bold  py-4 px-6 rounded-2 mr-4">
            Continue
          </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
