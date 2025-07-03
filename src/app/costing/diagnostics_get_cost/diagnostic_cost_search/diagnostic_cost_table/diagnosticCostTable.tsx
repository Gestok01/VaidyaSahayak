"use client";
import React, { useState } from "react";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "@/app/components/Pagination";
import DIAGNOSTICS_COSTING_DATA from "../../../../../assets/diagnostics_costing_data.json";

const DiagnosticsCostingTable: React.FC = () => {
  const heading = (
    <span>
      <span className="text-pink-400">₹</span>{" "}  
      <span className="text-[#999999]">Costing</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Get Diagnostics Costing Search</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Get Diagnostics Costing</span>
    </span>
  );
  
  const [searchId, setSearchId] = useState('');      
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [diagnosticsData, setDiagnosticsData] = useState(DIAGNOSTICS_COSTING_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = [
    "TEST NAME", 
    "TEST GROUP", 
    "IS ACTIVE", 
    "DESCRIPTION", 
    "IN MEM DISC", 
    "IN SEN DISC", 
    "OTHER MEM DISC", 
    "OTHER LAB DISC", 
    "REMARK"
  ];
  
  const tableDataKeys = [
    "testName", 
    "testGroup", 
    "isActive", 
    "description", 
    "inMemDisc", 
    "inSenDisc", 
    "otherMemDisc", 
    "otherLabDisc", 
    "remark"
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = diagnosticsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(diagnosticsData.length / itemsPerPage);

  // Handle save row
  const handleSaveRow = (slNo: number, editedData: Record<string, any>) => {
    setDiagnosticsData(prev => 
      prev.map(row => 
        row.slNo === slNo ? { ...row, ...editedData } : row
      )
    );
    setEditingRowId(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingRowId(null);
  };

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Heading */}  
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">{heading}</h2>

      {/* ID Search Field */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by ID"
            className="pl-3 pr-10 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm appearance-none transition duration-300 hover:border-pink-400"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none">
            <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
          </span>
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Diagnostics Costing Details</span>
        {!isEditModeOn ? (
          <button
            onClick={() => setIsEditModeOn(true)}
            className="flex gap-2 items-center text-sm font-medium transition duration-300"
          >
            Edit
            <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditModeOn(false);
              handleCancelEdit();
            }}
            className="flex gap-2 items-center text-sm font-medium transition duration-300"
          >
            Cancel
            <Image src={CLOSE_SVG} width={18} height={18} alt="cancel" />
          </button>
        )}
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto">
        <DynamicTable
          tableHeadings={tableHeadings}
          tableData={currentItems}
          tableDataKeys={tableDataKeys}
          isEditModeOn={isEditModeOn}
          editableSlNo={editingRowId}
          setEditableSlNo={setEditingRowId}
          handleSaveRow={handleSaveRow}
          handleCancelRow={handleCancelEdit}
          containBill={false}
          showEditActions={true}
        />
      </div>

      {/* Save Changes Button */}
      {isEditModeOn && (
        <div className="flex justify-end my-2">
          <button
            onClick={() => setIsEditModeOn(false)}
            className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-600 text-white shadow-md transition-all duration-300 text-xs"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default DiagnosticsCostingTable;