"use client";
import React, { useState } from "react";
import BookingFormManager, {
  BookingSection,
} from "@/app/components/DynamicBooking";

const AddNewPatientForm = () => {
  const patientDetailsSection: BookingSection = {
    id: "patientDetails",
    allowMultipleEntries: false,
    title: "Patient Details",
    fields: [
      [
        {
          id: "name",
          label: "Name",
          type: "text",
          placeholder: "Patient Name",
          required: true,
          className: "flex-1 min-w-[200px]", // Added for better responsive control
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
          className: "flex-1 min-w-[150px]",
        },
        {
          id: "age",
          label: "Age",
          type: "text",
          placeholder: "25",
          required: true,
          pattern: "[0-9]*",
          inputMode: "numeric",
          className: "flex-1 min-w-[100px]",
        },
        {
          id: "contactNumber",
          label: "Contact Number*",
          type: "tel",
          placeholder: "+91 XXXXX XXXXX",
          required: true,
          pattern: "[0-9+\\s]*",
          inputMode: "tel",
          className: "flex-1 min-w-[200px]",
        },
      ],
    ],
    tableColumns: [
      { id: "name", header: "Name", accessor: "name" },
      { id: "gender", header: "Gender", accessor: "gender" },
      { id: "age", header: "Age", accessor: "age" },
      {
        id: "contactNumber",
        header: "Contact Number",
        accessor: "contactNumber",
      },
    ],
    initialFormState: {
      name: "",
      gender: "",
      age: "",
      contactNumber: "",
    },
    validation: (formData) => {
      if (!formData.name) return "Name is required";
      if (!formData.gender) return "Gender is required";
      if (!formData.age) return "Age is required";
      if (!formData.contactNumber) return "Contact number is required";
      return null;
    },
  };

  const patientClinicDetailsSection: BookingSection = {
    id: "patientClinicDetails",
    allowMultipleEntries: false,
    title: "Patient Clinic Details",
    fields: [
      [
        {
          id: "membershipId",
          label: "Membership ID",
          type: "text",
          placeholder: "Enter Membership ID",
          required: true,
        },
        {
          id: "membershipEndDate",
          label: "Membership End Date",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: true,
        },
        {
          id: "createdAt",
          label: "Created At",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: true,
        },
      ],
    ],
    tableColumns: [
      { id: "membershipId", header: "Membership ID", accessor: "membershipId" },
      {
        id: "membershipEndDate",
        header: "Membership End Date",
        accessor: "membershipEndDate",
      },
      { id: "createdAt", header: "Created At", accessor: "createdAt" },
    ],
    initialFormState: {
      membershipId: "",
      membershipEndDate: "",
      createdAt: "",
    },
    validation: (formData) => {
      if (!formData.membershipId) return "Membership ID is required";
      if (!formData.membershipEndDate) return "Membership end date is required";
      if (!formData.createdAt) return "Created at date is required";
      return null;
    },
  };

  const patientHealthDetailsSection: BookingSection = {
    id: "patientHealthDetails",
    allowMultipleEntries: false,
    title: "Patient Health Details",
    fields: [
      [
        {
          id: "chronicDisease",
          label: "Chronic Disease",
          type: "text",
          placeholder: "Enter chronic disease if any",
          required: true,
        },
      ],
    ],
    tableColumns: [
      {
        id: "chronicDisease",
        header: "Chronic Disease",
        accessor: "chronicDisease",
      },
    ],
    initialFormState: {
      chronicDisease: "",
    },
    validation: (formData) => {
      if (!formData.chronicDisease)
        return "Chronic disease information is required";
      return null;
    },
  };

  return (
    <BookingFormManager
      bookingType="Add New Patient"
      sections={[
        patientDetailsSection,
        patientClinicDetailsSection,
        patientHealthDetailsSection,
      ]}
      hideDefaultHeader={true}
      disablePatientToggle={true} // This hides the toggle
      customHeader={
        <div className="w-full flex justify-between px-4 py-2 items-center">
          <div className="text-[#1A1A1A] font-medium text-sm font-14">
            Profile Details
          </div>
          <div></div>
        </div>
      }
    />
  );
};

export default AddNewPatientForm;
