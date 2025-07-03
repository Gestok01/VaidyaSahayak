import React from "react";

type cardType = {
  svg: any;
  name: any;
  score: any;
};

const OverviewCard: React.FC<cardType> = ({ name, score }) => {
  return (
    <div className="mms:mr-1 md:mr-0 lg:mr-1 xl:mr-0 2xl:mr-3 m-1 md:gap-3 border border-[#F7A6D8] rounded-md min-[350px]::w-[130px] md:min-w-72 lg:min-w-52 2xl:min-w-80 mms:h-[40] md:h-[45px] lg:h-[51px] bg-[#FFFFFF] flex items-center justify-between ">
      {/* Icon & Name */}
      <div className="flex flex-col py-4 px-3 lg:px-1 lg:pl-1 xl:px-2 2xl:px-3 m-0 items-center space-x-3">
        <span className="mms:text-[9px] md:text-[11px] lg:text-[10.5px] xl:text-[11px] 2xl:text-[12px] font-semibold text-[#1A1A1A]">
          {name}
        </span>
      </div>
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#FB009C] to-transparent"></div>

      {/* Score */}
      <div className="relative flex items-center justify-center mms:w-[30px] md:w-[35px] lg:[w-35px] xl:w-[37.5px] 2xl:w-[40px] mms:h-[30px] md:h-[35px] lg:h-[35px] xl:h-[37px] 2xl:h-[39px] mr-3 lg:mr-1 xl:mr-2 2xl:mr-3 mms:text-[15px] md:text-[17px] lg:text-[17px] xl:text-[18px] 2xl:text-[19.5px] font-inter font-semibold text-[#1A1A1A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FB009C] to-[#B3DB8A] rounded-full mms:p-[1px] md:p-0.5 z-0">
          <div className="flex items-center justify-center w-full h-full bg-[#FFFFFF] rounded-full">
            {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
