"use client";
import DynamicSearchPage from '@/app/components/DynamicSearchPage';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Accountsvg from "../../../assets/svg/settings_account_box.svg";

const Page = () => {
  const router = useRouter();

  const handleSearch = (searchValues: Record<string, string>) => {
    console.log("Search values:", searchValues);
    router.push("/account/total_money_search/total_money_list");
  };

  const [searchQueries, setSearchQueries] = useState([
    {
      name: "From",
      placeholder: "From Date (DD-MM-YYYY)",
      type: "date",
      showIcon: true
    },
    {
      name: "To",
      placeholder: "To Date (DD-MM-YYYY)",
      type: "date",
      showIcon: true
    },
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
            className="inline-block mr-2"
            style={{ width: "24px", height: "24px" }}
          />
          Account Management
        </span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#999999] text-2xl font-semibold">
          Total Money Received
        </span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">Search</span>
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