"use client";
import React, { useState, useMemo } from "react";
import PATIENTS from "../../../../assets/existingPatientList.json";
import SORT_ICON_WHITE from "@/assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import Link from "next/link";

const ExistingPatientList: React.FC = () => {
  const heading = "Clinic Patient List > Existing Patient Profile Search > Existing Patient Profiles";

  // State for filters
  const [ageFilters, setAgeFilters] = useState({
    "0-18": false,
    "19-35": false,
    "36-50": false,
    "51+": false,
  });
  const [genderFilters, setGenderFilters] = useState({
    MALE: false,
    FEMALE: false,
    OTHER: false,
  });
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string | null>(null);
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // State for editing
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [localPatients, setLocalPatients] = useState(PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter handlers
  const handleAgeFilterChange = (ageRange: string) => {
    const newFilters = { ...ageFilters, [ageRange]: !ageFilters[ageRange as keyof typeof ageFilters] };
    setAgeFilters(newFilters);
    setSelectedAgeFilter(newFilters[ageRange as keyof typeof newFilters] ? ageRange : null);
    setActiveDropdown(null);
  };

  const handleGenderFilterChange = (gender: string) => {
    const newFilters = { ...genderFilters, [gender]: !genderFilters[gender as keyof typeof genderFilters] };
    setGenderFilters(newFilters);
    setSelectedGenderFilter(newFilters[gender as keyof typeof newFilters] ? gender : null);
    setActiveDropdown(null);
  };

  const clearSelectedFilter = (type: string) => {
    if (type === "age") {
      setSelectedAgeFilter(null);
      setAgeFilters({
        "0-18": false,
        "19-35": false,
        "36-50": false,
        "51+": false,
      });
    } else if (type === "gender") {
      setSelectedGenderFilter(null);
      setGenderFilters({ MALE: false, FEMALE: false, OTHER: false });
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Search handler
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter patients based on criteria
  const filteredPatients = useMemo(() => {
    return localPatients.filter((patient) => {
      const ageMatch =
        Object.values(ageFilters).every((val) => !val) ||
        (ageFilters["0-18"] && patient.age <= 18) ||
        (ageFilters["19-35"] && patient.age > 18 && patient.age <= 35) ||
        (ageFilters["36-50"] && patient.age > 35 && patient.age <= 50) ||
        (ageFilters["51+"] && patient.age > 50);

      const genderMatch =
        Object.values(genderFilters).every((val) => !val) ||
        genderFilters[patient.gender as keyof typeof genderFilters];

      const searchMatch =
        !searchTerm ||
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase());

      return ageMatch && genderMatch && searchMatch;
    });
  }, [localPatients, ageFilters, genderFilters, searchTerm]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Table configuration
  const tableHeadings = [
    "Patient ID",
    "Patient name",
    "Phone Number",
    "Gender",
    "Age",
    "Address",
    "Email",
    "Created at",
    "",
  ];

  const tableDataKeys = [
    "patientId",
    "patientName",
    "phoneNumber",
    "gender",
    "age",
    "address",
    "email",
    "createdAt",
    "viewProfile"
  ];

  // Prepare table data
  const preparedTableData = filteredPatients
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((patient, index) => ({
      ...patient,
      slNo: indexOfFirstItem + index + 1,
      originalIndex: indexOfFirstItem + index,
      viewProfile: "View Profile"
    }));

  // Row selection and editing
  const handleRowSelect = (slNo: number | null) => {
    if (!isEditModeOn) return;
    
    if (editingRowId === slNo) {
      setEditingRowId(null);
    } else {
      setEditingRowId(slNo);
      const rowToEdit = preparedTableData.find(row => row.slNo === slNo);
      if (rowToEdit) {
      
      }
    }
  };

  const handleSaveRow = (slNo: number, editedData: Record<string, any>) => {
    const updatedPatients = localPatients.map(patient => {
      if (patient.slNo === slNo || patient.patientId === editedData.patientId) {
        // Remove any extra UI-specific keys before updating
        const { slNo, originalIndex, viewProfile, ...cleanedData } = editedData;
        return { ...patient, ...cleanedData };
      }
      return patient;
    });
  
    setLocalPatients(updatedPatients);
    setEditingRowId(null);
  };

  const handleCancelRow = () => {
    setEditingRowId(null);
  };


  const handleSaveAllChanges = () => {
    setIsEditModeOn(false);
  };

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      <h2 className="text-[24px] font-medium text-[#4D4D4D] my-4">
        {heading}
      </h2>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="relative flex items-center gap-2">
          {/* Age Filter */}
          <button
            onClick={() => toggleDropdown("age")}
            disabled={!!selectedAgeFilter}
            className={`${
              activeDropdown === "age"
                ? "bg-pink-500 text-white border-white border-2"
                : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
            } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
          >
            <Image
              src={activeDropdown === "age" ? SORT_ICON_WHITE : SORT_ICON_PINK}
              width={20}
              height={20}
              alt="Sort Icon"
              className="mr-2"
            />
            Age
          </button>
          
          {selectedAgeFilter && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
              <span className="text-[14px] text-[#999999]">{selectedAgeFilter}</span>
              <button
                onClick={() => clearSelectedFilter("age")}
                className="text-black hover:text-pink-500"
              >
                ×
              </button>
            </div>
          )}
          
          {activeDropdown === "age" && (
            <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-50">
              {Object.keys(ageFilters).map((ageRange) => (
                <label key={ageRange} className="block">
                  <input
                    type="checkbox"
                    checked={ageFilters[ageRange as keyof typeof ageFilters]}
                    onChange={() => handleAgeFilterChange(ageRange)}
                    className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                  />
                  {ageRange}
                </label>
              ))}
            </div>
          )}

          {/* Gender Filter */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => toggleDropdown("gender")}
              disabled={!!selectedGenderFilter}
              className={`${
                activeDropdown === "gender"
                  ? "bg-pink-500 text-white border-white border-2"
                  : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
              } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
            >
              <Image
                src={activeDropdown === "gender" ? SORT_ICON_WHITE : SORT_ICON_PINK}
                width={20}
                height={20}
                alt="Sort Icon"
                className="mr-2"
              />
              Gender
            </button>
            
            {selectedGenderFilter && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                <span className="text-[14px] text-[#999999]">{selectedGenderFilter}</span>
                <button
                  onClick={() => clearSelectedFilter("gender")}
                  className="text-black hover:text-pink-500"
                >
                  ×
                </button>
              </div>
            )}
            
            {activeDropdown === "gender" && (
              <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-50">
                {Object.keys(genderFilters).map((gender) => (
                  <label key={gender} className="block">
                    <input
                      type="checkbox"
                      checked={genderFilters[gender as keyof typeof genderFilters]}
                      onChange={() => handleGenderFilterChange(gender)}
                      className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Input */}
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

      {/* Table Header with Edit Toggle */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Patient Profile</span>
        <button
          onClick={() => {
            setIsEditModeOn(!isEditModeOn);
            if (isEditModeOn) {
              setEditingRowId(null);
            }
          }}
          className="flex gap-2 items-center text-sm font-medium transition duration-300"
        >
          {isEditModeOn ? 'Cancel' : 'Edit'}
          <Image 
            src={isEditModeOn ? CLOSE_SVG : EDIT_SVG} 
            width={18} 
            height={18} 
            alt={isEditModeOn ? 'cancel' : 'edit'} 
          />
        </button>
      </div>

      {/* Dynamic Table */}
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
          href={ `http://localhost:3000/clinicPatient/existingPatient/existingPatientSearch/existingPatientProfile`}
          className="text-[#D11288] underline hover:text-[#A50E6E] transition-colors uppercase"
        >
          VIEW PROFILE
        </Link>
      );
    }
    return null;
  }}
/>

      {/* Save Changes Button */}
      {isEditModeOn && (
        <div className="flex justify-end my-2">
          <button
            onClick={handleSaveAllChanges}
            className="flex items-center text-xs gap-2 px-4 py-2 rounded-lg bg-pink-400 dark:bg-pink-600 hover:bg-pink-600 hover:dark:bg-pink-400 text-white shadow-md transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredPatients.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ExistingPatientList;