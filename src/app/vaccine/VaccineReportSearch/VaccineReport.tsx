"use client";
import React, { useState, useMemo, useRef } from "react";
import BILLS from "@/assets/vaccine_report_list.json";
import SORT_ICON_WHITE from '@/assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import SORT_ICON_PINK from '@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg';
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from '@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import RECEIPT_SVG from '@/assets/svg/receipt_long_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg'; 
import Pagination from "../../components/Pagination";
import BillModal from "../BillingModal";  
import Image from "next/image";
import DATE_SVG from '@/assets/svg/calendar_today_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import DynamicTable from "@/app/components/DynamicTable";

const VaccineReport: React.FC = () => {
  const heading = (
    <span>
      <span className="text-[#999999]">Report</span> &gt;{" "}
      <span className="text-[#475467]">Vaccine Report Search</span> &gt;{" "}
      <span className="text-[#475467]">Vaccine Report</span>
    </span>
  );
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedBillData, setSelectedBillData] = useState<any>(null);

  const [StatusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
    VACCINATED: false,
    BOOKED: false,
    PENDING: false,
  });

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); 

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({}); 
  const [selectedRows, setSelectedRows] = useState<number[]>([]); 
  const [isEditModeOn, setIsEditModeOn] = useState(false); 
  const [localBills, setLocalBills] = useState(BILLS);

  const [searchTerm, setSearchTerm] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleBillClick = (data: any) => {
    setSelectedBillData({
      patientName: data.patientName || "Anchal",
      address: data.address || 'Minia',
      ageGender: data.ageGender || '36/M',
      nameOfDoctor: data.nameOfDoctor || 'Dr. Amitesh Dev',
      visitLocation: data.visitLocation || 'Super Delhi Hospital'
    });
    setIsBillModalOpen(true);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
    setSelectedStatus(status); 
    setActiveDropdown(null);
  };

  // Clear selected status
  const clearSelectedStatus = (type: string) => {
    if (type === "status") {
      setSelectedStatus(null);
      setStatusFilters({ VACCINATED: false, BOOKED: false, PENDING: false });
    } 
  };

  // Clear selected filters
  const clearSelectedFilter = (type: string) => {
    if (type === "date") {
      setSelectedDate(null);
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null); 
    } else {
      setActiveDropdown(dropdownName); 
    }
  };

  // Handle Search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  // Format date
  const formatDisplayDate = (dateString: string | null) => {
    if (!dateString) return "dd-mm-yyyy";
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };
      
      // Handle date selection 
      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value; 
        setSelectedDate(date || null);
        setActiveDropdown(null);
      };
  
      const filteredBills = useMemo(() => {
        console.log('Sample data date:', localBills[0]?.vaccineDate);
        console.log('Selected date:', selectedDate);
        
        return localBills.filter((bill) => {
          const StatusMatch =
            Object.values(StatusFilters).every((val) => !val) ||
            StatusFilters[bill.reportStatus];
      
          const searchMatch =
            !searchTerm || bill.vaccineName.toLowerCase().includes(searchTerm.toLowerCase());

          const dateMatch = !selectedDate || 
            bill.vaccineDate === selectedDate;
      
          return StatusMatch && searchMatch && dateMatch;
        });
      }, [localBills, StatusFilters, searchTerm, selectedDate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeadings = [
    "SL.NO",
    "VACCINE NAME",
    "VACCINE PRICE",
    "QUANTITY",
    "VACCINE DATE",
    "TIME",
    "REPORT STATUS",
    "REPORT", 
  ]; 

  const getStatusClass = (status: string, type: string) => {
    if (type === "status") {
      return status === "VACCINATED"
        ? "text-[#039855]" 
        : status === "BOOKED"
        ? "text-[#FDB022]" 
        : "text-[#D92D20]"; 
    } 
    return "";
  };

  // Handle Row Selection
  const handleRowSelect = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index)); 
    } else {
      setSelectedRows([...selectedRows, index]); 
      setEditedData(localBills[index]); 
    }
  };

  // Handle Save Row
  const handleSaveRow = (index: number, editedData: any) => {
    console.log("Saving row:", index, editedData); 
    if (selectedRows.includes(index)) {
      const updatedBills = [...localBills];
      updatedBills[index] = { ...updatedBills[index], ...editedData };
      setLocalBills(updatedBills);
      setSelectedRows(selectedRows.filter((i) => i !== index));
      setEditedData({});
      setEditingRowId(null); 
    }
  };

  // Handle Cancel Row
  const handleCancelRow = () => {
    setSelectedRows([]); 
    setEditedData({}); 
    setEditingRowId(null); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Page Heading */}
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4 width-[591px] height-[27px] top-[152px] left-[48px]">{heading}</h2>
      
      {/* Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="relative flex items-center gap-2">
          {/* Status Filter */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => toggleDropdown("Status")}
              disabled={!!selectedStatus}
              className={`${
                activeDropdown === "Status"
                  ? "bg-pink-500 text-white border-white border-2"
                  : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
              } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
              aria-label="Status"
            >
              <Image
                src={activeDropdown === "Status" ? SORT_ICON_WHITE : SORT_ICON_PINK}
                width={20}
                height={20}
                alt="Sort Icon"
                className="mr-2"
              />
              Report Status
            </button>
            {/* Selected Status */}
            {selectedStatus && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                <span className="text-[14px] text-[#999999]">{selectedStatus}</span>
                <button
                  onClick={() => clearSelectedStatus("status")}
                  className="text-black hover:text-pink-500"
                >
                  ×
                </button>
              </div>
            )}
            {/* Dropdown for Status */}
            {activeDropdown === "Status" && (
              <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-50">
                {Object.keys(StatusFilters).map((status) => (
                  <label key={status} className="block">
                    <input
                      type="checkbox"
                      checked={StatusFilters[status]}
                      onChange={() => handleStatusChange(status)}
                      className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>

        {/* Date Filter */}
        <div className="relative flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleDropdown("date");
                  if (dateInputRef.current) {
                    dateInputRef.current.showPicker();
                  }
                }}
                className={`${
                  selectedDate
                  ? "bg-pink-600 text-white border-white border-2"
                  : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
                  } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
                  aria-label="Calendar"
              >
                <Image
                  src={DATE_SVG}
                  width={20}
                  height={20}
                  alt="Calendar Icon"
                  className="mr-2"
                />
                <span>{selectedDate ? formatDisplayDate(selectedDate) : "dd-mm-yyyy"}</span>
              </button>
              
              {/* Selected Date with cancel button */}
              {selectedDate && (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                  <span className="text-[14px] text-[#999999]">
                    {formatDisplayDate(selectedDate)}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      if (dateInputRef.current) {
                        dateInputRef.current.value = '';
                      }
                    }}
                    className="text-black hover:text-pink-500"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {/* Hidden Date Input */}
              <input
                type="date"
                ref={dateInputRef}
                className="absolute opacity-0 w-0 h-0"
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>  

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
          </span>
          <input
            className="pl-10 pr-3 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm placeholder-[#4D4D4D] transition duration-300"
            type="text"
            placeholder="Search Vaccine Name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div
        className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200"
      >
        <span className="font-semibold text-xs font-normal">Rate Chart</span>
        {isEditModeOn === false ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setIsEditModeOn(true);
            }}
            className="flex gap-2 items-center text-sm font-medium transition duration-300"
          >
            Edit 
            <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setIsEditModeOn(false);
              handleCancelRow(); 
            }}
            className="flex gap-2 items-center text-sm font-medium transition duration-300"
          >
            Cancel
            <Image src={CLOSE_SVG} width={18} height={18} alt="cancel" />
          </button>
        )}
      </div>

      {/* Dynamic Table */}
      <DynamicTable
        tableHeadings={tableHeadings}
        tableData={filteredBills.slice(indexOfFirstItem, indexOfLastItem)}
        tableDataKeys={Object.keys(filteredBills[0] || {})}
        isEditModeOn={isEditModeOn}
        editableSlNo={editingRowId}
        setEditableSlNo={setEditingRowId}
        BillModal={BillModal}
        handleRowSelect={handleRowSelect}
        selectedRows={selectedRows}
        getStatusClass={getStatusClass} 
        handleSaveRow={handleSaveRow} 
        handleCancelRow={handleCancelRow} 
      />

      {/* Save Changes Button */}
      {isEditModeOn && (
        <div className="flex justify-end my-2">
          <button
            onClick={() => {
              setIsEditModeOn(false);
              handleCancelRow(); 
            }}
            className="flex items-center text-xs gap-2 px-4 py-2 rounded-lg bg-pink-400 dark:bg-pink-600 hover:bg-pink-600 hover:dark:bg-pink-400 text-white shadow-md transition-all duration-300"
          >
            Save Changes
            <Image src={RECEIPT_SVG} alt="save changes" width={20} height={20} />
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredBills.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Bill Modal */}
      {selectedBillData && (
        <BillModal
          isOpen={isBillModalOpen}
          onClose={() => setIsBillModalOpen(false)}
          billData={selectedBillData}
        />
      )}
    </div>
  );
};

export default VaccineReport;