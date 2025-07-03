"use client";
import React, { useState } from "react";

const Page = () => {
  const heading = "Doctor > Doctor's Payment Search";
  const [doctor, setDoctor] = useState("Select Doctor");
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 light:bg-neutral-900">
     
      <div className="max-w-3xl  mx-2 mt-6 p-6 bg-white :bg-neutral-950 rounded-lg shadow-lg border border-pink-500">
        {/* Breadcrumb */}
        <div className=" gap-2 mb-6">{heading}</div>

        {/* Search Fields */}
        <div className="flex  gap-4 mb-4">
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="border w-1/2 border-pink-300 dark:border-pink-600 rounded-lg px-3 py-2 bg-white :bg-neutral-900 text-pink-800 dark:text-pink-200 focus:outline-none"
          >
            <option value="def">Select Doctor</option>
            <option value="Doctor 1">Doctor 1</option>
            <option value="Doctor 2">Doctor 2</option>
            <option value="Doctor 3">Doctor 3</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border w-1/2 border-pink-300 dark:border-pink-600 rounded-lg px-3 py-2 bg-white :bg-neutral-900 text-pink-800 dark:text-pink-200 focus:outline-none"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-pink-400 dark:bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-400 transition-transform transform hover:scale-105">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
