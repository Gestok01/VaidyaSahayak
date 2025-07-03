"use client";
import React, { useState } from "react";
import BAG from '@/assets/svg/shopping_bag.svg'
import Image from "next/image";
import DynamicTable from "@/app/components/DynamicTable";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import Pagination from "@/app/components/Pagination";
import Inventory from "../../../../assets/inventory.json";

const InventoryTable: React.FC = () => {
  const heading = (
    <div className="flex items-center gap-2">
      <Image src={BAG} alt="Bag" width={20} height={20} />
      <span className="text-[#999999]">Inventory Management</span>
      <span className="text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Inventory</span>
      <span className="text-[#999999]">&gt;</span>
      <span className="text-[#999999]">Get</span>
      <span className="text-[#999999]">&gt;</span>
      <span className="text-[#4D4D4D]">Search Get Inventory</span>
      <span className="text-[#4D4D4D]">&gt;</span>
      <span className="text-[#4D4D4D]">List Inventory Details</span>
    </div>
  );
  
  const [searchItemName, setSearchItemName] = useState('');      
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [inventoryData, setInventoryData] = useState(Inventory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Define dropdown options
  const categoryOptions = ["Surgical", "Pharmaceutical", "Diagnostic", "Laboratory"];
  const unitOptions = ["pair", "g", "box", "kit", "pack", "l", "piece", "bottle", "kg"];

  const filteredData = inventoryData.filter(item =>
    item.itemName.toLowerCase().includes(searchItemName.toLowerCase())
  );

  const tableHeadings = [
    "ITEM ID", 
    "ITEM NAME", 
    "CATEGORY", 
    "UNIT", 
    "UPDATED AT", 
    "UPDATED BY", 
    "STOCK"
  ];
  
  const tableDataKeys = [
    "itemId", 
    "itemName", 
    "category", 
    "unit", 
    "updatedAt", 
    "updatedBy", 
    "stock"
  ];

  // Custom cell renderer for editable fields
  const customRenderCell = (tdKey: string, data: any) => {
    if (editingRowId !== data.slNo) {
      return null; // Let DynamicTable handle non-edit mode rendering
    }

    // Handle category dropdown
    if (tdKey === 'category') {
      return (
        <select
          className="w-full px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={data[tdKey]}
          onChange={(e) => {
            const updatedData = {...data, [tdKey]: e.target.value};
            setInventoryData(prev => 
              prev.map(item => item.slNo === data.slNo ? updatedData : item)
            );
          }}
        >
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    // Handle unit dropdown
    if (tdKey === 'unit') {
      return (
        <select
          className="w-full px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={data[tdKey]}
          onChange={(e) => {
            const updatedData = {...data, [tdKey]: e.target.value};
            setInventoryData(prev => 
              prev.map(item => item.slNo === data.slNo ? updatedData : item)
            );
          }}
        >
          {unitOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return null; 
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle save row
  const handleSaveRow = (slNo: number, editedData: Record<string, any>) => {
    setInventoryData(prev => 
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

      {/* Item Name Search Field */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by Item Name"
            className="pl-3 pr-10 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm appearance-none transition duration-300 hover:border-pink-400"
            value={searchItemName}
            onChange={(e) => {
              setSearchItemName(e.target.value);
              setCurrentPage(1); 
            }}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none">
            <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
          </span>
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md border-gray-200">
        <span className="font-semibold text-xs font-normal">Inventory Details</span>
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
          customRenderCell={customRenderCell}
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

export default InventoryTable;