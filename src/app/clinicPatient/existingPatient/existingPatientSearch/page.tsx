import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import React from 'react'

const page = () => {
    const heading1 = "Ambulance "
    const heading2 = "Ambulance Billing Search"
    const searchTags = ["ID", "Patient Name", "Patient Phone Number", "From", "To"];
  return (
    <div className="text-2xl m-6">

    <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-500 text-xl font-semibold">
            Clinic Patient
          </span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-gray-600 text-xl font-semibold">
            Existing Patient Profile Search
          </span>
        </div>
      
      <DynamicSearchPage tags={searchTags} />
    </div>
  )
}

export default page;