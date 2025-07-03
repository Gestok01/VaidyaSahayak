"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = () => {
  const billRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
  });

  const handlePrintPreview = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && billRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            ${billRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div>
      {/* Bill Preview */}
      <div
        ref={billRef}
        className="p-4 border bg-white w-[80%] mx-auto shadow-md"
      >
        <h2 className="text-lg font-bold mb-2">Bill Preview</h2>
        <p>Item: ReactJS Course</p>
        <p>Amount: $100</p>
        <p>Date: 12th Feb 2025</p>
      </div>

      {/* Print Buttons */}
      <div className="flex gap-4 mt-4 justify-center">
        <button
          onClick={handlePrintPreview}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Print Preview
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PrintBill;