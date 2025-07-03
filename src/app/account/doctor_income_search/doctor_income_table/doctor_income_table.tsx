"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import Pagination from "@/app/components/Pagination";
import DOCTOR_INCOME_DATA from "../../../../assets/doctor_income_data.json";
import Accountsvg from "../../../../assets/svg/settings_account_box.svg";

const DoctorIncomeTable: React.FC = () => {
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
      <span className="text-[#999999]">Doctor's Total Income</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Search</span>
      <span className="mx-1 text-[#999999]">&gt;</span>
      <span className="text-[#4D4D4D]">Doctor's Income Details List</span>
    </div>
  );
  
  const [incomeData] = useState(DOCTOR_INCOME_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = [
    "DOCTOR ID", 
    "DOCTOR NAME", 
    "TOTAL DOCTOR CUT", 
    "TOTAL CLINIC CUT",
    "TOTAL INCOME"
  ];
  
  const tableDataKeys = [
    "doctorId", 
    "doctorName", 
    "doctorCut", 
    "clinicCut",
    "totalIncome"
  ];

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
        <span className="font-semibold text-xs font-normal">Doctor Income Details</span>
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
          setEditableSlNo={() => {}}
          handleSaveRow={() => {}}
          handleCancelRow={() => {}}
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

export default DoctorIncomeTable;