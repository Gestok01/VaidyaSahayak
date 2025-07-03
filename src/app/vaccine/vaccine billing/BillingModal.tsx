"use client";

import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define a type for the bill data
interface BillData {
  patientName: string;
  address: string;
  billNo: string;
  ageGender: string;
  billDate: string;
  nameOfDoctor: string;
  mobileNo: string;
  visitLocation: string;
  visitTime: string;
  visitDate: string;
  billGeneratedTime: string;
  receivedBy: string;
  company: string;
  amtPayable: string;
  paidAmount: string;
  discount: string;
  balanceAmt: string;
  paymentMode: string;
}

// Define props type
interface BillingProps {
  isOpen: boolean;
  onClose: () => void;
  billData?: Partial<BillData>; // Allows missing fields
}

// Default values
const defaultBillData: BillData = {
  patientName: "MR. PRASANT KUMAR",
  address: "Nimta",
  billNo: "0225280278",
  ageGender: "38/M",
  billDate: "10/02/25",
  nameOfDoctor: "Dr. Arindam Day",
  mobileNo: "+91126495151",
  visitLocation: "Sagore Dutta Hospital",
  visitTime: "10:30",
  visitDate: "11/02/25",
  billGeneratedTime: "10/02/25 11:15:30 a.m.",
  receivedBy: "TUMPA NAHA ROY",
  company: "ABSSRK",
  amtPayable: "Rs.250.00",
  paidAmount: "Rs.250.00",
  discount: "Rs.0.00",
  balanceAmt: "Rs.0.00",
  paymentMode: "CASH",
};

const BillModal: React.FC<BillingProps> = ({ isOpen, onClose, billData = {} }) => {
  const billRef = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Merge provided billData with default values
  const [formData, setFormData] = useState<BillData>({ ...defaultBillData, ...billData });

  // Handle print
  const handlePrint = () => {
    if (!billRef.current) return;
    html2canvas(billRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save("bill.pdf");
    });
  };

  // Handle print preview
  const handlePrintPreview = () => {
    if (!billRef.current) return;
    html2canvas(billRef.current, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
      window.open(URL.createObjectURL(pdf.output("blob")));
    });
  };

  // Handle edit and save
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full w-75 ">
      <div className="bg-white w-full max-w-4xl shadow-lg p-6 overflow-y-auto max-h-full">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-black">VACCINE BILL</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Bill Cum Receipt Title */}
        <h3 className="text-center font-semibold my-4 text-black underline">
          Bill Cum Receipt
        </h3>

        {isEditing ? (
          // Editable UI
          <div className="space-y-6">
    {/* Driver & Patient ID */}
    <div className="flex justify-between text-sm font-semibold text-black">
      <p>Doctor ID: D12345</p>
      <p>Patient ID: 1234567</p>
      <p>Date: 10/02/25</p>
    </div>

    {/* Grey Line */}
    <div className="border-t border-gray-300"></div>

    {/* Patient Details */}
    <h3 className="text-lg font-semibold text-gray-700">Patient Details</h3>
    <div className="grid grid-cols-2 gap-6 text-black">
      <div>
        <label className="block font-semibold">Patient Name:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value={formData.patientName} disabled />

        <label className="block font-semibold mt-2">Address:</label>
        <input type="text" className="border p-2 w-full" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

        <label className="block font-semibold mt-2">Age:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="38" disabled />

        <label className="block font-semibold mt-2">Sex:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="Male" disabled />
      </div>
      <div>
        <label className="block font-semibold">Mobile No:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value={formData.mobileNo} disabled />

        <label className="block font-semibold mt-2">Status:</label>
        <select className="border p-2 w-full">
          <option>Select</option>
          <option>Admitted</option>
          <option>Discharged</option>
        </select>

        <label className="block font-semibold mt-2">Membership:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="Yes" disabled />
      </div>
    </div>

    {/* Grey Line */}
    <div className="border-t border-gray-300"></div>




    {/* Payment Information */}
    <h3 className="text-lg font-semibold text-gray-700">Oxygen Information</h3>
    <div className="border border-gray-300 rounded-md overflow-hidden text-black">
      <table className="w-full text-sm text-left text-black border-collapse border">
        <thead className="bg-gray-100">
          <tr>
          <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Rent/Day</th>
                    <th className="p-2 border">Charge/Unit</th>
                    <th className="p-2 border">Days</th>
                    <th className="p-2 border">Units</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Amt. Payable</th>
                    <th className="p-2 border">Paid Amount</th>
                    <th className="p-2 border">Balance Amt</th>
                    <th className="p-2 border">Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className="p-2 border">Cylinder Rent</td>
                    <td className="p-2 border">50</td>
                    <td className="p-2 border">50</td>
                    <td className="p-2 border">0</td>
                    <td className="p-2 border">14</td>
                    <td className="p-2 border">{formData.discount}</td>
                    <td className="p-2 border">{formData.amtPayable}</td>
                    <td className="p-2 border">{formData.paidAmount}</td>
                    <td className="p-2 border">{formData.balanceAmt}</td>
                    <td className="p-2 border">{formData.paymentMode}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Patient Details */}
    <h3 className="text-lg font-semibold text-gray-700">Payment Information</h3>
    <div className="grid grid-cols-2 gap-6 text-black">
      <div>
        <label className="block font-semibold mt-2">Amount Paid:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="XXXX" disabled />

        <label className="block font-semibold mt-2">Total Discount:</label>
        <input type="text" className="border p-2 w-full" value="XXXXA" />

        <label className="block font-semibold mt-2">Total Bill<span className="text-red-600">*</span>:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="XXXX" disabled />

        <label className="block font-semibold mt-2">Outstanding Amount:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="XXXX" disabled />
      </div>
      <div>
        <label className="block font-semibold mt-2">Total Refund:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="XXXX" disabled />
        
        <label className="block font-semibold mt-2">Payment Mode:</label>
        <select className="border p-2 w-full">
          <option>Select</option>
          <option>Cash</option>
          <option>Card</option>
          <option>Online</option>
        </select>

        <label className="block font-semibold mt-2">Transaction ID:</label>
        <input type="text" className="w-full p-2 border rounded-md bg-gray-100" value="XXXXXXXX" disabled />

        <label className="block font-semibold mt-2">Bill Type:</label>
        <select className="border p-2 w-full">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
    </div>

     {/* Payment Information */}
    <h3 className="text-lg font-semibold text-gray-700">Oxygen Information</h3>
    <div className="border border-gray-300 rounded-md overflow-hidden text-black">
      <table className="w-full text-sm text-left text-black border-collapse border">
        <thead className="bg-gray-100">
          <tr>
          <th className="p-2 border">Amount Paid</th>
          <th className="p-2 border">Payment Method</th>
          <th className="p-2 border">Total Discount</th>
          <th className="p-2 border">Total Bill</th>
          <th className="p-2 border">Outstanding Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className="p-2 border">xx</td>
          <td className="p-2 border">Card</td>
          <td className="p-2 border">XX</td>
          <td className="p-2 border">XX</td>
          <td className="p-2 border">XX</td>
          </tr>
        </tbody>
      </table>
    </div> 
    

    {/* Footer */}
    <div className="mt-4 text-black text-sm">
      <p>
        <span className="font-semibold">Received With Thanks From:</span><br />
        {formData.patientName} an amount of <span className="font-semibold">{formData.amtPayable}</span> (Rupees Two Hundred and Fifty) only.
      </p>
    </div>

    <div className="flex justify-between items-start mt-2 text-black">
      <div>
        <p><span className="font-semibold">Bill Generated Time:</span> {formData.billGeneratedTime}</p>
      </div>
      <div className="text-right">
        <p><span className="font-semibold">Received By:</span> {formData.receivedBy}</p>
        <p><span className="font-semibold">For:</span> {formData.company}</p>
      </div>
    </div>
  </div>
        ) : (
          // Static Bill View
          <div ref={billRef} className="border border-gray-300 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-6 text-sm text-black">
              <div>
                <p><span className="font-semibold">Patient Name:</span> {formData.patientName}</p>
                <p><span className="font-semibold">Address:</span> {formData.address}</p>
                <p><span className="font-semibold">Booking Start Date:</span> {formData.ageGender}</p>
              </div>
              <div>
                <p><span className="font-semibold">Bill No:</span> {formData.billNo}</p>
                <p><span className="font-semibold">Bill Date:</span> {formData.billDate}</p>
                <p><span className="font-semibold">Mobile No:</span> {formData.mobileNo}</p>
                <p><span className="font-semibold">Booking End Date:</span> {formData.visitTime}</p>
              </div>
            </div>

            {/* Table */}
            <div className="mt-4 border border-gray-300 rounded-md overflow-hidden text-black">
              <table className="w-full text-sm text-left text-black border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Rent/Day</th>
                    <th className="p-2 border">Charge/Unit</th>
                    <th className="p-2 border">Days</th>
                    <th className="p-2 border">Units</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Amt. Payable</th>
                    <th className="p-2 border">Paid Amount</th>
                    <th className="p-2 border">Balance Amt</th>
                    <th className="p-2 border">Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Cylinder Rent</td>
                    <td className="p-2 border">50</td>
                    <td className="p-2 border">50</td>
                    <td className="p-2 border">0</td>
                    <td className="p-2 border">14</td>
                    <td className="p-2 border">{formData.discount}</td>
                    <td className="p-2 border">{formData.amtPayable}</td>
                    <td className="p-2 border">{formData.paidAmount}</td>
                    <td className="p-2 border">{formData.balanceAmt}</td>
                    <td className="p-2 border">{formData.paymentMode}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 text-black text-sm">
              <p>
                <span className="font-semibold">Received With Thanks From:</span><br />
                {billData.patientName} an amount of <span className="font-semibold">{formData.amtPayable}</span> (Rupees Two Hundred and Fifty) only.
              </p>
            </div>

            <div className="flex justify-between items-start mt-2 text-black">
                {/* Left Column */}
                <div>
                    <p><span className="font-semibold">Bill Generated Time:</span> {formData.billGeneratedTime}</p>
                </div>

                {/* Right Column */}
                <div className="text-right">
                    <p><span className="font-semibold">Received By:</span> {formData.receivedBy}</p>
                    <p><span className="font-semibold">For:</span> {formData.company}</p>
                </div>
                </div>

          </div>
        )}

        {/* Buttons */}
{/* Buttons */}
<div className="flex justify-end gap-4 mt-6 border-t pt-4">
  {isEditing ? (
    // Show only "Save" button in Edit Mode
    <button onClick={() => setIsEditing(false)} className="text-white bg-green-600 px-4 py-2 rounded-md">
      Save
    </button>
  ) : (
    // Show all buttons in View Mode
    <>
      <button onClick={handleEdit} className="text-pink-600 border border-pink-600 px-4 py-2 rounded-md">
        Edit
      </button>
      <button onClick={handlePrintPreview} className="text-pink-600 border px-4 py-2 rounded-md">
        Print Preview
      </button>
      <button onClick={handlePrint} className="text-white bg-pink-600 px-4 py-2 rounded-md">
        Print
      </button>
    </>
  )}
</div>


      </div>
    </div>
  );
};

export default BillModal;
