"use client";

import React, { useState } from "react";
import { Trash2, Plus, Check, ArrowRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarMonth } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface MembershipDetails {
  membershipName: string;
  membershipPrice: string;
  timePeriod: string;
}

const MembershipDetailsPage = () => {
  const router = useRouter();
  const [entries, setEntries] = useState<MembershipDetails[]>([]);
  const [formValues, setFormValues] = useState<MembershipDetails>({
    membershipName: "",
    membershipPrice: "",
    timePeriod: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "membershipPrice") {
      const numericValue = value.replace(/[^\d]/g, "");
      setFormValues((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!formValues.membershipName) {
      alert("Membership Name is required");
      return false;
    }
    if (!formValues.membershipPrice) {
      alert("Membership Price is required");
      return false;
    }
    if (!formValues.timePeriod) {
      alert("Time Period is required");
      return false;
    }
    return true;
  };

  const addEntry = () => {
    if (!validateForm()) return;

    setEntries([formValues]);
    setFormValues({
      membershipName: "",
      membershipPrice: "",
      timePeriod: "",
    });
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSaved(true);
    } catch (error) {
      alert("Error saving data. Please try again.");
    }
  };

  const handleNext = () => {
    router.push("/membership/add_members/add_discount");
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="ml-4 p-4 flex items-center gap-3 -mt-7">
        <span className="text-[#999999] text-xl font-semibold">Membership</span>
        <span className="text-[#999999] text-[40px] pb-2">&rsaquo;</span>
        <span className="text-[#999999] text-xl font-semibold">Add</span>
        <span className="text-[#999999] text-[40px] pb-2">&rsaquo;</span>
        <span className="text-[#4D4D4D] text-xl font-semibold">Membership Details</span>
      </div>

      {/* Main Form Container */}
      <div className="ml-8 max-w-[1480px] bg-white rounded-lg border border-[#999999] mb-4">
        <div className="p-4 relative">
          {/* Membership Details Header Bar */}
          <div className="w-full bg-white mb-1">
            <h3 className="text-xs font-medium text-[#1A1A1A] text-left">
              Membership Details
            </h3>
          </div>

          {/* Full-width Line Separator */}
          <div className="absolute left-0 right-0 h-[0.5px] bg-[#999999] top-[40px]"></div>

          {/* Section Header */}
          <div className="flex justify-between items-center mt-6 mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-semibold">
                Membership Details
              </h2>
              {entries.length === 0 && !isSaved && (
                <button
                  className="text-[#FB009C] text-xs font-medium flex items-center"
                  onClick={addEntry}
                >
                  Add
                </button>
              )}
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {/* Membership Name */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                Membership Name
                <span className="text-prd-fix-value-indicator-negative">*</span>
              </label>
              <input
                type="text"
                name="membershipName"
                placeholder="Enter membership name"
                value={formValues.membershipName}
                onChange={handleInputChange}
                readOnly={entries.length > 0 || isSaved}
                disabled={entries.length > 0 || isSaved}
                className={`w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  entries.length > 0 || isSaved ? "bg-[#E6E6E6] cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Membership Price */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                Membership Price
                <span className="text-prd-fix-value-indicator-negative">*</span>
              </label>
              <input
                type="text"
                name="membershipPrice"
                placeholder="Enter price"
                value={formValues.membershipPrice}
                onChange={handleInputChange}
                readOnly={entries.length > 0 || isSaved}
                disabled={entries.length > 0 || isSaved}
                className={`w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  entries.length > 0 || isSaved ? "bg-[#E6E6E6] cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Time Period */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                Time Period
                <span className="text-prd-fix-value-indicator-negative">*</span>
              </label>
              <select
                name="timePeriod"
                value={formValues.timePeriod}
                onChange={handleInputChange}
                className={`w-full p-2 text-xs text-[#383838] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  entries.length > 0 || isSaved ? "bg-[#E6E6E6] cursor-not-allowed" : ""
                }`}
                disabled={entries.length > 0 || isSaved}
              >
                <option value="">Select time period</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {entries.length > 0 && (
            <div className={`w-full bg-white rounded-md border border-[#999999] overflow-hidden ${
              isSaved ? "opacity-75" : ""
            }`}>
              <table className="w-full">
                <thead className="bg-[#E6F3D8]">
                  <tr>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left">
                      Membership Name
                    </th>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left">
                      Price
                    </th>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left">
                      Time Period
                    </th>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={index} className="border-t border-[#E6E6E6]">
                      <td className="px-4 py-3 text-[10px] font-normal text-[#1A1A1A]">
                        {entry.membershipName || "--"}
                      </td>
                      <td className="px-4 py-3 text-[10px] font-normal text-[#1A1A1A]">
                        {entry.membershipPrice || "--"}
                      </td>
                      <td className="px-4 py-3 text-[10px] font-normal text-[#1A1A1A]">
                        {entry.timePeriod || "--"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className={`text-[#FB009C] ${isSaved ? "cursor-not-allowed opacity-50" : ""}`}
                          onClick={() => !isSaved && setEntries([])}
                          disabled={isSaved}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Save and Next Buttons */}
      <div className="ml-8 max-w-[1480px] flex justify-end mt-4 gap-4">
        {isSaved && (
          <button
            className="px-4 py-2 rounded-md text-xs font-medium border border-white shadow-sm flex items-center justify-center gap-2 bg-[#FB009C] text-white shadow-[#FB009C]/80"
            onClick={handleNext}
          >
            Next
            <ArrowRight size={16} />
          </button>
        )}
        <button
          className={`px-4 py-2 rounded-md text-xs font-medium border border-white shadow-sm flex items-center justify-center gap-2 ${
            isSaved 
              ? "bg-[#B3DB8A] text-[#1A1A1A]"
              : entries.length > 0
                ? "bg-[#FB009C] text-white shadow-[#FB009C]/80"
                : "bg-[#FF94D6] text-white shadow-[#FB009C]/80 opacity-50 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={entries.length === 0 || isSaved}
        >
          {isSaved ? (
            <>
              <Check size={16} />
              Saved
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default MembershipDetailsPage;