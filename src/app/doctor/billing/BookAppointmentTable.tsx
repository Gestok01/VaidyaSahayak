import React from "react";
import SORT_ICON_WHITE from "../../../assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24 (2).svg";
import SEARCH_SVG from "../../../assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EDIT_SVG from "../../../assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import DOCTOR_APPOINTMENT_LIST from "../../../assets/doctor_appointment_list.json";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";

const BookAppointmentTable = () => {
  const heading = "DOCTOR > BOOK APPOINTMENT";
  const tableHeadings = [
    "BILL ID",
    "PATIENT NAME",
    "PHONE NUMBER",
    "DOCTOR_NAME",
    "DATE",
    "",
  ]; 
  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold text-gray-800 my-4">{heading}</h2>

      {/* Sorting and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-pink-600 flex items-center text-white rounded-lg hover:bg-pink-500 transition duration-300 transform hover:scale-105">
            <span className="w-4 h-4 mr-2">
              <Image src={SORT_ICON_WHITE} width={18} height={18} alt="sort" />
            </span>{" "}
            Sort High-Low
          </button>
          <button className="px-3 py-1 text-sm bg-white flex items-center text-pink-600 rounded-lg border border-pink-400 hover:bg-pink-50 transition duration-300 transform hover:scale-105">
            <span className="w-4 h-4 mr-2">
              <Image src={SORT_ICON_PINK} width={18} height={18} alt="sort" />
            </span>{" "}
            Sort Low-High
          </button>
        </div>
        <div className="relative w-64">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Image src={SEARCH_SVG} width={18} height={18} alt="search" />
          </span>
          <input
            className="border border-gray-300 rounded-lg pl-10 pr-3 py-1 w-full focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-300"
            type="text"
            placeholder="Search Test Name..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-300">
        <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-b border-gray-200">
          <span className="font-semibold">Rate Chart</span>
          <button className="flex items-center text-pink-600 transition duration-300 hover:text-pink-500">
            Edit
            <Image src={EDIT_SVG} width={12} height={18} alt="edit" />
          </button>
        </div>
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#E8F4DC] text-left">
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    className="p-3 text-sm font-semibold text-gray-700 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DOCTOR_APPOINTMENT_LIST.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3 text-sm text-gray-700">{data.billId}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {data.patientName}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {data.phoneNumber}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {data.doctorName}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {data.appointmentDate}
                  </td>

                  <td className="p-3 text-sm text-gray-700">
                    <img
                      className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                      // src="https://img.icons8.com/material-two-tone/24/bill.png"
                      src="\bill-logo.png"
                      alt="bill"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default BookAppointmentTable;
