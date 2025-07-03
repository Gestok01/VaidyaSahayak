import React from "react";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";

const Page = () => {
  return (
    <div>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-pink-400 text-xl font-semibold">₹</span>  
          <span className="text-gray-500 text-xl font-semibold">Costing</span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-gray-500 text-xl font-semibold">
          Ambulance Attributes
          </span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
          Search
          </span>
        </div>

        {/* Search Filter Card */}
        <DynamicSearchPage
          tags={[
            "Attribute ID",
            "Attribute Name"
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
