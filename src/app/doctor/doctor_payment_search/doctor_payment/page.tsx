"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import USER_AVATAR from "@/assets/svg/Avatar.svg";
import CalenderSvg from "@/assets/svg/calendar_today_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import DoctorPaymentTable from "./DoctorPaymentTable";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";
import Link from "next/link";
import DoctorPaymentInfoCard from "./DoctorPaymentInfoCard";

import Pagination from "@/app/components/Pagination";

const Page = () => {
  const page_main_name = "Doctor";
  const page_second_name = "Doctor's Payment Search";
  const page_third_name = "Doctor's Appointment";

  const pmntBoxRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLButtonElement>(null);
  const doctorSelectRef = useRef<HTMLSelectElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [doctor, setDoctor] = useState("Select Doctor");
  const [isPmntOpen, setIsPmntOpen] = useState(false);
  const [calendarBoxOpen, setIsCalendarBoxOpen] = useState(false);
  const [doctorStatusBox, setDoctorStatusBox] = useState(false);

  const handleCalendarClick = () => {
    setIsPmntOpen(false);
    setIsCalendarBoxOpen(!calendarBoxOpen);
    setDoctorStatusBox(false);
    if (dateInputRef.current) {
      if (!calendarBoxOpen) {
        dateInputRef.current.showPicker();
      } else {
        document.body.click();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pmntBoxRef.current &&
        !pmntBoxRef.current.contains(event.target as Node) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target as Node)
      ) {
        setIsCalendarBoxOpen(false);
        setDoctorStatusBox(false);
        setIsPmntOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen px-6">
      {/* Breadcrumb Section */}
      <h2 className="text-xl font-semibold flex gap-1 my-6">
        <div className="flex gap-2">
          <div className="flex gap-2 text-[#999999]">
            <span>{page_main_name}</span>
            <span>{` > `}</span>
          </div>
          <div className="flex text-[#4D4D4D] hover:cursor-pointer">
            <Link href="/doctor/doctor_payment_search">{page_second_name}</Link>
          </div>
          {page_third_name.length > 0 && (
            <div className="flex gap-2 text-[#4D4D4D] hover:cursor-pointer">
              {` > `}
              <span>{page_third_name}</span>
            </div>
          )}
        </div>
      </h2>

      {/* Doctor Info and Transactions Section */}
      <div className="flex my-auto h-36 bg-white rounded-lg shadow-sm border border-[#999999]">
        {/* Doctor Info */}
        <div className="w-[21%] p-[16px] gap-[5px]">
          <div className="flex items-center gap-3">
            <Image src={USER_AVATAR} alt="userImg" width={20} height={20} />
            <div>
              <h1 className="text-[11px] font-semibold">Dr. Lorem Ipsum</h1>
              <p className="text-[10px] text-gray-600">loremipsum@nexus.com</p>
            </div>
          </div>
          <div className="mt-4 text-[11px] flex flex-col gap-[9px]">
            <div className="flex justify-between">
              <span className="font-medium text-[#1A1A1A]">Visiting Days:</span>
              <span className="font-normal text-[#1A1A1A]">
                Monday, Tuesday, Friday
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1A1A1A]">
                Total Visiting Days:
              </span>
              <span className="font-normal text-[#1A1A1A]">
                20 (September, 2024)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1A1A1A]">
                Specialization:
              </span>
              <span className="font-normal text-[#1A1A1A]">Lorem Ipsum</span>
            </div>
          </div>
        </div>

        {/* Daily Transactions */}
        <div className="w-[79%] border-l border-[#CCCCCC]">
          <div className="flex px-3 justify-between font-semibold p-2">
            <span className="text-[11px] ">Daily Transactions</span>
            <div className="flex gap-1">
              <span className="text-[11px]">Invoice Print</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3327 4.66667V2.16667H5.66602V4.66667H3.99935V0.5H13.9993V4.66667H12.3327ZM13.9993 8.41667C14.2355 8.41667 14.4334 8.33681 14.5931 8.17708C14.7528 8.01736 14.8327 7.81944 14.8327 7.58333C14.8327 7.34722 14.7528 7.14931 14.5931 6.98958C14.4334 6.82986 14.2355 6.75 13.9993 6.75C13.7632 6.75 13.5653 6.82986 13.4056 6.98958C13.2459 7.14931 13.166 7.34722 13.166 7.58333C13.166 7.81944 13.2459 8.01736 13.4056 8.17708C13.5653 8.33681 13.7632 8.41667 13.9993 8.41667ZM12.3327 13.8333V10.5H5.66602V13.8333H12.3327ZM13.9993 15.5H3.99935V12.1667H0.666016V7.16667C0.666016 6.45833 0.909071 5.86458 1.39518 5.38542C1.88129 4.90625 2.47157 4.66667 3.16602 4.66667H14.8327C15.541 4.66667 16.1348 4.90625 16.6139 5.38542C17.0931 5.86458 17.3327 6.45833 17.3327 7.16667V12.1667H13.9993V15.5ZM15.666 10.5V7.16667C15.666 6.93056 15.5862 6.73264 15.4264 6.57292C15.2667 6.41319 15.0688 6.33333 14.8327 6.33333H3.16602C2.9299 6.33333 2.73199 6.41319 2.57227 6.57292C2.41254 6.73264 2.33268 6.93056 2.33268 7.16667V10.5H3.99935V8.83333H13.9993V10.5H15.666Z"
                  fill="#D11288"
                />
              </svg>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#FB009C] to-[#B3DB8A]"></div>
          <div className="mt-2 flex ml-1.5">
            <DoctorPaymentInfoCard
              date={"25/02/2025"}
              cardHeading="Total Amount"
              number="₹25,000/-"
              stats={{ trend: "Up", percentage: "20" }}
            />
            <DoctorPaymentInfoCard
              date={"25/02/2025"}
              cardHeading="Doctor's Pending Amount"
              number="₹25,000/-"
              stats={{ trend: "Up", percentage: "20" }}
            />
            <DoctorPaymentInfoCard
              date={"25/02/2025"}
              cardHeading="Number of Appointments"
              number="25"
              stats={{ trend: "Up", percentage: "20" }}
            />
          </div>
        </div>
      </div>

      {/* Payment Status and Filters Section */}
      <div className="w-full my-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center relative">
          <div className="w-[169px]">
            <button
              ref={pmntBoxRef}
              onClick={() => {
                setIsPmntOpen(!isPmntOpen);
                setIsCalendarBoxOpen(false);
              }}
              className={`${
                isPmntOpen
                  ? "bg-pink-500 text-white border-white border-2"
                  : " border border-b-[#FB009C] shadow-sm shadow-[#FB009C]/90"
              } px-3 py-1 rounded-lg text-[13px] text-[#D11288] font-semibold flex items-center hover:border-2 transition duration-300 transform`}
              aria-label="Status"
              aria-expanded={isPmntOpen}
            >
              <Image
                src={SORT_ICON_PINK}
                width={18}
                height={18}
                alt="Sort Icon"
                className="mr-2"
              />
              Payment Status
            </button>
            {isPmntOpen && (
              <div className="absolute left-0 mt-2 bg-white border-pink-600 border-b-2 border-x-[1px] hover:border-2 p-2 w-[150px] shadow-md rounded-md z-10">
                {["pending", "completed"].map((status, idx) => (
                  <label key={idx} className="block">
                    <input type="checkbox" className="mr-2" />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              ref={calendarRef}
              onClick={handleCalendarClick}
              className={`${"bg-white text-[#4D4D4D] rounded-lg border border-[#999999]"} px-3 py-2 text-[11px] flex items-center hover:border-2 hover:cursor-pointer transition duration-300 transform w-[260px] justify-between`}
              aria-label="Calendar"
              aria-expanded={calendarBoxOpen}
            >
              <span>dd-mm-yyyy</span>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10C9.28333 10 9.52083 10.0958 9.7125 10.2875C9.90417 10.4792 10 10.7167 10 11C10 11.2833 9.90417 11.5208 9.7125 11.7125C9.52083 11.9042 9.28333 12 9 12ZM5 12C4.71667 12 4.47917 11.9042 4.2875 11.7125C4.09583 11.5208 4 11.2833 4 11C4 10.7167 4.09583 10.4792 4.2875 10.2875C4.47917 10.0958 4.71667 10 5 10C5.28333 10 5.52083 10.0958 5.7125 10.2875C5.90417 10.4792 6 10.7167 6 11C6 11.2833 5.90417 11.5208 5.7125 11.7125C5.52083 11.9042 5.28333 12 5 12ZM13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10C13.2833 10 13.5208 10.0958 13.7125 10.2875C13.9042 10.4792 14 10.7167 14 11C14 11.2833 13.9042 11.5208 13.7125 11.7125C13.5208 11.9042 13.2833 12 13 12ZM9 16C8.71667 16 8.47917 15.9042 8.2875 15.7125C8.09583 15.5208 8 15.2833 8 15C8 14.7167 8.09583 14.4792 8.2875 14.2875C8.47917 14.0958 8.71667 14 9 14C9.28333 14 9.52083 14.0958 9.7125 14.2875C9.90417 14.4792 10 14.7167 10 15C10 15.2833 9.90417 15.5208 9.7125 15.7125C9.52083 15.9042 9.28333 16 9 16ZM5 16C4.71667 16 4.47917 15.9042 4.2875 15.7125C4.09583 15.5208 4 15.2833 4 15C4 14.7167 4.09583 14.4792 4.2875 14.2875C4.47917 14.0958 4.71667 14 5 14C5.28333 14 5.52083 14.0958 5.7125 14.2875C5.90417 14.4792 6 14.7167 6 15C6 15.2833 5.90417 15.5208 5.7125 15.7125C5.52083 15.9042 5.28333 16 5 16ZM13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15C12 14.7167 12.0958 14.4792 12.2875 14.2875C12.4792 14.0958 12.7167 14 13 14C13.2833 14 13.5208 14.0958 13.7125 14.2875C13.9042 14.4792 14 14.7167 14 15C14 15.2833 13.9042 15.5208 13.7125 15.7125C13.5208 15.9042 13.2833 16 13 16Z"
                  fill="#D11288"
                />
              </svg>
            </button>
            <input
              onChange={() => {
                setIsCalendarBoxOpen(false);
              }}
              ref={dateInputRef}
              type="date"
              className="opacity-0 w-0 absolute top-2 text-[#4D4D4D] rounded-lg border border-[#999999] px-3 py-2 text-xs "
              aria-hidden="true"
            />
            <select
              ref={doctorSelectRef}
              onClick={() => {
                setIsCalendarBoxOpen(false);
                setIsPmntOpen(false);
                setDoctorStatusBox(!doctorStatusBox);
              }}
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="p-1 w-[260px] text-[#4D4D4D] text-[11px] hover:border-2 rounded-md h-9 border border-[#999999] "
              aria-label="Select Doctor"
            >
              <option>Doctor's name</option>
              <option>Doctor 1</option>
              <option>Doctor 2</option>
              <option>Doctor 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Payment Table */}

      <DoctorPaymentTable />
      <Pagination />
    </div>
  );
};

export default Page;
