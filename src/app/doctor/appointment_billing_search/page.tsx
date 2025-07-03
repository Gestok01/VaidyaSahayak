'use client';
import React, { useState } from "react";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleSearch = () => {
    const params = new URLSearchParams();
    searchQueries.forEach((query) => {
      if(query.value) params.append(query.name, query.value);
      
    })
    router.push(`/doctor/appointment_billing_search/appointment_billing?${params.toString()}`);
   
   
  }
  const [searchQueries,setSearchQueries] = useState(
    [{
      name: 'billId',
      placeholder: 'Bill Id'
    },
    {
      name: 'patientName',
      placeholder: 'Patient Name'
    },
    {
      name: 'phoneNumber',
      placeholder: 'Phone Number'
    },
    {
      name: 'doctorName',
      placeholder: 'Doctor Name'
    },
    {
      name: 'date',
      placeholder: 'Date'
    }])
  return (
    <div>
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-600 text-xl font-semibold">Doctor</span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Appointment Billing
          </span>
        </div>

        {/* Search Filter Card */}
        <DynamicSearchPage
         searchQueries = {searchQueries}
         setSearchQueries = {setSearchQueries}
         handleSearch = {handleSearch}
        />
      </div>
    </div>
  );
};

export default Page;
