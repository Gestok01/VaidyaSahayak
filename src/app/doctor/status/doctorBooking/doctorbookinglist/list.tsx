import React from 'react';
import Image from "next/image";
import UPLOAD from '@/assets/svg/arrow_upload_progress_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import paymentData from '@/assets/doctor_bookingstatus.json';
import Pagination from "../../../../components/Pagination";

const Page = () => {
    const tableHeadings = ["DOCTOR ID", "DOCTOR NAME", "APPOINTMENT DATE", "TOTAL BOOKING", "CONFIRMED BOOKING"];
    
    return (
        <div className="relative" style={{ width: '100%', minHeight: '100vh' }}>
            {/* Breadcrumb */}
            <div 
                className="absolute flex items-center gap-2"
                style={{
                    width: '963px',
                    top: '52px',
                    left: '42px'
                }}
            >
                <Image 
                    src={UPLOAD} 
                    alt="Upload icon" 
                    width={20} 
                    height={20} 
                    className="mr-1"
                />
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Status</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Doctor Booking Status</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Search</span>
                <span className="text-[#4D4D4D] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Doctor Booking Status List</span>
            </div>

            {/* Table */}
            <div 
                className="absolute bg-white rounded-xl overflow-x-auto shadow-md border border-[#999999]"
                style={{
                    width: 'calc(100% - 84px)',
                    top: '156px',
                    left: '42px',
                    right: '42px'
                }}
            >
                <div className="relative">
                    <div className="flex justify-between items-center bg-gray-50 px-6 py-2">
                        <span className="font-inter">Booking Status</span>
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
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {paymentData.map((bill, index) => (
                            <tr key={index} className="border-b border-[#999999] bg-white">
                                <td className="p-3 text-[12px] text-[#000000]">{bill.doctorId || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.doctorName || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.appointmentDate || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.totalBooking || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.confirmedBooking || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* Pagination */}
                <div className="justify-end pr-1"
                style={{
                    width: 'calc(100% - 84px)',
                    top: 'calc(236px + 100%)', 
                    left: '42px',
                    paddingTop: '820px'
                }}>
                    <Pagination />
                </div>
            
        </div>
    );
};

export default Page;