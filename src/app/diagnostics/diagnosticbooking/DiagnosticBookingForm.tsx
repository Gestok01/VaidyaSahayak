"use client";
import React from "react";
import BookingFormManager, { BookingSection } from "@/app/components/DynamicBooking";

const DiagnosticBookingPage = () => {
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
          placeholder: 'Enter name', 
          required: true 
        },
        { 
          id: 'gender', 
          label: 'Gender', 
          type: 'select', 
          required: false,
          options: [
            { value: '', label: 'Select Gender' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Others', label: 'Others' },
          ]
        },
        { 
          id: 'age', 
          label: 'Age', 
          type: 'text', 
          placeholder: 'Enter age', 
          required: false,
          pattern: '[0-9]*', 
          inputMode: 'numeric'
        },
        {
          id: 'address',
          label: 'Address',
          type: 'text',
          placeholder: 'Enter address',
        }
      ]
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
      return null;
    }
  };

  const testSection: BookingSection = {
    id: 'test',
    allowMultipleEntries: true,
    title: 'Test Information',
    showMemberToggle: true,
    fields: [
      [
        {
          id: 'testGroup',
          label: 'Test Group',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select' },
            { value: 'TestGroup1', label: 'TestGroup1' },
            { value: 'TestGroup2', label: 'TestGroup2' }
          ]
        },
        {
          id: 'testName',
          label: 'Test Name',
          type: 'text',
          placeholder: 'Enter test name',
          required: true
        },
        {
          id: 'selectDoctor',
          label: 'Select Doctor',
          type: 'select',
          required: false, // Changed to optional
          options: [
            { value: '', label: 'Select' },
            { value: 'Doctor1', label: 'Doctor1' },
            { value: 'Doctor2', label: 'Doctor2' },
            { value: 'Doctor3', label: 'Doctor3' },
            { value: 'Doctor4', label: 'Doctor4' }
          ]
        },
        {
          id: 'testDate',
          label: 'Test Date',
          type: 'date',
          placeholder: 'dd-mm-yyyy',
          required: true
        }
      ],
      [
        {
          id: 'price',
          label: 'Price',
          type: 'text',
          placeholder: 'XXX',
          required: true,
          pattern: '[0-9]*',
          inputMode: 'numeric'
        }
      ]
    ],
    tableColumns: [
      { id: 'testGroup', header: 'Test Group', accessor: 'testGroup' },
      { id: 'testName', header: 'Test Name', accessor: 'testName' },
      { id: 'selectDoctor', header: 'Select Doctor', accessor: 'selectDoctor' },
      { id: 'testDate', header: 'Test Date', accessor: 'testDate' },
      { id: 'price', header: 'Price', accessor: 'price' }
    ],
    initialFormState: {
      testGroup: '',
      testName: '',
      selectDoctor: '',
      testDate: '',
      price: ''
    },
    validation: (formData) => {
      if (!formData.testGroup) return 'Test group is required';
      if (!formData.testName) return 'Test name is required';
      if (!formData.testDate) return 'Test date is required';
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
          placeholder: '0',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          defaultValue: '0'
        },
        {
          id: 'totalDiscount',
          label: 'Total Discount',
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
          placeholder: 'XXX',
          required: true,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        },
        {
          id: 'dueBill',
          label: 'Due Bill',
          type: 'text',
          placeholder: 'XXX',
          readOnly: true,
          calculateValue: (formData) => {
            if (!formData.totalBill || !formData.amountPaid || !formData.totalDiscount) return '0';
            
            const totalBill = parseFloat(formData.totalBill) || 0;
            const amountPaid = parseFloat(formData.amountPaid) || 0;
            const totalDiscount = parseFloat(formData.totalDiscount) || 0;
            
            // Update payment status immediately when amountPaid changes
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
            
            const due = Math.max(0, totalBill - amountPaid - totalDiscount).toFixed(2);
            return due;
          },
          dependsOn: ['totalBill', 'amountPaid', 'totalDiscount', 'paymentStatus']
        }
      ],
      [
        {
          id: 'paymentMethod',
          label: 'Payment Method',
          type: 'select',
          required: true,
          defaultValue: 'Cash',
          options: [
            { value: 'Credit Card', label: 'Credit Card' },
            { value: 'Debit Card', label: 'Debit Card' },
            { value: 'UPI', label: 'UPI' },
            { value: 'Cash', label: 'Cash' }
          ]
        },
        {
          id: 'paymentStatus',
          label: 'Payment Status',
          type: 'select',
          required: true,
          defaultValue: 'Pending',
          options: [
            { value: 'Pending', label: 'Pending' },
            { value: 'Partial', label: 'Partial' },
            { value: 'Paid', label: 'Paid' },
            { value: 'Partial Refund', label: 'Partial Refund' }
          ]
        }
      ]
    ],
    tableColumns: [
      { id: 'amountPaid', header: 'Amount Paid', accessor: 'amountPaid' },
      { id: 'totalDiscount', header: 'Total Discount', accessor: 'totalDiscount' },
      { id: 'totalBill', header: 'Total Bill', accessor: 'totalBill' },
      { id: 'dueBill', header: 'Due Bill', accessor: 'dueBill' },
      { id: 'paymentMethod', header: 'Payment Method', accessor: 'paymentMethod' },
      { id: 'paymentStatus', header: 'Payment Status', accessor: 'paymentStatus' }
    ],
    initialFormState: {
      amountPaid: '0',
      totalDiscount: '0',
      totalBill: '',
      dueBill: '0',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending'
    },
    validation: (formData) => {
      if (!formData.amountPaid) return 'Amount paid is required';
      if (!formData.totalDiscount) return 'Total discount is required';
      if (!formData.totalBill) return 'Total bill is required';
      if (!formData.paymentMethod) return 'Payment method is required';
      if (!formData.paymentStatus) return 'Payment status is required';
      return null;
    }
  };

  const generateUniqueId = (prefix: string) => `${prefix}${Math.floor(10000 + Math.random() * 90000)}`;
  
  const handleSave = (allEntries: { [key: string]: any[] }) => {
    const {patient, test, payment} = allEntries;
    console.log(allEntries);
    
    const data = {
      _id: generateUniqueId('BIL'),
      clinic_id: generateUniqueId('CLI'),
      patient_id: generateUniqueId('PAT'),
      patient_name: patient[0]?.name,
      phone_number: patient[0]?.phone,
      age: patient[0]?.age,
      gender: patient[0]?.gender,
      is_member: false,
      address: patient[0]?.address,
      payment_status: payment[0]?.paymentStatus || 'Pending',
      status: "Active",
      bill_status: "Booked",
      tests: test.map(t => ({
        bill_id: generateUniqueId('BIL'),
        test_id: generateUniqueId('TEST'),
        test_name: t.testName,
        test_group: t.testGroup,
        test_category: t.testGroup,
        price: t.price,
        test_date: t.testDate,
        test_doctor: t.selectDoctor || '',
        report_status: "Booked",
        delivery_date: "2025-04-05T10:00:00Z"
      })),
      paid_amount: payment[0].amountPaid || '0',
      total_bill: payment[0].totalBill,
      outstanding_amount: payment[0].dueBill || '0',
      updated_at: "2025-04-03T10:30:00Z",
      created_by: generateUniqueId('ADM')
    }
    
    alert('Diagnostic booking saved successfully!');
  };

  return (
    <BookingFormManager
      bookingType="Diagnostic"
      sections={[patientSection, testSection, paymentSection]}
      onSave={handleSave}
      saveButtonText="Save Changes"
      initialActiveSections={['patient']}
      unlockNextSectionOnAdd={true}
      keepPreviousSectionsActive={true}
      keepTestSectionActive={true}
    />
  );
};

export default DiagnosticBookingPage;