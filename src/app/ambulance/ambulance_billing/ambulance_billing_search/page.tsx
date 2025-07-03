import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import Header from '@/app/components/Header';
import NavBar from '@/app/components/NavBar';
import React from 'react';

const Page = () => {
  const heading1 = "Ambulance";
  const heading2 = "Ambulance Billing Search";
  const searchTags = ["ID", "Patient Name", "Patient Phone Number"];

  return (
    <div>
      <Header />
      <NavBar />
      
      <p className="text-2xl my-4 mx-4">{heading1}</p>

      <div className="text-2xl m-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-500 text-xl font-semibold">{heading1}</span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">{heading2}</span>
        </div>

        <DynamicSearchPage tags={searchTags} />
      </div>
    </div>
  );
};

export default Page;
