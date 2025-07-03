import React from 'react';
import Image from "next/image";
import UPLOAD from '@/assets/svg/arrow_upload_progress_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import ARROW_UP from '@/assets/svg/arrow_drop_up_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg';
import paymentData from '@/assets/doctor_daywisepayment.json';
import Pagination from "../../../../components/Pagination";

const page = () => {
    const tableHeadings = ["DOCTOR ID", "DOCTOR NAME", "TOTAL DOCTOR CUT", "TOTAL CLINIC CUT", "TOTAL PAYMENT"];
    
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
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Doctor Payment Status</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Day Wise Payment</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Search By Date</span>
                <span className="text-[#4D4D4D] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">List</span>
            </div>

            {/* Total Clinic Income */}
            <div 
                className="absolute rounded-lg border"
                style={{
                    width: '460px',
                    height: '105px',
                    top: '100px',
                    left: '42px',
                    borderRadius: '8px',
                    border: '1px solid #98A2B3',
                    backgroundColor: '#FFFFFF',
                    padding: '16px'
                }}
            >
                <div className="flex flex-col h-full">
                    <div>
                        <div 
                            className="text-[#101828] font-semibold mb-1"
                            style={{
                                fontSize: '14px',
                                lineHeight: '14px'
                            }}
                        >
                            Total Clinic Income
                        </div>
                        <div 
                            className="text-[#B3DB8A] font-semibold"
                            style={{
                                fontSize: '20px',
                                lineHeight: '20px'
                            }}
                        >
                            ₹25,000/-
                        </div>
                    </div>
                    <div 
                        className="w-full my-2"
                        style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #98A2B3 49.93%, #FFFFFF 100%)'
                        }}
                    />
                    <div className="flex justify-between items-end flex-grow">
                        <div className="flex items-center">
                            <span 
                                className="text-[#12B76A] font-medium mr-1"
                                style={{
                                    fontSize: '11px',
                                    lineHeight: '11px'
                                }}
                            >
                                Up 20%
                            </span>
                            <Image 
                                src={ARROW_UP} 
                                alt="Up arrow" 
                                width={15} 
                                height={15}
                            />
                        </div>
                        <span 
                            className="text-[#4D4D4D] font-medium"
                            style={{
                                fontSize: '11px',
                                lineHeight: '11px'
                            }}
                        >
                            (25/02/2025)
                        </span>
                    </div>
                </div>
            </div>

            {/* Doctor Payment Due */}
            <div 
                className="absolute rounded-lg border"
                style={{
                    width: '460px',
                    height: '105px',
                    top: '100px',
                    left: '518px',
                    borderRadius: '8px',
                    border: '1px solid #98A2B3',
                    backgroundColor: '#FFFFFF',
                    padding: '16px'
                }}
            >
                <div className="flex flex-col h-full">
                    <div>
                        <div 
                            className="text-[#101828] font-semibold mb-1"
                            style={{
                                fontSize: '14px',
                                lineHeight: '14px'
                            }}
                        >
                            Doctor Payment Due
                        </div>
                        <div 
                            className="text-[#B3DB8A] font-semibold"
                            style={{
                                fontSize: '20px',
                                lineHeight: '20px'
                            }}
                        >
                            ₹25,000/-
                        </div>
                    </div>
                    <div 
                        className="w-full my-2"
                        style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #98A2B3 49.93%, #FFFFFF 100%)'
                        }}
                    />
                    <div className="flex justify-between items-end flex-grow">
                        <div className="flex items-center">
                            <span 
                                className="text-[#12B76A] font-medium mr-1"
                                style={{
                                    fontSize: '11px',
                                    lineHeight: '11px'
                                }}
                            >
                                Up 20%
                            </span>
                            <Image 
                                src={ARROW_UP} 
                                alt="Up arrow" 
                                width={15} 
                                height={15}
                            />
                        </div>
                        <span 
                            className="text-[#4D4D4D] font-medium"
                            style={{
                                fontSize: '11px',
                                lineHeight: '11px'
                            }}
                        >
                            (25/02/2025)
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div 
                className="absolute bg-white rounded-xl overflow-x-auto shadow-md border border-[#999999]"
                style={{
                    width: 'calc(100% - 84px)',
                    top: '240px',
                    left: '42px',
                    right: '42px'
                }}
            >
                <div className="relative">
                    <div className="flex justify-between items-center bg-gray-50 px-6 py-2">
                        <span className="font-inter">Payment Details</span>
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
                                <td className="p-3 text-[12px] text-[#000000]">{bill.doctorCut || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.clinicCut || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.totalPayment || 'N/A'}</td>
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

export default page;