"use client";
import { X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import DynamicBillingModal from "@/app/components/DynamicBillingModal";

const BillModal = ({ isOpen, onClose, billData }) => {
  const [sections, setSections] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const host = process.env.NEXT_PUBLIC_HOST;
  const billRef = useRef(null);

  const fetchData = async () => {
    const response = await axios.post(`${host}/api/v1/appointment/get_appointment_by_id`, {
      appointment_id: "APPT0001",
    });
    const data = response.data.data;
console.log("data", data);
    const sectionTemplates = {
      patientDetails: {
        title: "Patient Details",
        fields: [
          { name: 'patient_name', initialValue: data.patient_name, label: 'Patient Name', editable: false },
          { name: 'phone_number', initialValue: data.phone_number, label: 'Phone Number', editable: false },
          { name: 'age', initialValue: data.age, label: 'Age', editable: false },
          { name: 'gender', initialValue: data.gender, label: 'Gender', editable: false }
        ]
      },
      consultationDetails: {
        title: "Consultation Details",
        fields: [
          { name: 'doctor_name', initialValue: data.doctor_name, label: 'Doctor', editable: false },
          { name: 'appointment_date', initialValue: data.appointment_date, label: 'Date', editable: false },
          { name: 'appointment_time', initialValue: data.appointment_time, label: 'Time', editable: false },
          {
            name: 'status',
            initialValue: data.status,
            label: 'Status',
            editable: false,
            type: 'select',
            options: ['confirmed', 'unconfirmed']
          }
        ]
      },
      paymentInformation: {
        title: "Payment Information",
        fields: [
          { name: 'consultation_fee', initialValue: data.total_bill, label: 'Consultation Fee', editable: false },
          { name: 'total_discount', initialValue: data.total_discount, label: 'Total Discount', editable: true },
          {
            name: 'payment_mode',
            initialValue: data.payment_mode,
            label: 'Payment Mode',
            editable: true,
            type: 'select',
            options: ['cash', 'card', 'UPI']
          },
          {
            name: 'payment_status',
            initialValue: data.payment_status,
            label: 'Payment Status',
            editable: true,
            type: 'select',
            options: ['Paid', 'Pending']
          },
          {
            name: 'amount_paid',
            initialValue: data.paid_amount,
            label: 'Amount Paid',
            editable: true
          },
          {
            name: 'outstanding_amount',
            initialValue: data.outstanding_amount,
            label: 'Outstanding Amount',
            editable: false
          }
        ]
      }
    };

    setSections(sectionTemplates);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
      <div className="bg-white w-full max-w-4xl shadow-lg p-6 overflow-y-auto max-h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">#{billData}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-black">
          <div>
            <label className="block font-semibold">PATIENT ID:
              <span className="ml-2 font-normal">1234567</span>
            </label>
          </div>
          <div>
            <label className="block font-semibold">DATE:
              <span className="ml-2 font-normal">{sections?.consultationDetails?.fields[1]?.initialValue}</span>
            </label>
          </div>
        </div>

        {sections && (
          <DynamicBillingModal
            sections={sections}
            setSections={setSections}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
          />
        )}
      </div>
    </div>
  );
};

export default BillModal;
