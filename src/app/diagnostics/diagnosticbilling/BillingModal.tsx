"use client";
import { X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BillData {
  patientName: string;
  address: string;
  age: string;
  sex: string;
  mobileNo: string;
  status: string;
  rec: string;
  pickupLocation: string;
  paidAmount: string;
  discountAmt: string;
  balanceAmt: string;
  paymentMode: string;
  dropLocation: string;
  waitingCharges: string;
  totalDiscount: string;
  totalBIF: string;
  billDate: string;
  testTime: string;
  testDate: string;
  visitLocation: string;
  testName: string;
  price: string;
  totalBill: string;
  receivedBy: string;
  company: string;
  outAmount: string;
  billGeneratedTime: string;
  visitDate: string;
  visitTime: string;
  patientID: string;
  balance: string;
  testGroup: string;
  doctorName: string;
  discountPer: string;
  billNo: string;
  cardNo: string;
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
    rec: "FRIEND",
    pickupLocation: "CURRENT PRIUM",
    totalBill: "XXX",
    paidAmount: "XXX",
    discountAmt: "XXX",
    balanceAmt: "Rs.0.00",
    paymentMode: "SELECT",
    dropLocation: "LOREM PRIUM",
    waitingCharges: "XXX",
    totalDiscount: "XXX",
    outAmount: "XXX",
    totalBIF: "Rs.250.00",
    billDate: "10/02/25",
    testTime: "XX:XX",
    testName: "MRI",
    price: "XXX",
    visitLocation: "Sagore Dutta Hospital",
    billGeneratedTime: "10/02/25 11:15:30 a.m.",
    receivedBy: "TUMPA NAHA ROY",
    company: "ABSSRK",
    visitDate: "22/03/2025",
    visitTime: "10:45",
    patientID: "1",
    balance: "XXX",
    testDate: "dd/mm/yyyy",
    testGroup: "Select",
    doctorName: "Dr. Aman Singh",
    discountPer: "XX%",
    billNo: "0225280278",
    cardNo: "0",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<
    { amountPaid: string; paymentMethod: string; outstandingAmount: string; totalDiscount: string; totalBill: string }[]
  >([]);
  const [isPaymentAdded, setIsPaymentAdded] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      totalDiscount: prevData.discountAmt,
      totalBill: prevData.price,
    }));
  }, [formData.discountAmt, formData.price]);

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
        billRef.current.style.display = "none";
      });
  };

  const handleAddPaymentDetail = () => {
    setPaymentDetails([
      ...paymentDetails,
      {
        amountPaid: formData.paidAmount,
        paymentMethod: formData.paymentMode,
        outstandingAmount: formData.outAmount,
        totalDiscount: formData.totalDiscount,
        totalBill: formData.totalBill,
      },
    ]);
    setFormData({ ...formData, paidAmount: "", paymentMode: "SELECT", outAmount: "", totalDiscount: "", totalBill: "" });
    setIsPaymentAdded(true);
    setIsFormEdited(true);
  };

  if (!isOpen) return null;

  const calculateAmountPayable = () => {
    const totalAmt = parseFloat(formData.totalBill) || 0;
    const discount = parseFloat(formData.totalDiscount) || 0;
    const paidAmt = parseFloat(formData.paidAmount) || 0;

    return (totalAmt - discount - paidAmt).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
      <div className="bg-white w-full max-w-4xl shadow-lg p-6 overflow-y-auto max-h-full">
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
              <label className="block font-semibold">Address*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.address}
                onChange={(e) => handleFormChange(e, "address")}
              />

              <label className="block font-semibold">Sex*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.sex}
                onChange={(e) => handleFormChange(e, "sex")}
              />

              <label className="block font-semibold mt-2">Status*</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.status}
                onChange={(e) => handleFormChange(e, "status")}
              >
                <option value="">Select</option>
                <option value="Admitted">Admitted</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>

          {/* Test Details */}
          <h3 className="text-lg font-semibold text-gray-700">Test Information</h3>
          <div className="grid grid-cols-2 gap-6 text-black">
            <div>
              <label className="block font-semibold">Test Group*</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.testGroup}
                onChange={(e) => handleFormChange(e, "testGroup")}
              >
                <option value="">Select</option>
                <option value="Admitted">Test Group 1</option>
                <option value="Discharged">Test Group 2</option>
              </select>

              <label className="block font-semibold mt-2">Test Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.testName}
                onChange={(e) => handleFormChange(e, "testName")}
              />

              <label className="block font-semibold mt-2">Doctor Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.doctorName}
                onChange={(e) => handleFormChange(e, "doctorName")}
              />

              <label className="block font-semibold">Test Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={formData.testDate}
                onChange={(e) => handleFormChange(e, "testDate")}
              />

              <label className="block font-semibold mt-2">Test Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                value={formData.testTime}
                onChange={(e) => handleFormChange(e, "testTime")}
              />
            </div>
            <div>
              <label className="block font-semibold">Discount(%)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.discountPer}
                onChange={(e) => handleFormChange(e, "discountPer")}
              />

              <label className="block font-semibold mt-2">Discount Amount</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.discountAmt}
                onChange={(e) => handleFormChange(e, "discountAmt")}
              />

              <label className="block font-semibold">Recommended By</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.rec}
                onChange={(e) => handleFormChange(e, "rec")}
              />

              <label className="block font-semibold mt-2">Price</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.price}
                onChange={(e) => handleFormChange(e, "price")}
              />

              <label className="block font-semibold">Bill Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={formData.billDate}
                onChange={(e) => handleFormChange(e, "billDate")}
              />
            </div>
          </div>

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
                onChange={(e) => handleFormChange(e, "paidAmount")}
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
                onChange={(e) => handleFormChange(e, "outAmount")}
                disabled={isPaymentAdded}
              />
            </div>
            <div>
              <label className="block font-semibold mt-2">Total Discount</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
                }`}
                value={formData.totalDiscount}
                onChange={(e) => handleFormChange(e, "totalDiscount")}
                disabled={isPaymentAdded}
              />

              <label className="block font-semibold mt-2">Total Bill</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
                }`}
                value={formData.totalBill}
                onChange={(e) => handleFormChange(e, "totalBill")}
                disabled={isPaymentAdded}
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

          {/* Save Button and WhatsApp Button */}
          <div className="flex justify-between mt-6">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.479 5.092 1.479 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </button>
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
                    <p><span className="font-semibold">Patient ID:</span> 1234567</p>
                    <p><span className="font-semibold">Patient Name:</span> {formData.patientName}</p>
                    <p><span className="font-semibold">Address:</span> {formData.address}</p>
                    <p><span className="font-semibold">Age:</span> {formData.age}</p>
                    <p><span className="font-semibold">Name of Doctor:</span> {formData.doctorName}</p>
                    <p><span className="font-semibold">Visit Location:</span> {formData.visitLocation}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Bill No.:</span> {formData.billNo}</p>
                    <p><span className="font-semibold">Bill Date:</span> {formData.billDate}</p>
                    <p><span className="font-semibold">Mobile No.:</span> {formData.mobileNo}</p>
                    <p><span className="font-semibold">Card No.:</span> {formData.cardNo}</p>
                    <p><span className="font-semibold">Visit Date:</span> {formData.visitDate}</p>
                    <p><span className="font-semibold">Visit Time:</span> {formData.visitTime}</p>
                  </div>
                </div>

                {/* Gray Line Separator */}
                <div className="border-t border-gray-300 my-4"></div>

                {/* Table */}
                <table className="w-full text-sm text-left text-black border-collapse border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Purpose</th>
                      <th className="p-2 border">Fees Actual</th>
                      <th className="p-2 border">Discount</th>
                      <th className="p-2 border">Amt. Payable</th>
                      <th className="p-2 border">Paid Amt.</th>
                      <th className="p-2 border">Balance Amt.</th>
                      <th className="p-2 border">Payment Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentDetails.map((payment, index) => {
                      const totalBill = parseFloat(payment.totalBill) || 0;
                      const discount = parseFloat(payment.totalDiscount) || 0;
                      const paidAmt = parseFloat(payment.amountPaid) || 0;
                      const amtPayable = totalBill - discount;
                      const balanceAmt = amtPayable - paidAmt;

                      return (
                        <tr key={index}>
                          <td className="p-2 border">Doctor Consultation</td>
                          <td className="p-2 border">{totalBill.toFixed(2)}</td>
                          <td className="p-2 border">{discount.toFixed(2)}</td>
                          <td className="p-2 border">{amtPayable.toFixed(2)}</td>
                          <td className="p-2 border">{paidAmt.toFixed(2)}</td>
                          <td className="p-2 border">{balanceAmt.toFixed(2)}</td>
                          <td className="p-2 border">{payment.paymentMethod}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Gray Line Separator */}
                <div className="border-t border-gray-300 my-4"></div>

                {/* Footer */}
                <div className="footer">
                  <p>
                    <span className="font-normal">Received With Thanks From:</span><br />
                    {formData.patientName} an amount of Rs. {" "}<span className="font-normal">{paymentDetails[0]?.amountPaid || "0.00"}</span> only.
                  </p>
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