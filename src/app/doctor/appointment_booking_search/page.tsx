import React from 'react'
import Link from "next/link";

const page = () => {
  const page_main_name = "Doctor";
  const page_second_name = "Search ";
  return (
    <div>
   <h2 className="text-2xl font-semibold flex gap-1 my-6 px-6">
        <div className="flex gap-2">
          <div className="flex gap-2 text-neutral-400">
            <span>{page_main_name}</span>
            <span>{` > `}</span>
          </div>
          <div className="flex text-slate-700 hover:cursor-pointer">
            <Link href="/doctor/appointment_billing_search">
              {page_second_name}
            </Link>
          </div>
        
          
        </div>

        
      </h2>
    </div>
  )
}

export default page