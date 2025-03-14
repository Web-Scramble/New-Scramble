import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { format } from 'date-fns';

const DatePickerTooltip = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(parseInt(e.target.value));
    setSelectedDate(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(e.target.value));
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const blanks = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...days].map((day, index) => (
      <div
        key={index}
        className="text-center p-2 cursor-pointer hover:bg-gray-200 rounded"
        onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
      >
        {day}
      </div>
    ));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i);

  return (
    <div className='w-full self-start'>
      <input
        ref={inputRef}
        type="text"
        value={format(selectedDate, 'dd/MM/yyyy')}
        readOnly
        onClick={handleInputClick}
        className="py-[12px] px-4 border rounded cursor-pointer border-[#D0D7E1] text-[#686C71] w-full"
      />
      {isOpen && (
        <div
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
          className="bg-white border rounded-lg shadow-lg p-4 z-50 "
        >
          <div className="flex justify-between items-center mb-4">
            <select
              value={selectedDate.getMonth()}
              onChange={handleMonthChange}
              className="p-2 border rounded"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={selectedDate.getFullYear()}
              onChange={handleYearChange}
              className="p-2 border rounded"
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa', 'Su'].map((day) => (
              <div key={day} className="text-center font-bold p-2">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerTooltip;