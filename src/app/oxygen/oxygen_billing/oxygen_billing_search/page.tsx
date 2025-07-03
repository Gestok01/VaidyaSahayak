"use client"; // Add this for client-side interactivity
import React, { useState } from "react";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";

const Page = () => {
  // State for search queries with proper typing
  const [searchQueries, setSearchQueries] = useState([
    {
      name: "ID",
      placeholder: "Search by ID",
      value: "",
    },
    {
      name: "Patient Name",
      placeholder: "Search by Patient Name",
      value: "",
    },
    {
      name: "Date",
      placeholder: "Select Date",
      value: "",
      type: "date" // Explicit type for date fields
    }
  ]);

  // Search handler function
  const handleSearch = () => {
    console.log("Search parameters:", searchQueries);
    // Add your actual search logic here
    // Example: fetchData(searchQueries);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-500 text-xl font-semibold">
          Oxygen
        </span>
        <span className="text-gray-600">&gt;</span>
        <span className="text-gray-600 text-xl font-semibold">
          Oxygen Billing Search
        </span>
      </div>
      
      {/* Dynamic Search Component with all required props */}
      <DynamicSearchPage 
        searchQueries={searchQueries}
        setSearchQueries={setSearchQueries}
        handleSearch={handleSearch}
      />

      {/* You can add your results display component here */}
      {/* <SearchResults data={searchResults} /> */}
    </div>
  );
};

export default Page;