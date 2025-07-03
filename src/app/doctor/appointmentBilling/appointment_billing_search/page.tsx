import React from "react";
import Header from "@/app/components/Header";
import NavBar from "@/app/components/NavBar";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";

const Page = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-600 text-xl font-semibold">
            Doctor
          </span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Appointment Billing
          </span> 
        </div> 
 
        {/* Search Filter Card */}
        <DynamicSearchPage tags={["Bill ID", "Patient Name", "Patient Phone Number", "Doctor Name", "date"]} />
      </div>
    </div>
  );
};

export default Page;
