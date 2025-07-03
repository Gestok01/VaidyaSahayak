"use client";
import React, { useState } from "react";
import Pagination from "@/app/components/Pagination";
import DynamicTable from "@/app/components/DynamicTable";
import DAILY_TRANSACTION_DATA from "../../../../assets/daily_transaction_data.json";
import Accountsvg from "../../../../assets/svg/settings_account_box.svg"

const DailyList: React.FC = () => {
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
      <span className="text-[#999999]">Daily Transaction</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Search</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#4D4D4D]">Daily Transaction List</span>
    </div>
  );
  
  const [dailyData] = useState(DAILY_TRANSACTION_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tableHeadings = [
    "Bill No",  
    "Bill Group",
    "Rate",
    "Discount",
    "Bill Amount",
    "Received Amount",
    "Payment Mode",
    "Refund Amount",
    "Date",
    "Created by"
  ];
  
  const tableDataKeys = [
    "billNo", 
    "billGroup", 
    "rate", 
    "discount", 
    "billAmount",
    "receivedAmount",
    "paymentMode",
    "refundAmount",
    "date",
    "createdBy"
  ];

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailyData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dailyData.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">{heading}</h2>

      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Daily Transaction List</span>
      </div>

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
          idKey="billNo"
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default DailyList;