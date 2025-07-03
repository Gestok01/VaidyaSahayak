'use client'
import CANCEL_SVG from '@/assets/svg/block_24dp_FF94D6_FILL0_wght400_GRAD0_opsz24.svg';
import DynamicTable from '@/app/components/DynamicTable';
import React, { useState } from 'react'
import DOCTOR_PAYMENT_DATA from '@/assets/doctors_payment.json'
import Image from 'next/image';
import EDIT_SVG from '@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg'
const DoctorPaymentTable = () => {
    const tableHeadings = ["BILL ID", "MEMBERSHIP", "CONSULTING FEE", "APPOINTMENT DATE", "CLINIC'S CUT", "DOCTOR'S CUT", "DISCOUNT", "PAYMENT STATUS", "CREATED AT"];
const [editModeOn,setEditModeOn] = useState(false);
    const [editableSlNo, 
      setEditableSlNo] = useState(null)
    console.log(DOCTOR_PAYMENT_DATA);
  return (
    <div>
      <div
                    
                     className="flex justify-between items-center bg-gray-50 px-6 py-2 border-x-2 border-t-2 rounded-t-md  border-gray-200">
                                    <span className="font-semibold text-xs font-normal">All appointments (25-09-2025)</span>
                                  {
                                    editModeOn === false ?   <button
                                    onClick={()=>{setEditModeOn(true)}}
                                     className="flex gap-2 items-center text-sm font-medium  transition duration-300 ">
                                    Edit Payment Status
                                    <Image src={EDIT_SVG} width={18} height={18} alt="edit" />
                                  </button> :   <button
                                  onClick={()=>{setEditModeOn(false); setEditableSlNo(null)}}
                                  className="flex gap-2 items-center text-sm font-medium  transition duration-300 ">
                                      Cancel
                                      <Image src={CANCEL_SVG} width={18} height={18} alt="edit" />
                                    </button>
                                  }
                    
                                  </div>
        <DynamicTable 
         editableSlNo={editableSlNo}
         setEditableSlNo={setEditableSlNo}
        isEditModeOn={editModeOn}
        containBill={false} tableHeadings={tableHeadings} tableData={DOCTOR_PAYMENT_DATA} tableDataKeys={Object.keys(DOCTOR_PAYMENT_DATA[0])}/>
    </div>
  )
}

export default DoctorPaymentTable