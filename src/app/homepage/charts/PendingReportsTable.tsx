import Image from "next/image";
import React from "react";

const PendingReportsTable = () => {
  const headings = ["BILL ID", "TEST NAME", "TEST GROUP", "DUE"];
  const values = ["XXXX", "LOREM IPSUM", "LOREM IPSUM", "DD-MM-YYYY"];

  return (
    <div className=" bg-white rounded-md shadow-sm mms:w-30% md:w-[100%] lg:w-1/2 mms:ml-1.5 md:ml-2 lg:ml-1 2xl:ml-1.5 mr-1 my-1 mms:h-[385px] md:h-[334.5px] lg:h-[327px] xl:h-[333px] 2xl:h-[333px] border border-[#98A2B3]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <span className=" mms:text-[7px] md:text-xs lg:text-[10px] xl:text-[11px] 2xl:text-xs font-semibold text-[#1A1A1A] px-3 py-2">
          Pending Report
        </span>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 pr-4 rounded">
          <span className="mms:text-[7px] md:text-xs lg:text-[10px] xl:text-[11px] 2xl:text-xs font-semibold pr-1">
            Filter
          </span>
          <svg
            className="mms:w-2 md:w-4 lg:w-2.5 xl:w-3 2xl:w-4 mms:h-2 md:h-4 lg:h-2.5 xl:h-3 2xl:h-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.16667 15.5V10.5H8.83333V12.1667H15.5V13.8333H8.83333V15.5H7.16667ZM0.5 13.8333V12.1667H5.5V13.8333H0.5ZM3.83333 10.5V8.83333H0.5V7.16667H3.83333V5.5H5.5V10.5H3.83333ZM7.16667 8.83333V7.16667H15.5V8.83333H7.16667ZM10.5 5.5V0.5H12.1667V2.16667H15.5V3.83333H12.1667V5.5H10.5ZM0.5 3.83333V2.16667H8.83333V3.83333H0.5Z"
              fill="#FB009C"
            />
          </svg>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-[#FB009C] to-[#B3DB8A]"></div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border mms:text-[7px] md:text-[10px] m-0 lg:text-[9.5px] xl:text-[10px] 2xl:text-[10px] font-inter">
          <thead>
            <tr className="bg-[#E6F3D8] text-[#1A1A1A]">
              {headings.map((item, idx) => (
                <th
                  key={idx}
                  className={`mms:py-1 md:py-2 lg:py-2 2xl:py-2 font-normal text-left ${
                    idx === 0
                      ? "mms:px-1 md:pl-3 mms:w-[25] w-[25%]" // Bill ID
                      : idx === 2
                      ? "mms:px-0.5 md:pl-12 lg:pl-4 2xl:pl-12 mms:w-[25%] w-[25%]" // 👈 Moves "Test Group" slightly right
                      : idx === headings.length - 1
                      ? "mms:px-1 md:pl-20 lg:pl-3 2xl:pl-20 w-[25%]" // 👈 Moves "Due" towards left
                      : "mms:px-2 md:px-3 w-[30%]" // Test Name
                  }`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }).map((_, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-[#CCCCCC] text-[#1A1A1A] hover:bg-gray-100"
              >
                {values.map((item, idx) => (
                  <td
                    key={idx}
                    className={`py-[7px] font-inter font-normal ${
                      idx === 0
                        ? "mms:px-1 md:pl-3 w-[21%]" // bill id xx
                        : idx === 2
                        ? "mms:px-1 md:pl-12 lg:pl-4 2xl:pl-12 w-[25%]" // test group lorem
                        : idx === values.length - 1
                        ? "mms:px-1 md:pl-16 lg:pl-3 2xl:pl-16 w-[25%]" // dd-mm-yyyy
                        : "mms:px-1 md:px-3 w-[25%]" //test name lorem
                    }
                    ${
                      item === "DD-MM-YYYY"
                        ? "text-[#D92D20] font-semibold"
                        : ""
                    }`}
                  >
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingReportsTable;
