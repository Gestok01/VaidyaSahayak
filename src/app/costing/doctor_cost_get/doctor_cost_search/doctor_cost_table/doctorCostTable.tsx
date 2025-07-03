"use client";
import React, { useState } from "react";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "@/app/components/Pagination";

// Sample data for the table with added slNo
const DOCTOR_COST_DATA = [
  { slNo: 1, totalFees: "₹1500", payableToDoctor: "₹1200", patientDiscount: "₹300" },
  { slNo: 2, totalFees: "₹2000", payableToDoctor: "₹1600", patientDiscount: "₹400" },
  { slNo: 3, totalFees: "₹1800", payableToDoctor: "₹1440", patientDiscount: "₹360" },
  { slNo: 4, totalFees: "₹2500", payableToDoctor: "₹2000", patientDiscount: "₹500" },
  { slNo: 5, totalFees: "₹3000", payableToDoctor: "₹2400", patientDiscount: "₹600" },
  { slNo: 6, totalFees: "₹2200", payableToDoctor: "₹1760", patientDiscount: "₹440" },
  { slNo: 7, totalFees: "₹2700", payableToDoctor: "₹2160", patientDiscount: "₹540" },
  { slNo: 8, totalFees: "₹1900", payableToDoctor: "₹1520", patientDiscount: "₹380" },
  { slNo: 9, totalFees: "₹2300", payableToDoctor: "₹1840", patientDiscount: "₹460" },
  { slNo: 10, totalFees: "₹2600", payableToDoctor: "₹2080", patientDiscount: "₹520" },
];

const DoctorCostTable: React.FC = () => {
  const heading = (
    <span>
      <span className="text-[#999999]">₹ Costing</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Doctor</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Get</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Doctor Search</span> &gt;{" "}
      <span className="text-[#4D4D4D]">List</span>
    </span>
  );
  
  const [selectedDoctor, setSelectedDoctor] = useState('');      
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [doctorCostData, setDoctorCostData] = useState(DOCTOR_COST_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Table configuration
  const tableHeadings = ["TOTAL FEES", "PAYABLE TO DOCTOR", "PATIENT DISCOUNT"];
  const tableDataKeys = ["totalFees", "payableToDoctor", "patientDiscount"];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctorCostData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(doctorCostData.length / itemsPerPage);

  // Handle save row
  const handleSaveRow = (slNo: number, editedData: Record<string, any>) => {
    setDoctorCostData(prev => 
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

      {/* Doctor Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full sm:w-64">
          <select
            className="pl-3 pr-10 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm appearance-none transition duration-300 hover:border-pink-400"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            <option value="Doctor 1">Doctor 1</option>
            <option value="Doctor 2">Doctor 2</option>
            <option value="Doctor 3">Doctor 3</option>
            <option value="Doctor 4">Doctor 4</option>
            <option value="Doctor 5">Doctor 5</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Doctor Costing</span>
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
      <div className="overflow-x-auto table-fixed ">
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

export default DoctorCostTable;