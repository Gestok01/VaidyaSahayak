"use client";
import React, { useRef } from "react";
import { Search, Calendar } from "lucide-react";

interface SearchField {
  name: string;
  placeholder: string;
  value: string;
  options?: string[];
  type?: string;
}

interface DynamicSearchPageProps {
  searchQueries: SearchField[];
  setSearchQueries: (queries: SearchField[]) => void;
  handleSearch: () => void;
}

const DynamicSearchPage: React.FC<DynamicSearchPageProps> = ({
  searchQueries = [],
  setSearchQueries,
  handleSearch,
}) => {
  const dateInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value.replace(/\D/g, "");
    updateQueryValue(name, value);
  };

  const handleDateFieldClick = (fieldName: string) => {
    const input = dateInputRefs.current[fieldName];
    input?.showPicker();
  };

  const updateQueryValue = (name: string, value: string) => {
    const updated = searchQueries.map((field) =>
      field.name === name ? { ...field, value } : field
    );
    setSearchQueries(updated);
  };

  const getInputType = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("phone")) return "tel";
    if (lowerName.includes("date")) return "date";
    return "text";
  };

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    } catch {
      return '';
    }
  };

  const renderInputField = (item: SearchField) => {
    const inputType = getInputType(item.name);
    const isPhoneNumber = inputType === "tel";
    const isDate = inputType === "date";

    return (
      <>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="text-gray-600 font-extrabold" size={16} />
        </div>
        <input
          type={inputType}
          placeholder={item.placeholder}
          value={item.value}
          className="w-64 h-full pl-9 pr-3 py-2 border border-[#999999] font-normal rounded-md text-xs text-[#4D4D4D] focus:outline-none focus:border-pink-500"
          onChange={(e) => updateQueryValue(item.name, e.target.value)}
          onKeyDown={isPhoneNumber ? handlePhoneKeyDown : undefined}
          maxLength={isPhoneNumber ? 15 : undefined}
        />
      </>
    );
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    const isNumber = /^[0-9]$/.test(e.key);
    const isPlus = e.key === "+";
    const alreadyHasPlus = e.currentTarget.value.includes("+");

    if (!isNumber && !allowedKeys.includes(e.key) && !(isPlus && !alreadyHasPlus)) {
      e.preventDefault();
    }
  };

  const renderDateField = (item: SearchField) => (
    <div className="relative w-64 h-full">
      <input
        type="date"
        ref={(el) => (dateInputRefs.current[item.name] = el)}
        onChange={(e) => updateQueryValue(item.name, e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div 
        className="w-full h-full flex items-center pl-9 pr-8 border border-[#999999] rounded-md text-xs text-[#4D4D4D] bg-white hover:border-pink-500"
        onClick={() => handleDateFieldClick(item.name)}
      >
        <Search className="absolute left-3 text-gray-600" size={16} />
        {item.value ? formatDisplayDate(item.value) : item.placeholder}
        <button 
          type="button"
          className="absolute right-3 text-gray-600 hover:text-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            handleDateFieldClick(item.name);
          }}
        >
          <Calendar size={16} />
        </button>
      </div>
    </div>
  );

  const renderDropdown = (item: SearchField) => (
    <div className="flex items-center justify-center">
      <div className="absolute left-3 text-gray-400">
        <Search className="text-gray-600 font-extrabold" size={16} />
      </div>
      <select
        className="w-64 h-full pl-9 pr-3 py-2 border border-[#999999] font-normal rounded-md text-xs text-[#4D4D4D] bg-white focus:outline-none focus:border-pink-500"
        value={item.value || ""}
        onChange={(e) => updateQueryValue(item.name, e.target.value)}
      >
        <option value="" disabled>
          {item.placeholder}
        </option>
        {item.options?.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-[1px] bg-gradient-to-r from-pink-500 to-[#B3DB8A] rounded-lg w-fit">
      <div className="p-4 bg-white rounded-lg shadow-lg inline-block space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {searchQueries.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="relative h-[38px]">
              {item.options ? renderDropdown(item) : 
               getInputType(item.name) === "date" ? renderDateField(item) : 
               renderInputField(item)}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSearch}
            className="bg-[#FB009C] text-white px-4 py-1.5 rounded-md text-xs font-semibold border border-white shadow-[0px_1px_2px_rgba(251,0,156,1)] hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicSearchPage;