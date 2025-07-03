"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import DynamicSearchPage from '@/app/components/DynamicSearchPage';
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const heading = (
    <span>
      <span className="text-[#999999]">Diagnostics</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Diagnostic Report Search</span>
    </span>
  );
  const handleSearch = () => {
    const params = new URLSearchParams();
    searchQueries.forEach((query) => {
      if(query.value) params.append(query.name, query.value);
      
    })
    router.push(`/diagnostics/diagnostic_report_search/diagnostic_report?${params.toString()}`);
   
   
  }
const [searchQueries,setSearchQueries] = useState(
    [{
      name: 'id',
      placeholder: 'Id'
    },
    {
      name: 'testName',
      placeholder: 'Test Name'
    },
    {
      name: 'date',
      placeholder: 'Date'
    }])

  return (
    <div className="min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
      <div className="p-6 min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[#475467] dark:text-white">{heading}</h1>
        </header>

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