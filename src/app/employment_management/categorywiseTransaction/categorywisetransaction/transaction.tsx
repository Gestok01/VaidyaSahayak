"use client";
import React, { useState, useMemo, useRef } from 'react';
import Image from "next/image";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import paymentData from '@/assets/transactions.json';
import Pagination from "../../../components/Pagination";
import SEARCH_SVG from '@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';

const Page = () => {
    const tableHeadings = ["BILL GROUP", "DATE", "CASH", "CARD", "REFUND"];
    const [dateFilter, setdateFilter] = useState('');

    const filteredData = useMemo(() => {
        return paymentData.filter(item => {
            const matchesdate = item.date?.toString().includes(dateFilter);
            return matchesdate;
        });
    }, [paymentData, dateFilter]);

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
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Category wise Transaction of Employee Search</span>
                <span className="text-[#4D4D4D] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Category wise Transaction of Employee</span>
            </div>

            {/* Filter */}
            <div className="flex justify-end items-center gap-4 w-full mb-8">
                <div className="flex items-center gap-4">

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
                    </span>
                    <input
                        className="pl-10 pr-3 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FB009C] focus:border-transparent shadow-sm placeholder-[#4D4D4D] transition duration-300"
                        type="text"
                        placeholder="DD-MM-YYYY"
                        value={dateFilter}
                        onChange={(e) => setdateFilter(e.target.value)}
                    />
                </div>
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
                                        {heading === "DATE" && (
                                            <button className="ml-1">
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {currentItems.map((bill, index) => (
                            <tr key={index} className="border-b border-[#999999] bg-white">
                                <td className="p-3 text-[12px] text-[#000000]">{bill.billGroup || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.date || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.cash || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.card || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.refund || 'N/A'}</td>
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
            </div>
    )};

export default Page;