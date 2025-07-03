import React from "react";
import { Search } from "lucide-react";
const BillSearch = () => {
  return (
    <div>
     
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-600 text-xl font-semibold">Ambulance</span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Ambulance Billing
          </span>
        </div>

        {/* Search Filter Card */}
        <div className="relative p-[1.5px] rounded-lg bg-gradient-to-r from-pink-500 to-green-400 w-3/6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex gap-4 items-center">
              <div className="relative w-[200px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Bill ID"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="relative w-[200px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Patient Name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Patient Phone Number"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-md text-sm font-medium border border-white shadow-[0px_1px_2px_rgba(251,0,156,1)] hover:bg-pink-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSearch;
