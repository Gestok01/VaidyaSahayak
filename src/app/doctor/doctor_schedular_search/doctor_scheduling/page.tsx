"use client";
import React, { useState } from "react";
import CANCEL_SVG from '@/assets/svg/block_24dp_FF94D6_FILL0_wght400_GRAD0_opsz24.svg'
import Image from "next/image";
import EDIT_SVG from '@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import SORT_ICON_WHITE from "@/assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";
import DynamicTable from "@/app/components/DynamicTable";
import DOCTOR_SCHEDULING_LIST from "@/assets/doctor_scheduling_list.json";
import Link from "next/link";
import Pagination from "@/app/components/Pagination";

const Page = () => {
  const [editModeOn,setEditModeOn] = useState(false);
    const [editableSlNo, 
      setEditableSlNo] = useState(null)
  const page_main_name = "Doctor";
  const page_second_name = "Search";
  const page_third_name = "Doctor Scheduling";

  const [sortNameActive, setSortNameActive] = useState(false);
  const [sortByDayActive, setSortByDayActive] = useState(false);
  const [appliedDays, setAppliedDays] = useState([]);

  

  const handleDayAdd = (day) => {
    if (appliedDays.indexOf(day) === -1) {
      setAppliedDays([...appliedDays, day]); 
    } else {
      const afterRemoveDay = appliedDays.filter((item) => item !== day);
      setAppliedDays(afterRemoveDay); 
    }
  };
  


  const tableHeadings = [
    "ID NO",
    "DOCTOR NAME",
    "WORKING DAYS",
    "START TIME",
    "END TIME",
  ];

  return (
    <div className="px-4 rounded-lg ">
      {/* Page Header */}
      <h2 className="text-2xl font-semibold flex gap-1 my-6">
        <div className="flex gap-2">
          <div className="flex gap-2 text-neutral-400">
            <span>{page_main_name}</span>
            <span>{` > `}</span>
          </div>
          <div className="flex text-slate-700 hover:cursor-pointer">
            <Link href="/doctor/doctor_schedular_search">{page_second_name}</Link>
          </div>
          {page_third_name.length > 0 && (
            <div className="flex gap-2 text-slate-700 hover:cursor-pointer">
              {` > `}
              <span>{page_third_name}</span>
            </div>
          )}
        </div>
      </h2>

      {/* Sorting Buttons */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-3">
          {/* Sort By Name Button */}
          <button
            onClick={() => {
              setSortByDayActive(false);
              setSortNameActive((prev) => !prev);
            }}
            className={`${
              sortNameActive
                ? "bg-pink-500 text-white border-white border-2"
                : "bg-white text-pink-600 border-b-2 border-x-[1px] border-pink-600"
            } px-3 py-1 rounded-lg text-sm flex items-center hover:border-2 transition duration-300 transform h-8`}
            aria-label="Sort By Name"
          >
            <Image
              src={sortNameActive ? SORT_ICON_WHITE : SORT_ICON_PINK}
              width={20}
              height={20}
              alt="Sort Icon"
              className="mr-2"
            />
            Sort By Name
          </button>

          {/* Sort By Day Button */}
          <button
            onClick={() => {
              setSortNameActive(false);
              setSortByDayActive((prev) => !prev);
            }}
            className={`${
              sortByDayActive
                ? "bg-pink-500 text-white border-white border-2"
                : "bg-white text-pink-600 border-b-2 border-x-[1px] border-pink-600"
            } px-3 py-1 rounded-lg text-sm flex items-center hover:border-2 transition duration-300 transform h-8`}
            aria-label="Sort By Day"
          >
            <Image
              src={!sortByDayActive ? SORT_ICON_PINK : SORT_ICON_WHITE}
              width={20}
              height={20}
              alt="Sort Icon"
              className="mr-2"
            />
            Sort By Day
          </button>

          {
  appliedDays.map((d) => (
    <button
      key={d}
     
      className="bg-white text-neutral-400 border-neutral-500 border-2 px-3 py-1 rounded-lg text-sm flex items-center justify-between hover:border-2 transition duration-300 transform h-8 min-w-[100px]"
      aria-label={`Remove ${d}`}
    >
      <span>{d}</span>
      <span  onClick={() => {
        setAppliedDays((prevDays) => prevDays.filter((day) => day !== d));
      }} className="ml-2 text-2xl font-bold cursor-pointer flex items-center transform hover:scale-110">&times;</span>
    </button>
  ))
}


          {/* Day Selection Dropdown */}
          {sortByDayActive && (
            <div className="absolute left-44 mt-9 bg-white border border-pink-500 shadow-lg rounded-md p-3 w-[180px]">
              <div className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <label
                  for="days"
                    key={day}
                    onClick={() => handleDayAdd(day)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                    name="days"
                      type="checkbox"
                      checked={appliedDays.includes(day)}
                      readOnly
                      className="w-4 h-4 border-2 border-gray-300 checked:bg-pink-500 checked:border-transparent"
                    />
                    <span className="text-gray-800">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Component */}
     
              
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-300 shadow-lg rounded-xl ">
              <div
              
               className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md  border-gray-200">
                              <span className="font-semibold text-xs font-normal">All appointments (25-09-2025)</span>
                            {
                              editModeOn === false ?   <button
                              onClick={()=>{setEditModeOn(true)}}
                               className="flex gap-2 items-center text-sm font-medium  transition duration-300 ">
                              Edit Payment Status
                              <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
                            </button> :   <button
                            onClick={()=>{setEditModeOn(false); setEditableSlNo(null)}}
                            className="flex gap-2 items-center text-sm font-medium  transition duration-300 ">
                                Cancel
                                <Image src={CANCEL_SVG} width={18} height={18} alt="edit" />
                              </button>
                            }
              
                            </div>
              <div>
              <DynamicTable
               editableSlNo={editableSlNo}
               setEditableSlNo={setEditableSlNo}
              isEditModeOn={editModeOn}
        containBill={false}
        tableDataKeys={Object.keys(DOCTOR_SCHEDULING_LIST[0])}
        tableHeadings={tableHeadings}
        tableData={DOCTOR_SCHEDULING_LIST}
      />
              </div>
         
            </div>
      <Pagination />
    </div>
    
  );
};

export default Page;