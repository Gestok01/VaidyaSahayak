"use client";
import React, { useRef } from "react";
import { X } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  billData?: any;
}

const BillModal: React.FC<BillModalProps> = ({ isOpen, onClose, billData = {} }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Sample data for the modal
  const orderDetails = {
    employeeId: billData["EMPLOYEE ID"] || "#xxxxxxx",
    issueDate: billData["ISSUE DATE"] || "dd-mm-yyyy",
    createdAt: billData["CREATED AT"] || "dd-mm-yyyy",
    createdBy: billData["CREATED BY"] || "lorem",
    remark: billData["REMARK"] || "Lorem"
  };

  // Sample item data
  const items = [
    {
      itemId: "xxxxxx",
      itemName: "Lorem",
      category: "Lorem",
      quantity: "Lorem",
      remark: "XXXX"
    }
  ];

  // Handle print preview
  const handlePrintPreview = () => {
    if (!printRef.current) return;

    html2canvas(printRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Print Preview</title>
                <style>
                  body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                  img { max-width: 100%; }
                </style>
              </head>
              <body>
                <img src="${imgData}" alt="Print Preview" />
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      })
      .catch(err => console.error("Error generating print preview:", err));
  };

  // Handle print
  const handlePrint = () => {
    if (!printRef.current) return;
    
    html2canvas(printRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("order-details.pdf");
      })
      .catch(err => console.error("Error generating PDF:", err));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      ></div>
      
      {/* Modal positioned at right side */}
      <div className="relative h-screen w-1/3 bg-white shadow-lg flex flex-col overflow-hidden z-10">
        {/* Header with Close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-medium">Order Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto" ref={printRef}>
          <div className="p-5">
            {/* Order Details Section - Arranged exactly like the image */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Issue Order Details</h3>
              
              {/* Two-column layout for first row */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Employee ID</label>
                  <input 
                    type="text"
                    readOnly
                    value={orderDetails.employeeId}
                    className="block w-full p-2 border border-gray-300 rounded text-xs bg-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      readOnly
                      value={orderDetails.issueDate}
                      className="block w-full p-2 border border-gray-300 rounded text-xs bg-gray-100"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Two-column layout for second row */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Created At</label>
                  <div className="relative">
                    <input 
                      type="text"
                      readOnly
                      value={orderDetails.createdAt}
                      className="block w-full p-2 border border-gray-300 rounded text-xs bg-gray-100"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Created By</label>
                  <input 
                    type="text"
                    readOnly
                    value={orderDetails.createdBy}
                    className="block w-full p-2 border border-gray-300 rounded text-xs bg-gray-100"
                  />
                </div>
              </div>
              
              {/* Full-width Remark field */}
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Remark</label>
                <input 
                  type="text"
                  readOnly
                  value={orderDetails.remark}
                  className="block w-full p-2 border border-gray-300 rounded text-xs bg-gray-100"
                />
              </div>
            </div>

            {/* Item Details Section */}
            <div className="mt-8">
              <div className="border border-gray-200 rounded overflow-hidden">
                {/* Header bar with "Item Details" text */}
                <div className="bg-white border-b-2 border-pink-400 ">
                  <h4 className="text-xs font-medium p-2 ">Item Details</h4>
                </div>
                
                {/* Table for item details */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#e8f4dc]">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-xs font-medium text-gray-700 text-left">ITEM ID</th>
                        <th scope="col" className="px-3 py-2 text-xs font-medium text-gray-700 text-left">ITEM NAME</th>
                        <th scope="col" className="px-3 py-2 text-xs font-medium text-gray-700 text-left">CATEGORY</th>
                        <th scope="col" className="px-3 py-2 text-xs font-medium text-gray-700 text-left">QUANTITY</th>
                        <th scope="col" className="px-3 py-2 text-xs font-medium text-gray-700 text-left">REMARK</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-xs text-gray-700">{item.itemId}</td>
                          <td className="px-3 py-2 text-xs text-gray-700">{item.itemName}</td>
                          <td className="px-3 py-2 text-xs text-gray-700">{item.category}</td>
                          <td className="px-3 py-2 text-xs text-gray-700">{item.quantity}</td>
                          <td className="px-3 py-2 text-xs text-gray-700">{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with Print Buttons */}
        <div className="flex relative  bottom-2 mb-2 justify-start  p-3">
          <button
            onClick={handlePrintPreview}
            className="relative px-2 py-1.5 rounded-md text-xs font-medium border border-white shadow-sm bg-[#FB009C] text-white shadow-[#FB009C]/80 mr-2"
          >
            Print Preview
          </button>
          <button
            onClick={handlePrint}
            className="relative px-2 py-1.5 rounded-md text-xs font-medium border border-white shadow-sm bg-[#FB009C] text-white shadow-[#FB009C]/80"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;