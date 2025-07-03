"use client";
import React, { useState, useMemo, useRef } from 'react';
import Image from "next/image";
import { X } from "lucide-react";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import BREAK_ICON from '@/assets/svg/arrow_upload_progress_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg'; 
import paymentData from '@/assets/employement_management.json';
import Pagination from "../../../components/Pagination";
import SEARCH_SVG from '@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import DATE_SVG from '@/assets/svg/calendar_today_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';

interface BreakDetail {
    date: string;
    startTime: string;
    endTime: string;
    totalTime: string;
  }  

const Page = () => {
    const tableHeadings = ["EMPLOYEE ID", "EMPLOYEE NAME", "DATE", "IP ADDRESS", "LOGIN TIME", "LOGOUT TIME", "TOTAL WORKING HOUR", "SESSION ID", "TOTAL BREAK"];
    
    const [employeeIdFilter, setEmployeeIdFilter] = useState('');
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const fromDateInputRef = useRef<HTMLInputElement>(null);
    const toDateInputRef = useRef<HTMLInputElement>(null);

    const [showBreakModal, setShowBreakModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<{
      name: string;
      date: string;
      loginTime: string;
      logoutTime: string;
    } | null>(null);
    const [breakDetails, setBreakDetails] = useState<BreakDetail[]>([]);

    const generateBreakDetails = (employee: any) => {
      if (!employee.loginTime || !employee.logoutTime) return [];
      
      const loginTime = new Date(`2000-01-01T${employee.loginTime}`);
      const logoutTime = new Date(`2000-01-01T${employee.logoutTime}`);
      
      const totalMinutes = (logoutTime.getTime() - loginTime.getTime()) / (1000 * 60);
      
      const breakCount = Math.floor(Math.random() * 3) + 3;
      const breaks: BreakDetail[] = [];
      
      let lastBreakEnd = loginTime;
      
      for (let i = 0; i < breakCount; i++) {
        const breakDuration = Math.floor(Math.random() * 16) + 5;

        if (lastBreakEnd.getTime() >= logoutTime.getTime()) break;

        const gapBeforeBreak = i === 0 ? 0 : Math.floor(Math.random() * 46) + 15;
        const breakStart = new Date(lastBreakEnd.getTime() + gapBeforeBreak * 60000);
        
        if (breakStart.getTime() >= logoutTime.getTime()) break;
        
        const breakEnd = new Date(breakStart.getTime() + breakDuration * 60000);
        if (breakEnd.getTime() > logoutTime.getTime()) {
          breakEnd.setTime(logoutTime.getTime());
        }
        
        breaks.push({
          date: employee.date,
          startTime: breakStart.toTimeString().substring(0, 5),
          endTime: breakEnd.toTimeString().substring(0, 5),
          totalTime: `${breakDuration} mins`
        });
        
        lastBreakEnd = breakEnd;
      }
      
      return breaks;
    };

    const handleBreakClick = (employee: any) => {
      setSelectedEmployee({
        name: employee.employeeName,
        date: employee.date,
        loginTime: employee.loginTime,
        logoutTime: employee.logoutTime
      });
      setBreakDetails(generateBreakDetails(employee));
      setShowBreakModal(true);
    };

    const formatDisplayDate = (dateString: string | null) => {
        if (!dateString) return "dd/mm/yy";
        return dateString;
    };

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        if (date) {
            const [year, month, day] = date.split('-');
            setFromDate(`${day}/${month}/${year}`);
        } else {
            setFromDate(null);
        }
        setActiveDropdown(null);
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        if (date) {
            const [year, month, day] = date.split('-');
            setToDate(`${day}/${month}/${year}`);
        } else {
            setToDate(null);
        }
        setActiveDropdown(null);
    };

    const normalizeDate = (dateString: string) => {
        if (!dateString) return '';
        const parts = dateString.split(/[\/-]/);
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        }
        return dateString;
    };

    const filteredData = useMemo(() => {
        return paymentData.filter(item => {
            const matchesEmployeeId = item.employeeId?.toString().includes(employeeIdFilter);
            
            const itemDate = normalizeDate(item.date);
            const fromDateNormalized = fromDate ? normalizeDate(fromDate) : null;
            const toDateNormalized = toDate ? normalizeDate(toDate) : null;
            
            let dateMatch = true;
            if (fromDateNormalized && toDateNormalized) {
                dateMatch = itemDate >= fromDateNormalized && itemDate <= toDateNormalized;
            } else if (fromDateNormalized) {
                dateMatch = itemDate >= fromDateNormalized;
            } else if (toDateNormalized) {
                dateMatch = itemDate <= toDateNormalized;
            }
            
            return matchesEmployeeId && dateMatch;
        });
    }, [paymentData, employeeIdFilter, fromDate, toDate]);

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
                <span className="text-[#999999] text-2xl font-semibold whitespace-nowrap">Login Report</span>
                <span className="text-[#999999] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Search</span>
                <span className="text-[#4D4D4D] text-2xl whitespace-nowrap">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold whitespace-nowrap">Login Report List</span>
            </div>

            {/* Filter */}
            <div className="flex justify-between items-center gap-4 w-full mb-8">
                <div className="flex items-center gap-4">
                    {/* From Date */}
                    <div className="relative flex items-center gap-2">
                        <button
                            onClick={() => {
                                setActiveDropdown(activeDropdown === 'fromDate' ? null : 'fromDate');
                                if (fromDateInputRef.current) {
                                    fromDateInputRef.current.showPicker();
                                }
                            }}
                            className={`${
                                fromDate
                                ? "bg-pink-600 text-white border-white border-2"
                                : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
                            } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
                            aria-label="From Date"
                        >
                            <Image
                                src={DATE_SVG}
                                width={20}
                                height={20}
                                alt="Calendar Icon"
                                className="mr-2"
                            />
                            <span>From Date</span>
                        </button>
                        
                        {fromDate && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                                <span className="text-[14px] text-[#999999]">
                                    {formatDisplayDate(fromDate)}
                                </span>
                                <button
                                    onClick={() => {
                                        setFromDate(null);
                                        if (fromDateInputRef.current) {
                                            fromDateInputRef.current.value = '';
                                        }
                                    }}
                                    className="text-black hover:text-pink-500"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        
                        <input
                            type="date"
                            ref={fromDateInputRef}
                            className="absolute opacity-0 w-0 h-0"
                            onChange={handleFromDateChange}
                        />
                    </div>

                    {/* To Date */}
                    <div className="relative flex items-center gap-2">
                        <button
                            onClick={() => {
                                setActiveDropdown(activeDropdown === 'toDate' ? null : 'toDate');
                                if (toDateInputRef.current) {
                                    toDateInputRef.current.showPicker();
                                }
                            }}
                            className={`${
                                toDate
                                ? "bg-pink-600 text-white border-white border-2"
                                : "bg-white text-pink-600 rounded-lg border-b-2 border-x-[1px] border-pink-600"
                            } px-3 py-1 text-sm flex items-center hover:border-2 transition duration-300 transform`}
                            aria-label="To Date"
                        >
                            <Image
                                src={DATE_SVG}
                                width={20}
                                height={20}
                                alt="Calendar Icon"
                                className="mr-2"
                            />
                            <span>To Date</span>
                        </button>
                        
                        {toDate && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#999999]">
                                <span className="text-[14px] text-[#999999]">
                                    {formatDisplayDate(toDate)}
                                </span>
                                <button
                                    onClick={() => {
                                        setToDate(null);
                                        if (toDateInputRef.current) {
                                            toDateInputRef.current.value = '';
                                        }
                                    }}
                                    className="text-black hover:text-pink-500"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        
                        <input
                            type="date"
                            ref={toDateInputRef}
                            className="absolute opacity-0 w-0 h-0"
                            onChange={handleToDateChange}
                        />
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Image src={SEARCH_SVG} width={20} height={20} alt="search" />
                    </span>
                    <input
                        className="pl-10 pr-3 py-1 w-full text-[14px] bg-white flex items-center text-gray-600 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EA33F7] focus:border-transparent shadow-sm placeholder-[#4D4D4D] transition duration-300"
                        type="text"
                        placeholder="Employee ID"
                        value={employeeIdFilter}
                        onChange={(e) => setEmployeeIdFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl overflow-x-auto shadow-md border border-[#999999] w-full mb-4">
                <div className="relative">
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-2">
                        <span className="font-inter">Login Report</span>
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
                                <td className="p-3 text-[12px] text-[#000000]">{bill.employeeId || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.employeeName || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.date || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.ipAddress || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.loginTime || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.logoutTime || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.totalworkingHour || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000]">{bill.sessionId || 'N/A'}</td>
                                <td className="p-3 text-[12px] text-[#000000] flex items-center gap-1">
                                <button 
                                        onClick={() => handleBreakClick(bill)}
                                        className="ml-3 hover:opacity-70 transition-opacity"
                                    >
                                    <Image 
                                        src={BREAK_ICON} 
                                        alt="Break icon" 
                                        width={16} 
                                        height={16}
                                        className="ml-8"
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

            {showBreakModal && selectedEmployee && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
        <div className="bg-white w-full max-w-4xl shadow-lg p-6 overflow-y-auto max-h-full">
            {/* Header with close button */}
            <div className="flex justify-between items-center border-b mt-[22px] pb-3">
                <h2 className="text-xl font-semibold text-black text-[14px] leading-[100%]">Employee Name: {selectedEmployee.name}</h2>
                <button 
                    onClick={() => setShowBreakModal(false)}
                    className="text-gray-500 hover:text-gray-700 w-[14px] h-[14px] mt-[12px]"
                >
                    <X size={18} />
                </button>
            </div>
            
            {/* Employee Information Section */}
            <div className="mt-6 border border-[#CCCCCC] rounded-lg radius-[8px] w-full h-[817px]">
            <div className="mt-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[14px] leading-[100%] px-3">Break Details</h3>
            </div>

            {/* Break Details Table */}
            <div className="mt-6 border border-[#CCCCCC] rounded-lg overflow-hidden w-[800px] mx-auto">
            <h1 className="px-3 py-3 text-[#1A1A1A]">Break Details</h1>
            <div 
                        className="w-full"
                        style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, #FB009C 0%, #B3DB8A 100%)'
                        }}
                    />
                <table className="w-full">
                    <thead className="bg-[#E8F4DC]">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-700">DATE</th>
                            <th className="p-4 text-left font-semibold text-gray-700">START TIME</th>
                            <th className="p-4 text-left font-semibold text-gray-700">END TIME</th>
                            <th className="p-4 text-left font-semibold text-gray-700">TOTAL TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breakDetails.length > 0 ? (
                            breakDetails.map((breakItem, index) => (
                                <tr 
                                    key={index} 
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="p-4 text-gray-700">{breakItem.date}</td>
                                    <td className="p-4 text-gray-700">{breakItem.startTime}</td>
                                    <td className="p-4 text-gray-700">{breakItem.endTime}</td>
                                    <td className="p-4 text-gray-700">{breakItem.totalTime}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No break records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
        </div>
        </div>
            )};
            </div>
    )};

export default Page;