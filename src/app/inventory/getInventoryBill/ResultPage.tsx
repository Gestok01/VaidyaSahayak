"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "../../components/DynamicTable";
import BillModal from "./BillModal";
export default function IssueOrderResultsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [editableSlNo, setEditableSlNo] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Sample data for the issue materials table
  const issueMaterialsData = [
    {
      slNo: 1,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 2,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 3,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 4,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 5,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 6,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 7,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 8,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 9,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
    {
      slNo: 10,
      "EMPLOYEE ID": "XXXX",
      "ISSUE DATE": "DD-MM-YY",
      "CREATED AT": "DD-MM-YY",
      "CREATED BY": "LOREM",
      "REMARK": "LOREM",
    },
  ];

  // Table headings and data keys
  const tableHeadings = ["EMPLOYEE ID", "ISSUE DATE", "CREATED AT", "CREATED BY", "REMARK", ""];
  const tableDataKeys = ["EMPLOYEE ID", "ISSUE DATE", "CREATED AT", "CREATED BY", "REMARK"];

  // Simulate loading data
  useEffect(() => {
    // This would be replaced with your actual data fetching logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);



  // Go back to search page
  const handleNewSearch = () => {
    router.push("/inventory-management/issue-order/search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white mt-20">     
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Issue Materials Details</h1>
          
          <div className="flex items-center space-x-4">
         
            
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Purchase ID" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            {/* Table Component */}
            <DynamicTable 
              tableData={issueMaterialsData}
              tableDataKeys={tableDataKeys}
              tableHeadings={tableHeadings}
              containBill={true}
              isEditModeOn={false}
              editableSlNo={editableSlNo}
              setEditableSlNo={setEditableSlNo}
              BillModal={BillModal}
            />
            
            {/* Pagination */}
            <div className="flex justify-end mt-6">
              <div className="flex items-center space-x-2">
                <button 
                  className="flex items-center text-pink-500 px-3 py-1 rounded hover:bg-pink-50"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                          ${currentPage === pageNum ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-pink-50'}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="flex items-center justify-center w-8 h-8 text-gray-500">...</span>
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                          ${currentPage === 8 ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-pink-50'}`}
                        onClick={() => setCurrentPage(8)}
                      >
                        8
                      </button>
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                          ${currentPage === 9 ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-pink-50'}`}
                        onClick={() => setCurrentPage(9)}
                      >
                        9
                      </button>
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                          ${currentPage === 10 ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-pink-50'}`}
                        onClick={() => setCurrentPage(10)}
                      >
                        10
                      </button>
                    </>
                  )}
                </div>
                
                <button 
                  className="flex items-center text-pink-500 px-3 py-1 rounded hover:bg-pink-50"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}