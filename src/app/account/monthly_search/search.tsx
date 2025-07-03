"use client";
import DynamicSearchPage from '@/app/components/DynamicSearchPage';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Accountsvg from "../../../assets/svg/settings_account_box.svg";

const Page = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const handleSearch = (searchValues: Record<string, string>) => {
    console.log("Search values:", searchValues);
    router.push("/account/monthly_search/monthly_list");
  };

  const [searchQueries, setSearchQueries] = useState([
    {
      name: "Month",
      placeholder: "Select Month",
      type: "select",
      options: months,
      value: months[new Date().getMonth()], // Default to current month
      showIcon: true
    },
    {
      name: "Year",
      placeholder: `Year (${currentYear})`,
      type: "text",
      value: currentYear.toString(),
      showIcon: true,
      pattern: "^[0-9]{4}$" // Only allow 4-digit years
    }
  ]);

  return (
    <div className="relative" style={{ width: "100%", minHeight: "100vh" }}>
      <div className="absolute flex items-center gap-2" style={{
        width: "881px",
        height: "10px",
        top: "52px",
        left: "42px",
      }}>
        <span className="text-[#999999] text-2xl font-semibold">
          <img 
            src={Accountsvg.src} 
            alt="Account"
            className="inline-block w-6 h-6 align-middle mr-2"
          />
          Account Management
        </span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#999999] text-2xl font-semibold">
          Monthly Calculation
        </span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">
          Search
        </span>
      </div>

      <div className="absolute" style={{
        width: "1339px",
        height: "151px",
        top: "108px",
        left: "42px",
      }}>
        <DynamicSearchPage
          searchQueries={searchQueries}
          setSearchQueries={setSearchQueries}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Page;