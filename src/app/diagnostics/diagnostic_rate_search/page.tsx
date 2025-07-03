"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from "next/navigation";
import DynamicSearchPage from '@/app/components/DynamicSearchPage';

// Define types for the search query objects
type SearchQuery = {
  name: string;
  placeholder: string;
  value?: string;
  options?: string[];
};

const Page = () => {
  const router = useRouter();
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    searchQueries.forEach((query) => {
      if(query.value) params.append(query.name, query.value);
    });
    router.push(`/diagnostics/diagnostic_rate_search/diagnostic_rates?${params.toString()}`);
  };

  const [searchQueries, setSearchQueries] = useState<SearchQuery[]>([
    {
      name: 'category',
      placeholder: 'Category',
      options: ['Cardiology', 'Neurology']
    },
    {
      name: 'status',
      placeholder: 'Status',
      options: ['Active', 'Inactive']
    },
    {
      name: 'testName',
      placeholder: 'Test Name',
    }
  ]);

  // These state variables aren't being used in your JSX - consider removing them
  const [category, setCategory] = useState<string>("Category");
  const [status, setStatus] = useState<string>("Status");
  const [testName, setTestName] = useState<string>("");

  const handleTestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setTestName(value);
  };

  const heading = (
    <span>
      <span className="text-[#999999]">Diagnostics</span> &gt;{" "}
      <span className="text-[#4D4D4D]">Diagnostic Rate Search</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
      <div className="p-6 min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[#475467] dark:text-white">{heading}</h1>
        </header>

        {/* Search Filter Card */}
        <DynamicSearchPage
          searchQueries={searchQueries}
          setSearchQueries={setSearchQueries}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Page;