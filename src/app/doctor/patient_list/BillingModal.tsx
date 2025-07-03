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
  aptTime: string;
  aptDate: string;
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
  paystatus: string;
  member: string;
  pstatus: string;
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
    discountAmt: "XXX",
    balanceAmt: "Rs.0.00",
    paymentMode: "SELECT",
    dropLocation: "LOREM PRIUM",
    waitingCharges: "XXX",
    totalDiscount: "XXX",
    outAmount: "XXX",
    totalBIF: "Rs.250.00",
    billDate: "10/02/25",
    aptTime: "XX:XX",
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
    aptDate: "dd/mm/yyyy",
    testGroup: "Select",
    doctorName: "Dr. Aman Singh",
    discountPer: "XX%",
    billNo: "0225280278",
    cardNo: "0",
    paystatus: "Select",
    member: "SELECT",
    pstatus: "SELECT",
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
    const value = e.target.value;

    if (field === "paidAmount") {
      const totalBill = parseFloat(formData.totalBill) || 0;
      const discount = parseFloat(formData.totalDiscount) || 0;
      const paidAmt = parseFloat(value) || 0;

      const outstandingAmount = (totalBill - discount - paidAmt).toFixed(2);
      setFormData({
        ...formData,
        [field]: value,
        outAmount: outstandingAmount, 
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }

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
    const totalBill = parseFloat(formData.totalBill) || 0;
    const discount = parseFloat(formData.totalDiscount) || 0;
    const paidAmt = parseFloat(formData.paidAmount) || 0;

    const outstandingAmount = (totalBill - discount - paidAmt).toFixed(2);

    setPaymentDetails([
      ...paymentDetails,
      {
        amountPaid: formData.paidAmount,
        paymentMethod: formData.paymentMode,
        outstandingAmount: outstandingAmount, 
        totalDiscount: formData.totalDiscount,
        totalBill: formData.totalBill,
      },
    ]);

    setFormData({
      ...formData,
      paidAmount: "",
      paymentMode: "SELECT",
      outAmount: outstandingAmount, 
      totalDiscount: "",
      totalBill: "",
    });

    setIsPaymentAdded(true);
    setIsFormEdited(true);
  };

  if (!isOpen) return null;

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
              <label className="block font-semibold mt-2">Membership*</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.member}
                onChange={(e) => handleFormChange(e, "member")}
              >
                <option value="">SELECT</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>              

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
                value={formData.pstatus}
                onChange={(e) => handleFormChange(e, "pstatus")}
              >
                <option value="">SELECT</option>
                <option value="ADMIT">ADMIT</option>
                <option value="DISCHARGE">DISCHARGE</option>
              </select>
            </div>
          </div>

          {/* Consultation Details */}
          <h3 className="text-lg font-semibold text-gray-700">Consultation Details</h3>
          <div className="grid grid-cols-2 gap-6 text-black">
            <div>
              <label className="block font-semibold mt-2">Doctor Name*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.doctorName}
                onChange={(e) => handleFormChange(e, "doctorName")}
              />

              <label className="block font-semibold mt-2">Appointment Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                value={formData.aptTime}
                onChange={(e) => handleFormChange(e, "aptTime")}
              />

              <label className="block font-semibold mt-2">Status*</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.status}
                onChange={(e) => handleFormChange(e, "status")}
              >
                <option value="">Select</option>
                <option value="BOOKED">BOOKED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Appointment Date*</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={formData.aptDate}
                onChange={(e) => handleFormChange(e, "aptDate")}
              />

              <label className="block font-semibold">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.visitLocation}
                onChange={(e) => handleFormChange(e, "visitLocation")}
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
              <label className="block font-semibold mt-2">Consultation Fee*</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
                }`}
                value={formData.totalBill}
                onChange={(e) => handleFormChange(e, "totalBill")}
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

              <label className="block font-semibold">Amount Paid*</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  isPaymentAdded ? "opacity-50 cursor-not-allowed" : ""
                }`}
                value={formData.paidAmount}
                onChange={(e) => handleFormChange(e, "paidAmount")}
                disabled={isPaymentAdded}
              />
              
            </div>
          </div>

          {/* Payment Info Table */}
          {paymentDetails.length > 0 && (
            <div className="mt-4 border border-gray-300 rounded-md overflow-hidden">
              <div className="grid grid-cols-5 gap-4 font-semibold text-black bg-[#E8F4DC] border-b px-4 py-2 uppercase text-sm">
                <span>Consultation Fee</span>
                <span>Total Discount</span>
                <span>Payment Method</span>
                <span>Amount Paid</span>
                <span>Outstanding Amount</span>
              </div>
              <div>
                {paymentDetails.map((payment, index) => (
                  <div className="grid grid-cols-5 gap-4 px-4 py-2 border-b items-center text-gray-700 text-sm" key={index}>
                    <span>{payment.totalBill}</span>
                    <span>{payment.totalDiscount}</span>
                    <span>{payment.paymentMethod}</span>
                    <span>{payment.amountPaid}</span>
                    <span>{payment.outstandingAmount}</span>
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
                  <p><span className="font-semibold">Address:</span> {formData.address}</p>
                  <p><span className="font-semibold">Age:</span> {formData.age}</p>
                  <p><span className="font-semibold">Mobile No.:</span> {formData.mobileNo}</p>
                  <p><span className="font-semibold">Name of Doctor:</span> {formData.doctorName}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Patient ID:</span> 1234567</p>
                  <p><span className="font-semibold">Bill Date:</span> {formData.billDate}</p>
                  <p><span className="font-semibold">Visit Time:</span> {formData.visitTime}</p>
                  <p><span className="font-semibold">Visit Date:</span> {formData.visitDate}</p>
                  <p><span className="font-semibold">Visit Location:</span> {formData.visitLocation}</p>
                </div>
              </div>

              {/* Gray Line Separator */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Table */}
              <table className="w-full text-sm text-left text-black border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Fees</th>
                    <th className="p-2 border">Payment Mode</th>
                    <th className="p-2 border">Total Amt.</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Paid Amt.</th>
                    <th className="p-2 border">Amt. Payable</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentDetails.map((payment, index) => {
                    const totalBill = parseFloat(payment.totalBill) || 0;
                    const discount = parseFloat(payment.totalDiscount) || 0;
                    const paidAmt = parseFloat(payment.amountPaid) || 0;

                    // Calculate outstanding amount
                    const outstandingAmount = (totalBill - discount - paidAmt).toFixed(2);

                    return (
                      <tr key={index}>
                        <td className="p-2 border">Doctor Consultation</td>
                        <td className="p-2 border">{totalBill.toFixed(2)}</td>
                        <td className="p-2 border">{payment.paymentMethod}</td>
                        <td className="p-2 border">{totalBill.toFixed(2)}</td>
                        <td className="p-2 border">{discount.toFixed(2)}</td>
                        <td className="p-2 border">{paidAmt.toFixed(2)}</td>
                        <td className="p-2 border">{outstandingAmount}</td>
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
                  {(
                    parseFloat(paymentDetails[0]?.totalBill || "0") -
                    parseFloat(paymentDetails[0]?.totalDiscount || "0") -
                    parseFloat(paymentDetails[0]?.amountPaid || "0")
                  ).toFixed(2)}
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
                <p><span className="font-normal">Payment Mode:</span> {formData.paymentMode}</p>
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