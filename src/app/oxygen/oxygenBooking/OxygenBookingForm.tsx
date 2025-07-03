"use client";
import React from "react";
import BookingFormManager, { BookingSection } from "@/app/components/DynamicBooking";
import axios from 'axios';

const OxygenBookingPage = () => {
  const host = process.env.NEXT_PUBLIC_HOST;

  const patientSection: BookingSection = {
    id: 'patient',
    allowMultipleEntries: false,
    title: 'Patient Information',
    fields: [
      [{ 
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
        id: 'gender', 
        label: 'Gender', 
        type: 'select',
        required: true, 
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
        pattern: '[0-9]*', 
        required: true,
        inputMode: 'numeric'
      },
      {
        id: 'address',
        label: 'Address',
        type: 'text',
        required: true,
        placeholder: 'Full Address',
      }]
    ],
    tableColumns: [
      { id: 'name', header: 'Patient Name', accessor: 'name' },
      { id: 'gender', header: 'Gender', accessor: 'gender' },
      { id: 'phone', header: 'Phone Number', accessor: 'phone' },
      { id: 'age', header: 'Age', accessor: 'age' },
      { id: 'address', header: 'Address', accessor: 'address' }
    ],
    initialFormState: {
      name: '',
      gender: '',
      phone: '',
      age: '',
      address: ''
    },
    validation: (formData) => {
      if (!formData.name) return 'Patient name is required';
      if (!formData.phone) return 'Phone number is required';
      if (!formData.gender) return 'Gender is required';
      if (!formData.age) return 'Age is required';
      if (!formData.address) return 'Address is required';
      return null;
    }
  };

  const oxygenSection: BookingSection = {
    id: 'oxygen',
    allowMultipleEntries: true,
    title: 'Oxygen Information',
    fields: [
      [
        {
          id: 'itemName',
          label: 'Item Name',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select' },
            { value: 'Oxygen Mask', label: 'Oxygen Mask' },
            { value: 'Oxygen Cylinder', label: 'Oxygen Cylinder' },
            { value: 'Oxygen Concentrator', label: 'Oxygen Concentrator' }
          ]
        },
        {
          id: 'startDate',
          label: 'Start Date',
          type: 'date',
          placeholder: 'dd-mm-yyyy',
          required: true
        },
        {
          id: 'endDate',
          label: 'End Date',
          type: 'date',
          placeholder: 'dd-mm-yyyy',
          required: false
        },
        {
          id: 'totalDays',
          label: 'Total Days',
          type: 'text',
          placeholder: 'Calculated',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.startDate || !formData.endDate) return '';
            
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            return diffDays.toString();
          },
          dependsOn: ['startDate', 'endDate']
        },
        {
          id: 'price',
          label: 'Price Per Day',
          type: 'text',
          placeholder: '₹XXX',
          required: true,
          pattern: '[0-9₹,.]*',
          inputMode: 'numeric'
        }
      ],
      [
        {
          id: 'totalPrice',
          label: 'Total Price',
          type: 'text',
          placeholder: 'Calculated',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.price || !formData.totalDays) return '';
            const price = parseFloat(formData.price.replace(/[^\d.-]/g, '')) || 0;
            const days = parseInt(formData.totalDays) || 0;
            return `₹${(price * days).toFixed(2)}`;
          },
          dependsOn: ['price', 'totalDays']
        },
        {
          id: 'discountType',
          label: 'Discount Type',
          type: 'select',
          options: [
            { value: 'fixed', label: 'Fixed' },
            { value: 'percentage', label: 'Percentage' }
          ],
          defaultValue: 'fixed',
          required: false
        },
        {
          id: 'discount',
          label: 'Discount',
          type: 'text',
          placeholder: 'Amount/Percentage',
          pattern: '[0-9]*',
          inputMode: 'numeric'
        },
        {
          id: 'discountAmount',
          label: 'Discount Amount',
          type: 'text',
          placeholder: 'Calculated',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.totalPrice || !formData.discount) return '';
            
            const total = parseFloat(formData.totalPrice.replace(/[^\d.-]/g, '')) || 0;
            const discount = parseFloat(formData.discount) || 0;
            
            if (formData.discountType === 'percentage') {
              return `₹${(total * discount / 100).toFixed(2)}`;
            } else {
              return `₹${Math.min(discount, total).toFixed(2)}`;
            }
          },
          dependsOn: ['totalPrice', 'discount', 'discountType']
        },
        {
          id: 'finalAmount',
          label: 'Final Amount',
          type: 'text',
          placeholder: 'Calculated',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.totalPrice || !formData.discountAmount) return '';
            
            const total = parseFloat(formData.totalPrice.replace(/[^\d.-]/g, '')) || 0;
            const discount = parseFloat(formData.discountAmount.replace(/[^\d.-]/g, '')) || 0;
            
            return `₹${(total - discount).toFixed(2)}`;
          },
          dependsOn: ['totalPrice', 'discountAmount']
        }
      ],
      [
        {
          id: 'recommendedBy',
          label: 'Recommended By',
          type: 'text',
          placeholder: 'Doctor/Hospital Name',
          required: false
        },
        {
          id: 'oxygenUnits',
          label: 'Oxygen Units',
          type: 'text',
          placeholder: 'Number of units',
          required: false,
          pattern: '[0-9]*',
          inputMode: 'numeric'
        },
        {
          id: 'remarks',
          label: 'Remarks',
          type: 'text',
          placeholder: 'Additional notes',
          required: false
        }
      ]
    ],
    tableColumns: [
      { id: 'itemName', header: 'Item', accessor: 'itemName' },
      { id: 'startDate', header: 'Start Date', accessor: 'startDate' },
      { id: 'endDate', header: 'End Date', accessor: 'endDate' },
      { id: 'totalDays', header: 'Days', accessor: 'totalDays' },
      { id: 'price', header: 'Price/Day', accessor: 'price' },
      { id: 'totalPrice', header: 'Total', accessor: 'totalPrice' },
      { id: 'discountAmount', header: 'Discount', accessor: 'discountAmount' },
      { id: 'finalAmount', header: 'Final Amount', accessor: 'finalAmount' }
    ],
    initialFormState: {
      itemName: '',
      startDate: '',
      endDate: '',
      totalDays: '',
      price: '',
      totalPrice: '',
      discountType: 'fixed',
      discount: '',
      discountAmount: '',
      finalAmount: '',
      recommendedBy: '',
      oxygenUnits: '',
      remarks: ''
    },
    validation: (formData) => {
      if (!formData.itemName) return 'Item name is required';
      if (!formData.startDate) return 'Start date is required';
      if (!formData.price) return 'Price is required';
      return null;
    }
  };

  const paymentSection: BookingSection = {
    id: 'payment',
    allowMultipleEntries: false,
    title: 'Payment Information',
    fields: [
      [
        {
          id: 'amountPaid',
          label: 'Amount Paid',
          type: 'text',
          placeholder: '₹XXX',
          required: true,
          pattern: '[0-9₹,.]*',
          inputMode: 'numeric'
        },
        {
          id: 'paymentMethod',
          label: 'Payment Method',
          type: 'select',
          required: false,
          defaultValue: 'Cash',
          options: [
            { value: '', label: 'Select' },
            { value: 'Cash', label: 'Cash' },
            { value: 'UPI', label: 'UPI' },
            { value: 'Card', label: 'Card' }
          ]
        },
        {
          id: 'paymentStatus',
          label: 'Payment Status',
          type: 'select',
          required: false,
          defaultValue: 'Pending',
          options: [
            { value: 'Pending', label: 'Pending' },
            { value: 'Partial', label: 'Partial' },
            { value: 'Paid', label: 'Paid' },
            { value: 'Partial Refund', label: 'Partial Refund' }
          ]
        },
        {
          id: 'totalDiscount',
          label: 'Total Discount',
          type: 'text',
          placeholder: '₹XXX',
          required: false,
          pattern: '[0-9₹,.]*',
          inputMode: 'numeric'
        },
        {
          id: 'totalBill',
          label: 'Total Bill',
          type: 'text',
          placeholder: '₹XXX',
          required: false,
          pattern: '[0-9₹,.]*',
          inputMode: 'numeric'
        },
        {
          id: 'outstandingAmount',
          label: 'Outstanding Amount',
          type: 'text',
          placeholder: '₹XXX',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.totalBill || !formData.amountPaid || !formData.totalDiscount) return '';
            
            const totalBill = parseFloat(formData.totalBill.replace(/[^\d.-]/g, '')) || 0;
            const amountPaid = parseFloat(formData.amountPaid.replace(/[^\d.-]/g, '')) || 0;
            const totalDiscount = parseFloat(formData.totalDiscount.replace(/[^\d.-]/g, '')) || 0;
            
            // Update payment status based on payment amount
            if (formData.amountPaid) {
              if (amountPaid > 0) {
                if (amountPaid >= (totalBill - totalDiscount)) {
                  formData.paymentStatus = 'Paid';
                } else {
                  formData.paymentStatus = 'Partial';
                }
              } else {
                formData.paymentStatus = 'Pending';
              }
            }
            
            const outstanding = Math.max(0, totalBill - amountPaid - totalDiscount);
            return `₹${outstanding.toFixed(2)}`;
          },
          dependsOn: ['totalBill', 'amountPaid', 'totalDiscount', 'paymentStatus']
        }
      ]
    ],
    tableColumns: [
      { id: 'amountPaid', header: 'Amount Paid', accessor: 'amountPaid' },
      { id: 'paymentMethod', header: 'Payment Method', accessor: 'paymentMethod' },
      { id: 'paymentStatus', header: 'Payment Status', accessor: 'paymentStatus' },
      { id: 'totalDiscount', header: 'Total Discount', accessor: 'totalDiscount' },
      { id: 'totalBill', header: 'Total Bill', accessor: 'totalBill' },
      { id: 'outstandingAmount', header: 'Outstanding Amount', accessor: 'outstandingAmount' }
    ],
    initialFormState: {
      amountPaid: '',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      totalDiscount: '',
      totalBill: '',
      outstandingAmount: ''
    },
    validation: (formData) => {
      if (!formData.amountPaid) return 'Amount paid is required';
      return null;
    }
  };

  const generateUniqueId = (prefix: string) => `${prefix}${Math.floor(10000 + Math.random() * 90000)}`;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    return new Date(dateStr);
  };

  const handleSave = async (allEntries: { [key: string]: any[] }) => {
    const { patient, oxygen, payment } = allEntries;
    
    const data = {
      clinic_id: generateUniqueId('CLI'),
      patient_id: generateUniqueId('PAT'),
      patient_name: patient[0].name,
      phone_number: patient[0].phone,
      gender: patient[0].gender,
      age: patient[0].age,
      address: patient[0].address,
      is_member: "no",
      start_date: formatDate(oxygen[0].startDate),
      end_date: formatDate(oxygen[0].endDate),
      created_by: generateUniqueId('ADM'),
      oxygen_bill_id: generateUniqueId('BIL'),
      status: "pending",
      paid_amount: parseFloat(payment[0].amountPaid.replace(/[^\d.-]/g, '')) || 0,
      total_discount: parseFloat(payment[0].totalDiscount.replace(/[^\d.-]/g, '')) || 0,
      total_bill: parseFloat(payment[0].totalBill.replace(/[^\d.-]/g, '')) || 0,
      outstanding_amount: parseFloat(payment[0].outstandingAmount.replace(/[^\d.-]/g, '')) || 0,
      payment_mode: payment[0].paymentMethod,
      payment_status: payment[0].paymentStatus,
      refund: 0,
      transaction_code: generateUniqueId('TXN'),
      item: oxygen.map(item => ({
        item_id: generateUniqueId('ITE'),
        item_name: item.itemName,
        item_price_per_unit: parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0,
        item_price_per_day: parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0,
        days: parseInt(item.totalDays) || 0,
        unit: parseInt(item.oxygenUnits) || 1,
        discount: parseFloat(item.discountAmount.replace(/[^\d.-]/g, '')) || 0,
        discount_type: item.discountType,
        start_date: formatDate(item.startDate),
        end_date: formatDate(item.endDate),
        total_days: parseInt(item.totalDays) || 0,
        total_cost: parseFloat(item.totalPrice.replace(/[^\d.-]/g, '')) || 0,
        total_pay_able: parseFloat(item.finalAmount.replace(/[^\d.-]/g, '')) || 0
      })),
      referred_by: oxygen[0].recommendedBy,
      days_used: parseInt(oxygen[0].totalDays) || 0,
      remarks: oxygen[0].remarks || ''
    };

    try {
      const response = await axios.post(`${host}/api/v1/oxygen/create_oxygen_billing`, data);
      console.log('Booking successful:', response.data);
      alert('Oxygen booking saved successfully!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to save oxygen booking. Please try again.');
    }
  };

  return (
    <BookingFormManager
      bookingType="Oxygen"
      sections={[patientSection, oxygenSection, paymentSection]}
      onSave={handleSave}
      buttonName="Save Booking"
      showPatientId={true}
    />
  );
};

export default OxygenBookingPage;