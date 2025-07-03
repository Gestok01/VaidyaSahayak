'use client'
import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("Ambulance");

  const items = [
    { name: "Home", dropdownItems: [] },
    { name: "Diagnostics", dropdownItems: ["Blood Test", "X-Ray", "MRI", "CT Scan"] },
    { name: "Doctor", dropdownItems: ["Find Doctor", "Book Appointment", "View Schedule"] },
    { name: "Report", dropdownItems: ["Test Reports", "Medical History", "Prescriptions"] },
    { name: "Vaccine", dropdownItems: ["Schedule Vaccine", "Vaccination History", "Available Vaccines"] },
    { name: "Ambulance", dropdownItems: ["Emergency Call", "Request Ambulance", "Ambulance Billing"] },
    { name: "Oxygen", dropdownItems: ["Order Oxygen", "Track Order", "Refill Request"] },
    { name: "Clinic Patient List", dropdownItems: ["View All Patients", "Add Patient", "Search Patient"] },
    { name: "My Account", dropdownItems: ["Profile", "Settings", "Logout"] }
  ]; 

  const handleMainItemClick = (index: number, itemName: string) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setSelectedItem(itemName);
  };

  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="relative w-full">
      {/* Gradient Curved Border */}
      <div className="absolute bottom-[-2px] left-2 w-[1500px] h-[10px] bg-gradient-to-r from-pink-500 to-green-400 rounded-b-full"></div>

      {/* Navigation Menu */}
      <ul className="relative flex justify-between m-2 p-2 bg-white rounded-md shadow-md">
        {items.map((item, idx) => (
          <li key={idx} className="relative">
            {/* Main Menu Button */}
            <button
              className="flex flex-col items-center px-2 py-1 hover:bg-pink-50 rounded-md"
              onClick={() => handleMainItemClick(idx, item.name)}
            >
              <div className="flex items-center gap-1">
                <span className={`text-gray-800 font-semibold font-md ${selectedItem === item.name ? 'text-pink-500 font-bold' : ''}`}>
                  {item.name}
                </span>
                {item.dropdownItems.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 text-pink-500 transition-transform ${activeDropdown === idx ? 'transform rotate-180' : ''}`}
                  />
                )}
              </div>
              {selectedItem === item.name && (
                <span className="w-full h-[1px] bg-pink-500 mt-1 rounded-md"></span>
              )}
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === idx && item.dropdownItems.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-pink-600 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  {item.dropdownItems.map((dropdownItem, dropIdx) => (
                    <li key={dropIdx}>
                      <button
                        className="w-full text-left px-4 py-2 text-pink-400 hover:text-pink-600 hover:bg-white text-sm border border-gray-100"
                        onClick={handleDropdownItemClick}
                      >
                        {dropdownItem}
                      </button>
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

