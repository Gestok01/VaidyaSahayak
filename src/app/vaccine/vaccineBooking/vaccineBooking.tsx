'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Trash2, Plus, Save } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BEENHERE_SVG  from '../../../../public/svg/beenhere.svg';

interface PatientForm {
    name: string;
    gender: string;
    phone: string;
    age: string;
    bookingDate: string;
  }
  
  interface VaccineForm {
    itemName: string;
    dose: string;
    type: string;
    batchNumber: string;
    expiryDate: string;
    pricePerVaccine: string;
    quantity: string;
    totalPrice: string;
    vaccineDate: string;
    vaccineTime: string;
    reportStatus: string;
  }
  
  interface PaymentForm {
    amountPaid: string;
    paymentMethod: string;
    totalDiscount: string;
    totalBill: string;
    outstandingAmount: string;
  } 

  const VaccineBookingForm = () => {
    const [patientType, setPatientType] = useState<'new' | 'existing'>('new');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [memberType, setMemberType] = useState<'non-member' | 'member'>('non-member');
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
    
      const startDateRef = useRef(null);
      const endDateRef = useRef(null);
    
    // Form data states
    const [patientInput, setPatientInput] = useState<PatientForm>({
      name: '',
      gender: '',
      phone: '',
      age: '',
      bookingDate: '',
    });


    const [vaccineInput, setVaccineInput] = useState<VaccineForm>({
    itemName: '',
    dose: '',
    type: '',
    batchNumber: '',
    expiryDate: '',
    pricePerVaccine: '',
    quantity: '',
    totalPrice: '',
    vaccineDate: '',
    vaccineTime: '',
    reportStatus: '',
    });

  
    const [paymentInput, setPaymentInput] = useState<PaymentForm>({
      amountPaid: '',
      paymentMethod: 'Select',
      totalDiscount: '',
      totalBill: '',
      outstandingAmount: '',
    });
  
    // Table data states
    const [patientEntries, setPatientEntries] = useState<PatientForm[]>([]);
    const [vaccineEntries, setVaccineEntries] = useState<VaccineForm[]>([]);
    const [paymentEntries, setPaymentEntries] = useState<PaymentForm[]>([]);
  
    // Date picker states
    const [bookingDate, setBookingDate] = useState<Date | null>(null);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [vaccineDate, setVaccineDate] = useState<Date | null>(null);
    const [focusedField, setFocusedField] = useState(null);
  
    const bookingDateRef = useRef(null);
    const expiryDateRef = useRef(null);
    const vaccineDateRef = useRef(null);
  
    const [progress, setProgress] = useState(0);
    const updateProgress = () => {
      const totalSections = 3;
      let completedSections = 0;
  
      if (patientEntries.length > 0) completedSections++;
      if (vaccineEntries.length > 0) completedSections++;
      if (paymentEntries.length > 0) completedSections++;
  
      setProgress((completedSections / totalSections) * 100);
    };
  
    useEffect(() => {
      updateProgress();
    }, [patientEntries, vaccineEntries, paymentEntries]);
  
    // Form handlers
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      form: string,
      field: string
    ) => {
      const value = e.target.value;
      if (form === 'patient') {
        setPatientInput((prev) => ({ ...prev, [field]: value }));
      } else if (form === 'vaccine') {
        setVaccineInput((prev) => ({ ...prev, [field]: value }));
      } else if (form === 'payment') {
        setPaymentInput((prev) => ({ ...prev, [field]: value }));
      }
    }; 
  
    const addEntry = (type: 'patient' | 'vaccine' | 'payment') => {
      const requiredVaccineFields = ['itemName', 'dose', 'type', 'batchNumber', 'expiryDate', 'pricePerVaccine', 'quantity', 'totalPrice'];
      const isVaccineFormValid = requiredVaccineFields.every((field) => vaccineInput[field] !== '');
      const requiredPaymentFields = ['amountPaid', 'paymentMethod', 'totalDiscount', 'totalBill'];
      const isPaymentFormValid = requiredPaymentFields.every((field) => paymentInput[field] !== '');
      
      switch (type) {
        case 'patient':
          if (Object.values(patientInput).some((v) => v === '')) {
            alert('Please fill all patient details');
            return;
          }
          setPatientEntries([...patientEntries, patientInput]);
          setPatientInput({ name: '', gender: '', phone: '', age: '', bookingDate: '' });
          break;
  
        case 'vaccine':
          if (!isVaccineFormValid) {
            alert('Please fill all required vaccine details');
            return;
          }
          setVaccineEntries([...vaccineEntries, vaccineInput]);
          setVaccineInput({
            itemName: '',
            dose: '',
            type: '',
            batchNumber: '',
            expiryDate: '',
            pricePerVaccine: '',
            quantity: '',
            totalPrice: '',
            vaccineDate: '',
            vaccineTime: '',
            reportStatus: '',
          });
          break;
  
        case 'payment':
          if (!isPaymentFormValid) {
            alert('Please fill all required payment details');
            return;
          }
          setPaymentEntries([...paymentEntries, paymentInput]);
          setPaymentInput({
            amountPaid: '',
            paymentMethod: 'Select',
            totalDiscount: '',
            totalBill: '',
            outstandingAmount: '',
          });
          break;
      }
    };
  
    // Delete entries
    const deleteEntry = (type: 'patient' | 'vaccine' | 'payment', index: number) => {
      switch (type) {
        case 'patient':
          setPatientEntries(patientEntries.filter((_, i) => i !== index));
          break;
        case 'vaccine':
          setVaccineEntries(vaccineEntries.filter((_, i) => i !== index));
          break;
        case 'payment':
          setPaymentEntries(paymentEntries.filter((_, i) => i !== index));
          break;
      }
    };
  
    // Save handler
    const handleSave = () => {
      console.log('Saving data:', { patientEntries, vaccineEntries, paymentEntries });
      setShowConfirmation(true);
    };

    return (
        <div className="px-6 py-3 shadow-lg rounded-xl min-h-screen">
          {/* Header */}
          <div className="ml-8 font-bold text-2xl p-4 flex items-start gap-2">
            <span className="text-gray-400 text-2xl font-semibold">Vaccine</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-600 text-2xl font-semibold">Vaccine Booking</span>
          </div>
      
          {/* Main Form Container */}
          <div className="max-w-screen mx-10 bg-white rounded-lg border p-4 mb-10">
            {/* Member ID and Patient Type Toggle */}
            <div className="flex justify-between mb-4">
              <div className="text-sm font-medium">
                Member ID:XXXXXXX
              </div>
              <div className="flex items-center">
                <span className={`mr-2 text-sm font-medium ${patientType === "new" ? "text-pink-500" : "text-gray-500"}`}>New Patient</span>
                <div className="relative inline-block w-12 h-6 mr-2">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={patientType === "existing"}
                    onChange={() => setPatientType(patientType === "new" ? "existing" : "new")}
                  />
                  <span
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-200 ease-in-out ${
                      patientType === "existing" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute h-4 w-4 rounded-full bg-white top-1 transition-all duration-200 ease-in-out ${
                        patientType === "existing" ? "left-7" : "left-1"
                      }`}
                    ></span>
                  </span>
                </div>
                <span className={`text-sm font-medium ${patientType === "existing" ? "text-pink-500" : "text-gray-500"}`}>Existing Patient</span>
              </div>
            </div>
      
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-black mb-2">
                <span>Patient Information</span>
                <span>Vaccine Information</span>
                <span>Payment Information</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="absolute top-0 left-0 h-1.5 bg-[#FB009C] rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute left-0 w-full flex justify-between items-center">
                  {[0, 1, 2].map((position) => (
                    <div
                      key={position}
                      className={`w-4 h-4 rounded-full ${
                        progress >= position * 33.33
                          ? 'bg-[#B3DB8A]'
                          : 'bg-gray-200 border border-[#B3DB8A]'
                      }`}
                      style={{ transform: 'translateY(-50%)' }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
      
            {/* Patient Information Section */}
            <div className="mb-8">
              <div className="flex gap-3 items-center mb-4">
                <h2 className="text-md font-semibold">Patient Information</h2>
                <button
                  className="text-pink-500 text-sm font-medium flex items-center"
                  onClick={() => addEntry('patient')}
                >
                  Add <Plus size={16} className="ml-1" />
                </button>
              </div>
      
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="+91 xxxxx xxxxx"
                    value={patientInput.phone}
                    onChange={(e) => handleInputChange(e, 'patient', 'phone')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={patientInput.name}
                    onChange={(e) => handleInputChange(e, 'patient', 'name')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={patientInput.gender}
                    onChange={(e) => handleInputChange(e, 'patient', 'gender')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter age"
                    value={patientInput.age}
                    onChange={(e) => handleInputChange(e, 'patient', 'age')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Date<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={bookingDate}
                      onChange={(date) => {
                        setBookingDate(date);
                        setPatientInput((prev) => ({ ...prev, bookingDate: date ? date.toISOString() : "" }));
                      }}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      onFocus={() => setFocusedField('bookingDate')}
                      onBlur={() => setFocusedField(null)}
                      ref={bookingDateRef}
                    />
                    <Calendar
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                        focusedField === 'bookingDate' ? "text-pink-500" : "text-gray-500"
                      }`}
                      onClick={() => bookingDateRef.current?.setFocus()}
                    />
                  </div>
                </div>
              </div>
      
              {/* Patient Table - Only show if entries exist */}
              {patientEntries.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  {/* Header Row */}
                  <div className="grid grid-cols-6 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                    {['Phone Number', 'Patient Name', 'Gender', 'Age', 'Booking Date', ''].map((header, index) => (
                      <span key={index} className="text-center">{header}</span>
                    ))}
                  </div>
      
                  {/* Data Rows */}
                  {patientEntries.map((entry, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 px-4 py-2 border-b items-center">
                      <span className="text-center">{entry.phone}</span>
                      <span className="text-center">{entry.name}</span>
                      <span className="text-center">{entry.gender}</span>
                      <span className="text-center">{entry.age}</span>
                      <span className="text-center">{new Date(entry.bookingDate).toLocaleDateString()}</span>
                      {/* Delete Button */}
                      <button
                        className="text-red-500 flex justify-center items-center"
                        onClick={() => deleteEntry('patient', index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
      
            {/* Vaccine Information Section */}
            <div className="mb-8">
              <div className="flex gap-3 items-center mb-4">
                <h2 className="text-md font-semibold">Vaccine Details</h2>
                <button
                  className="text-pink-500 text-sm font-medium flex items-center"
                  onClick={() => addEntry('vaccine')}
                >
                  Add <Plus size={16} className="ml-1" />
                </button>
              </div>
      
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter vaccine name"
                    value={vaccineInput.name}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'name')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine Dose<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={vaccineInput.dose}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'dose')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">First Dose</option>
                    <option value="2">Second Dose</option>
                    <option value="3">Booster</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine Type
                  </label>
                  <select
                    value={vaccineInput.type}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'type')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="Moderna">Moderna</option>
                    <option value="Johnson & Johnson">Johnson & Johnson</option>
                    <option value="AstraZeneca">AstraZeneca</option>
                    <option value="Covaxin">Covaxin</option>
                    <option value="Covishield">Covishield</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter batch number"
                    value={vaccineInput.batchNumber}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'batchNumber')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={expiryDate}
                      onChange={(date) => {
                        setExpiryDate(date);
                        setVaccineInput((prev) => ({ ...prev, expiryDate: date ? date.toISOString() : "" }));
                      }}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      onFocus={() => setFocusedField('expiryDate')}
                      onBlur={() => setFocusedField(null)}
                      ref={expiryDateRef}
                    />
                    <Calendar
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                        focusedField === 'expiryDate' ? "text-pink-500" : "text-gray-500"
                      }`}
                      onClick={() => expiryDateRef.current?.setFocus()}
                    />
                  </div>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Vaccine<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="₹x,xxx"
                    value={vaccineInput.price}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'price')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={vaccineInput.quantity}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'quantity')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Price<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="₹x,xxx"
                    value={vaccineInput.totalPrice}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'totalPrice')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine Date<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={vaccineDate}
                      onChange={(date) => {
                        setVaccineDate(date);
                        setVaccineInput((prev) => ({ ...prev, vaccineDate: date ? date.toISOString() : "" }));
                      }}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      onFocus={() => setFocusedField('vaccineDate')}
                      onBlur={() => setFocusedField(null)}
                      ref={vaccineDateRef}
                    />
                    <Calendar
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                        focusedField === 'vaccineDate' ? "text-pink-500" : "text-gray-500"
                      }`}
                      onClick={() => vaccineDateRef.current?.setFocus()}
                    />
                  </div>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccine time
                  </label>
                  <input
                    type="text"
                    placeholder="xx:xx"
                    value={vaccineInput.time}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'time')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report status
                  </label>
                  <select
                    value={vaccineInput.reportStatus}
                    onChange={(e) => handleInputChange(e, 'vaccine', 'reportStatus')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Complete">Complete</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>
      
              {/* Vaccine Table - Only show if entries exist */}
              {vaccineEntries.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  {/* Header Row */}
                  <div className="grid grid-cols-10 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                    {[
                      'Vaccine Name', 
                      'Vaccine Dose', 
                      'Vaccine Type', 
                      'Batch No.', 
                      'Expiry Date', 
                      'Price Per Vaccine', 
                      'Quantity', 
                      'Total Price', 
                      'Vaccine Date', 
                      ''
                    ].map((header, index) => (
                      <span key={index} className="text-center">{header}</span>
                    ))}
                  </div>
      
                  {/* Data Rows */}
                  {vaccineEntries.map((entry, index) => (
                    <div key={index} className="grid grid-cols-10 px-4 py-2 border-b items-center">
                      <span className="text-center">{entry.name}</span>
                      <span className="text-center">{entry.dose}</span>
                      <span className="text-center">{entry.type}</span>
                      <span className="text-center">{entry.batchNumber}</span>
                      <span className="text-center">{new Date(entry.expiryDate).toLocaleDateString()}</span>
                      <span className="text-center">₹{entry.price}</span>
                      <span className="text-center">{entry.quantity}</span>
                      <span className="text-center">₹{entry.totalPrice}</span>
                      <span className="text-center">{new Date(entry.vaccineDate).toLocaleDateString()}</span>
                      {/* Delete Button */}
                      <button
                        className="text-red-500 flex justify-center items-center"
                        onClick={() => deleteEntry('vaccine', index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
      
            {/* Payment Information Section */}
            <div className="mb-8">
              <div className="flex gap-3 items-center mb-4">
                <h2 className="text-md font-semibold">Payment Information</h2>
                <button
                  className="text-pink-500 text-sm font-medium flex items-center"
                  onClick={() => addEntry('payment')}
                >
                  Add <Plus size={16} className="ml-1" />
                </button>
              </div>
      
              {/* Member/Non-Member Toggle */}
              <div className="flex gap-6 mb-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="non-member" 
                    name="memberType" 
                    checked={memberType === 'non-member'} 
                    onChange={() => setMemberType('non-member')}
                    className="mr-2"
                  />
                  <label htmlFor="non-member" className="text-sm font-medium text-gray-700">Non-Member</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="member" 
                    name="memberType" 
                    checked={memberType === 'member'} 
                    onChange={() => setMemberType('member')}
                    className="mr-2"
                  />
                  <label htmlFor="member" className="text-sm font-medium text-gray-700">Member</label>
                </div>
              </div>
      
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={paymentInput.amountPaid}
                    onChange={(e) => handleInputChange(e, 'payment', 'amountPaid')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentInput.paymentMethod}
                    onChange={(e) => handleInputChange(e, 'payment', 'paymentMethod')}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Discount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter discount"
                    value={paymentInput.totalDiscount}
                    onChange={(e) => handleInputChange(e, 'payment', 'totalDiscount')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Bill
                  </label>
                  <input
                    type="text"
                    placeholder="Enter total"
                    value={paymentInput.totalBill}
                    onChange={(e) => handleInputChange(e, 'payment', 'totalBill')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
      
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outstanding Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Outstanding amount"
                    value={paymentInput.outstandingAmount}
                    onChange={(e) => handleInputChange(e, 'payment', 'outstandingAmount')}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    readOnly={true}
                  />
                </div>
              </div>
          {/* Payment Table */}
          {paymentEntries.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-6 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                {['Amount Paid', 'Method', 'Discount', 'Total', 'Outstanding', ''].map((header, index) => (
                  <span key={index} className="text-center">{header}</span>
                ))}
              </div>

              {/* Data Rows */}
              {paymentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 px-4 py-2 border-b items-center">
                  {Object.values(entry).map((value, i) => (
                    <span key={i} className="text-center">{value}</span>
                  ))}
                  {/* Delete Button in the Same Row */}
                  <button
                    className="text-red-500 flex justify-center items-center"
                    onClick={() => deleteEntry('payment', index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4 mt-6 border-t pt-4">
  <button
    className="group px-5 py-2 flex items-center gap-2 text-[#FB009C] bg-white border border-[#FB009C] rounded-md shadow-[0_2px_5px_#FB009C] transition-all duration-300 hover:bg-[#FB009C] hover:text-white hover:shadow-none"
    onClick={handleSave}
  >
    Save Changes
  </button>
</div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white border border-[#FB009C] p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg font-medium text-gray-700 mb-4">
                Your changes have been saved successfully
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-5 py-2 text-[#FB009C] border border-[#FB009C] rounded-md"
                  onClick={() => setShowConfirmation(false)}
                >
                  Continue
                </button>
                <button
                  className="px-5 py-2 text-white bg-[#FB009C] rounded-md"
                  onClick={() => window.location.href = "/"}
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccineBookingForm;