"use client";
import React, { useState } from "react";

const BillSearchInitial = ({ onSearch }) => {
  const [billType, setBillType] = useState("");
  const [billId, setBillId] = useState("");

  const placeholderMap = {
    ambulance_bill: "Ambulance Bill ID",
    oxygen_bill: "Oxygen Bill ID",
    vaccine_bill: "Vaccine Bill ID",
    pharmacy_bill: "Pharmacy Bill ID",
    appointment_bill: "Appointment Bill ID",
    test_bill: "Test Bill ID",
  };

  const isSearchEnabled = billType && billId;

  const handleSearch = () => {
    if (isSearchEnabled && onSearch) {
      onSearch({ billType, billId });
    }
  };

  return (
    <div className="p-[1px] bg-gradient-to-r from-pink-500 to-[#B3DB8A] rounded-lg w-fit">
      <div className="p-4 bg-white rounded-lg shadow-lg inline-flex gap-3 items-center">
        <select
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          className="border border-[#999999] rounded-md text-xs px-2 py-2 text-[#4D4D4D] w-48"
        >
          <option value="">Select Bill Type</option>
          <option value="appointment_bill">Appointment Bill</option>
          <option value="ambulance_bill">Ambulance Bill</option>
          <option value="vaccine_bill">Vaccine Bill</option>
          <option value="oxygen_bill">Oxygen Bill</option>
          <option value="pharmacy_bill">Pharmacy Bill</option>
          <option value="test_bill">Test Bill</option>
        </select>

        <input
          type="text"
          value={billId}
          onChange={(e) => setBillId(e.target.value)}
          placeholder={billType ? placeholderMap[billType] : "Select bill type"}
          className="border border-[#999999] rounded-md text-xs px-3 py-2 text-[#4D4D4D] w-64"
        />

        <button
          disabled={!isSearchEnabled}
          onClick={handleSearch}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md border border-white shadow transition-colors ${
            isSearchEnabled
              ? "bg-[#FB009C] text-white hover:bg-pink-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default BillSearchInitial;
