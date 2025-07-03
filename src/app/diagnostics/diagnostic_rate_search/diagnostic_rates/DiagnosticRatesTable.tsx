'use client';
import React, { useState } from "react";
import SORT_ICON_PINK from '@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg';
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CLOSE_SVG from "@/assets/svg/close_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from '@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import TESTS from "@/assets/tests.json";
import Pagination from "../../../components/Pagination";
import Image from "next/image";

const DiagnosticRatesTable = () => {
  const heading = (
    <span>
      <span className="text-[#999999]">Diagnostics</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Diagnostic Rate Search</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Diagnostic Rates</span>
    </span>
  );

  const tableHeadings = [
    "SL.NO",
    "CATEGORY",
    "TEST NAME",
    "DISCOUNT SENIOR IN HOUSE",
    "DISCOUNT MEMBERS IN HOUSE",
    "DISCOUNT SENIOR OUTSIDE",
    "PRICE",
    "STATUS",
  ];

  const [editedData, setEditedData] = useState<any>({}); 
  const [selectedRows, setSelectedRows] = useState<number[]>([]); 
  const [isEditMode, setIsEditMode] = useState(false); 
  const [localTests, setLocalTests] = useState(TESTS); 

  const getStatusClass = (status: string) => {
    return status === "Active" ? "text-[#FB009C]" : "text-[#FB009C]";
  };

  // Handle Row Selection
  const handleRowSelect = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index)); 
    } else {
      setSelectedRows([...selectedRows, index]); 
      setEditedData(localTests[index]);
    }
  };

  // Handle Save Row
  const handleSaveRow = (index: number) => {
    if (selectedRows.includes(index)) {
      const updatedTests = [...localTests];
      updatedTests[index] = { ...updatedTests[index], ...editedData };
      setLocalTests(updatedTests);
      setSelectedRows(selectedRows.filter((i) => i !== index));
      setEditedData({});
    }
  };

  // Handle Cancel Row
  const handleCancelRow = (index: number) => {
    setSelectedRows(selectedRows.filter((i) => i !== index));
    setEditedData({});
  };

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Page Heading */}
      <h2 className="text-[24px] font-medium my-4">{heading}</h2>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          {/* Sort High-Low Button */}
          <button className="px-3 py-1 text-[14px] bg-white flex items-center text-[#FB009C] rounded-lg border-b border-l border-r border-pink-400 hover:bg-pink-50 hover:shadow-[0_2px_4px_-1px_rgba(251,0,156,0.06),0_2px_4px_-1px_rgba(251,0,156,0.06)] focus:border focus:border-pink-400 focus:shadow-none disabled:bg-[#E6E6E6] disabled:text-[#999999] disabled:cursor-not-allowed transition duration-300 font-semibold">
            <span className="w-4 h-4 mr-2">
              <Image src={SORT_ICON_PINK} width={20} height={20} alt="sort" />
            </span>
            Sort High-Low
          </button>

          {/* Sort Low-High Button */}
          <button className="px-3 py-1 text-[14px] bg-white flex items-center text-[#FB009C] rounded-lg border-b border-l border-r border-pink-400 hover:bg-pink-50 hover:shadow-[0_2px_4px_-1px_rgba(251,0,156,0.06),0_2px_4px_-1px_rgba(251,0,156,0.06)] focus:border focus:border-pink-400 focus:shadow-none disabled:bg-[#E6E6E6] disabled:text-[#999999] disabled:cursor-not-allowed transition duration-300 font-semibold">
            <span className="w-4 h-4 mr-2">
              <Image src={SORT_ICON_PINK} width={20} height={20} alt="sort" />
            </span>
            Sort Low-High
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
          </span>
          <input
            className="pl-10 pr-3 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm placeholder-[#4D4D4D] transition duration-300"
            type="text"
            placeholder="Search Test Name..."
          />
        </div>
      </div>

      {/* Static Table */}
      <div className="bg-white rounded-xl overflow-x-auto shadow-md border border-[#999999]">
        {/* Rate Chart and Edit Button */}
        <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-b border-gray-200">
          <span className="font-inter">Rate Chart</span>
          {!isEditMode ? (
            <button
              onClick={() => setIsEditMode(true)} 
              className="flex items-center text-[#000000] transition duration-300 hover:text-pink-500"
            >
              Edit
              <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditMode(false)}
              className="flex items-center text-[#000000] transition duration-300 hover:text-[#B3B3B3]"
            >
              Cancel Report
              <Image src={CLOSE_SVG} width={18} height={18} alt="close" />
            </button>
          )}
        </div>

        {/* Table Headers */}
        <table className="min-w-full border-collapse">
          <thead className="bg-[#E8F4DC]">
            <tr>
              {/* Select column */}
              {isEditMode && (
                <th className="p-3 text-[14px] font-normal text-[#000000] uppercase border-b border-[#999999] text-left">
                  SELECT
                </th>
              )}
              {/* Default columns */}
              {tableHeadings.map((heading) => (
                <th key={heading} className="p-3 text-[14px] font-normal text-[#000000] uppercase border-b border-[#999999] text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body*/}
          <tbody>
            {localTests.map((test, index) => (
              <tr key={index} className="border-b border-[#999999] bg-white">
                {/* Select column */}
                {isEditMode && (
                  <td className="p-3 text-[12px]">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                      className="w-4 h-4 border border-gray-300 rounded"
                      style={{
                        accentColor: selectedRows.includes(index) ? '#FB009C' : 'gray' 
                      }}
                    />
                  </td>
                )}

                {/* Default columns */}
                <td className="p-3 text-[12px] text-[#000000]">{index + 1}</td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.category || test.category}
                      onChange={(e) =>
                        setEditedData({ ...editedData, category: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.category
                  )}
                </td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.testName || test.testName}
                      onChange={(e) =>
                        setEditedData({ ...editedData, testName: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.testName
                  )}
                </td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.seniorInHouse || test.seniorInHouse}
                      onChange={(e) =>
                        setEditedData({ ...editedData, seniorInHouse: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.seniorInHouse
                  )}
                </td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.membersInHouse || test.membersInHouse}
                      onChange={(e) =>
                        setEditedData({ ...editedData, membersInHouse: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.membersInHouse
                  )}
                </td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.seniorOutside || test.seniorOutside}
                      onChange={(e) =>
                        setEditedData({ ...editedData, seniorOutside: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.seniorOutside
                  )}
                </td>
                <td className="p-3 text-[12px] text-[#000000]">
                  {selectedRows.includes(index) ? (
                    <input
                      type="text"
                      value={editedData.price || test.price}
                      onChange={(e) =>
                        setEditedData({ ...editedData, price: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    test.price
                  )}
                </td>
                <td className={`p-3 text-[12px] ${getStatusClass(test.status)}`}>
                  {selectedRows.includes(index) ? (
                    <select
                      value={editedData.status || test.status}
                      onChange={(e) =>
                        setEditedData({ ...editedData, status: e.target.value })
                      }
                      className={`border border-gray-300 rounded px-2 py-1 ${getStatusClass(editedData.status || test.status)}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    test.status
                  )}
                </td>
                {/* ACTIONS */}
                {selectedRows.includes(index) && (
                  <td className="p-3 text-[12px] text-[#000000] flex items-center gap-2">
                    <button
                      onClick={() => handleSaveRow(index)}
                      className="text-green-500 hover:text-green-600"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => handleCancelRow(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Save Changes Button */}
      {isEditMode && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsEditMode(false)}
            className="bg-[#FB009C] text-white px-4 py-2 rounded hover:bg-[#FF94D6]"
          >
            Save Changes
          </button>
        </div>
      )}
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default DiagnosticRatesTable;