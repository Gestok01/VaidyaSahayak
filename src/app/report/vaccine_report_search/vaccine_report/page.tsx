'use client'
import React from "react";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";

import CALENDAR_SVG from "@/assets/svg/calendar_today_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";

import VACCINE_DATA from "@/assets/vaccine_report_list.json";
import { useState } from "react";

const page = () => {
  
  const [editableSlNo, setEditableSlNo] = useState<number | null>(null);
  const heading = "Report > Vaccine Report Search > Vaccine Report";
  const tableHeadings = [
    "ID NO",
    "VACCINE NAME",
    "VACCINE PRICE",
    "QUANTITY",
    "VACCINE DATE",
    "TIME",
    "REPORT STATUS",
    "REPORT",
    "editableSlNo", "setEditableSlNo"

  ];

  return (
    <div className="min-h-screen bg-gray-50">
    

      {/* Page Heading */}
      <p className="text-lg font-semibold text-gray-800 my-4 mx-4">{heading}</p>

      {/* Filters & Search */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg  mx-4">
        {/* Filter Buttons */}
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 text-sm font-medium  text-pink-600 border-pink-500 border rounded-lg hover:bg-pink-500 transition-transform duration-300 transform hover:scale-105">
            <img src="/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg" width={18} height={18} alt="sort" />
            <span className="ml-2">Report Status</span>
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium  text-pink-600 border-pink-500 border rounded-lg hover:bg-pink-500 transition-transform duration-300 transform hover:scale-105">
            <img src="/svg/calendar_today_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg" width={18} height={18} alt="calendar" />
            <span className="ml-2">DD-MM-YY</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-72">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <img src="/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg" width={18} height={18} alt="search" />
          </span>
          <input
            type="text"
            placeholder="Search Test Name..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="mt-6 mx-4 bg-white p-4 rounded-lg shadow-md">
        <DynamicTable
          tableHeadings={tableHeadings}
          tableData={VACCINE_DATA}
          tableDataKeys={Object.keys(VACCINE_DATA[0])}
          editableSlNo={editableSlNo}  
          setEditableSlNo={setEditableSlNo}
        />
      </div>
    </div>
  );
};

export default page;
