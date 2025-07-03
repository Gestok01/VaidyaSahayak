import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import React from 'react'

const page = () => {
    const heading = "Report > Vaccine Report Search"
  return (
    <div>
      
        <p className='my-2 px-4'>{heading}</p>
        <DynamicSearchPage tags={["ID","Vaccine Name", "date"]} />
    </div>
  )
}

export default page