import Image from "next/image";
import React from "react";
import FilterSvg from "../../../assets/svg/tune_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";

const DoctorsEfficiencyTable = () => {
  const headings = [
    "DOCTOR",
    "NUMBER OF PATIENTS",
    "PRESCRIBED TESTS",
    "REVENUE GENERADED",
  ];
  const values = ["Dr.Lorem ipsum", "200 Patients", "450 tests", "₹50,000"];

  return (
    <div className="bg-white rounded-md shadow-sm mms:w-50% md:w-[100%] lg:w-1/2 mms:ml-1.5 md:ml-2 lg:ml-1.5 2xl:ml-3.5 mms:mr-1 md:mr-1 lg:mr-1 2xl:mr-2 my-1 mms:h-[385px] md:h-[334.5px] lg:h-[327px] xl:h-[333px] 2xl:h-[333px] border  border-[#98A2B3]">
      {/* Header Section */}
      <div className="flex items-center px-2 py-2">
        {/* "Doctor's Efficiency" text with SVG beside it */}
        <div className="flex items-center gap-2">
          <span className="mms:text-[8px] md:text-xs lg:text-[10px] xl:text-[11px] 2xl:text-xs font-semibold text-[#1A1A1A]">
            Doctor's Efficiency
          </span>
          <svg
            className="mms:w-2 md:w-4 lg:w-3 xl:w-3.5 2xl:w-4 mms:h-2 md:h-4 lg:h-3 xl:h-3.5 2xl:h-4"
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.1665 13.166H9.83317V8.16602H8.1665V13.166ZM8.99984 6.49935C9.23595 6.49935 9.43387 6.41949 9.59359 6.25977C9.75331 6.10004 9.83317 5.90213 9.83317 5.66602C9.83317 5.4299 9.75331 5.23199 9.59359 5.07227C9.43387 4.91254 9.23595 4.83268 8.99984 4.83268C8.76373 4.83268 8.56581 4.91254 8.40609 5.07227C8.24637 5.23199 8.1665 5.4299 8.1665 5.66602C8.1665 5.90213 8.24637 6.10004 8.40609 6.25977C8.56581 6.41949 8.76373 6.49935 8.99984 6.49935ZM8.99984 17.3327C7.84706 17.3327 6.76373 17.1139 5.74984 16.6764C4.73595 16.2389 3.854 15.6452 3.104 14.8952C2.354 14.1452 1.76025 13.2632 1.32275 12.2493C0.885254 11.2355 0.666504 10.1521 0.666504 8.99935C0.666504 7.84657 0.885254 6.76324 1.32275 5.74935C1.76025 4.73546 2.354 3.85352 3.104 3.10352C3.854 2.35352 4.73595 1.75977 5.74984 1.32227C6.76373 0.884766 7.84706 0.666016 8.99984 0.666016C10.1526 0.666016 11.2359 0.884766 12.2498 1.32227C13.2637 1.75977 14.1457 2.35352 14.8957 3.10352C15.6457 3.85352 16.2394 4.73546 16.6769 5.74935C17.1144 6.76324 17.3332 7.84657 17.3332 8.99935C17.3332 10.1521 17.1144 11.2355 16.6769 12.2493C16.2394 13.2632 15.6457 14.1452 14.8957 14.8952C14.1457 15.6452 13.2637 16.2389 12.2498 16.6764C11.2359 17.1139 10.1526 17.3327 8.99984 17.3327ZM8.99984 15.666C10.8609 15.666 12.4373 15.0202 13.729 13.7285C15.0207 12.4368 15.6665 10.8605 15.6665 8.99935C15.6665 7.13824 15.0207 5.56185 13.729 4.27018C12.4373 2.97852 10.8609 2.33268 8.99984 2.33268C7.13873 2.33268 5.56234 2.97852 4.27067 4.27018C2.979 5.56185 2.33317 7.13824 2.33317 8.99935C2.33317 10.8605 2.979 12.4368 4.27067 13.7285C5.56234 15.0202 7.13873 15.666 8.99984 15.666Z"
              fill="#FB009C"
            />
          </svg>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-[#FB009C] to-[#B3DB8A]"></div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border mms:text-[7px] md:text-[10px] lg:text-[9.5px] xl:text-[10px] 2xl:text-[10px] font-inter">
          <thead>
            <tr className="bg-[#E6F3D8] text-[#1A1A1A]">
              {headings.map((item, idx) => (
                <th
                  key={idx}
                  className={`min-[320p]:py-1 md:py-2 m-0 font-normal text-left ${
                    idx === 0
                      ? "mms:px-1 md:pl-2 lg:pl-1 xl:pl-2 mms:w-[25%] md:w-[25%] lg:w-[20%] xl:w-[25%]" // Doctor moves left
                      : idx === 2
                      ? "mms:px-1 md:pl-6 lg:pl-1 2xl:pl-6 mms:w-[40%] md:w-[25%] lg:w-[25%] 2xl:w-[25%]" //  "PRESCRIBED TESTS" slightly right
                      : idx === headings.length - 1
                      ? "mms:px-2 md:pl-8 lg:px-1 lg:pl-0 xl:pl-2 2xl:pl-8 mms:w-[25%] md:w-[25%] lg:w-[35%] 2xl:w-[25%] " // Moves "REVENUE GENERATED" towards left
                      : "mms:px-1 md:px-0 mms:w-[50%] md:w-[20%]" // Number of patient moves right
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
                        ? " mms:px-1 md:pl-2 w-[25%]" //doctor
                        : idx === 2
                        ? "mms:px-1 mms:pl-2 md:pl-12 lg:pl-4 2xl:pl-12 w-[25%]" //  "450 tests" slightly right
                        : idx === values.length - 1
                        ? "mms:px-1 mms:pl-2 md:pl-16 lg:pl-1.5 2xl:pl-16 mms:w-[25%] md:w-[25%]" //  "₹50,000" towards left
                        : "mms:px-2 md:px-3 w-[25%]" //patient
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

export default DoctorsEfficiencyTable;
