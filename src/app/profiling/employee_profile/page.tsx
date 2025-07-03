"use client";

import { useState } from "react";
import CustomProfileForm from "@/app/components/CustomProfileForm";
import ShiftInformationForm from "@/app/components/ShiftInfoForm";

interface TitleItem {
  name: string;
  linkTo: string;
}

type Option = {
  value: string;
  label: string;
};

type Field = {
  name: string;
  label: string;
  type?: "text" | "select" | "date";
  required?: boolean;
  placeholder?: string;
  options?: Option[];
};

interface FormFields {
  personalInfo?: Field[];
  educationInfo?: Field[];
  workInfo?: Field[];
}

interface FormData {
  [key: string]: any;
}

interface Shift {
  workingDay: string;
  startTime: string;
  endTime: string;
}

const Page: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [activePage, setActivePage] = useState('Primary');
  const [employeeData, setEmployeeData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // For debugging
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const titleList: TitleItem[] = [
    { name: "Profiling", linkTo: "" },
    { name: "Employee", linkTo: "" },
    { name: "Create", linkTo: "" },
  ];

  const employeeFields: FormFields = {
    personalInfo: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your name",
      },
      {
        name: "age",
        label: "Age",
        type: "text",
        required: true,
        placeholder: "XX",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "dob",
        label: "DOB",
        type: "date",
        required: true,
        placeholder: "YYYY-MM-DD",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "text",
        required: true,
        placeholder: "+91XXXXXXX",
      },
    ],
    workInfo: [
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        required: true,
      },
      {
        name: "joiningDate",
        label: "Joining Date",
        type: "date",
        required: true,
        placeholder: "YYYY-MM-DD",
      },
      {
        name: "remark",
        label: "Remark",
        type: "text",
      },
    ],
  };

  const handlePrimarySubmit = (formData: FormData): void => {
    console.log("Primary form submitted:", formData);
    setFormSubmitted(true);
    
    // The data structure shows that actual form data is in entries.personalInfo[0] and entries.workInfo[0]
    const entries = formData.entries || {};
    const personalInfo = entries.personalInfo?.[0] || {};
    const workInfo = entries.workInfo?.[0] || {};
    
    // Use the actual data structure
    const processedData = {
      // Personal information
      fullName: personalInfo.fullName || "",
      phoneNumber: personalInfo.phoneNumber || "",
      dob: personalInfo.dob || "",
      gender: personalInfo.gender || "",
      age: personalInfo.age || "",
      
      // Work information
      email: workInfo.email || "",
      designation: workInfo.designation || "",
      joiningDate: workInfo.joiningDate || "",
      remark: workInfo.remark || "",
      
      // Store the original entries for reference
      personalInfo,
      workInfo
    };
    
    console.log("Processed form data:", processedData);
    setEmployeeData(processedData);
    setIsSaved(true);
    setActivePage('Shift');
  };

  const handleShiftSubmit = async (shifts: Shift[]): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Map form data to API expected structure
      // Check if using nested structure or flat structure
      const personalInfo = employeeData.personalInfo || {};
      const workInfo = employeeData.workInfo || {};
      
      const apiData = {
        employee_id: Date.now().toString(), // Generate a simple ID (in production, this should be handled by the backend)
        employee_name: employeeData.fullName || personalInfo.fullName || "",
        phone_number: employeeData.phoneNumber || personalInfo.phoneNumber || "",
        email: employeeData.email || workInfo.email || "",
        address: employeeData.address || personalInfo.address || "",
        dob: employeeData.dob || personalInfo.dob || "",
        gender: employeeData.gender || personalInfo.gender || "",
        designation: employeeData.designation || workInfo.designation || "",
        created_by: "system", // This would typically come from auth context
        clinic_id: employeeData.clinic_id || "1", // Default value or from context
        salary: employeeData.salary || "0",
        profile_picture: employeeData.profile_picture || "",
        joining_date: employeeData.joiningDate || workInfo.joiningDate || "",
        remark: employeeData.remark || workInfo.remark || "",
        shifts: shifts // Adding shifts to be stored (this would need an additional table in the backend)
      };
      
      // Debug the API data
      console.log("Raw employee data:", employeeData);
      console.log("Structured API data for submission:", apiData);
      
      console.log("Submitting to API:", apiData);
      
      const response = await fetch("http://localhost:8000/api/v1/profile/create-employee-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccess("Employee profile created successfully!");
        console.log("API success:", result);
      } else {
        setError(result.message || "Failed to create employee profile");
        console.error("API error:", result);
      }
    } catch (err) {
      setError("Network error: Could not connect to the server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {activePage === 'Primary' ? (
        <>
          {formSubmitted && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              Debug: Form was submitted. Check console for details.
            </div>
          )}
          <CustomProfileForm
            setActivePage={setActivePage}
            formHeading="Employee Profile Information"
            isSaved={isSaved}
            titleList={titleList}
            formFields={employeeFields}
            onSubmit={handlePrimarySubmit}
          />
        </>
      ) : (
        <div>
          <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
            <span className="text-pink-600 text-xl">👤</span>
            <span>Profiling</span>
            <span className="text-gray-400">{'>'}</span>
            <span>Employee</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Create</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Primary Information</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Shift Information</span>
          </div>
          
          
          
          {/* Status messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-2 mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
              <p className="mt-2 text-sm text-gray-600">Submitting...</p>
            </div>
          )}
          
          <ShiftInformationForm onSubmit={handleShiftSubmit} />
        </div>
      )}
    </>
  );
};

export default Page;