"use client";

import React, { useState } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface DiscountItem {
  item: string;
  itemDiscount: string;
}

const MembershipDiscountPage = () => {
  const router = useRouter();
  const [entries, setEntries] = useState<DiscountItem[]>([]);
  const [formValues, setFormValues] = useState<DiscountItem>({
    item: "",
    itemDiscount: "",
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "itemDiscount") {
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
    if (!formValues.item) {
      alert("Item is required");
      return false;
    }
    if (!formValues.itemDiscount) {
      alert("Item Discount is required");
      return false;
    }
    return true;
  };

  const addEntry = () => {
    if (!validateForm()) return;

    setEntries([...entries, formValues]);
    setFormValues({
      item: "",
      itemDiscount: "",
    });
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful save
      setEntries([]);
      setFormValues({
        item: "",
        itemDiscount: "",
      });
      
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("idle");
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="ml-4 p-4 flex items-center gap-3 -mt-7">
        <span className="text-[#999999] text-xl font-semibold">Membership</span>
        <span className="text-[#999999] text-[40px] pb-2">&rsaquo;</span>
        <span className="text-[#999999] text-xl font-semibold">Add</span>
        <span className="text-[#999999] text-[40px] pb-2">&rsaquo;</span>
        <span className="text-[#999999] text-xl font-semibold">Membership Details</span>
        <span className="text-[#999999] text-[40px] pb-2">&rsaquo;</span>
        <span className="text-[#4D4D4D] text-xl font-semibold">Membership Discount</span>
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
                Discount Information
              </h2>
              <button
                className="text-[#FB009C] text-xs font-medium flex items-center"
                onClick={addEntry}
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {/* Item */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                Item
                <span className="text-prd-fix-value-indicator-negative">*</span>
              </label>
              <input
                type="text"
                name="item"
                placeholder="Enter item name"
                value={formValues.item}
                onChange={handleInputChange}
                className="w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* Item Discount */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                Item Discount
                <span className="text-prd-fix-value-indicator-negative">*</span>
              </label>
              <input
                type="text"
                name="itemDiscount"
                placeholder="Enter discount"
                value={formValues.itemDiscount}
                onChange={handleInputChange}
                className="w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Table */}
          {entries.length > 0 && (
            <div className="w-full bg-white rounded-md border border-[#999999] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#E6F3D8]">
                  <tr>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left">
                      Item
                    </th>
                    <th className="px-4 py-2 text-[10px] font-normal text-[#1A1A1A] uppercase text-left">
                      Discount
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
                        {entry.item || "--"}
                      </td>
                      <td className="px-4 py-3 text-[10px] font-normal text-[#1A1A1A]">
                        {entry.itemDiscount || "--"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className="text-[#FB009C]"
                          onClick={() => removeEntry(index)}
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

      {/* Save Button */}
      <div className="ml-8 max-w-[1480px] flex justify-end mt-4">
        <button
          className={`px-4 py-2 rounded-md text-xs font-medium border border-white shadow-sm flex items-center justify-center gap-2 ${
            saveStatus === "saved" 
              ? "bg-[#B3DB8A] text-[#1A1A1A]"
              : entries.length > 0
                ? "bg-[#FB009C] text-white shadow-[#FB009C]/80"
                : "bg-[#FF94D6] text-white shadow-[#FB009C]/80 opacity-50 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={entries.length === 0 || saveStatus === "saving" || saveStatus === "saved"}
        >
          {saveStatus === "saved" ? (
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

export default MembershipDiscountPage;