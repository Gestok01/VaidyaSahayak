import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import React from 'react'

const page = () => {
    const searchTags = ["Doctor Name"];
  return (
    <div className="text-2xl m-6">

    <div className="flex items-center gap-2 mb-6">
          <span className="text-pink-400 text-xl font-semibold">
          ₹
          </span>
          <span className="text-gray-500 text-xl font-semibold">
            Costing
          </span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-gray-500 text-xl font-semibold">
            Doctor
          </span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-gray-500 text-xl font-semibold">
            Get
          </span>
          <span className="text-gray-500">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Doctor Search
          </span>
        </div>
      
      <DynamicSearchPage tags={searchTags} />
    </div>
  )
}

export default page;