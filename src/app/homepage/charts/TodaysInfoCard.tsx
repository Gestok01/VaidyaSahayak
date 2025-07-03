import React from "react";
import Image from "next/image"; // Import Image component
import UpSvg from "../../../assets/svg/arrow_drop_up_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg";
import DownSvg from "../../../assets/svg/arrow_drop_down_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";

const TodaysInfoCard = (props: any) => {
  const { cardHeading, number, stats } = props;

  return (
    <div className="p-2 pl-5 border border-[#98A2B3] rounded-lg min-[350px]:w-[230px] md:min-w-72 lg:min-w-52 xl:min-w-60 2xl:min-w-80 mms:h-[60px] md:h-[70] lg:h-[75px] 2xl:h-[81px] bg-[#FFFFFF] mms:mr-1 md:ml-1 lg:mr-2 xl:mr-0 2xl:mr-3 ml-1 mms:mt-2 md:mt-2 lg:mt-[0.5]">
      <p className="mms:text-[9px] md:text-[10px] lg:text-[10px] xl:text-[10.5px] 2xl:text-[11px] font-medium font-inter text-[#1A1A1A]">
        {cardHeading}
      </p>
      <p className="top-[-4px] mms:text-[13px] md:text-[16px] lg:text-[16px] xl:text-[17.5px] 2xl:text-[19px] text-[#B3DB8A] font-inter font-semibold">
        {number}
      </p>
      <div className="pl-8 ">
        <div className="flex-grow mms:w-28 md:w-46 lg:w-[146px] xl:w-60 2xl:w-56 mms:h-[1px] md:h-[1px] xl:h-[0.5px] bg-gradient-to-r from-transparent via-[#98A2B3] to-transparent"></div>
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`flex items-center gap-1 lg:gap-0.5 2xl:gap-1 mms:pt-[1px] md:pt-0.5 ${
            stats.trend === "Up" ? "text-[#12B76A]" : "text-[#D92D20]"
          }`}
        >
          <span className=" mms:text-[8px] md:text-[9px] lg:text-[9px] xl:text-[10.5px] 2xl:text-[10px]">
            {stats.trend}
          </span>
          <span className="mms:text-[8px] md:text-[9px] lg:text-[9px] xl:text-[10.5px] 2xl:text-[10px] font-sans">
            {stats.percentage} %
          </span>
          <Image
            src={stats.trend === "Up" ? UpSvg : DownSvg}
            width={18}
            height={18}
            alt="trend icon"
          />
        </div>
        <div className="flex items-center gap-1 pt-0.5 pr-3 cursor-pointer hover:underline">
          <span className=" mms:text-[8px] md:text-[9px] lg:text-[9px] xl:text-[10.5px] 2xl:text-[10px] text-[#1A1A1A]">
            View Details
          </span>
          <svg
            className="mms:w-1 md:w-1.5 lg:w-1.5 2xl:w-2 mms:h-1 md:h-1.5 lg:h-1.5 2xl:h-2 m-0"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.0125 9.98232L0.142677 9.1125L4.24634 5.00884L4.25518 5L4.24634 4.99116L0.142678 0.8875L1.0125 0.0176777L5.99482 5L1.0125 9.98232Z"
              fill="#FB009C"
              stroke="#FB009C"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TodaysInfoCard;
