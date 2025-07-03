"use client";
import React, { useState } from "react";
import Image from "next/image";

import EDIT_SVG from "../../../assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import DOCTOR_APPOINTMENT_LIST from "../../../assets/doctor_appointment_list.json"; // Import your data
import Pagination from "@/app/components/Pagination"; // Import your pagination component
import BillModal from "./BillingModal";
import DynamicTable from "@/app/components/DynamicTable";
// Import your BillModal component (create this!)

interface Appointment {
  billId: string;
  patientName: string;
  phoneNumber: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  totalBill: string;
  paymentStatus: string;
  status: string;
}

const BookAppointmentTable = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Appointment | null>(null);

  const tableHeadings = [
    "APPOINTMENT ID",
    "PATIENT NAME",
    "PHONE NUMBER",
    "DOCTOR NAME",
    "APPOINTMENT DATE",
    "APPOINTMENT TIME",
    "TOTAL BILL",
    "PAYMENT STATUS",
    "STATUS",
    "BILL",
  ];
  

  const handleBillClick = (data: Appointment) => {
    setSelectedBill(data);
    setIsModalOpen(true);
  };

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl">
      

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-300">
        <div className="flex justify-between items-center bg-gray-50 px-6 py-2 border-b border-gray-200">
          <span className="font-semibold">Rate Chart</span>
          <button className="flex items-center text-pink-600 transition duration-300 hover:text-pink-500">
            Edit
            <Image src={EDIT_SVG} width={12} height={18} alt="edit" />
          </button>
        </div>
        <div>


        <DynamicTable
        tableHeadings={tableHeadings}
        tableDataKeys={Object.keys(DOCTOR_APPOINTMENT_LIST[0])}
        tableData={DOCTOR_APPOINTMENT_LIST}
        BillModal={BillModal}
      />
        </div>
        <Pagination /> {/* Your pagination component */}
      </div>
    </div>
  );
};

export default BookAppointmentTable;
