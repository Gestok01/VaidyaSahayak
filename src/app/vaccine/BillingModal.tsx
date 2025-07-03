"use client";
import { X, Check, XCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BillData {
  patientName: string;
  address: string;
  age: string;
  sex: string;
  mobileNo: string;
  status: string;
  pickupLocation: string;
  paidAmount: string;
  discount: string;
  balanceAmt: string;
  paymentMode: string;
  dropLocation: string;
  endTime: string;
  totalDiscount: string;
  totalBIF: string;
  billDate: string;
  totalTime: string;
  visitLocation: string;
  vaccineName: string;
  qty: string;
  totalBill: string;
  receivedBy: string;
  company: string;
  outAmount: string;
  billGeneratedTime: string;
  visitDate: string;
  visitTime: string;
  patientID: string;
  balance: string;
  billNo: string;
  doctorName: string;
  bookingDate: string;
  time: string;
  vaccineDate: string;
  price: string;
}

interface BillingProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillModal: React.FC<BillingProps> = ({ isOpen, onClose }) => {
  const billRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<BillData>({
    patientName: "MR. PRASANT KUMAR",
    address: "Nimta",
    age: "XX",
    sex: "Male",
    mobileNo: "+91XXXXXXXXXX",
    status: "Select",
    pickupLocation: "CURRENT PRIUM",
    totalBill: "XXX",
    paidAmount: "XXX",
    discount: "XXX",
    balanceAmt: "Rs.0.00",
    paymentMode: "SELECT",
    dropLocation: "LOREM PRIUM",
    endTime: "XX:XX",
    totalDiscount: "XXX",
    outAmount: "XXX",
    totalBIF: "Rs.250.00",
    billDate: "10/02/25",
    totalTime: "XX:XX",
    vaccineName: "DTP",
    qty: "X",
    visitLocation: "Sagore Dutta Hospital",
    billGeneratedTime: "10/02/25 11:15:30 a.m.",
    receivedBy: "TUMPA NAHA ROY",
    company: "ABSSRK",
    visitDate: "22/03/2025",
    visitTime: "XX:XX",
    patientID: "1",
    balance: "XXX",
    billNo: "XX",
    doctorName: "Dr. Aman Singh",
    bookingDate: "DD/MM/YYYY",
    time: "XX:XX",
    vaccineDate: "DD/MM/YYYY",
    price: "XXX",
  });

  const [billingItems, setBillingItems] = useState([
    { id: 1, vaccineName: "Dx Vaccine", qty: 1, vaccineDate: "dd/mm/yyyy", time: "XX:XX", status: "VACCINATED", price: "12000", discount: "2000" },
    { id: 2, vaccineName: "Hp Vaccine", qty: 2, vaccineDate: "dd/mm/yyyy", time: "XX:XX", status: "BOOKED", price: "12000", discount: "3000" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [tempData, setTempData] = useState<typeof billingItems>(billingItems);
  const [paymentDetails, setPaymentDetails] = useState<
    { amountPaid: string; paymentMethod: string; outstandingAmount: string; totalDiscount: string; totalBill: string }[]
  >([]);
  const [isPaymentAdded, setIsPaymentAdded] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData([...billingItems]); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedRow(null);
    setBillingItems([...tempData]); 
  };

  const handleSave1 = () => {
    setIsEditing(false);
    setSelectedRow(null);
  };

  const handleRowChange = (id: number, field: string, value: string) => {
    setBillingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof BillData) => {
    setFormData({ ...formData, [field]: e.target.value });
    setIsFormEdited(true);
  };

  const handleSave = () => {
    setIsSaved(true);
    setIsFormEdited(false);
  };

  const handlePrintPreview = () => {
    if (!billRef.current) return;

    billRef.current.style.display = "block";

    html2canvas(billRef.current, { scale: 1, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const previewWindow = window.open();
        if (previewWindow) {
          previewWindow.document.write(`
            <html>
              <head>
                <title>Print Preview</title>
                <style>
                  body { margin: 0; }
                  img { max-width: 100%; height: auto; }
                </style>
              </head>
              <body>
                <img src="${imgData}" />
              </body>
            </html>
          `);
          previewWindow.document.close();
        }
      })
      .catch((error) => {
        console.error("Error capturing bill content:", error);
      })
      .finally(() => {
        billRef.current.style.display = "none";
      });
  };

  const handlePrint = () => {
    if (!billRef.current) return;

    billRef.current.style.display = "block";

    html2canvas(billRef.current, { scale: 1, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const offsetX = (210 - imgWidth) / 2;

        pdf.addImage(imgData, "PNG", offsetX, 10, imgWidth, imgHeight);

        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");

        pdf.save("bill.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      })
      .finally(() => {
        billRef.current && (billRef.current.style.display = "none");
      });
  };

  const handleAddPaymentDetail = () => {
    const totalBill = billingItems.reduce((sum, item) => sum + parseFloat(item.price || "0"), 0).toFixed(2);
    const totalDiscount = billingItems.reduce((sum, item) => sum + parseFloat(item.discount || "0"), 0).toFixed(2);
    const outstandingAmount = (parseFloat(totalBill) - parseFloat(totalDiscount) - parseFloat(formData.paidAmount || "0")).toFixed(2);

    setPaymentDetails([
      ...paymentDetails,
      {
        amountPaid: formData.paidAmount,
        paymentMethod: formData.paymentMode,
        outstandingAmount,
        totalDiscount,
        totalBill,
      },
    ]);
    setFormData({ ...formData, paidAmount: "", paymentMode: "SELECT", outAmount: "", totalDiscount: "", totalBill: "" });
    setIsPaymentAdded(true);
    setIsFormEdited(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
      <div className="bg-white w-full max-w-6xl shadow-lg p-6 overflow-y-auto max-h-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-black">#0225280278</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Driver ID, Patient ID and Date */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-black">
          <div>
            <label className="block font-semibold">PATIENT ID:
              <span>1234567</span>
            </label>
          </div>
          <div>
            <label className="block font-semibold">DATE:
              <span>DD/MM/YYYY</span>
            </label>
          </div>
        </div>

        {/* Gray Line Separator */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Form */}
        <div className="space-y-6 border border-gray-300 p-6 rounded-md">
          {/* Patient Details */}
          <h3 className="text-lg font-semibold text-gray-700">Patient Details</h3>
          <div className="grid grid-cols-2 gap-6 text-black">
            <div>
              <label className="block font-semibold">Patient Name*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.patientName}
                onChange={(e) => handleFormChange(e, "patientName")}
              />

              <label className="block font-semibold mt-2">Bill No*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.billNo}
                onChange={(e) => handleFormChange(e, "billNo")}
              />

              <label className="block font-semibold mt-2">Age*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.age}
                onChange={(e) => handleFormChange(e, "age")}
              />

              <label className="block font-semibold mt-2">Mobile Number*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.mobileNo}
                onChange={(e) => handleFormChange(e, "mobileNo")}
              />
            </div>
            <div>
              <label className="block font-semibold">Doctor Name*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.doctorName}
                onChange={(e) => handleFormChange(e, "doctorName")}
              />

              <label className="block font-semibold">Visit Location*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.visitLocation}
                onChange={(e) => handleFormChange(e, "visitLocation")}
              />

              <label className="block font-semibold mt-2">Visit Time*</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                value={formData.visitTime}
                onChange={(e) => handleFormChange(e, "visitTime")}
              />

              <label className="block font-semibold mt-2">Booking Date*</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={formData.bookingDate}
                onChange={(e) => handleFormChange(e, "bookingDate")}
              />
            </div>
          </div>

          {/* Billing Items Table */}
          <h3 className="text-lg font-semibold text-gray-700">Billing Items</h3>
          <div className="flex justify-end mb-2">
            {isEditing ? (
              <button
                onClick={handleCancel}
                className="bg-white text-pink-600 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-white text-pink-600 px-4 py-2 rounded-md"
              >
                Edit
              </button>
            )}
          </div>
          <table className="w-full text-sm text-left text-black border-collapse border">
            <thead className="bg-[#E8F4DC] border-b">
              <tr>
                {isEditing && <th className="p-2 border">Select</th>}
                <th className="p-2 border">Vaccine Name</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Vaccine Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Discount</th>
                {isEditing && <th className="p-2 border">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {billingItems.map((item) => (
                <tr key={item.id}>
                  {isEditing && (
                    <td className="p-2 border">
                      <input
                        type="checkbox"
                        checked={selectedRow === item.id}
                        onChange={() => setSelectedRow(item.id)}
                      />
                    </td>
                  )}
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="text"
                        value={item.vaccineName}
                        onChange={(e) => handleRowChange(item.id, "vaccineName", e.target.value)}
                      />
                    ) : (
                      item.vaccineName
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="text"
                        value={item.qty}
                        onChange={(e) => handleRowChange(item.id, "qty", e.target.value)}
                      />
                    ) : (
                      item.qty
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="date"
                        value={item.vaccineDate}
                        onChange={(e) => handleRowChange(item.id, "vaccineDate", e.target.value)}
                      />
                    ) : (
                      item.vaccineDate
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="time"
                        value={item.time}
                        onChange={(e) => handleRowChange(item.id, "time", e.target.value)}
                      />
                    ) : (
                      item.time
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <select
                        value={item.status}
                        onChange={(e) => handleRowChange(item.id, "status", e.target.value)}
                      >
                        <option value="VACCINATED">VACCINATED</option>
                        <option value="BOOKED">BOOKED</option>
                      </select>
                    ) : (
                      item.status
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleRowChange(item.id, "price", e.target.value)}
                      />
                    ) : (
                      item.price
                    )}
                  </td>
                  <td className="p-2 border">
                    {isEditing && selectedRow === item.id ? (
                      <input
                        type="text"
                        value={item.discount}
                        onChange={(e) => handleRowChange(item.id, "discount", e.target.value)}
                      />
                    ) : (
                      item.discount
                    )}
                  </td>
                  {isEditing && (
                    <td className="p-2 border">
                      {selectedRow === item.id ? (
                        <>
                          <button onClick={handleSave1} className="text-green-600">
                            <Check size={16} />
                          </button>
                          <button onClick={handleCancel} className="text-red-600 ml-2">
                            <XCircle size={16} />
                          </button>
                        </>
                      ) : null}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Payment Information */}
<h3 className="text-lg font-semibold text-gray-700">Payment Information
  <button
    onClick={handleAddPaymentDetail}
    disabled={isPaymentAdded}
    className={`text-pink-600 bg-white px-4 py-2 rounded-md ml-2 ${
      isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    Add
  </button>
</h3>
<div className="grid grid-cols-2 gap-6 text-black">
<div>
  <label className="block font-semibold">Amount Paid</label>
  <input
    type="text"
    className={`w-full p-2 border rounded-md ${
      isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
    }`}
    value={formData.paidAmount}
    onChange={(e) => {
      const rawValue = e.target.value;

      setFormData(prev => {
        const paidAmount = parseFloat(rawValue) || 0;
        const totalBill = billingItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
        const totalDiscount = billingItems.reduce((sum, item) => sum + (parseFloat(item.discount) || 0), 0);
        const outAmount = Math.max(0, totalBill - totalDiscount - paidAmount);
        
        return {
          ...prev,
          paidAmount: rawValue,
          outAmount: outAmount,
          totalBill: totalBill,
          totalDiscount: totalDiscount
        };
      });
    }}
    disabled={isPaymentAdded}
  />

    <label className="block font-semibold mt-2">Payment Method</label>
    <select
      className={`w-full p-2 border rounded-md ${
        isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      value={formData.paymentMode}
      onChange={(e) => handleFormChange(e, "paymentMode")}
      disabled={isPaymentAdded}
    >
      <option value="">Select</option>
      <option value="CASH">CASH</option>
      <option value="CARD">CARD</option>
      <option value="UPI">UPI</option>
    </select>

    <label className="block font-semibold">Outstanding Amount</label>
    <input
      type="text"
      className={`w-full p-2 border rounded-md ${
        isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      value={formData.outAmount}
      readOnly
    />
  </div>
  <div>
    <label className="block font-semibold mt-2">Total Discount</label>
    <input
      type="text"
      className={`w-full p-2 border rounded-md ${
        isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      value={billingItems.reduce((sum, item) => sum + (parseFloat(item.discount) || 0), 0)}
      readOnly
    />

    <label className="block font-semibold mt-2">Total Bill</label>
    <input
      type="text"
      className={`w-full p-2 border rounded-md ${
        isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      value={billingItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)}
      readOnly
    />
  </div>
</div>

          {/* Payment Info Table */}
          {paymentDetails.length > 0 && (
            <div className="mt-4 border border-gray-300 rounded-md overflow-hidden">
              <div className="grid grid-cols-5 gap-4 font-semibold text-black bg-[#E8F4DC] border-b px-4 py-2 uppercase text-sm">
                <span>Amount Paid</span>
                <span>Payment Method</span>
                <span>Outstanding Amount</span>
                <span>Total Discount</span>
                <span>Total Bill</span>
              </div>
              <div>
                {paymentDetails.map((payment, index) => (
                  <div className="grid grid-cols-5 gap-4 px-4 py-2 border-b items-center text-gray-700 text-sm" key={index}>
                    <span>{payment.amountPaid}</span>
                    <span>{payment.paymentMethod}</span>
                    <span>{payment.outstandingAmount}</span>
                    <span>{payment.totalDiscount}</span>
                    <span>{payment.totalBill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={!isFormEdited}
              className={`${
                isSaved
                  ? "bg-green-600 text-white"
                  : isFormEdited
                  ? "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600 hover:bg-pink-600 hover:text-white"
                  : "bg-pink-300 text-white cursor-not-allowed"
              } px-4 py-2 rounded-md transition-colors duration-200`}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Print Preview and Print Buttons */}
        <div className="flex justify-start gap-4 mt-6">
          <button
            onClick={handlePrintPreview}
            disabled={!isSaved}
            className={`${
              isSaved ? "bg-pink-600 text-white" : "bg-pink-300 text-white"
            } border px-4 py-2 rounded-md ${
              !isSaved ? "bg-pink-300 text-white border-white border-2 cursor-not-allowed" : ""
            }`}
          >
            Print Preview
          </button>
          <button
            onClick={handlePrint}
            disabled={!isSaved}
            className={`${
              isSaved ? "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600" : "text-pink-300"
            } px-4 py-2 rounded-md ${
              !isSaved ? "bg-pink-300 text-white border-white border-2 cursor-not-allowed" : ""
            }`}
          >
            Print
          </button>
        </div>

        {/* Bill Cum Receipt */}
        {isSaved && (
          <div ref={billRef} className="mt-6 border border-gray-300 p-4 rounded-md hidden">
            <h3 className="text-center font-semibold text-black underline">
              Bill Cum Receipt
            </h3>
            <div className="space-y-4 text-black">
              {/* Patient Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p><span className="font-semibold">Patient Name:</span> {formData.patientName}</p>
                  <p><span className="font-semibold">Age:</span> {formData.age}</p>
                  <p><span className="font-semibold">Name of Doctor:</span> {formData.doctorName}</p>
                  <p><span className="font-semibold">Visit Time:</span> {formData.visitTime}</p>       
                </div>
                <div>
                  <p><span className="font-semibold">Bill No:</span> {formData.billNo}</p>
                  <p><span className="font-semibold">Mobile No:</span> {formData.mobileNo}</p>
                  <p><span className="font-semibold">Visit Location:</span> {formData.visitLocation}</p>
                  <p><span className="font-semibold">Visit Date:</span> {formData.visitDate}</p>
                </div>
              </div>

              {/* Gray Line Separator */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Table */}
              <table className="w-full text-sm text-left text-black border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Vaccine Name</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Vaccine Date</th>
                    <th className="p-2 border">Time</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {billingItems.map((item, index) => {
                    const paymentDetail = paymentDetails[index] || {};
                    return (
                      <tr key={index}>
                        <td className="p-2 border">{item.vaccineName}</td>
                        <td className="p-2 border">{item.qty}</td>
                        <td className="p-2 border">{item.vaccineDate}</td>
                        <td className="p-2 border">{item.time}</td>
                        <td className="p-2 border">{item.status}</td>
                        <td className="p-2 border">{item.price}</td>
                        <td className="p-2 border">{item.discount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Total Amount */}
              <div className="text-right">
                <p>
                  <span className="font-semibold">Total Amt:</span>{" "}
                  {paymentDetails[0]?.totalBill || "0.00"}
                </p>
                <p>
                  <span className="font-semibold">Received:</span>{" "}
                  {paymentDetails[0]?.amountPaid || "0.00"}
                </p>
                <p>
                  <span className="font-semibold">Balance:</span>{" "}
                  {paymentDetails[0]?.outstandingAmount || "0.00"}
                </p>
              </div>

              {/* Gray Line Separator */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Footer */}
              <div className="footer">
                <p>
                  <span className="font-normal">Received With Thanks From:</span><br />
                  {formData.patientName} an amount of Rs. {" "}<span className="font-normal">{paymentDetails[0]?.amountPaid || "0.00"}</span> only.
                </p>
                <p><span className="font-normal">Payment mode:</span> {" "} {paymentDetails[0]?.paymentMethod || "N/A"}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p><span className="font-normal">Bill Generated Time:</span> {formData.billGeneratedTime}</p>
                  </div>
                  <div>
                    <p><span className="font-normal">Received By:</span> {formData.receivedBy}</p>
                    <p><span className="font-normal">For</span> {formData.company}</p>
                  </div>
                </div>
                <p><span className="font-semibold">**Please bring this slip during entry</span></p>
                <p><span className="font-semibold text-black underline">Donations are exempted from Income Tax U/S 8OG of Income Tax Act 1961</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillModal;