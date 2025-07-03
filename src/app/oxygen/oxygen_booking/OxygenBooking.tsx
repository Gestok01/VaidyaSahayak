"use client";
import React, { useState, useEffect, useRef } from "react";
import { Calendar, Trash2, Plus, Save } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BEENHERE_SVG from "../../../../public/svg/beenhere.svg";

interface PatientForm {
  name: string;
  gender: string;
  phone: string;
  age: string;
  address: string;
}

interface OxygenForm {
  itemName: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  discountAmount: string;
  recommendedBy: string;
  price: string;
}

interface PaymentForm {
  amountPaid: string;
  paymentMethod: string;
  totalDiscount: string;
  totalBill: string;
  outstandingAmount: string;
}

const OxygenBookingForm = () => {
  const [patientType, setPatientType] = useState<"new" | "existing">("new");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Form data states
  const [patientInput, setPatientInput] = useState<PatientForm>({
    name: "",
    gender: "",
    phone: "",
    age: "",
    address: "",
  });

  const [oxygenInput, setOxygenInput] = useState<OxygenForm>({
    itemName: "",
    startDate: "",
    endDate: "",
    totalDays: "XX",
    discountAmount: "",
    recommendedBy: "",
    price: "",
  });

  const [paymentInput, setPaymentInput] = useState<PaymentForm>({
    amountPaid: "",
    paymentMethod: "Select",
    totalDiscount: "",
    totalBill: "",
    outstandingAmount: "",
  });

  // Table data states
  const [patientEntries, setPatientEntries] = useState<PatientForm[]>([]);
  const [oxygenEntries, setOxygenEntries] = useState<OxygenForm[]>([]);
  const [paymentEntries, setPaymentEntries] = useState<PaymentForm[]>([]);

  // Date picker states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [focusedField, setFocusedField] = useState(null);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Progress management
  const [progress, setProgress] = useState(0);
  const updateProgress = () => {
    const totalSections = 3;
    let completedSections = 0;

    if (patientEntries.length > 0) completedSections++;
    if (oxygenEntries.length > 0) completedSections++;
    if (paymentEntries.length > 0) completedSections++;

    setProgress((completedSections / totalSections) * 100);
  };

  useEffect(() => {
    updateProgress();
  }, [patientEntries, oxygenEntries, paymentEntries]);

  // Date calculation
  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setOxygenInput((prev) => ({ ...prev, totalDays: diffDays.toString() }));
    }
  }, [startDate, endDate]);

  // Form handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    form: string,
    field: string
  ) => {
    const value = e.target.value;
    if (form === "patient") {
      setPatientInput((prev) => ({ ...prev, [field]: value }));
    } else if (form === "oxygen") {
      setOxygenInput((prev) => ({ ...prev, [field]: value }));
    } else if (form === "payment") {
      setPaymentInput((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Add entries
  const addEntry = (type: "patient" | "oxygen" | "payment") => {
    switch (type) {
      case "patient":
        if (Object.values(patientInput).some((v) => v === "")) {
          alert("Please fill all patient details");
          return;
        }
        setPatientEntries([...patientEntries, patientInput]);
        setPatientInput({
          name: "",
          gender: "",
          phone: "",
          age: "",
          address: "",
        });
        break;

      case "oxygen":
        const requiredOxygenFields = [
          "itemName",
          "startDate",
          "endDate",
          "discountAmount",
          "recommendedBy",
          "price",
        ];
        const isOxygenFormValid = requiredOxygenFields.every(
          (field) => oxygenInput[field] !== ""
        );

        if (!isOxygenFormValid) {
          alert("Please fill all required oxygen details");
          return;
        }
        setOxygenEntries([...oxygenEntries, oxygenInput]);
        setOxygenInput({
          itemName: "",
          startDate: "",
          endDate: "",
          totalDays: "XX",
          discountAmount: "",
          recommendedBy: "",
          price: "",
        });
        break;

      case "payment":
        const requiredPaymentFields = [
          "amountPaid",
          "paymentMethod",
          "totalDiscount",
          "totalBill",
        ];
        const isPaymentFormValid = requiredPaymentFields.every(
          (field) => paymentInput[field] !== ""
        );

        if (!isPaymentFormValid) {
          alert("Please fill all required payment details");
          return;
        }
        setPaymentEntries([...paymentEntries, paymentInput]);
        setPaymentInput({
          amountPaid: "",
          paymentMethod: "Select",
          totalDiscount: "",
          totalBill: "",
          outstandingAmount: "",
        });
        break;
    }
  };

  // Delete entries
  const deleteEntry = (
    type: "patient" | "oxygen" | "payment",
    index: number
  ) => {
    switch (type) {
      case "patient":
        setPatientEntries(patientEntries.filter((_, i) => i !== index));
        break;
      case "oxygen":
        setOxygenEntries(oxygenEntries.filter((_, i) => i !== index));
        break;
      case "payment":
        setPaymentEntries(paymentEntries.filter((_, i) => i !== index));
        break;
    }
  };

  // Save handler
  const handleSave = () => {
    console.log("Saving data:", {
      patientEntries,
      oxygenEntries,
      paymentEntries,
    });
    setShowConfirmation(true);
  };

  return (
    <div className="px-6 py-3 shadow-lg rounded-xl min-h-screen">
      {/* Header */}
      <div className="ml-8 font-bold text-2xl p-4 flex items-start gap-2">
        <span className="text-gray-400 text-2xl font-semibold">Vaccine</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-600 text-2xl font-semibold">
          Oxygen Booking
        </span>
      </div>
  
      {/* Main Form Container */}
      <div className="max-w-screen mx-10 bg-white rounded-lg border p-4 mb-10">
        {/* Patient Type Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">New Patient</span>
            <div className="relative inline-block w-12 h-6 mr-2">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0"
                checked={patientType === "existing"} // Toggle checked state based on patientType
                onChange={() =>
                  setPatientType(patientType === "new" ? "existing" : "new")
                } // Toggle between "new" and "existing"
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
            <span className="text-sm font-medium">Existing Patient</span>
          </div>
        </div>

        <hr className="border-gray-300 my-4" />

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
                      ? "bg-[#B3DB8A]"
                      : "bg-gray-200 border border-[#B3DB8A]"
                  }`}
                  style={{ transform: "translateY(-50%)" }}
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
              className="text-pink-500 text-sm font-medium"
              onClick={() => addEntry("patient")}
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            {["name", "gender", "phone", "age", "address"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  <span className="text-red-500">*</span>
                </label>
                {field === "gender" ? (
                  <select
                    value={patientInput[field]}
                    onChange={(e) => handleInputChange(e, "patient", field)}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                ) : (
                  <input
                    type="text" // Use type="text" for all fields
                    placeholder={`Enter ${field}`}
                    value={patientInput[field]}
                    onChange={(e) => handleInputChange(e, "patient", field)}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    onKeyDown={(e) => {
                      // Allow only numerical input for 'phone' and 'age' fields
                      if (field === "phone" || field === "age") {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (
                          !/^\d$/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Patient Table */}
          {patientEntries.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-6 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                {["Name", "Gender", "Phone", "Age", "Address", ""].map(
                  (header, index) => (
                    <span key={index} className="text-center">
                      {header}
                    </span>
                  )
                )}
              </div>

              {/* Data Rows */}
              {patientEntries.map((entry, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 px-4 py-2 border-b items-center"
                >
                  {Object.values(entry).map((value, i) => (
                    <span key={i} className="text-center">
                      {value}
                    </span>
                  ))}
                  {/* Delete Button */}
                  <button
                    className="text-red-500 flex justify-center items-center"
                    onClick={() => deleteEntry("patient", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Oxygen Information Section */}
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
            {[
              "itemName",
              "startDate",
              "endDate",
              "totalDays",
              "discountAmount",
              "recommendedBy",
              "price",
            ].map((field) => (
              <div key={field}>
                {/* Updated Labels */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "itemName"
                    ? "Item Name"
                    : field === "startDate"
                    ? "Start Date"
                    : field === "endDate"
                    ? "End Date"
                    : field === "totalDays"
                    ? "Total Days"
                    : field === "discountAmount"
                    ? "Discount Amount"
                    : field === "recommendedBy"
                    ? "Recommended By"
                    : "Price"}{" "}
                  {["itemName", "startDate", "endDate"].includes(field) && (
                    <span className="text-red-500">*</span>
                  )}
                </label>

                {field === "startDate" || field === "endDate" ? (
                  <div className="relative">
                    <DatePicker
                      selected={field === "startDate" ? startDate : endDate}
                      onChange={(date) => {
                        if (field === "startDate") {
                          setStartDate(date);
                          setOxygenInput((prev) => ({
                            ...prev,
                            startDate: date ? date.toISOString() : "",
                          }));
                        } else {
                          setEndDate(date);
                          setOxygenInput((prev) => ({
                            ...prev,
                            endDate: date ? date.toISOString() : "",
                          }));
                        }
                      }}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField(null)}
                      ref={field === "startDate" ? startDateRef : endDateRef}
                    />
                    <Calendar
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                        focusedField === field
                          ? "text-pink-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        if (field === "startDate") {
                          startDateRef.current?.setFocus();
                        } else {
                          endDateRef.current?.setFocus();
                        }
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type="text" // Use type="text" for all fields
                    placeholder={`Enter ${
                      field === "itemName"
                        ? "Item Name"
                        : field === "totalDays"
                        ? "Total Days"
                        : field === "discountAmount"
                        ? "Discount Amount"
                        : field === "recommendedBy"
                        ? "Recommended By"
                        : "Price"
                    }`}
                    value={oxygenInput[field]}
                    onChange={(e) => handleInputChange(e, "oxygen", field)}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    readOnly={field === "totalDays"}
                    onKeyDown={(e) => {
                      // Allow only numerical input for 'discountAmount' and 'price' fields
                      if (field === "discountAmount" || field === "price") {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (
                          !/^\d$/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
  
          {/* Patient Table - Only show if entries exist */}
          {patientEntries.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-8 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                {[
                  "Item Name",
                  "Start Date",
                  "End Date",
                  "Total Days",
                  "Discount Amount",
                  "Recommended By",
                  "Price",
                  "",
                ].map((header, index) => (
                  <span key={index} className="text-center">
                    {header}
                  </span>
                ))}
              </div>
  
              {/* Data Rows */}
              {oxygenEntries.map((entry, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 px-4 py-2 border-b items-center"
                >
                  {Object.values(entry).map((value, i) => (
                    <span key={i} className="text-center">
                      {value}
                    </span>
                  ))}
                  {/* Delete Button */}
                  <button
                    className="text-red-500 flex justify-center items-center"
                    onClick={() => deleteEntry("oxygen", index)}
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
                value={vaccineInput?.name || ''}
                onChange={(e) => handleInputChange(e, 'vaccine', 'name')}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine Dose<span className="text-red-500">*</span>
              </label>
              <select
                value={vaccineInput?.dose || ''}
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
                value={vaccineInput?.type || ''}
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
                value={vaccineInput?.batchNumber || ''}
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
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setVaccineInput((prev) => ({ ...prev, expiryDate: date ? date.toISOString() : "" }));
                  }}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  onFocus={() => setFocusedField('expiryDate')}
                  onBlur={() => setFocusedField(null)}
                  ref={endDateRef}
                />
                <Calendar
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                    focusedField === 'expiryDate' ? "text-pink-500" : "text-gray-500"
                  }`}
                  onClick={() => endDateRef.current?.setFocus()}
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
                value={vaccineInput?.price || ''}
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
                value={vaccineInput?.quantity || ''}
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
                value={vaccineInput?.totalPrice || ''}
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
                />
                <Calendar
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors ${
                    focusedField === 'vaccineDate' ? "text-pink-500" : "text-gray-500"
                  }`}
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
                value={vaccineInput?.time || ''}
                onChange={(e) => handleInputChange(e, 'vaccine', 'time')}
                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report status
              </label>
              <select
                value={vaccineInput?.reportStatus || ''}
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
          {vaccineEntries && vaccineEntries.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-8 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                {['Name', 'Dose', 'Type', 'Batch No.', 'Expiry', 'Price', 'Quantity', ''].map((header, index) => (
                  <span key={index} className="text-center">{header}</span>
                ))}
              </div>
  
              {/* Data Rows */}
              {vaccineEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-8 px-4 py-2 border-b items-center">
                  <span className="text-center">{entry.name}</span>
                  <span className="text-center">{entry.dose}</span>
                  <span className="text-center">{entry.type}</span>
                  <span className="text-center">{entry.batchNumber}</span>
                  <span className="text-center">{new Date(entry.expiryDate).toLocaleDateString()}</span>
                  <span className="text-center">₹{entry.price}</span>
                  <span className="text-center">{entry.quantity}</span>
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

          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              "amountPaid",
              "paymentMethod",
              "totalDiscount",
              "totalBill",
              "outstandingAmount",
            ].map((field) => (
              <div key={field}>
                {/* Updated Labels */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "amountPaid"
                    ? "Amount Paid"
                    : field === "paymentMethod"
                    ? "Payment Method"
                    : field === "totalDiscount"
                    ? "Total Discount"
                    : field === "totalBill"
                    ? "Total Bill"
                    : "Outstanding Amount"}
                </label>

                {field === "paymentMethod" ? (
                  <select
                    value={paymentInput[field]}
                    onChange={(e) => handleInputChange(e, "payment", field)}
                    className="w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  >
                    <option>Select</option>
                    <option>Card</option>
                    <option>UPI</option>
                    <option>Cash</option>
                  </select>
                ) : (
                  <input
                    type="text" // Use type="text" for all fields
                    placeholder={`Enter ${
                      field === "amountPaid"
                        ? "Amount Paid"
                        : field === "totalDiscount"
                        ? "Total Discount"
                        : field === "totalBill"
                        ? "Total Bill"
                        : "Outstanding Amount"
                    }`}
                    value={paymentInput[field]}
                    onChange={(e) => handleInputChange(e, "payment", field)}
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    readOnly={field === "outstandingAmount"}
                    onKeyDown={(e) => {
                      // Allow only numerical input for 'amountPaid', 'totalDiscount', and 'totalBill' fields
                      if (
                        field === "amountPaid" ||
                        field === "totalDiscount" ||
                        field === "totalBill"
                      ) {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (
                          !/^\d$/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }
                    }}
                  />
                )}
              </div>
            ))}
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
                <option value="Select">Select</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
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
  
          {/* Payment Table - Only show if entries exist */}
          {paymentEntries.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-6 font-semibold text-black bg-[#E8F4DC] px-4 py-2 uppercase text-sm">
                {[
                  "Amount Paid",
                  "Method",
                  "Discount",
                  "Total",
                  "Outstanding",
                  "",
                ].map((header, index) => (
                  <span key={index} className="text-center">
                    {header}
                  </span>
                ))}
              </div>
  
              {/* Data Rows */}
              {paymentEntries.map((entry, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 px-4 py-2 border-b items-center"
                >
                  {Object.values(entry).map((value, i) => (
                    <span key={i} className="text-center">
                      {value}
                    </span>
                  ))}
                  {/* Delete Button in the Same Row */}
                  <button
                    className="text-red-500 flex justify-center items-center"
                    onClick={() => deleteEntry("payment", index)}
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
                  onClick={() => (window.location.href = "/")}
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

export default OxygenBookingForm;
