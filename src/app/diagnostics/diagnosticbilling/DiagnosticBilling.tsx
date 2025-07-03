"use client";
import React, { useState, useMemo } from "react";
import BILLS from "../../../assets/bills.json";
import SORT_ICON_WHITE from "../../../assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "../../../assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from "../../../assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import RECEIPT_SVG from "../../../assets/svg/receipt_long_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "../../components/Pagination";
import BillModal from "./BillingModal";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";

const DiagnosticBilling: React.FC = () => {
  const heading = "Diagnostics > Diagnostic Billing";
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedBillData, setSelectedBillData] = useState<any>(null);

  const [reportStatusFilters, setReportStatusFilters] = useState<{
    [key: string]: boolean;
  }>({
    PROCESSING: false,
    DELIVERED: false,
    PENDING: false,
  });

  const [paymentStatusFilters, setPaymentStatusFilters] = useState<{
    [key: string]: boolean;
  }>({
    PAID: false,
    UNPAID: false,
    PARTIAL: false,
  });

  const [selectedReportStatus, setSelectedReportStatus] = useState<
    string | null
  >(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<
    string | null
  >(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [localBills, setLocalBills] = useState(BILLS);

  const [searchTerm, setSearchTerm] = useState('');

  // Handle bill click
  const handleBillClick = (data: any) => {
    setSelectedBillData({
      patientName: data.patientName || "Anchal",
      address: data.address || "Minia",
      ageGender: data.ageGender || "36/M",
      nameOfDoctor: data.nameOfDoctor || "Dr. Amitesh Dev",
      visitLocation: data.visitLocation || "Super Delhi Hospital",
    });
    setIsBillModalOpen(true);
  };

  const handleReportStatusChange = (status: string) => {
    setReportStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
    setSelectedReportStatus(status);
    setActiveDropdown(null);
  };

  const handlePaymentStatusChange = (status: string) => {
    setPaymentStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
    setSelectedPaymentStatus(status);
    setActiveDropdown(null);
  };

  // Clear selected status
  const clearSelectedStatus = (type: string) => {
    if (type === "report") {
      setSelectedReportStatus(null);
      setReportStatusFilters({
        PROCESSING: false,
        DELIVERED: false,
        PENDING: false,
      });
    } else if (type === "payment") {
      setSelectedPaymentStatus(null);
      setPaymentStatusFilters({ PAID: false, UNPAID: false, PARTIAL: false });
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

  // Filtered Bills
  const filteredBills = useMemo(() => {
    return localBills.filter((bill) => {
      const reportStatusMatch =
        Object.values(reportStatusFilters).every((val) => !val) ||
        reportStatusFilters[bill.reportStatus];

      const paymentStatusMatch =
        Object.values(paymentStatusFilters).every((val) => !val) ||
        paymentStatusFilters[bill.paymentStatus];

      const searchMatch =
        !searchTerm ||
        bill.patientName.toLowerCase().includes(searchTerm.toLowerCase());

      return reportStatusMatch && paymentStatusMatch && searchMatch;
    });
  }, [localBills, reportStatusFilters, paymentStatusFilters, searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeadings = [
    "SL.NO",
    "PATIENT NAME",
    "PHONE NUMBER",
    "PAYMENT STATUS",
    "PAYMENT AMOUNT",
    "TEST DATE",
    "REPORT STATUS",
    "CREATED AT",
    "BILL",
  ];

  const getStatusClass = (status: string, type: string) => {
    if (type === "report") {
      return status === "DELIVERED"
        ? "text-[#039855]"
        : status === "PROCESSING"
        ? "text-[#FDB022]"
        : "text-[#D92D20]";
    } else if (type === "payment") {
      return status === "PAID"
        ? "text-[#039855]"
        : status === "PARTIAL"
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
  const handleSaveRow = (slNo: number, editedData: Record<string, any>) => {
    setLocalBills(prev => 
      prev.map(row => 
        row.slNo === slNo ? { ...row, ...editedData } : row
      )
    );
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
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4 width-[591px] height-[27px] top-[152px] left-[48px]">
        {heading}
      </h2>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="relative flex items-center gap-2">
          {/* Payment Status Filter */}
          <button
            onClick={() => toggleDropdown("paymentStatus")}
            disabled={!!selectedPaymentStatus}
            className={`${
              activeDropdown === "paymentStatus"
                ? "bg-pink-500 text-white border-white border-2"
                : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
            } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
            aria-label="Payment Status"
          >
            <Image
              src={
                activeDropdown === "paymentStatus"
                  ? SORT_ICON_WHITE
                  : SORT_ICON_PINK
              }
              width={20}
              height={20}
              alt="Sort Icon"
              className="mr-2"
            />
            Payment Status
          </button>
          {/* Selected Payment Status */}
          {selectedPaymentStatus && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
              <span className="text-[14px] text-[#999999]">
                {selectedPaymentStatus}
              </span>
              <button
                onClick={() => clearSelectedStatus("payment")}
                className="text-black hover:text-pink-500"
              >
                ×
              </button>
            </div>
          )}
          {/* Dropdown for Payment Status */}
          {activeDropdown === "paymentStatus" && (
            <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-50">
              {Object.keys(paymentStatusFilters).map((status) => (
                <label key={status} className="block">
                  <input
                    type="checkbox"
                    checked={paymentStatusFilters[status]}
                    onChange={() => handlePaymentStatusChange(status)}
                    className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                  />
                  {status}
                </label>
              ))}
            </div>
          )}

          {/* Report Status Filter */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => toggleDropdown("reportStatus")}
              disabled={!!selectedReportStatus}
              className={`${
                activeDropdown === "reportStatus"
                  ? "bg-pink-500 text-white border-white border-2"
                  : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
              } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
              aria-label="Report Status"
            >
              <Image
                src={
                  activeDropdown === "reportStatus"
                    ? SORT_ICON_WHITE
                    : SORT_ICON_PINK
                }
                width={20}
                height={20}
                alt="Sort Icon"
                className="mr-2"
              />
              Report Status
            </button>
            {/* Selected Report Status */}
            {selectedReportStatus && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                <span className="text-[14px] text-[#999999]">
                  {selectedReportStatus}
                </span>
                <button
                  onClick={() => clearSelectedStatus("report")}
                  className="text-black hover:text-pink-500"
                >
                  ×
                </button>
              </div>
            )}
            {/* Dropdown for Report Status */}
            {activeDropdown === "reportStatus" && (
              <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-50">
                {Object.keys(reportStatusFilters).map((status) => (
                  <label key={status} className="block">
                    <input
                      type="checkbox"
                      checked={reportStatusFilters[status]}
                      onChange={() => handleReportStatusChange(status)}
                      className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
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
            placeholder="Search Patient Name..."
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
            <Image
              src={CLOSE_SVG}
              width={18}
              height={18}
              alt="cancel"
              onClick={() => setIsEditModeOn(!isEditModeOn)}
            />
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
            <Image
              src={RECEIPT_SVG}
              alt="save changes"
              width={20}
              height={20}
            />
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

export default DiagnosticBilling;
