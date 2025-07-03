"use client";
import { useState } from "react";
import React from "react";
import { Search, Calendar } from "lucide-react";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle phone number input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    
    // Limit to standard mobile phone length (10 digits for US)
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
      <div className="p-6 min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-500 text-xl font-semibold">
            Vaccine
          </span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Vaccine Billing Search
          </span>
        </div>

        {/* Search Filter Card */}
        <div className="relative p-[1.5px] rounded-lg bg-gradient-to-r from-pink-500 to-green-400 w-[900px]">
          <div className="bg-white rounded-lg p-4">
            <div className="flex gap-4 items-center">
              <div className="relative w-1/3">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="ID"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="relative w-1/3">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="tel"
                  placeholder="Patient Name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Updated Phone Number Input */}
              <div className="relative w-1/3">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div> 
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Patient Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-md text-sm font-medium border border-white shadow-[0px_1px_2px_rgba(251,0,156,1)] hover:bg-pink-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <DynamicSearchPage tags={["ID", "Patient Name", "Patient Phone Number"]} />
    </div>
  );
};

export default Page;
