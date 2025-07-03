"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReceiptSvg from "../../assets/svg/receipt_long_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import TICK_SVG from "@/assets/svg/check_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import CROSS_SVG from "@/assets/svg/close_24dp_1A1A1A_FILL0_wght400_GRAD0_opsz24.svg";

interface TableProps {
  showEditActions?: boolean; 
  isEditModeOn?: boolean;
  containBill?: boolean;
  tableDataKeys: string[];
  tableHeadings: string[];
  tableData: Record<string, any>[];
  BillModal?: React.FC<{ isOpen: boolean; onClose: () => void; billData: any }>;
  editableSlNo: string | number | null; // Updated to accept both string and number
  setEditableSlNo: (slNo: string | number | null) => void; // Updated accordingly
  handleSaveRow: (index: string | number, editedData: Record<string, string>) => void; // Updated
  handleCancelRow?: () => void;
  getStatusClass?: (status: string, type: string) => string;
  customRenderCell?: (tdKey: string, data: any) => React.ReactNode | null;
  idKey?: string; // New prop to specify the ID field name
}

const DynamicTable: React.FC<TableProps> = ({
  editableSlNo,
  setEditableSlNo,
  isEditModeOn = false,
  containBill = true,
  tableDataKeys,
  tableHeadings,
  tableData,
  BillModal,
  handleSaveRow,
  handleCancelRow,
  getStatusClass,
  customRenderCell,
  idKey = 'slNo', // Default to 'slNo' for backward compatibility
}) => {
  const [selectedBill, setSelectedBill] = useState<any | null>(null);
  const [localEditedData, setLocalEditedData] = useState<Record<string, any>>({});

  // Initialize local edited data when a row is selected
  useEffect(() => {
    if (editableSlNo !== null) {
      const selectedRow = tableData.find(row => row[idKey] === editableSlNo);
      if (selectedRow) {
        setLocalEditedData({ ...selectedRow });
      }
    } else {
      setLocalEditedData({});
    }
  }, [editableSlNo, tableData, idKey]);

  const handleInputChange = (key: string, value: string) => {
    setLocalEditedData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (id: string | number) => {
    handleSaveRow(id, localEditedData);
    setEditableSlNo(null);
  };

  const handleCancel = () => {
    if (handleCancelRow) {
      handleCancelRow();
    }
    setEditableSlNo(null);
  };

  const handleRowSelection = (data: any) => {
    const newSlNo = editableSlNo === data[idKey] ? null : data[idKey];
    setEditableSlNo(newSlNo);
  };

  if (!tableData || !tableDataKeys || tableData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="bg-white overflow-hidden shadow-sm border border-gray-300">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-[#e8f4dc] text-left">
            {isEditModeOn && (
              <th className="p-3 font-semibold text-gray-700 uppercase border-b">
                SELECT
              </th>
            )}
            {tableHeadings.map((heading) => (
              <th
                key={heading}
                className="p-3 font-semibold text-gray-700 uppercase border-b"
              >
                {heading}
              </th>
            ))}
            {(isEditModeOn || containBill) && (
              <th className="p-3 font-semibold text-gray-700 uppercase border-b"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr
              key={`${data[idKey]}-${editableSlNo === data[idKey] ? 'editing' : 'normal'}`}
              className={`hover:bg-gray-100 transition duration-200 ${
                editableSlNo === data[idKey]
                  ? "border-2 border-pink-400"
                  : "border-b border-gray-200"
              }`}
            >
              {isEditModeOn && (
                <td className="p-3 text-gray-700 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={editableSlNo === data[idKey]}
                    onChange={() => handleRowSelection(data)}
                    className="w-4 h-4 rounded border-pink-600 text-pink-800 bg-pink-200 focus:ring-pink-400"
                    aria-label={`Select row ${data[idKey]}`}
                  />
                </td>
              )}

              {tableDataKeys.map((tdKey) => (
                <td
                  key={tdKey}
                  className={`p-3 text-gray-700 border-b border-gray-200`}
                >
                  {customRenderCell ? (
                    customRenderCell(tdKey, data) || (
                      editableSlNo === data[idKey] ? (
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                          value={localEditedData[tdKey] ?? data[tdKey]}
                          onChange={(e) => handleInputChange(tdKey, e.target.value)}
                        />
                      ) : (
                        <span>{data[tdKey]}</span>
                      )
                    )
                  ) : editableSlNo === data[idKey] ? (
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                      value={localEditedData[tdKey] ?? data[tdKey]}
                      onChange={(e) => handleInputChange(tdKey, e.target.value)}
                    />
                  ) : (
                    <span>{data[tdKey]}</span>
                  )}
                </td>
              ))}

              {containBill && (
                <td className="p-3 text-gray-700 text-center">
                  {editableSlNo === data.slNo ? (
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={TICK_SVG}
                        alt="Save"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleSave(data.slNo)} 
                        role="button"
                        aria-label="Save changes"
                      />
                      <Image
                        src={CROSS_SVG}
                        alt="Cancel"
                        className="w-5 h-5 cursor-pointer"
                        onClick={handleCancel} 
                        role="button"
                        aria-label="Cancel editing"
                      />
                    </div>
                  ) : (
                    <Image
                      src={ReceiptSvg}
                      alt="View Bill"
                      width={20}
                      height={20}
                      className="hover:cursor-pointer mx-auto"
                      onClick={() => {
                        console.log(data.id);
                        setSelectedBill(data?.id)
                      }}
                      role="button"
                      aria-label="View bill"
                      priority
                      loading="eager"
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {BillModal && selectedBill && (
        <BillModal
          isOpen={true}
          onClose={() => setSelectedBill(null)}
          billData={selectedBill}
        />
      )}
    </div>
  );
};

export default DynamicTable;