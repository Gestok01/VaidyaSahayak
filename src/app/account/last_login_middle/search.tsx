"use client";
import DynamicSearchPage from '@/app/components/DynamicSearchPage';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LastLogin = () => {
  const router = useRouter();

  const handleSearch = (searchValues: Record<string, string>) => {
    console.log("Search values:", searchValues);
    router.push("/my-account/last-login/results");
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
          My Account
        </span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">
          Last Login
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

export default LastLogin;