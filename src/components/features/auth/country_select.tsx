import { ChevronDown } from "lucide-react";
import { useState } from "react";
import countries from "@/constants/countries";

type CountrySelectProps = {
  selectedDialCode: string;
  setSelectedDialCode: (code: string) => void;
};

export const CountrySelect = ({
  selectedDialCode,
  setSelectedDialCode,
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex px-2 py-1 bg-white border-r items-center border-gray-300 focus:outline-none focus:ring-0"
      >
        {selectedDialCode} <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {open && (
        <>
          <ul className="absolute z-10  bg-white border border-gray-300 mt-1 rounded shadow-md max-h-60 overflow-auto w-[300px] no-scrollbar">
            {countries.map((country) => (
              <li
                key={country.code}
                onClick={() => {
                  setSelectedDialCode(country.dial_code);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
              >
                {country.name} {country.dial_code}
              </li>
            ))}
          </ul>
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </>
      )}
    </div>
  );
};
