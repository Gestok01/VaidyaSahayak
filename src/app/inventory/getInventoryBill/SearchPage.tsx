"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DynamicSearchPage from "../../components/DynamicSearchPage";
import Header from "../../components/Header"; 

export default function IssueOrderSearchPage() {
  const router = useRouter();
  
  const searchTags = ["Issue ID", "From", "To"];

  const handleSearchClick = () => {
    router.push("/inventory/getInventoryBill/results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="px-8 py-4">
        <div className="flex items-center text-gray-600">
          <Link href="/inventory-management" className="text-pink-500 flex items-center">
            <span className="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Inventory Management
          </Link>
          <span className="mx-2">›</span>
          <Link href="/inventory-management/issue-order" className="hover:text-pink-500">Issue order</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">Search</span>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Search Issue Orders</h1>
        </div>
        
        {/* Search Component with onSearchClick prop to navigate to results page */}
        <DynamicSearchPage 
          tags={searchTags} 
          onSearchClick={handleSearchClick} 
        />
      </div>
    </div>
  );
}