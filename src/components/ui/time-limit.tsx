import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';

const TimeLimitSelector = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(inputRef.current, tooltipRef.current, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8], // Adjust the offset as needed
        },
      },
    ],
  });

  const hoursOptions = Array.from({ length: 13 }, (_, i) => i); // 0 to 12 hours
  const minutesOptions = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, ..., 55 minutes

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(parseInt(e.target.value));
  };

  return (
    <div className='w-full self-start'>
      <input
        ref={inputRef}
        type="text"
        value={`${hours}h ${minutes}m`}
        readOnly
        onClick={handleInputClick}
        className="py-[12px] px-4 border rounded cursor-pointer border-[#D0D7E1] text-[#686C71] w-full"
      />
      {isOpen && (
        <div
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
          className="bg-white border rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="hours" className="text-sm font-medium text-gray-700">
                Hours
              </label>
              <select
                id="hours"
                value={hours}
                onChange={handleHoursChange}
                className="p-2 border rounded"
              >
                {hoursOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="minutes" className="text-sm font-medium text-gray-700">
                Minutes
              </label>
              <select
                id="minutes"
                value={minutes}
                onChange={handleMinutesChange}
                className="p-2 border rounded"
              >
                {minutesOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLimitSelector;