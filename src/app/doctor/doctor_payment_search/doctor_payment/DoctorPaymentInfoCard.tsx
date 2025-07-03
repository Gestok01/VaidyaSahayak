import React from "react";
import Image from "next/image"; // Import Image component
import UpSvg from "@/assets/svg/arrow_drop_up_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg";
import DownSvg from "@/assets/svg/arrow_drop_down_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";
import RightSvg from "@/assets/svg/chevron_right_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";

const DoctorPaymentInfoCard = (props: any) => {
  const { cardHeading, number, stats, date } = props;

  return (
    <div className="p-2 pl-5 border border-[#98A2B3] rounded-lg shadow-sm w-[377] h-[84px] bg-white mt-1 mx-1">
      <p className="text-xs font-medium text-[#1A1A1A]">{cardHeading}</p>
      <p
        className={`text-xl ${
          cardHeading.includes("Pending") ? "text-[#D92D20]" : "text-[#B3DB8A]"
        } text-[#12B76A] font-semibold`}
      >
        {number}
      </p>
      <div className="pl-5 py-1">
        <div className="flex-grow w-72 h-[1px] bg-gradient-to-r from-transparent via-[#98A2B3] to-transparent"></div>
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`flex text-xs items-center gap-1 ${
            stats.trend === "Up" ? "text-[#12B76A]" : "text-[#D92D20]"
          }`}
        >
          <span className="text-[10px] font-normal text-[#12B76A]">
            {stats.trend}
          </span>
          <span className="text-[10px]  font-normal text-[#12B76A]">
            {stats.percentage} %
          </span>
          <svg
            width="8"
            height="8"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 5L5 0L10 5H0Z" fill="#12B76A" />
          </svg>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:underline">
          <span className="text-[11px] font-medium text-[#1A1A1A]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorPaymentInfoCard;
