"use client";
import React, { useState } from "react";
import BookingFormManager, { BookingSection } from "@/app/components/DynamicBooking";
import { Check } from "lucide-react";

const AddNewPatientForm = () => {
    const [isSaved, setIsSaved] = useState(false);
    
    const patientDetailsSection: BookingSection = {
      id: 'patientDetails',
      allowMultipleEntries: false,
      title: 'Patient Details',
      fields: [
        [
          { 
            id: 'name', 
            label: 'Name', 
            type: 'text', 
            placeholder: 'Patient Name', 
            required: true,
            className: 'flex-1 min-w-[200px]'
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
            ],
            className: 'flex-1 min-w-[150px]'
          },
          { 
            id: 'age', 
            label: 'Age', 
            type: 'text', 
            placeholder: '25', 
            required: false,
            pattern: '[0-9]*', 
            inputMode: 'numeric',
            className: 'flex-1 min-w-[100px]'
          },
          { 
            id: 'contactNumber', 
            label: 'Contact Number', 
            type: 'tel', 
            placeholder: '+91 XXXXX XXXXX', 
            required: true,
            pattern: '[0-9+\\s]*', 
            inputMode: 'tel',
            className: 'flex-1 min-w-[200px]'
          }
        ]
      ],
      tableColumns: [ 
        { id: 'name', header: 'Name', accessor: 'name' }, 
        { id: 'gender', header: 'Gender', accessor: 'gender' },
        { id: 'age', header: 'Age', accessor: 'age' },
        { id: 'contactNumber', header: 'Contact Number', accessor: 'contactNumber' }
      ],
      initialFormState: {
        name: '',
        gender: '',
        age: '',
        contactNumber: ''
      },
      validation: (formData) => {
        if (!formData.name) return 'Name is required';
        if (!formData.gender) return 'Gender is required';
        if (!formData.contactNumber) return 'Contact number is required';
        return null;
      }
    };

    const patientClinicDetailsSection: BookingSection = {
      id: 'patientClinicDetails',
      allowMultipleEntries: false,
      title: 'Patient Clinic Details',
      fields: [
        [
          {
            id: 'membershipId',
            label: 'Membership ID',
            type: 'text',
            placeholder: 'Enter Membership ID',
            required: false
          },
          {
            id: 'membershipEndDate',
            label: 'Membership End Date',
            type: 'date',
            placeholder: 'dd-mm-yyyy',
            required: false 
          },
          {
            id: 'createdAt',
            label: 'Created At',
            type: 'date',
            placeholder: 'dd-mm-yyyy',
            required: false 
          }
        ]
      ],
      tableColumns: [
        { id: 'membershipId', header: 'Membership ID', accessor: 'membershipId' },
        { id: 'membershipEndDate', header: 'Membership End Date', accessor: 'membershipEndDate' },
        { id: 'createdAt', header: 'Created At', accessor: 'createdAt' }
      ],
      initialFormState: {
        membershipId: '',
        membershipEndDate: '',
        createdAt: ''
      },
      validation: (formData) => {
        return null;
      }
    };

    const patientHealthDetailsSection: BookingSection = {
      id: 'patientHealthDetails',
      allowMultipleEntries: false,
      title: 'Patient Health Details',
      fields: [
        [
          {
            id: 'chronicDisease',
            label: 'Chronic Disease',
            type: 'text',
            placeholder: 'Enter chronic disease if any',
            required: false
          }
        ]
      ],
      tableColumns: [
        { id: 'chronicDisease', header: 'Chronic Disease', accessor: 'chronicDisease' }
      ],
      initialFormState: {
        chronicDisease: ''
      },
      validation: (formData) => {
        return null;
      }
    };

    const sections = [patientDetailsSection, patientClinicDetailsSection, patientHealthDetailsSection];

    const handleSave = (allEntries: Record<string, any[]>) => {
      // Here you would typically save the data
      console.log('Saving patient data:', allEntries);
      setIsSaved(true);
      // Reset the saved state after some time
      setTimeout(() => setIsSaved(false), 3000);
    };

    return (
      <BookingFormManager
        bookingType="Add New Patient"
        sections={sections}
        hideDefaultHeader={true}
        disablePatientToggle={true}
        onSave={handleSave}
        saveButtonText="Save" // Add this line
        customHeader={
          <div className="w-full flex justify-between px-4 py-2 items-center">
            <div className="text-[#1A1A1A] font-medium text-sm font-14">Profile Details</div>
            <div></div>
          </div>
        }
        customFooter={({ allEntries, isFormComplete }) => (
          <div className="flex relative right-2 bottom-7 justify-end">
            <button
              className={`relative px-2 py-1.5 rounded-md text-xs font-medium border border-white shadow-sm flex items-center justify-center gap-1 ${
                isFormComplete
                  ? "bg-[#FB009C] text-white shadow-[#FB009C]/80"
                  : "bg-[#FF94D6] text-white shadow-[#FB009C]/80 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => handleSave(allEntries)}
              disabled={!isFormComplete}
            >
              {isSaved ? (
                <>
                  <Check size={14} />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        )}
      />
    );
};

export default AddNewPatientForm;