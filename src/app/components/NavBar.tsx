"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const pathname: string = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("Home");

  useEffect(() => {
    // Apply padding to body only if NOT on the homepage
    if (pathname !== "/homepage") {
      document.body.style.paddingTop = "100px";
    }

    return () => {
      document.body.style.paddingTop = "0px"; // Reset when unmounted
    };
  }, [pathname]);

  const items = [
    {
      name: "Home",
      dropdownItems: [],
      navTo: "/homepage", // Direct navigation path for Home
    },
    {
      name: "Diagnostics",
      dropdownItems: [
        {
          itemName: "Diagnostic Booking",
          navTo: "/diagnostics/diagnosticbooking",
        },
        {
          itemName: "Diagnostic Billing",
          navTo: "/diagnostics/diagnosticbilling/diagnostic_billing_search",
        },
        {
          itemName: "Diagnostic Rates",
          navTo: "/diagnostics/diagnostic_rate_search",
        },
      ],
    },
    {
      name: "Doctor",
      dropdownItems: [
        {
          itemName: "Book Appointment",
          navTo: "/doctor/appointment_booking_search/appointment_booking",
        },
        {
          itemName: "Appointment Billing",
          navTo: "/doctor/appointment_billing_search",
        },
        { itemName: "View Schedule", navTo: "/doctor/doctor_schedular_search" },
        {
          itemName: "Doctor's Payment",
          navTo: "/doctor/doctor_payment_search",
        },
      ],
    },
    {
      name: "Report",
      dropdownItems: [
        { itemName: "Vaccine Report", navTo: "/report/vaccine_report_search" },
        {
          itemName: "Diagnostics Report",
          navTo: "/report/diagnostic_report_search",
        },
      ],
    },
    {
      name: "Vaccine",
      dropdownItems: [
        { itemName: "Vaccine Booking", navTo: "/vaccine/vaccineBooking" },
        {
          itemName: "Vaccine Billing",
          navTo: "/vaccine/vaccine_billing_search",
        },
      ],
    },
    {
      name: "Ambulance",
      dropdownItems: [
        {
          itemName: "Ambulance Booking",
          navTo: "/ambulance/ambulance_booking",
        },
        {
          itemName: "Ambulance Billing",
          navTo: "/ambulance/ambulance_billing/ambulance_billing_search",
        },
        { itemName: "Ambulance Rates", navTo: "/ambulance/bill_search" },
      ],
    },
    {
      name: "Oxygen",
      dropdownItems: [
        {
          itemName: "Oxygen Billing",
          navTo: "/oxygen/oxygen_billing/oxygen_billing_search",
        },
        { itemName: "Oxygen Booking", navTo: "/oxygen/oxygenBooking" },
      ],
    },
    {
      name: "Clinic Patient List",
      dropdownItems: [
        {
          itemName: "Create New Profile",
          navTo: "/clinicPatient/createNewPatient",
        },
        {
          itemName: "Existing Patient Profile",
          navTo: "/clinicPatient/existingPatient/existingPatientSearch",
        },
      ],
    },
    {
      name: "My Account",
      dropdownItems: [
        { itemName: "Profile", navTo: "/" },
        { itemName: "Settings", navTo: "/" },
        { itemName: "Logout", navTo: "/" },
      ],
    },
  ];

  const handleMainItemClick = (
    index: number,
    itemName: string,
    navTo?: string
  ) => {
    setSelectedItem(itemName);

    if (navTo) {
      router.push(navTo);
    } else {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="fixed w-full max-w-[1532px] min-[1532px]:max-w-full  mms:top-[20px] sm:top-[25px] md:top-[25px] lg:top-[45px] xl:[45px] 2xl:[45px] z-50">
      {/* Gradient Curved Border */}
      <div className="absolute md:bottom-[5px] lg:bottom-[5px] bottom-[5px] left-0 right-0 mx-1.5 h-[30px] bg-gradient-to-r from-[#FB009C] to-[#B3DB8A] rounded-md"></div>

      {/* Navigation Menu */}
      <ul className="sticky flex justify-between top-0 m-1.5 p-2 bg-white rounded-md whitespace-nowrap">
        {items.map((item, idx) => (
          <li key={idx} className="relative">
            {/* Main Menu Button */}
            <button
              className="flex flex-col items-center px-2 py-1 rounded-md"
              onClick={() => handleMainItemClick(idx, item.name, item.navTo)}
            >
              <div className="flex items-center md:gap-1 mms:gap-1">
                <span
                  className={`text-[#1A1A1A] md:text-[10px] lg:text-xs mms:text-[8px] ${
                    selectedItem === item.name
                      ? "text-[#FB009C] font-semibold"
                      : ""
                  }`}
                >
                  {item.name}
                </span>

                {item.dropdownItems.length > 0 && (
                  <ChevronDown
                    className={`md:w-3 lg:w-4 mms:w-2 mms:h-2 md:h-3 lg:h-4 text-[#FB009C] transition-transform ${
                      activeDropdown === idx ? "transform rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {selectedItem === item.name && (
                <span className="w-full md:h-[1px] lg:h-[1px] mms:[0.5px] bg-pink-500 md:mt-1 mms:mt-0.5 rounded-md"></span>
              )}
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === idx && item.dropdownItems.length > 0 && (
              <div className="absolute top-full left-0 m-0 mms:mt-1 md:mt-3 lg:mt-2 mms:w-[90px] md:w-[115px] lg:w-48 bg-white border border-[#D11288] rounded-md shadow-lg">
                <ul className="py-1 divide-y divide-[#CCCCCC]">
                  {item.dropdownItems.map((dropdownItem, dropIdx) => (
                    <li key={dropIdx}>
                      <Link href={dropdownItem.navTo}>
                        <button
                          className="w-full text-left mms:px-2 md:px-3 lg:px-4 mms:py-0.5 md:py-1 lg:py-2 font-normal text-[#1A1A1A] hover:text-[#D11288] hover:font-semibold hover:bg-white mms:text-[8px] md:text-[10px] lg:text-sm"
                          onClick={handleDropdownItemClick}
                        >
                          {dropdownItem.itemName}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
