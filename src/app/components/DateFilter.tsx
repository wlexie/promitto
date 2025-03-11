"use client"; // Required for Next.js client-side components

import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { FaCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

interface DateFilterProps {
  onChange: (startDate: Date, endDate: Date) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: any) => {
    // ✅ TEMP FIX (Avoids Type Errors)
    const selection = ranges.selection; // ✅ Use direct property access
    if (selection?.startDate && selection?.endDate) {
      setSelectedRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: "selection",
      });
    }
  };

  const handleApplyFilter = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onChange(selectedRange.startDate, selectedRange.endDate);
    }
    setShowCalendar(false); // Close the calendar after applying the filter
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <FaCalendarAlt className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          Filter by Date
        </span>
      </button>

      {showCalendar && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <DateRangePicker
            ranges={[selectedRange]}
            onChange={handleSelect} // ✅ Works without type error
            moveRangeOnFirstSelection={false}
            rangeColors={["#3b82f6"]}
            maxDate={new Date()}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowCalendar(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
