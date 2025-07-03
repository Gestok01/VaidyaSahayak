"use client";
import React, { useState, useMemo, useRef } from 'react';
import Image from "next/image";
import { X } from "lucide-react";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import paymentData from '@/assets/deposit.json';
import Pagination from "../../../components/Pagination";
import SEARCH_SVG from '@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import BILL_ICON from "@/assets/svg/receipt_long_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_WHITE from '@/assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import SORT_ICON_PINK from '@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Page = () => {
    const tableHeadings = ["BILL ID", "PATIENT NAME", "BILL GROUP", "DATE", "CASH", "CARD", "REFUND", "CREATED AT", "BILL"];
    
    const [dateFilter, setDateFilter] = useState('');
    const [billGroupFilter, setBillGroupFilter] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [selectedBill, setSelectedBill] = useState<any>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const billRef = useRef<HTMLDivElement>(null);

    const billGroupOptions = ["TEST", "APPOINTMENT", "VACCINE"];
    const [selectedBillGroup, setSelectedBillGroup] = useState<string | null>(null);
    const [billGroupFilters, setBillGroupFilters] = useState<{ [key: string]: boolean }>({
        TEST: false,
        APPOINTMENT: false,
        VACCINE: false,
    });

    const toggleDropdown = (dropdownName: string) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const handleBillGroupChange = (group: string) => {
        setBillGroupFilters(prev => ({
            ...prev,
            [group]: !prev[group],
        }));
        setSelectedBillGroup(group);
        setActiveDropdown(null);
    };

    const clearSelectedBillGroup = () => {
        setSelectedBillGroup(null);
        setBillGroupFilters({ TEST: false, APPOINTMENT: false, VACCINE: false });
    };

    const handleViewBill = (bill: any) => {
        setSelectedBill(bill);
        setShowReceipt(true);
 
        const formData = {
            patientName: 'Mr. Prashant Kumar',
            address: 'Nimta', 
            age: 'XX', 
            mobileNo: '+91XXXXXXXXXX', 
            doctorName: 'Dr. Aman Singh', 
            billDate: '10/02/25',
            visitTime: '10:00 AM', 
            visitDate: '22/03/2025',
            visitLocation: 'Sagore Dutta Hospital', 
            paymentMode: 'Cash',
            billGeneratedTime: '10/02/25 11:15:30 a.m.',
            receivedBy: 'TUMPA NAHA ROY', 
            company: 'ABSSRK'
        };
        
        setFormData(formData);
    
        const paymentDetails = [{
            totalBill: '15670',
            totalDiscount: '2000', 
            amountPaid: '12670',
            paymentMethod: 'Cash'
        }];
        
        setPaymentDetails(paymentDetails);
    };

    const [formData, setFormData] = useState({
        patientName: '',
        address: '',
        age: '',
        mobileNo: '',
        doctorName: '',
        billDate: '',
        visitTime: '',
        visitDate: '',
        visitLocation: '',
        paymentMode: '',
        billGeneratedTime: '',
        receivedBy: '',
        company: ''
    });

    const [paymentDetails, setPaymentDetails] = useState([{
        totalBill: '',
        totalDiscount: '',
        amountPaid: '',
        paymentMethod: ''
    }]);

    const filteredData = useMemo(() => {
        return paymentData.filter(item => {
            const matchesDate = item.date?.toString().includes(dateFilter);
            const matchesBillGroup = 
                !selectedBillGroup || 
                (item.billGroup && item.billGroup === selectedBillGroup);
            
            return matchesDate && matchesBillGroup;
        });
    }, [paymentData, dateFilter, selectedBillGroup]);

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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="relative w-full min-h-screen px-[42px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 w-full mt-8 mb-8">
                <Image 
                    src={UPLOAD} 
                    alt="Upload icon" 
                    width={20} 
                    height={20} 
                    className="mr-1"
                />
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Employee Management</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Deposit Statement of Employee Search</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Deposit Statement of Employee</span>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center w-full mb-8">
                {/* Bill Group */}
                <div className="flex items-center gap-4">
                    <div className="relative flex items-center gap-2">
                        <button
                            onClick={() => toggleDropdown("billGroup")}
                            disabled={!!selectedBillGroup}
                            className={`${
                                activeDropdown === "billGroup"
                                    ? "bg-pink-600 text-white border-white border-2"
                                    : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
                            } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
                            aria-label="Bill Group"
                        >
                            <Image
                                src={activeDropdown === "billGroup" ? SORT_ICON_WHITE : SORT_ICON_PINK}
                                width={20}
                                height={20}
                                alt="Sort Icon"
                                className="mr-2"
                            />
                            Bill Group
                        </button>

                        {selectedBillGroup && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                                <span className="text-[14px] text-[#999999]">{selectedBillGroup}</span>
                                <button
                                    onClick={clearSelectedBillGroup}
                                    className="text-black hover:text-pink-500"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        {activeDropdown === "billGroup" && (
                            <div className="absolute left-0 top-12 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[160px] shadow-md rounded-md z-50">
                                {billGroupOptions.map((group) => (
                                    <label key={group} className="block">
                                        <input
                                            type="checkbox"
                                            checked={billGroupFilters[group]}
                                            onChange={() => handleBillGroupChange(group)}
                                            className="mr-2 w-5 h-5 border-2 border-pink-400 checked:bg-white checked:border-pink-400"
                                        />
                                        {group}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Date search */}
                <div className="relative w-64">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
                    </span>
                    <input
                        className="pl-10 pr-3 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FB009C] focus:border-transparent shadow-sm placeholder-[#4D4D4D] transition duration-300"
                        type="text"
                        placeholder="DD-MM-YYYY"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-x-auto shadow-md border border-[#999999] w-full mb-4">
                <div className="relative">
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-2">
                        <span className="font-inter">Employee Details</span>
                    </div>
                    <div 
                        className="w-full"
                        style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, #FB009C 0%, #B3DB8A 100%)'
                        }}
                    />
                </div>
                <table className="w-full border-collapse">
                    <thead className="bg-[#E8F4DC]">
                        <tr>
                            {tableHeadings.map((heading) => (
                                <th
                                    key={heading}
                                    className="p-3 text-[14px] font-normal text-[#000000] uppercase border-b border-[#999999] text-left"
                                >
                                    <div className="flex items-center">
                                        {heading}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((bill, index) => (
                            <tr key={index} className="border-b border-[#999999] bg-white">
                                <td className="p-3 text-[12px] text-[#000000]">{bill.billId || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.patientName || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.billGroup || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.date || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.cash || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.card || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.refund || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.createdAt || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000] flex items-center gap-1">                                
                                    <button 
                                        onClick={() => handleViewBill(bill)}
                                        className="hover:bg-gray-100 p-1 rounded"
                                    >
                                        <Image 
                                            src={BILL_ICON} 
                                            alt="Bill icon" 
                                            width={16} 
                                            height={16}
                                            className="ml-2"
                                        />
                                    </button>                                        
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end w-full mb-4">
                <Pagination 
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredData.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>

            {/* Bill Receipt Modal */}
            {showReceipt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
            <div className="bg-white w-full max-w-4xl shadow-lg p-6 overflow-y-auto max-h-full">
            {/* Header with close button */}
              <div className="flex justify-between items-center border-b mt-[22px] pb-4">
              <h2 className="text-xl font-semibold text-black">#0225280278</h2>
              <button 
                    onClick={() => setShowReceipt(false)}
                    className="text-gray-500 hover:text-gray-700"
              >
              <X size={24} />
              </button>
              </div>
      
            {/* Bill Receipt Content */}
              <div ref={billRef} className="mt-2 border border-[#CCCCCC] rounded-lg w-full p-6 space-y-6">
              <h3 className="text-center text-xl font-semibold text-black underline">
                  Bill Cum Receipt
              </h3>

            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
            <p><span className="font-semibold">Patient Name:</span> {formData.patientName}</p>
            <p><span className="font-semibold">Address:</span> {formData.address}</p>
            <p><span className="font-semibold">Age:</span> {formData.age}</p>
            <p><span className="font-semibold">Mobile No.:</span> {formData.mobileNo}</p>
            <p><span className="font-semibold">Name of Doctor:</span> {formData.doctorName}</p>
            </div>
            <div className="space-y-3">
            <p><span className="font-semibold">Patient ID:</span> 1234567</p>
            <p><span className="font-semibold">Bill Date:</span> {formData.billDate}</p>
            <p><span className="font-semibold">Visit Time:</span> {formData.visitTime}</p>
            <p><span className="font-semibold">Visit Date:</span> {formData.visitDate}</p>
            <p><span className="font-semibold">Visit Location:</span> {formData.visitLocation}</p>
            </div>
            </div>

            {/* Gray Line Separator */}
            <div className="border-t border-gray-300 my-6"></div>

            {/* Table */}
            <div className="border border-[#CCCCCC] rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-black border-collapse">
              <thead className="bg-white">
              <tr>
                <th className="p-3 border font-medium">Purpose</th>
                <th className="p-3 border font-medium">Fees</th>
                <th className="p-3 border font-medium">Payment Mode</th>
                <th className="p-3 border font-medium">Total Amt.</th>
                <th className="p-3 border font-medium">Discount</th>
                <th className="p-3 border font-medium">Paid Amt.</th>
                <th className="p-3 border font-medium">Outstanding Amt.</th>
              </tr>
              </thead>
              <tbody>
              {paymentDetails.map((payment, index) => {
                const totalBill = parseFloat(payment.totalBill) || 0;
                const discount = parseFloat(payment.totalDiscount) || 0;
                const paidAmt = parseFloat(payment.amountPaid) || 0;
                const outstandingAmount = (totalBill - discount - paidAmt).toFixed(2);

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border">Appointment Billing</td>
                    <td className="p-3 border">{totalBill.toFixed(2)}</td>
                    <td className="p-3 border">{payment.paymentMethod}</td>
                    <td className="p-3 border">{totalBill.toFixed(2)}</td>
                    <td className="p-3 border">{discount.toFixed(2)}</td>
                    <td className="p-3 border">{paidAmt.toFixed(2)}</td>
                    <td className="p-3 border">{outstandingAmount}</td>
                  </tr>
                );
              })}
              </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <div className="text-right space-y-2 mt-6">
            <p className="text-lg">
            <span className="font-semibold">Total Amt:</span>{" "}
            {paymentDetails[0]?.totalBill || "0.00"}
            </p>
            <p className="text-lg">
            <span className="font-semibold">Received:</span>{" "}
            {paymentDetails[0]?.amountPaid || "0.00"}
            </p>
            <p className="text-lg">
            <span className="font-semibold">Balance:</span>{" "}
            {(
              parseFloat(paymentDetails[0]?.totalBill || "0") -
              parseFloat(paymentDetails[0]?.totalDiscount || "0") -
              parseFloat(paymentDetails[0]?.amountPaid || "0")
            ).toFixed(2)}
           </p>
           </div>

           {/* Gray Line Separator */}
           <div className="border-t border-gray-300 my-6"></div>

           {/* Footer */}
           <div className="space-y-4">
           <p>
            <span className="font-normal">Received With Thanks From:</span><br />
            {formData.patientName} an amount of Rs. {" "}
            <span className="font-normal">{paymentDetails[0]?.amountPaid || "0.00"}</span> only.
           </p>
           <p><span className="font-normal">Payment Mode:</span> {formData.paymentMode}</p>
           <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <p><span className="font-normal">Bill Generated Time:</span> {formData.billGeneratedTime}</p>
            </div>
            <div>
              <p><span className="font-normal">Received By:</span> {formData.receivedBy}</p>
              <p><span className="font-normal">For</span> {formData.company}</p>
            </div>
          </div>
          <p className="mt-6"><span className="font-semibold">**Please bring this slip during entry</span></p>
          <p><span className="font-semibold text-black underline">Donations are exempted from Income Tax U/S 8OG of Income Tax Act 1961</span></p>
          </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-start mt-4">
          <button
          onClick={handlePrint}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
          Print
          </button>
          </div>
      </div>
    </div>
    )}
   </div>                
    );
};

export default Page;