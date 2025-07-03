"use client";
import React, { useRef, useState } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";

interface DynamicSearchPageProps {
  tags: string[];
  showCheckAllEmployees?: boolean;
  onSearch?: (searchValues: Record<string, string>) => void;
  dropdownOptions?: {
    fieldName?: string;
    options?: string[]; 
    defaultOption?: string; 
  };
}

const DynamicSearchPage = ({ 
  tags, 
  showCheckAllEmployees = false, 
  onSearch,
  dropdownOptions = {}
}: DynamicSearchPageProps) => {
  // Default dropdown configuration
  const {
    fieldName = "Category",
    options = ["Categories", "Consultation", "Laboratory", "Pharmacy"],
    defaultOption = "All Categories"
  } = dropdownOptions;

  const tagTypeMapping: Record<string, string> = {
    "Patient Name": "text",
    "ID": "text",
    "Purchase Order ID": "text",
    "Item Name": "text",
    "Employee Name": "text",
    "Employee Group": "text",
    "Test Name": "text",
    "Patient Phone Number": "tel",
    "From": "date",
    "To": "date",
    "Date": "date",
    [fieldName]: "dropdown"
  };

  const dateInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});
  const [dateValues, setDateValues] = useState<{[key: string]: string}>({});
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
    setSearchValues(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    setSearchValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setDropdownOpen(prev => ({ ...prev, [fieldName]: false }));
  };

  const toggleDropdown = (fieldName: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleDateFieldClick = (fieldName) => {
    const input = dateInputRefs.current[fieldName];
    if (input) {
      input.showPicker();
    }
  };

  const handleDateChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDateValues(prev => ({
      ...prev,
      [fieldName]: newValue
    }));
    setSearchValues(prev => ({
      ...prev,
      [fieldName]: newValue
    }));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    setSearchValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return `DD-MM-YYYY`;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({
        ...searchValues,
        ...dateValues,
        [fieldName]: selectedOption
      });
    }
  };

  return (
    <div className="p-[1px] bg-gradient-to-r from-pink-500 to-[#B3DB8A] rounded-lg w-fit mx-4">
      <div className="p-4 bg-white rounded-lg shadow-lg inline-block space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((item, idx) => (
            <div key={idx} className="relative h-[38px]">
              {item === "From" || item === "To" || item === "Date" ? (
                <div 
                  className="relative w-64 h-full group"
                  onClick={() => handleDateFieldClick(item)}
                >
                  <input
                    type="date"
                    name={item}
                    ref={el => dateInputRefs.current[item] = el}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
                    onChange={(e) => handleDateChange(item, e)}
                    value={dateValues[item] || ""}
                  />
                  <div className="w-full h-full flex items-center pl-9 pr-8 border border-[#999999] font-normal rounded-md text-xs text-[#4D4D4D] bg-white peer-focus:border-pink-500">
                    <div className="absolute left-3 text-gray-400">
                      <Search className="text-gray-600 font-extrabold" size={16} />
                    </div>
                    ({item}) {formatDisplayDate(dateValues[item])}
                    <div className="absolute right-3 text-gray-400">
                      <Calendar className="text-gray-600" size={16} />
                    </div>
                  </div>
                </div>
              ) : item === fieldName ? (
                <div className="relative w-64 h-full">
                  <select
                    name={fieldName}
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="w-full h-full pl-9 pr-8 border border-[#999999] font-normal rounded-md text-xs text-[#4D4D4D] bg-white focus:outline-none focus:border-pink-500 appearance-none"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="text-gray-600 font-extrabold" size={16} />
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronDown className="text-gray-600" size={16} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="text-gray-600 font-extrabold" size={16} />
                  </div>
                  <input
                    type={tagTypeMapping[item] || "text"}
                    name={item}
                    placeholder={item}
                    className="w-64 h-full pl-9 pr-3 py-2 border border-[#999999] font-normal rounded-md text-xs text-[#4D4D4D] focus:outline-none focus:border-pink-500"
                    onInput={item === "Patient Phone Number" ? handlePhoneInput : undefined}
                    onChange={handleInputChange}
                    maxLength={item === "Patient Phone Number" ? 15 : undefined}
                    value={searchValues[item] || ""}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex mt-4">
          <div className={`flex-1 ${showCheckAllEmployees ? '' : 'invisible'}`}>
            {showCheckAllEmployees && (
              <span className="text-[#FB009C] underline px-1 py-2 text-xs font-semibold transition-colors">
                CHECK ALL EMPLOYEES
              </span>
            )}
          </div>
          <button 
            onClick={handleSearchClick} 
            className="bg-[#FB009C] text-white px-4 py-1.5 rounded-md text-xs font-semibold border border-white shadow-[0px_1px_2px_rgba(251,0,156,1)] hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicGetMiddle;
