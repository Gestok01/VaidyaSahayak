"use client";
import axios from "axios";
import React from "react";
import BookingFormManager, {
  BookingSection,
} from "@/app/components/DynamicBooking";

const VaccineBookingPage = () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  
  // Get current date and time for defaults
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().substring(0, 5);

  const patientSection: BookingSection = {
    id: "patient",
    title: "Patient Information",
    fields: [
      [
        {
          id: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "Enter number",
          required: true,
          pattern: "[0-9+\\s]*",
          inputMode: "tel",
        },
        {
          id: "name",
          label: "Patient Name",
          type: "text",
          placeholder: "Enter name",
          required: true,
        },
        {
          id: "gender",
          label: "Gender",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Others", label: "Others" },
          ],
        },
        {
          id: "age",
          label: "Age",
          type: "text",
          placeholder: "Enter age",
          required: true,
          pattern: "[0-9]*",
          inputMode: "numeric",
        },
      ],
    ],
    tableColumns: [
      { id: "phone", header: "Phone Number", accessor: "phone" },
      { id: "name", header: "Patient Name", accessor: "name" },
      { id: "gender", header: "Gender", accessor: "gender" },
      { id: "age", header: "Age", accessor: "age" },
    ],
    initialFormState: {
      phone: "",
      name: "",
      age: "",
      gender: "",
    },
    validation: (formData) => {
      if (!formData.phone) return "Phone number is required";
      if (!formData.name) return "Patient name is required";
      if (!formData.gender) return "Gender is required";
      if (!formData.age) return "Age is required";
      return null;
    },
  };

  const vaccineSection: BookingSection = {
    id: "vaccine",
    title: "Vaccine Details",
    fields: [
      [
        {
          id: "vaccineName",
          label: "Vaccine Name",
          type: "text",
          placeholder: "Enter name",
          required: true,
        },
        {
          id: "vaccineDose",
          label: "Vaccine Dose",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select" },
            { value: "1st Dose", label: "1st Dose" },
            { value: "2nd Dose", label: "2nd Dose" },
            { value: "Booster", label: "Booster" },
          ],
        },
        {
          id: "vaccineType",
          label: "Vaccine Type",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select" },
            { value: "COVID-19", label: "COVID-19" },
            { value: "Influenza", label: "Influenza" },
            { value: "Hepatitis", label: "Hepatitis" },
          ],
        },
        {
          id: "pricePerVaccine",
          label: "Price Per Vaccine",
          type: "text",
          placeholder: "0",
          required: true,
          defaultValue: "0",
          pattern: "[0-9]*",
          inputMode: "numeric",
        },
        {
          id: "quantity",
          label: "Quantity",
          type: "select",
          required: true,
          defaultValue: "1",
          options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
          ],
        },
      ],
      [
        {
          id: "discountType",
          label: "Discount Type",
          type: "select",
          required: true,
          defaultValue: "fixed",
          options: [
            { value: "fixed", label: "Fixed" },
            { value: "percentage", label: "Percentage" },
          ],
        },
        {
          id: "discount",
          label: "Discount",
          type: "text",
          placeholder: "0",
          pattern: "[0-9]*",
          inputMode: "numeric",
          required: true,
          defaultValue: "0",
        },
        {
          id: "totalPrice",
          label: "Total Price",
          type: "text",
          placeholder: "0",
          required: true,
          defaultValue: "0",
          calculateValue: (formData) => {
            if (!formData.quantity || !formData.pricePerVaccine) return "0";

            const price = parseFloat(formData.pricePerVaccine) || 0;
            const quantity = parseInt(formData.quantity, 10) || 0;
            const discount = parseFloat(formData.discount) || 0;

            let total = price * quantity;

            if (formData.discountType === "percentage" && discount > 0) {
              total = total * (1 - discount / 100);
            } else if (formData.discountType === "fixed" && discount > 0) {
              total = Math.max(0, total - discount);
            }

            return total.toFixed(2);
          },
          dependsOn: [
            "quantity",
            "pricePerVaccine",
            "discount",
            "discountType",
          ],
        },
        {
          id: "vaccineDate",
          label: "Vaccine Date",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: true,
          defaultValue: currentDate,
        },
        {
          id: "batchNumber",
          label: "Batch Number",
          type: "text",
          placeholder: "Enter number",
          required: false,
        },
      ],
      [
        {
          id: "expiryDate",
          label: "Expiry Date",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: false,
        },
        {
          id: "vaccineTime",
          label: "Vaccine Time",
          type: "time",
          placeholder: "HH:MM",
          required: false,
          defaultValue: currentTime,
        },
        {
          id: "reportStatus",
          label: "Report Status",
          type: "select",
          required: false,
          options: [
            { value: "", label: "Select" },
            { value: "Vaccinated", label: "Vaccinated" },
            { value: "Booked", label: "Booked" },
          ],
        },
      ],
    ],
    tableColumns: [
      { id: "vaccineName", header: "Vaccine Name", accessor: "vaccineName" },
      { id: "vaccineDose", header: "Vaccine Dose", accessor: "vaccineDose" },
      { id: "vaccineType", header: "Vaccine Type", accessor: "vaccineType" },
      { id: "pricePerVaccine", header: "Price Per Vaccine", accessor: "pricePerVaccine" },
      { id: "quantity", header: "Quantity", accessor: "quantity" },
      { id: "discountType", header: "Discount Type", accessor: "discountType" },
      { id: "discount", header: "Discount", accessor: "discount" },
      { id: "totalPrice", header: "Total Price", accessor: "totalPrice" },
      { id: "vaccineDate", header: "Vaccine Date", accessor: "vaccineDate" },
      { id: "batchNumber", header: "Batch No.", accessor: "batchNumber" },
      { id: "expiryDate", header: "Expiry Date", accessor: "expiryDate" },
      { id: "vaccineTime", header: "Vaccine Time", accessor: "vaccineTime" },
      { id: "reportStatus", header: "Report Status", accessor: "reportStatus" },
    ],
    initialFormState: {
      vaccineName: "",
      vaccineDose: "",
      vaccineType: "",
      pricePerVaccine: "0",
      quantity: "1",
      discountType: "fixed",
      discount: "0",
      totalPrice: "0",
      vaccineDate: currentDate,
      batchNumber: "",
      expiryDate: "",
      vaccineTime: currentTime,
      reportStatus: "",
    },
    validation: (formData) => {
      if (!formData.vaccineName) return "Vaccine name is required";
      if (!formData.vaccineDose) return "Vaccine dose is required";
      if (!formData.vaccineType) return "Vaccine type is required";
      if (!formData.pricePerVaccine) return "Price per vaccine is required";
      if (!formData.quantity) return "Quantity is required";
      if (!formData.discountType) return "Discount type is required";
      if (!formData.discount) return "Discount is required";
      if (!formData.totalPrice) return "Total price is required";
      if (!formData.vaccineDate) return "Vaccine date is required";
      return null;
    },
    allowMultipleEntries: true,
  };

  const paymentSection: BookingSection = {
    id: "payment",
    title: "Payment Information",
    showMemberToggle: true,
    fields: [
      [
        {
          id: "amountPaid",
          label: "Amount Paid",
          type: "text",
          placeholder: "0",
          pattern: "[0-9]*",
          inputMode: "numeric",
          required: true,
          defaultValue: "0",
        },
        {
          id: "paymentMethod",
          label: "Payment Method",
          type: "select",
          required: true,
          defaultValue: "Cash",
          options: [
            { value: "Cash", label: "Cash" },
            { value: "UPI", label: "UPI" },
            { value: "Card", label: "Card" },
          ],
        },
        {
          id: "paymentStatus",
          label: "Payment Status",
          type: "select",
          required: true,
          defaultValue: "Pending",
          options: [
            { value: "Pending", label: "Pending" },
            { value: "Partial", label: "Partial" },
            { value: "Completed", label: "Completed" },
          ],
        },
        {
          id: "totalDiscount",
          label: "Total Discount",
          type: "text",
          placeholder: "0",
          required: true,
          defaultValue: "0",
        },
        {
          id: "totalBill",
          label: "Total Bill",
          type: "text",
          placeholder: "0",
          required: true,
          defaultValue: "0",
        },
      ],
      [
        {
          id: "outstandingAmount",
          label: "Outstanding Amount",
          type: "text",
          placeholder: "0",
          readOnly: true,
          required: true,
          defaultValue: "0",
          calculateValue: (formData) => {
            if (!formData.totalBill || !formData.amountPaid) return "0";
      
            const totalBill = parseFloat(formData.totalBill) || 0;
            const amountPaid = parseFloat(formData.amountPaid) || 0;
            
            if (formData.amountPaid) {
              if (amountPaid > 0) {
                if (amountPaid >= totalBill) {
                  formData.paymentStatus = "Completed";
                } else {
                  formData.paymentStatus = "Partial";
                }
              } else {
                formData.paymentStatus = "Pending";
              }
            }
            
            return Math.max(0, totalBill - amountPaid).toFixed(2);
          },
          dependsOn: ["totalBill", "amountPaid", "paymentStatus"],
        },
        {
          id: "remark",
          label: "Remark",
          type: "text",
          placeholder: "Any additional notes",
          required: false,
        },
      ],
    ],
    tableColumns: [
      { id: "amountPaid", header: "Amount Paid", accessor: "amountPaid" },
      { id: "paymentMethod", header: "Payment Method", accessor: "paymentMethod" },
      { id: "paymentStatus", header: "Payment Status", accessor: "paymentStatus" },
      { id: "totalDiscount", header: "Total Discount", accessor: "totalDiscount" },
      { id: "totalBill", header: "Total Bill", accessor: "totalBill" },
      { id: "outstandingAmount", header: "Outstanding Amount", accessor: "outstandingAmount" },
      { id: "remark", header: "Remark", accessor: "remark" },
    ],
    initialFormState: {
      amountPaid: "0",
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      totalDiscount: "0",
      totalBill: "0",
      outstandingAmount: "0",
      remark: "",
    },
    validation: (formData) => {
      if (!formData.amountPaid) return "Amount paid is required";
      if (!formData.paymentMethod) return "Payment method is required";
      if (!formData.paymentStatus) return "Payment status is required";
      if (!formData.totalDiscount) return "Total discount is required";
      if (!formData.totalBill) return "Total bill is required";
      if (!formData.outstandingAmount) return "Outstanding amount is required";
      return null;
    },
  };

  const generateUniqueId = (prefix: string) =>
    `${prefix}${Math.floor(10000 + Math.random() * 90000)}`;

  const handleSave = async (allEntries: { [key: string]: any[] }) => {
    const { patient, payment, vaccine } = allEntries;
    const data = {
      clinic_id: generateUniqueId("CLN"),
      vaccine_bill_id: generateUniqueId("VBN"),
      patient_id: generateUniqueId("PTN"),
      patient_name: patient[0].name,
      patient_age: patient[0].age,
      patient_gender: patient[0].gender,
      phone_number: patient[0].phone,
      is_member: "Yes",
      payment_mode: payment[0].paymentMethod,
      payment_status: payment[0].paymentStatus,
      status: vaccine[0].reportStatus || "Booked",
      paid_amount: payment[0].amountPaid,
      total_discount: payment[0].totalDiscount,
      total_bill: payment[0].totalBill,
      outstanding_amount: payment[0].outstandingAmount,
      vaccine_items: [
        {
          bill_id: generateUniqueId("BIL"),
          item_id: generateUniqueId("ITE"),
          vaccine_name: vaccine[0].vaccineName,
          dose_type: vaccine[0].vaccineType,
          batch_number: vaccine[0].batchNumber || generateUniqueId("BAT"),
          expiry_date: vaccine[0].expiryDate ? new Date(vaccine[0].expiryDate) : null,
          price_per_vaccine: vaccine[0].pricePerVaccine,
          quantity: vaccine[0].quantity,
          total_price: vaccine[0].totalPrice,
          discount: payment[0].totalDiscount,
          discount_type: vaccine[0].discountType,
          vaccine_date: new Date(vaccine[0].vaccineDate),
          vaccine_time: vaccine[0].vaccineTime || currentTime,
          report_status: vaccine[0].reportStatus || "Booked",
        },
      ],
      created_by: "Admin",
    };
    
    console.log(data);
    const response = await axios.post(
      `${host}/api/v1/vaccine/create_vaccine`,
      data
    );
    console.log(response);
    console.log("Saving vaccine booking data", allEntries);
  };

  return (
    <BookingFormManager
      bookingType="Vaccine"
      sections={[patientSection, vaccineSection, paymentSection]}
      onSave={handleSave}
    />
  );
};

export default VaccineBookingPage;