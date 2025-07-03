"use client";
import React from "react";
import BookingFormManager, { BookingSection } from "@/app/components/DynamicBooking";
import axios from 'axios';

const DoctorConsultationBooking = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  
  const patientSection: BookingSection = {
    id: 'patient',
    allowMultipleEntries: false,
    title: 'Patient Information',
    fields: [
      [
        { 
          id: 'phone', 
          label: 'Phone Number', 
          type: 'tel', 
          placeholder: '+91 XXXXX XXXXX', 
          required: true,
          pattern: '[0-9+\\s]*', 
          inputMode: 'tel'
        },
        { 
          id: 'name', 
          label: 'Patient Name', 
          type: 'text', 
          placeholder: 'Name', 
          required: true 
        },
        { 
          id: 'age', 
          label: 'Age', 
          type: 'text', 
          placeholder: 'Age', 
          required: false,
          pattern: '[0-9]*', 
          inputMode: 'numeric'
        },
        {
          id: 'gender',
          label: 'Gender',
          type: 'select',
          required: false,
          options: [
            { value: '', label: 'Select' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Others', label: 'Others' }
          ]
        }
      ]
    ],
    tableColumns: [
      { id: 'phone', header: 'Phone Number', accessor: 'phone' },
      { id: 'name', header: 'Patient Name', accessor: 'name' },
      { id: 'age', header: 'Age', accessor: 'age' },
      { id: 'gender', header: 'Gender', accessor: 'gender' }
    ],
    initialFormState: {
      phone: '',
      name: '',
      age: '',
      gender: ''
    },
    validation: (formData) => {
      if (!formData.phone) return 'Phone number is required';
      if (!formData.name) return 'Patient name is required';
      return null;
    }
  };

  const appointmentSection: BookingSection = {
    id: 'appointment',
    allowMultipleEntries: true,
    title: 'Appointment Details',
    fields: [
      [
        {
          id: 'doctorName',
          label: 'Doctor Name',
          type: 'text',
          placeholder: "Enter doctor's name",
          required: true,
          width: 'fifth'
        },
        {
          id: 'specialization',
          label: 'Specialization',
          type: 'text',
          placeholder: "Enter specialization",
          required: false,
          width: 'fifth'
        },
        {
          id: 'appointmentDate',
          label: 'Appointment Date',
          required: false,
          type: 'date',
          placeholder: 'DD-MM-YYYY',
          width: 'fifth'
        },
        {
          id: 'appointmentTime',
          label: 'Appointment Time',
          type: 'time',
          placeholder: 'Select time',
          required: false, // Made optional
          width: 'fifth'
        },
        {
          id: 'location',
          label: 'Location',
          type: 'text',
          placeholder: 'Enter location',
          required: false, // Made optional
          width: 'fifth'
        }
      ],
      [
        {
          id: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          defaultValue: 'Pending', // Set default to Pending
          options: [
            { value: 'Pending', label: 'Pending' },
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'Cancelled', label: 'Cancelled' }
          ],
          width: 'full'
        }
      ]
    ],
    tableColumns: [
      { id: 'doctorName', header: 'Doctor Name', accessor: 'doctorName' },
      { id: 'specialization', header: 'Specialization', accessor: 'specialization' },
      { id: 'appointmentDate', header: 'Appointment Date', accessor: 'appointmentDate' },
      { id: 'appointmentTime', header: 'Appointment Time', accessor: 'appointmentTime' },
      { id: 'location', header: 'Location', accessor: 'location' },
      { id: 'status', header: 'Status', accessor: 'status' }
    ],
    initialFormState: {
      doctorName: '',
      specialization: '',
      appointmentDate: '',
      appointmentTime: '',
      location: '',
      status: 'Pending' // Set default status to Pending
    },
    validation: (formData) => {
      if (!formData.doctorName) return 'Doctor name is required';
      if (!formData.status) return 'Status is required';
      return null;
    }
  };

  const paymentSection: BookingSection = {
    id: 'payment',
    allowMultipleEntries: false,
    title: 'Payment Details',
    showMemberToggle: true,
    fields: [
      [
        {
          id: 'paidAmount',
          label: 'Paid Amount',
          type: 'text',
          placeholder: '0',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          defaultValue: '0'
        },
        {
          id: 'totalDiscount',
          label: 'Discount',
          type: 'text',
          placeholder: '0',
          inputMode: 'numeric',
          required: true,
          defaultValue: '0'
        },
        {
          id: 'consultationFee',
          label: 'Consultation Fee',
          type: 'text',
          placeholder: '0',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          defaultValue: '0',
          calculateValue: (formData) => {
            // If payment status is Refunded, set consultation fee to 0
            if (formData.paymentStatus === 'Refunded') {
              return '0';
            }
            return formData.consultationFee || '0';
          },
          dependsOn: ['paymentStatus']
        },
        {
          id: 'totalBill',
          label: 'Total Bill',
          type: 'text',
          placeholder: '0',
          inputMode: 'numeric',
          pattern: '[0-9]*',
          required: true,
          defaultValue: '0',
          calculateValue: (formData) => {
            const consultationFee = parseFloat(formData.consultationFee) || 0;
            const discount = parseFloat(formData.totalDiscount) || 0;
            const total = consultationFee - discount;
            return Math.max(0, total).toFixed(2);
          },
          dependsOn: ['consultationFee', 'totalDiscount']
        },
        {
          id: 'outstandingAmount',
          label: 'Outstanding Amount',
          type: 'text',
          placeholder: '0',
          readOnly: true,
          calculateValue: (formData) => {
            const totalBill = parseFloat(formData.totalBill) || 0;
            const paidAmount = parseFloat(formData.paidAmount) || 0;
            const due = totalBill - paidAmount;
            
            // Update payment status
            if (formData.paidAmount !== undefined) {
              if (paidAmount <= 0) {
                formData.paymentStatus = 'Unpaid';
              } else if (due <= 0) {
                formData.paymentStatus = 'Paid';
              } else {
                formData.paymentStatus = 'Partially Paid';
              }
            }
            
            return Math.max(0, due).toFixed(2);
          },
          dependsOn: ['totalBill', 'paidAmount', 'paymentStatus']
        }
      ],
      [
        {
          id: 'paymentStatus',
          label: 'Payment Status',
          type: 'select',
          required: true,
          defaultValue: 'Unpaid',
          options: [
            { value: 'Unpaid', label: 'Unpaid' },
            { value: 'Partially Paid', label: 'Partially Paid' },
            { value: 'Paid', label: 'Paid' },
            { value: 'Refunded', label: 'Refunded' }
          ]
        },
        {
          id: 'paymentMode',
          label: 'Payment Mode',
          type: 'select',
          required: true,
          defaultValue: 'Cash',
          options: [
            { value: 'Cash', label: 'Cash' },
            { value: 'Card', label: 'Card' },
            { value: 'UPI', label: 'UPI' },
            { value: 'Net Banking', label: 'Net Banking' }
          ]
        }
      ]
    ],
    tableColumns: [
      { id: 'paidAmount', header: 'Paid Amount', accessor: 'paidAmount' },
      { id: 'totalDiscount', header: 'Discount', accessor: 'totalDiscount' },
      { id: 'consultationFee', header: 'Consultation Fee', accessor: 'consultationFee' },
      { id: 'totalBill', header: 'Total Bill', accessor: 'totalBill' },
      { id: 'outstandingAmount', header: 'Outstanding Amount', accessor: 'dueAmount' },
      { id: 'paymentStatus', header: 'Payment Status', accessor: 'paymentStatus' },
      { id: 'paymentMode', header: 'Payment Mode', accessor: 'paymentMode' }
    ],
    initialFormState: {
      paidAmount: '0',
      totalDiscount: '0',
      consultationFee: '0',
      totalBill: '0',
      dueAmount: '0',
      paymentStatus: 'Unpaid',
      paymentMode: 'Cash'
    },
    validation: (formData) => {
      if (!formData.paidAmount) return 'Paid amount is required';
      if (!formData.totalDiscount) return 'Discount is required';
      if (!formData.consultationFee) return 'Consultation fee is required';
      if (!formData.paymentStatus) return 'Payment status is required';
      if (!formData.paymentMode) return 'Payment mode is required';
      return null;
    }
  };

  const generateUniqueId = (prefix: string) => `${prefix}${Math.floor(10000 + Math.random() * 90000)}`;

  const handleSave = async (allEntries: { [key: string]: any[] }) => {
    const { patient, appointment, payment } = allEntries;
    
    const data = {
      clinic_id: generateUniqueId("CLN"),
      appointment_id: generateUniqueId("APT"),
      doctor_id: generateUniqueId("DOC"),
      doctor_name: appointment[0]?.doctorName,
      patient_id: generateUniqueId("PAT"),
      patient_name: patient[0]?.name,
      phone_number: patient[0]?.phone,
      age: patient[0]?.age || "N/A",
      gender: patient[0]?.gender,
      is_member: "Yes",
      created_by: "admin123",
      status: appointment[0]?.status || 'Pending',
      payment_mode: payment[0]?.paymentMode,
      payment_status: payment[0]?.paymentStatus,
      appointment_date: appointment[0]?.appointmentDate || new Date().toISOString().split("T")[0],
      appointment_time: appointment[0]?.appointmentTime || '',
      consultation_fee: payment[0]?.paymentStatus === 'Refunded' ? 0 : (parseFloat(payment[0]?.consultationFee) || 0),
      location: appointment[0]?.location || '',
      paid_amount: parseFloat(payment[0]?.paidAmount) || 0,
      total_discount: parseFloat(payment[0]?.totalDiscount) || 0,
      total_bill: parseFloat(payment[0]?.totalBill) || 0,
      outstanding_amount: parseFloat(payment[0]?.dueAmount) || 0,
      transaction_id: generateUniqueId("TXN"),
      updated_at: new Date().toISOString()
    };

    console.log(data);
    try {
      const res = await axios.post(`${host}/api/v1/appointment/create_appointment_booking`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      alert('Appointment booking saved successfully!');
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Error saving appointment booking!');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="ml-4 p-4 flex items-center gap-2">
        <span className="text-gray-400 text-xl">Doctor</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-700 text-xl font-semibold">Search</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-700 text-xl font-semibold">
          Consultation Booking
        </span>
      </div>

      <BookingFormManager
        bookingType="Consultation"
        sections={[patientSection, appointmentSection, paymentSection]}
        onSave={handleSave}
        hideDefaultHeader={true}
        showPatientId={true}
      />
    </div>
  );
};

export default DoctorConsultationBooking;