"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import Pagination from "@/app/components/Pagination";
import MONTHLY_CALCULATION_DATA from "../../../../assets/monthly_calculation_data.json";
import Accountsvg from "../../../../assets/svg/settings_account_box.svg"

const MonthlyCalculationList: React.FC = () => {
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
      <span className="text-[#999999]">Monthly Calculation</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Search</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#4D4D4D]">Monthly Calculation List</span>
    </div>
  );
  
  const [calculationData] = useState(MONTHLY_CALCULATION_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = [
    "MONTH", 
    "CATEGORY", 
    "RECEIVED TOTAL CASH", 
    "RECEIVED TOTAL CARD", 
    "REFUND"
  ];
  
  const tableDataKeys = [
    "month", 
    "category", 
    "receivedTotalCash", 
    "receivedTotalCard", 
    "refund"
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = calculationData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(calculationData.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Heading */}  
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">{heading}</h2>

      {/* Table Header */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Monthly Calculation List</span>
      </div>

      {/* Dynamic Table - Read Only */}
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

export default MonthlyCalculationList;