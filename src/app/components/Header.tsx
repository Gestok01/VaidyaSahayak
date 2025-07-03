"use client";
import React, { useEffect } from "react";
import MAIN_LOGO from "../../assets/svg/main_logo.svg";
import PROFILE_LOGO from "../../assets/svg/Avatar.svg";
import ABSSRK_LOGO from "../../assets/svg/abssrk_logo1.svg";
import Image from "next/image";

const Header = () => {
  const user_name: string = "Olivia Rhye";
  const user_mail: string = "olivia@untitledui.com";

  return (
    <header className="flex flex-wrap md:flex-nowrap bg-white justify-between items-center px-2 fixed top-0 w-full z-50">
      {/* Left Section: Logo and Upgrade Button */}
      <div className="flex items-center space-x-4">
        <Image
          src={MAIN_LOGO}
          alt="Company Logo"
          className="w-[40px] h-[25px] lg:w-[70px] lg:h-[55px] rounded-lg"
        />
        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-950 whitespace-nowrap">
          Dashboard
        </h1>

        <span className="hidden sm:inline bg-gray-100 text-gray-600 text-xs md:text-[10px] font-medium px-2 py-1 -ml-2 rounded-lg ">
          Free
        </span>
        <button className="hidden md:flex px-1.5 py-[3px] text-xs lg:px-2 lg:py-1 lg:text-sm text-[#FB009C] font-medium bg-white border-[#FB009C] rounded-md shadow-sm shadow-[#FB009C]/80 hover:shadow-[#FB009C] transition-all items-center gap-1">
          Upgrade to
          <Image
            src={MAIN_LOGO}
            width={16}
            height={12}
            alt="Logo"
            className="h-[12px] w-auto lg:h-[15px]"
          />
          Pro
        </button>
      </div>

      {/* Right Section: User Info and ABSSRK Logo */}
      <div className="flex items-center space-x-4 m-0  md:mt-0">
        <div className="flex items-center space-x-2 flex-wrap gap-x-2 min-w-[150px]">
          <span className="text-lg md:text-sm hidden md:flex">Welcome</span>
          <div className="relative w-7 h-7">
            <Image
              src={PROFILE_LOGO}
              layout="fill"
              className="rounded-full"
              alt="User Avatar"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col sm:text-xs max-w-[150px] truncate">
            <span className="text-[10px] sm:text-xs font-medium text-[#1A1A1A] truncate">
              {user_name}
            </span>
            <span className="text-[10px] sm:text-xs text-[#808080] truncate">
              {user_mail}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <div
            className="w-px h-6 bg-black mr-2 -ml-1.5"
            aria-hidden="true"
          ></div>

          <div className="items-center space-x-2 hidden sm:flex">
            <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden border-pink-600">
              <Image
                src={ABSSRK_LOGO}
                width={40}
                height={10}
                alt="ABSSRK Logo"
              />
            </div>

            <span className="text-xs font-medium text-gray-900">ABSSRK</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
