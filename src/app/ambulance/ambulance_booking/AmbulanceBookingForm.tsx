"use client";
import React from "react";
import BookingFormManager, { BookingSection } from "@/app/components/DynamicBooking";
import axios from "axios";

const AmbulanceBookingPage = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const currentDate = new Date().toISOString().split('T')[0];
  
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
          placeholder: 'Patient Name', 
          required: true 
        },
        { 
          id: 'bookingDate',
          label: 'Booking Date',
          type: 'date',
          defaultValue: currentDate,
          required: true
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
            { value: 'Others', label: 'Others' },
          ]
        },
        { 
          id: 'age', 
          label: 'Age', 
          type: 'text', 
          placeholder: '25', 
          required: false,
          pattern: '[0-9]*', 
          inputMode: 'numeric'
        }
      ]
    ],
    tableColumns: [
      { id: 'phone', header: 'Phone Number', accessor: 'phone' },
      { id: 'name', header: 'Patient Name', accessor: 'name' },
      { id: 'bookingDate', header: 'Booking Date', accessor: 'bookingDate' },
      { id: 'gender', header: 'Gender', accessor: 'gender' },
      { id: 'age', header: 'Age', accessor: 'age' }
    ],
    initialFormState: {
      phone: '',
      name: '',
      bookingDate: currentDate,
      age: '',
      gender: '',
    },
    validation: (formData) => {
      if (!formData.phone) return 'Phone number is required';
      if (!formData.name) return 'Patient name is required';
      if (!formData.bookingDate) return 'Booking date is required';
      return null;
    }
  };

  const ambulanceSection: BookingSection = {
    id: 'ambulance',
    allowMultipleEntries: true,
    title: 'Ambulance Details',
    fields: [
      [
        {
          id: 'pickupLocation',
          label: 'Pickup Location',
          type: 'text',
          placeholder: 'Enter pickup location',
          required: true
        },
        {
          id: 'dropLocation',
          label: 'Drop Location',
          type: 'text',
          placeholder: 'Enter drop location',
          required: true
        },
        {
          id: 'startKm',
          label: 'Start KM',
          type: 'text',
          placeholder: 'Enter start KM',
          required: false,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        },
        {
          id: 'endKm',
          label: 'End KM',
          type: 'text',
          placeholder: 'Enter end KM',
          required: false,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        },
        {
          id: 'totalDistance',
          label: 'Total Distance',
          type: 'text',
          placeholder: 'Total Distance',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.startKm || !formData.endKm) return '';
            const start = parseFloat(formData.startKm) || 0;
            const end = parseFloat(formData.endKm) || 0;
            return `${(end - start).toFixed(2)} km`;
          },
          dependsOn: ['startKm', 'endKm']
        }
      ],
      [
        {
          id: 'startTime',
          label: 'Start Time',
          type: 'time',
          placeholder: 'HH:MM',
          required: false
        },
        {
          id: 'endTime',
          label: 'End Time',
          type: 'time',
          placeholder: 'HH:MM',
          required: false
        },
        {
          id: 'totalTime',
          label: 'Total Time',
          type: 'text',
          placeholder: 'Total Time',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.startTime || !formData.endTime) return '';
            
            const [startH, startM] = formData.startTime.split(':').map(Number);
            const [endH, endM] = formData.endTime.split(':').map(Number);
            
            let startMinutes = startH * 60 + startM;
            let endMinutes = endH * 60 + endM;
            
            if (endMinutes < startMinutes) {
              endMinutes += 24 * 60;
            }
            
            const diffMinutes = endMinutes - startMinutes;
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            
            return `${hours}h ${minutes}m`;
          },
          dependsOn: ['startTime', 'endTime']
        },
        {
          id: 'waitingTime',
          label: 'Waiting Time',
          type: 'text',
          placeholder: 'Enter Total Minutes',
          required: false,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        },
        {
          id: 'waitingCharges',
          label: 'Waiting Charges',
          type: 'text',
          placeholder: '0',
          required: false,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          defaultValue: '0'
        }
      ],
      [
        {
          id: 'driverName',
          label: 'Driver\'s Name',
          type: 'text',
          placeholder: 'Enter driver name',
          required: false
        },
        {
          id: 'ambulanceNumber',
          label: 'Ambulance Number',
          type: 'text',
          placeholder: 'Enter Ambulance Number',
          required: false,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }
      ]
    ],
    tableColumns: [
      { id: 'pickupLocation', header: 'Pickup Location', accessor: 'pickupLocation' },
      { id: 'dropLocation', header: 'Drop Location', accessor: 'dropLocation' },
      { id: 'startKm', header: 'Start KM', accessor: 'startKm' },
      { id: 'endKm', header: 'End KM', accessor: 'endKm' },
      { id: 'totalDistance', header: 'Total Distance', accessor: 'totalDistance' },
      { id: 'startTime', header: 'Start Time', accessor: 'startTime' },
      { id: 'endTime', header: 'End Time', accessor: 'endTime' },
      { id: 'totalTime', header: 'Total Time', accessor: 'totalTime' },
      { id: 'waitingTime', header: 'Waiting Time', accessor: 'waitingTime' },
      { id: 'waitingCharges', header: 'Waiting Charges', accessor: 'waitingCharges' },
      { id: 'driverName', header: 'Driver Name', accessor: 'driverName' },
      { id: 'ambulanceNumber', header: 'Ambulance Number', accessor: 'ambulanceNumber' }
    ],
    initialFormState: {
      pickupLocation: '',
      dropLocation: '',
      startKm: '',
      endKm: '',
      totalDistance: '',
      startTime: '',
      endTime: '',
      totalTime: '',
      waitingTime: '',
      waitingCharges: '0',
      driverName: '',
      ambulanceNumber: ''
    },
    validation: (formData) => {
      if (!formData.pickupLocation) return 'Pickup location is required';
      if (!formData.dropLocation) return 'Drop location is required';
      return null;
    }
  };

  const additionalFacilitiesSection: BookingSection = {
    id: 'additionalFacilities',
    allowMultipleEntries: true,
    title: 'Additional Facilities (If any)',
    fields: [
      [
        {
          id: 'itemName',
          label: 'Item Name',
          type: 'text',
          placeholder: 'Enter item name',
          required: true,
          className: 'col-span-1'
        },
        {
          id: 'itemPrice',
          label: 'Item Price',
          type: 'text',
          placeholder: '0',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          defaultValue: '0',
          className: 'col-span-1'
        },
        {
          id: 'remarks',
          label: 'Remarks',
          type: 'text',
          placeholder: 'Enter remarks',
          required: false,
          className: 'col-span-3'
        }
      ]
    ],
    tableColumns: [
      { id: 'itemName', header: 'Item Name', accessor: 'itemName' },
      { id: 'itemPrice', header: 'Item Price', accessor: 'itemPrice' },
      { id: 'remarks', header: 'Remarks', accessor: 'remarks' }
    ],
    initialFormState: {
      itemName: '',
      itemPrice: '0',
      remarks: ''
    },
    validation: (formData) => {
      if (!formData.itemName) return 'Item name is required';
      if (!formData.itemPrice) return 'Item price is required';
      return null;
    },
    hideFromProgress: true
  };

  const paymentSection: BookingSection = {
    id: 'payment',
    allowMultipleEntries: false,
    title: 'Payment Information',
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
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
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
          defaultValue: '0'
        },
        {
          id: 'totalBill',
          label: 'Total Bill',
          type: 'text',
          placeholder: '0',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
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
          defaultValue: '0',
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
            { value: 'Paid', label: 'Paid' }
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
            { value: 'UPI', label: 'UPI' }
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
    const {ambulance, patient, payment, additionalFacilities} = allEntries;
    const data = {
      clinic_id: generateUniqueId('CLI'),
      ambulance_id: generateUniqueId('AMB'),
      ambulance_bill_id: generateUniqueId('AMB'),
      patient_id: generateUniqueId('PAT'),
      patient_name: patient[0].name,
      phone_number: patient[0].phone,
      booking_date: patient[0].bookingDate || currentDate,
      created_by: "Admin123",
      created_at: new Date(),
      status: "Pending",
      driver_id: generateUniqueId('DRV'),
      payment_status: payment[0].paymentStatus || 'Unpaid',
      payment_mode: payment[0].paymentMethod || 'Cash',
      ambulance_km_start: ambulance[0].startKm || '0',
      ambulance_km_end: ambulance[0].endKm || '0',
      drop_location: ambulance[0].dropLocation,
      pickup_location: ambulance[0].pickupLocation,      
      start_time: ambulance[0].startTime || '',
      end_time: ambulance[0].endTime || '',
      total_km: ambulance[0].totalDistance || '0 km',
      attributes: additionalFacilities?.map(facility => ({
        item_name: facility.itemName,
        price: parseFloat(facility.itemPrice) || 0,
        remark: facility.remarks || ''
      })) || [],
      paid_amount: parseFloat(payment[0].paidAmount) || 0,
      total_discount: parseFloat(payment[0].totalDiscount) || 0,
      total_bill: parseFloat(payment[0].totalBill) || 0,
      outstanding_amount: parseFloat(payment[0].dueAmount) || 0,
      waiting_charges: parseFloat(ambulance[0].waitingCharges) || 0,
      remark: "Ambulance service provided",
      updated_by: "Admin436",
      waiting_hours: parseFloat(ambulance[0].waitingTime) || 0,
      advance_no: generateUniqueId('ADV')
    };
    
    try {
      const res = await axios.post(`${host}/api/v1/ambulance/create_ambulance_booking`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
      alert('Ambulance booking saved successfully!');
    } catch (error) {
      console.error('Error saving ambulance booking:', error);
      alert('Failed to save ambulance booking');
    }
  };

  return (
    <BookingFormManager
      onSave={handleSave}
      bookingType="Ambulance"
      sections={[patientSection, ambulanceSection, additionalFacilitiesSection, paymentSection]}
      showPatientId={true}
    />
  );
};

export default AmbulanceBookingPage;