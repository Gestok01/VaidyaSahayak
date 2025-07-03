"use client";
import CustomProfileForm from "@/app/components/CustomProfileForm";
import ShiftInfoForm from "@/app/components/ShiftInfoForm";
import { useState } from "react";

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

const Page: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [activePage,setActivePage] = useState('Primary');
  const handleSubmit = (formData: FormData): void => {
    console.log("Form submitted:", formData);
    setIsSaved(true);
  };

  const titleList: TitleItem[] = [
    { name: "Profiling", linkTo: "" },
    { name: "Employee", linkTo: "" },
    { name: "Create", linkTo: "" },
  ];

  const employeeFields: FormFields = {
    personalInfo: [
      { name: "fullName", label: "Full Name", required: true, placeholder: 'Enter your name' },
      { name: "age", label: "Age", type: "text", required: true, placeholder: 'XX' },
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
      { name: "dob", label: "DOB", type: "date", required: true, placeholder: 'XXXXXXXX' },
      { name: "phoneNumber", label: "Phone Number", type: "text", required: true, placeholder: '+91XXXXXXX' },
    ],
    workInfo: [
      { name: "designation", label: "Designation", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "joiningDate", label: "Joining Date", type: "date", required: true },
      { name: "remark", label: "Remark", type: "text" },
    ],
  };

  return (  
    activePage === 'Primary' ? <CustomProfileForm
    setActivePage = {setActivePage}
    formHeading="Ambulance Driver Information"
    isSaved={isSaved}
    titleList={titleList}
    formFields={employeeFields}
    onSubmit={handleSubmit}
  /> : 
  
  <div>
    <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
        <span className="text-pink-600 text-xl">👤</span>
        <span>Profiling</span>
        <span className="text-gray-400">{'>'}</span>
        <span>Ambulance Driver</span>
        <span className="text-gray-400">{'>'}</span>
        <span className="font-semibold">Create</span>
        <span className="text-gray-400">{'>'}</span>
        <span className="font-semibold">Primary Information</span>
        <span className="text-gray-400">{'>'}</span>
        <span className="font-semibold">Shift Information</span>
      </div>
      <ShiftInfoForm />
  </div>
  
  );
};

export default Page;