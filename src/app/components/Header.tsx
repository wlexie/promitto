import { FC, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DateFilter from "./DateFilter"; // Adjust the import path as needed

const Header: FC = () => {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleDateFilterChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
    // You can add additional logic here to handle the date change (e.g., filtering data)
    console.log("Date range selected:", startDate, endDate);
  };

  const handleClearDateFilter = () => {
    setDateRange({ startDate: null, endDate: null });
    // You can add additional logic here to handle clearing the filter
    console.log("Date filter cleared");
  };

  return (
    <>
      <header className="flex justify-between items-center bg-none">
        <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 bg-transparent px-4 py-2 rounded-lg text-gray-600 border"
            onClick={() => setIsDateFilterOpen(true)}
          >
            <FaCalendarAlt className="w-5 h-5" />
            {dateRange.startDate && dateRange.endDate ? (
              <>
                {dateRange.startDate.toLocaleDateString()} -{" "}
                {dateRange.endDate.toLocaleDateString()}
              </>
            ) : (
              "Filter by Date"
            )}
          </button>
        </div>
      </header>

      <DateFilter
        isOpen={isDateFilterOpen}
        onClose={() => setIsDateFilterOpen(false)}
        onChange={handleDateFilterChange}
        onClear={handleClearDateFilter}
        initialStartDate={dateRange.startDate}
        initialEndDate={dateRange.endDate}
      />
    </>
  );
};

export default Header;
