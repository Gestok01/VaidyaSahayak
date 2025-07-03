"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfilingSvg from "../../assets/svg/person.svg";
import CostingSvg from "../../assets/svg/currency_rupee.svg";
import InventoryManagementSvg from "../../assets/svg/shopping_bag.svg";
import AccountManagementSvg from "../../assets/svg/settings_account_box.svg";
import DoctorManagementSvg from "../../assets/svg/stethoscope_check.svg";
import EmployeeManagementSvg from "../../assets/svg/user_attributes.svg";
import StatusSvg from "../../assets/svg/arrow_upload_progress.svg";
import BillReceiptSvg from "../../assets/svg/receipt_long.svg";
import MembershipSvg from "../../assets/svg/card_membership.svg";
import RBACSvg from "../../assets/svg/group.svg";
import LogoutSvg from "../../assets/svg/logout.svg";

interface SubItem {
  name: string;
  hasActions?: boolean;
  hasGetOnly?: boolean;
  isLink?: boolean;
  link?: string;
  createLink?: string;
  getLink?: string;
}

interface SideBarItem {
  name: string;
  icon: React.FC<IconProps>;
  subItems?: SubItem[];
  isDropdown?: boolean;
  hasActions?: boolean;
  createLink?: string;
  getLink?: string;
}

interface IconProps {
  isOpen: boolean;
  isActive?: boolean;
  isClicked?: boolean;
}

const createIconComponent = (src: string, alt: string) => {
  const IconComponent: React.FC<IconProps> = ({ isActive, isClicked }) => (
    <Image
      src={src}
      alt={alt}
      width={16}
      height={16}
      className={`w-4 h-4 ${
        isClicked ? "text-[#D11288]" : 
        isActive ? "text-[#D11288]" : "text-[#FF94D6]"}`}
    />
  );
  return IconComponent;
};

const ProfilingIcon = createIconComponent(ProfilingSvg.src, "Profiling");
const CostingIcon = createIconComponent(CostingSvg.src, "Costing");
const InventoryManagementIcon = createIconComponent(
  InventoryManagementSvg.src,
  "Inventory Management"
);
const AccountManagementIcon = createIconComponent(
  AccountManagementSvg.src,
  "Account Management"
);
const DoctorManagementIcon = createIconComponent(
  DoctorManagementSvg.src,
  "Doctor Management"
);
const EmployeeManagementIcon = createIconComponent(
  EmployeeManagementSvg.src,
  "Employee Management"
);
const StatusIcon = createIconComponent(StatusSvg.src, "Status");
const BillIcon = createIconComponent(BillReceiptSvg.src, "Bill/Receipt");
const MembershipIcon = createIconComponent(MembershipSvg.src, "Membership");
const RbacIcon = createIconComponent(RBACSvg.src, "RBAC");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogoutIcon = createIconComponent(LogoutSvg.src, "Logout");

const sideBarItems: SideBarItem[] = [
  {
    name: "Profiling",
    icon: ProfilingIcon,
    subItems: [
      {
        name: "Doctor",
        hasActions: true,
        createLink: "/profiling/doctor_profile",
        getLink: "/profiling/doctor/get",
      },
      {
        name: "Receptionist",
        hasActions: true,
        createLink: "profiling/receptionist_profile",
        getLink: "/profiling/receptionist/get",
      },
      {
        name: "Employee",
        hasActions: true,
        createLink: "profiling/employee_profile",
        getLink: "/profiling/employee/get",
      },
      {
        name: "Ambulance Driver",
        hasActions: true,
        createLink: "profiling/ambulance_driver",
        getLink: "/profiling/ambulance-driver/get",
      },
    ],
    isDropdown: true,
  },
  {
    name: "Costing",
    icon: CostingIcon,
    subItems: [
      {
        name: "Doctor",
        hasGetOnly: true,
        getLink: "/costing/doctor_cost_get/doctor_cost_search",
      },
      {
        name: "Diagnostics",
        hasActions: true,
        createLink: "/costing/diagnostic_create_cost",
        getLink: "/costing/diagnostics_get_cost/diagnostic_cost_search",
      },
      {
        name: "Vaccine",
        hasActions: true,
        createLink: "/costing/vaccine_create_cost",
        getLink: "/costing/vaccine_get_cost/vaccine_cost_search",
      },
      {
        name: "Ambulance",
        hasActions: true,
        createLink: "/costing/ambulance_create_cost",
        getLink: "/costing/ambulance_get_cost/ambulance_cost_search",
      },
      {
        name: "Oxygen",
        hasActions: true,
        createLink: "/costing/oxygen_create_cost",
        getLink: "/costing/oxygen_get_cost/oxygen_cost_search",
      },
      {
        name: "Ambulance Attributes",
        hasActions: true,
        createLink: "/costing/ambulance_at_create_cost",
        getLink: "/costing/ambulance_at_get_cost/ambulance_at_cost_search",
      },
    ],
    isDropdown: true,
  },
  {
    name: "Inventory Management",
    icon: InventoryManagementIcon,
    subItems: [
      {
        name: "Inventory",
        hasActions: true,
        createLink: "/inventory/createInventory",
        getLink: "/inventory/getInventoryBill",
      },
      {
        name: "Purchase Order",
        hasActions: true,
        createLink: "/inventory/purchaseOrder",
        getLink: "/inventory-management/purchase-order/get",
      },
      {
        name: "Receive Order",
        hasActions: true,
        createLink: "/inventory-management/receive-order/create",
        getLink: "/inventory-management/receive-order/get",
      },
      {
        name: "Issue",
        hasActions: true,
        createLink: "/inventory/createIssueMaterial",
        getLink: "/inventory-management/issue/get",
      },
      {
        name: "Vaccine",
        hasActions: true,
        createLink: "/inventory-management/vaccine/create",
        getLink: "/inventory-management/vaccine/get",
      },
      {
        name: "Return order",
        hasActions: true,
        createLink: "/inventory-management/return-order/create",
        getLink: "/inventory-management/return-order/get",
      },
      {
        name: "Debit / Credit",
        hasActions: true,
        createLink: "/inventory-management/debit-credit/create",
        getLink: "/inventory-management/debit-credit/get",
      },
    ],
    isDropdown: true,
  },
  {
    name: "Account Management",
    icon: AccountManagementIcon,
    subItems: [
      {
        name: "Daily Calculation",
        isLink: true,
        link: "/account/daily_calc_search",
      },
      {
        name: "Daily Transaction",
        isLink: true,
        link: "/account/daily_search",
      },
      {
        name: "Day Wise Transaction",
        isLink: true,
        link: "/account/daywise_search",
      },
      {
        name: "Monthly Calculation",
        isLink: true,
        link: "/account/monthly_search",
      },
      {
        name: "Total Money Received",
        isLink: true,
        link: "/account/total_money_search",
      },
      {
        name: "Other Income Details",
        hasActions: true,
        createLink: "/account/create_income_form",
        getLink: "/account/get_income_search",
      },
      { name: "Fix Cost", 
        hasActions: true,
        createLink: "/account/fix_cost_create",
        getLink: "/account/fix_cost_table",
      },
      {
        name: "Doctor's Total Income",
        isLink: true,
        link: "/account/doctor_income_search",
      },
      {
        name: "Total Test Income",
        isLink: true,
        link: "/account/test_income_search",
      },
    ],
    isDropdown: true,
  },
  {
    name: "Doctor Management",
    icon: DoctorManagementIcon,
    subItems: [
      {
        name: "Single Doctor Payment",
        isLink: true,
        link: "/doctor/doctor_payment_search",
      },
      {
        name: "Day Wise Payment",
        isLink: true,
        link: "/doctor/status/daywisePayment",
      },
      {
        name: "Doctor Bookings Status",
        isLink: true,
        link: "/doctor/status/doctorBooking",
      },
    ],
    isDropdown: true,
  },
  {
    name: "Employee Management",
    icon: EmployeeManagementIcon,
    subItems: [
      {
        name: "Category Wise Transaction",
        isLink: true,
        link: "/employment_management/categorywiseTransaction",
      },
      {
        name: "Login Report",
        isLink: true,
        link: "/employment_management/loginReport",
      },
      {
        name: "Profile",
        isLink: true,
        link: "/employment_management/getEmployeeProfile",
      },
      {
        name: "Deposit Statement",
        isLink: true,
        link: "/employment_management/depositStatement",
      },
    ],
    isDropdown: true,
  },
  { name: "Status", icon: StatusIcon },
  { name: "Bill/Receipt", icon: BillIcon },
  { 
    name: "Membership", 
    icon: MembershipIcon,
    hasActions: true,
    createLink: "/membership/add_members",
    getLink: "/membership/get_members",
  },
  { name: "RBAC", icon: RbacIcon },
];

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<{
    parent: string;
    child: string;
  } | null>(null);
  const [clickedText, setClickedText] = useState<string | null>(null);
  const [activeActionItem, setActiveActionItem] = useState<string | null>(null);
  
  const handleTextClick = (text: string) => {
    setClickedText(text);
    setTimeout(() => setClickedText(null), 300); 
  };

  const handleSideBarToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveDropdown(null);
      setActiveSubItem(null);
      setActiveActionItem(null);
    }
  };

  const handleDropdownToggle = (itemName: string) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null);
      setActiveSubItem(null);
    } else {
      setActiveDropdown(itemName);
      setActiveActionItem(null);
    }
  };

  const handleSubItemToggle = (parent: string, child: string) => {
    if (activeSubItem?.parent === parent && activeSubItem?.child === child) {
      setActiveSubItem(null);
    } else {
      setActiveSubItem({ parent, child });
    }
  };

  const handleActionItemToggle = (itemName: string) => {
    if (activeActionItem === itemName) {
      setActiveActionItem(null);
    } else {
      setActiveActionItem(itemName);
      setActiveDropdown(null);
      setActiveSubItem(null);
    }
  };

  return (
    <div className="p-[1px] bg-gradient-to-r from-[#FB009C] to-[#B3DB8A] rounded-md md:ml-2 lg:ml-2 2xl:ml-3.5 mms:ml-2">
      <div
        className={`flex flex-col md:text-[11px] lg:text-[11px] 2xl:text-xs border border-transparent rounded-md justify-between bg-white h-full transition-width duration-300 ease-in-out
      ${
        isOpen
          ? "md:w-[150px] lg:w-[160px] 2xl:w-[174px] mms:w-[125px] "
          : "md:w-10 lg:w-11 2xl:w-12 mms:w-[30px]"
      } `}
      >
        <div>
          {/* Sidebar Toggle */}
          <div className="relative px-4 py-4 flex items-center transition-all duration-300">
            {/* Left Arrow (Visible Only When Sidebar is Open) */}
            {isOpen && (
              <svg
                className="absolute mms:right-7 md:right-8 lg:right-8 2xl:right-9 top-5 -translate-y-1/2 md:w-1.5 lg:w-2 md:h-1.5 lg:h-2 mms:w-1.5 mms:h-1.5"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10L0 5L5 0L5.8875 0.8875L1.775 5L5.8875 9.1125L5 10Z"
                  fill="#FB009C"
                />
              </svg>
            )}

            {/* Sidebar Toggle Button */}
            <button
              className="absolute mms:right-3 md:right-4 lg:right-3.5 top-5 -translate-y-1/2 transition-all duration-300 mms:w-3 2xl:w-4 mms:h-3 lg:h-3 2xl:h-4 "
              onClick={handleSideBarToggle}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 14V12H18V14H0ZM0 10V8H18V10H0ZM0 6V4H18V6H0ZM0 2V0H18V2H0Z"
                  fill={isOpen ? "#FFA3DC" : "#FB009C"}
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Items */}
          <div className="flex flex-col mms:gap-0.5 md:gap-0.5 lg:gap-[3px] 2xl:gap-1 mms:pr-0.5 md:pr-0.5 lg:pr-[3px] 2xl:pr-1 mms:pt-[3px] md:pt-[5px] lg:pt-[6px] 2xl:pt-[7px]">
            {sideBarItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  type="button"
                  className={`flex items-center justify-between md:p-1 lg:p-[5px] 2xl:p-1.5 mms:p-1 md:pl-1 lg:pl-2 2xl:pl-3.5 mms:pl-1 rounded-lg hover:bg-gray-100 cursor-pointer w-full ${
                    isOpen ? "" : "justify-center"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (item.isDropdown) {
                      handleDropdownToggle(item.name);
                    } else if (item.hasActions) {
                      handleActionItemToggle(item.name);
                    }
                  }}
                  aria-expanded={activeDropdown === item.name || activeActionItem === item.name}
                >
                  <div className="flex items-center gap-1.5 text-left">
                    {React.createElement(item.icon, {
                      isOpen,
                      isActive:
                        activeDropdown === item.name ||
                        hoveredItem === item.name ||
                        activeActionItem === item.name,
                    })}
                    {isOpen && (
                      <span
                        className={`mms:text-[9px] md:text-[10px] lg:text-[10.5px] 2xl:text-[11px] font-inter mr-2 ${
                          activeDropdown === item.name ||
                          hoveredItem === item.name ||
                          activeActionItem === item.name
                            ? "text-[#D11288]"
                            : "text-[#1A1A1A]"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isOpen && item.isDropdown && (
                    <svg
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ml-auto mms:w-2 lg:w-3 mms:h-2 lg:h-3${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke={
                          activeDropdown === item.name ||
                          hoveredItem === item.name
                            ? "#FB009C"
                            : "#1A1A1A"
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Action items for non-dropdown items like Membership */}
                {isOpen && activeActionItem === item.name && item.hasActions && (
                  <div className="absolute left-full top-0 ml-2 z-10">
                    <div className="border border-[#FB009C] rounded-md p-1 bg-white shadow-md min-w-[100px]">
                      {item.createLink && (
                        <Link href={item.createLink} passHref>
                          <div
                            className="p-1 px-2 rounded hover:bg-gray-100"
                            onMouseEnter={() =>
                              setHoveredItem(`${item.name}-create`)
                            }
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <span
                              className={`text-[11px] font-inter ${
                                hoveredItem === `${item.name}-create` ||
                                clickedText === `${item.name}-create`
                                  ? "text-[#D11288]"
                                  : "text-[#1A1A1A]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTextClick(`${item.name}-create`);
                              }}
                            >
                              Create
                            </span>
                          </div>
                        </Link>
                      )}
                      {item.getLink && (
                        <Link href={item.getLink} passHref>
                          <div
                            className="p-1 px-2 rounded hover:bg-gray-100"
                            onMouseEnter={() =>
                              setHoveredItem(`${item.name}-get`)
                            }
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <span
                              className={`text-[11px] font-inter ${
                                hoveredItem === `${item.name}-get` ||
                                clickedText === `${item.name}-get`
                                  ? "text-[#D11288]"
                                  : "text-[#1A1A1A]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTextClick(`${item.name}-get`);
                              }}
                            >
                              Get
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Sub-items for dropdown items */}
                {isOpen && activeDropdown === item.name && item.subItems && (
                  <div
                    id={`submenu-${item.name}`}
                    className="ml-4 pl-2 border-l-2 border-l-[#FB009C]"
                  >
                    {item.subItems.map((subItem) => (
                      <div key={subItem.name} className="relative">
                        {subItem.isLink ? (
                          <Link href={subItem.link ?? "#"} passHref>
                            <div
                              className="flex items-center justify-between p-1.5 pl-3 pr-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                              onMouseEnter={() =>
                                setHoveredItem(`${item.name}-${subItem.name}`)
                              }
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <span
                                className={`text-[11px] font-inter ${
                                  hoveredItem === `${item.name}-${subItem.name}` ||
                                  clickedText === `${item.name}-${subItem.name}`
                                    ? "text-[#D11288]"
                                    : "text-[#1A1A1A]"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTextClick(`${item.name}-${subItem.name}`);
                                }}
                              >
                                {subItem.name}
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="flex items-center justify-between p-1.5 pl-3 pr-2 rounded-lg hover:bg-gray-100 cursor-pointer w-full"
                              onMouseEnter={() =>
                                setHoveredItem(`${item.name}-${subItem.name}`)
                              }
                              onMouseLeave={() => setHoveredItem(null)}
                              onClick={(e) => {
                                if (subItem.hasActions || subItem.hasGetOnly) {
                                  e.stopPropagation();
                                  handleSubItemToggle(item.name, subItem.name);
                                }
                              }}
                              aria-expanded={
                                activeSubItem?.parent === item.name &&
                                activeSubItem?.child === subItem.name
                              }
                            >
                              <span
                                className={`text-[11px] font-inter ${
                                  hoveredItem === `${item.name}-${subItem.name}`||
                                  clickedText === `${item.name}-${subItem.name}`
                                    ? "text-[#D11288]"
                                    : "text-[#1A1A1A]"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTextClick(`${item.name}-${subItem.name}`);
                                }}
                              >
                                {subItem.name}
                              </span>
                              {(subItem.hasActions || subItem.hasGetOnly) && (
                                <svg
                                  width="6"
                                  height="10"
                                  viewBox="0 0 6 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`ml-2 transition-transform duration-200 ${
                                    activeSubItem?.parent === item.name &&
                                    activeSubItem?.child === subItem.name
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                >
                                  <path
                                    d="M1 1L5 5L1 9"
                                    stroke={
                                      hoveredItem ===
                                      `${item.name}-${subItem.name}`
                                        ? "#FB009C"
                                        : "#1A1A1A"
                                    }
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>

                            {/* Action items - positioned outside sidebar */}
                            {activeSubItem?.parent === item.name &&
                              activeSubItem?.child === subItem.name &&
                              (subItem.hasActions || subItem.hasGetOnly) && (
                                <div className="absolute left-full top-0 ml-2 z-10">
                                  <div className="border border-[#FB009C] rounded-md p-1 bg-white shadow-md min-w-[100px]">
                                    {!subItem.hasGetOnly &&
                                      subItem.createLink && (
                                        <Link
                                          href={subItem.createLink}
                                          passHref
                                        >
                                          <div
                                            className="p-1 px-2 rounded hover:bg-gray-100"
                                            onMouseEnter={() =>
                                              setHoveredItem(
                                                `${item.name}-${subItem.name}-create`
                                              )
                                            }
                                            onMouseLeave={() =>
                                              setHoveredItem(null)
                                            }
                                          >
                                            <span
                                              className={`text-[11px] font-inter ${
                                                hoveredItem ===
                                                `${item.name}-${subItem.name}-create`
                                                  ? "text-[#FB009C]"
                                                  : "text-[#1A1A1A]"
                                              }`}
                                            >
                                              Create
                                            </span>
                                          </div>
                                        </Link>
                                      )}
                                    {subItem.getLink && (
                                      <Link href={subItem.getLink} passHref>
                                        <div
                                          className="p-1 px-2 rounded hover:bg-gray-100"
                                          onMouseEnter={() =>
                                            setHoveredItem(
                                              `${item.name}-${subItem.name}-get` 
                                            )
                                          }
                                          onMouseLeave={() =>
                                            setHoveredItem(null)
                                          }
                                        >
                                          <span
                                            className={`text-[11px] font-inter ${
                                              hoveredItem ===
                                              `${item.name}-${subItem.name}-get` ||
                                              clickedText === `${item.name}-${subItem.name}-get`
                                                ? "text-[#D11288]"
                                                : "text-[#1A1A1A]"
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleTextClick(`${item.name}-${subItem.name}-get`);
                                            }}
                                          >
                                            Get
                                          </span>
                                        </div>
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          className={`flex items-center gap-3 m-0 px-1 py-4 rounded-lg hover:bg-gray-100 cursor-pointer w-full ${
            isOpen
              ? "justify-start  mms:mt-[183px] md:mt-[183px] lg:mt-[114px] xl:mt-[165px]"
              : "justify-center mms:mt-[226px] md:mt-[213px] lg:mt-[159px] xl:mt-[215px]"
          }`}
        >
          <Image
            src={LogoutSvg.src}
            alt="Logout"
            width={16}
            height={16}
            className=" text-[#FB009C]"
          />
          {isOpen && (
            <span className="mms:text-[10.5px] 2xl:text-xs font-medium text-black">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;