"use client";
import React, { useState, useMemo } from "react";
import PATIENTS from "@/assets/employeeProfileList.json";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import Link from "next/link";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';

const ExistingPatientList: React.FC = () => {
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [localPatients, setLocalPatients] = useState(PATIENTS);

  const filteredPatients = useMemo(() => {
    return localPatients;
  }, [localPatients]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeadings = [
    "EMPLOYEE ID",
    "EMPLOYEE NAME",
    "PHONE NUMBER", 
    "EMAIL ADDRESS",
    "DOB",
    "GENDER",
    "DESIGNATION",
    ""
  ];

  const tableDataKeys = [
    "employeeId",
    "employeeName",
    "phoneNumber",
    "email",
    "dob",
    "gender",
    "designation",
    "viewProfile"
  ];

  const handleRowSelect = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
      setEditedData(localPatients[index]);
    }
  };

  const handleSaveRow = (index: number, editedData: any) => {
    if (selectedRows.includes(index)) {
      const updatedPatients = [...localPatients];
      updatedPatients[index] = { ...updatedPatients[index], ...editedData };
      setLocalPatients(updatedPatients);
      setSelectedRows(selectedRows.filter((i) => i !== index));
      setEditedData({});
      setEditingRowId(null);
    }
  };

  const handleCancelRow = () => {
    setSelectedRows([]);
    setEditedData({});
    setEditingRowId(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const preparedTableData = filteredPatients
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((patient, index) => ({
      ...patient,
      slNo: index + 1, 
      viewProfile: "View Profile"
    }));

  return (
    <div className="relative min-h-screen p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4"> 
        <Image 
          src={UPLOAD} 
          alt="Upload icon" 
          width={20}  
          height={20} 
          className="mr-1"
        />
        <span className="text-[#999999] text-2xl font-semibold">Profiling</span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#999999] text-2xl font-semibold">Employee</span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#999999] text-2xl font-semibold">Get</span>
        <span className="text-[#999999] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">Get Employee Search</span>
        <span className="text-[#4D4D4D] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">Get Employee Profile List</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-24"> 
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
          <span className="font-medium">Employee Details</span>
          {isEditModeOn ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModeOn(false);
                handleCancelRow();
              }}
              className="flex gap-2 items-center text-sm font-medium text-red-600"
            >
              Cancel
              <Image src={CLOSE_SVG} width={18} height={18} alt="cancel" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModeOn(true);
              }}
              className="flex gap-2 items-center text-sm font-medium text-black"
            >
              Edit
              <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
            </button>
          )}
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <DynamicTable
            tableHeadings={tableHeadings}
            tableData={preparedTableData}
            tableDataKeys={tableDataKeys}
            isEditModeOn={isEditModeOn}
            editableSlNo={editingRowId}
            setEditableSlNo={setEditingRowId}
            handleSaveRow={handleSaveRow}
            handleCancelRow={handleCancelRow}
            containBill={false}
            customRenderCell={(tdKey: string, data: any) => {
              if (tdKey === "viewProfile") {
                return (
                  <Link 
                  href={ `http://localhost:3000/employment_management/getEmployeeProfile/employeeprofile`}
                    className="text-[#D11288] underline hover:text-[#A50E6E] transition-colors uppercase"
                  >
                    VIEW PROFILE
                  </Link>
                );
              }
              return null;
            }}
          />
        </div>

        {isEditModeOn && (
          <div className="flex justify-end p-4 border-t border-gray-200">
            <button
              onClick={() => {
                setIsEditModeOn(false);
                handleCancelRow();
              }}
              className="px-4 py-2 bg-[#FB009C] text-white rounded-md hover:bg-[#D11288] transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="p-4 border-t border-gray-200">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredPatients.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ExistingPatientList;