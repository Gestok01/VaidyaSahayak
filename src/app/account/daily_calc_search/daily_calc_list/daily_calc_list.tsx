"use client";
import React, { useState } from "react";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import Pagination from "@/app/components/Pagination";
import DAILY_CALC_DATA from "../../../../assets/daily_calc_data.json";
import Accountsvg from "../../../../assets/svg/settings_account_box.svg"

const DailyCalcList: React.FC = () => {
    const heading = (
        <div className="flex items-center whitespace-nowrap overflow-hidden">
          <span className="text-pink-500 mr-1">
            <img 
              src={Accountsvg.src} 
              alt="Account"
              className="inline-block w-8 h-8 align-middle"
            />
          </span>
          <span className="text-[#999999]">Account Management</span>
          <span className="mx-1 text-[#999999]">&gt;</span>
          <span className="text-[#999999]">Daily Calculation</span>
          <span className="mx-1 text-[#4D4D4D]">&gt;</span>
          <span className="text-[#4D4D4D]">Search</span>
          <span className="mx-1 text-[#4D4D4D]">&gt;</span>
          <span className="text-[#4D4D4D]">Daily Calculation List</span>
        </div>
      );
  
  const [transactionData] = useState(DAILY_CALC_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = [
    "Category Name", 
    "Total Cash", 
    "Total Card", 
    "Refund"
  ];
  
  const tableDataKeys = [
    "categoryName", 
    "totalCash", 
    "totalCard", 
    "refund"
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Heading */}  
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">{heading}</h2>

      {/* Table Header */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Daily Collection List</span>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto">
        <DynamicTable
          tableHeadings={tableHeadings}
          tableData={currentItems}
          tableDataKeys={tableDataKeys}
          isEditModeOn={false}
          editableSlNo={null}
          setEditableSlNo={() => {}}
          handleSaveRow={() => {}}
          handleCancelRow={() => {}}
          containBill={false}
          showEditActions={false}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default DailyCalcList;