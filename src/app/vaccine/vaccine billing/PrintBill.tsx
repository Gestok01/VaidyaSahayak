import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintBill: React.FC = () => {
  const billRef = useRef<HTMLDivElement | null>(null); // ✅ Fix: Explicitly define the type

  const handleDownloadPDF = () => {
    if (!billRef.current) return; // ✅ Ensure ref is not null before using it

    html2canvas(billRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("bill.pdf");
    });
  };

  return (
    <div>
      {/* Bill Preview */}
      <div ref={billRef} className="p-4 border bg-white w-[80%] mx-auto shadow-md">
        <h2 className="text-lg font-bold mb-2">Bill Preview</h2>
        <p>Item: ReactJS Course</p>
        <p>Amount: $100</p>
        <p>Date: 12th Feb 2025</p>
      </div>

      {/* Download Button */}
      <button onClick={handleDownloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Print Bill
      </button>
    </div>
  );
};

export default PrintBill;
