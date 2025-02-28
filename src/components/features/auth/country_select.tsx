import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex px-2 py-1 bg-white border-r text-sm md:text-base items-center border-gray-300 focus:outline-none focus:ring-0"
      >
        {selectedDialCode} <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {open && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded shadow-md max-h-60 overflow-y-auto w-[225px] md:w-[300px]">
          {countries.map((country) => (
            <li
              key={country.code}
              onClick={() => {
                setSelectedDialCode(country.dial_code);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-xs md:text-base"
            >
              {country.name} {country.dial_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
