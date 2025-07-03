"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import Pagination from "@/app/components/Pagination";
import FIX_COST_DATA from "../../../assets/fix_cost_data.json";
import Accountsvg from "@/assets/svg/settings_account_box.svg";

const FixCostTable: React.FC = () => {
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
      <span className="text-[#999999]">Fix Cost</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Get</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#4D4D4D]">Item Details List</span>
    </div>
  );
  
  const [incomeData] = useState(FIX_COST_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = [
    "ITEM ID", 
    "ITEM NAME", 
    "CATEGORY", 
    "UNIT",
    "COST",
    "REMARK"
  ];
  
  const tableDataKeys = [
    "itemId", 
    "itemName", 
    "category", 
    "unit",
    "cost",
    "remark"
  ];

  // Dummy functions for edit functionality (not used but required by DynamicTable)
  const dummySetEditableSlNo = () => {};
  const dummyHandleSaveRow = () => {};
  const dummyHandleCancelRow = () => {};

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomeData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incomeData.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Heading */}  
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">{heading}</h2>

      {/* Table Header */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Item Details</span>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto">
        <DynamicTable
          tableHeadings={tableHeadings}
          tableData={currentItems}
          tableDataKeys={tableDataKeys}
          isEditModeOn={false}
          showEditActions={false}
          containBill={false}
          editableSlNo={null}
          setEditableSlNo={dummySetEditableSlNo}
          handleSaveRow={dummyHandleSaveRow}
          handleCancelRow={dummyHandleCancelRow}
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

export default FixCostTable;