"use client";
import { useState } from "react";
import CustomProfileForm from "@/app/components/CustomProfileForm";
import ShiftInformationForm from "@/app/components/ShiftInfoForm";

const Page = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [activePage, setActivePage] = useState('Primary');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {},
    workInfo: {},
    shifts: []
  });

  // Store shifts data from ShiftInformationForm
  const [shifts, setShifts] = useState([]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store the data for later use when submitting both forms
      setFormData(prevData => ({
        ...prevData,
        personalInfo: data.entries.personalInfo[0] || {},
        workInfo: data.entries.workInfo[0] || {},
      }));
      
      console.log("Form data stored:", data);
      setIsSaved(true);
      setLoading(false);
    } catch (err) {
      setError("Failed to process form data");
      setLoading(false);
      console.error(err);
    }
  };

  const handleShiftSubmit = async (shiftData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store shifts data
      setShifts(shiftData);
      
      // Now submit everything to the API
      await submitToAPI({
        ...formData.personalInfo,
        shifts: shiftData
      });
      
    } catch (err) {
      setError("Failed to save shift information");
      setLoading(false);
      console.error(err);
    }
  };

  const submitToAPI = async (completeData) => {
    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Add all the text fields
      formDataToSend.append("receptionist_name", completeData.fullName);
      formDataToSend.append("gender", completeData.gender);
      formDataToSend.append("age", completeData.age);
      formDataToSend.append("phone_number", completeData.phoneNumber);
      formDataToSend.append("dob", completeData.dob);
      formDataToSend.append("address", completeData.address);
      formDataToSend.append("email_id", completeData.email);
      
      // TODO: Add these fields which need to be provided from context or props
      formDataToSend.append("admin_id", "admin123"); // This should come from context/auth
      formDataToSend.append("clinic_id", "clinic123"); // This should come from context/selection
      formDataToSend.append("password", "defaultPassword"); // This should be handled securely
      
      // Add profile picture if available
      if (completeData.profileImage) {
        formDataToSend.append("profile_picture", completeData.profileImage);
      }
      
      // Add shifts as JSON string
      formDataToSend.append("shifts", JSON.stringify(completeData.shifts));

      // Make API call
      const response = await fetch("http://localhost:8000/api/profile/create-receptionist-profile", {
        method: "POST",
        body: formDataToSend,
        // No Content-Type header here as FormData sets it automatically with boundary
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to create receptionist profile");
      }
      
      console.log("API Response:", result);
      alert("Receptionist profile created successfully!");
      
      // Reset form or redirect
      setLoading(false);
      
      // Optional: Redirect to a success page or listing
      // window.location.href = "/dashboard/receptionists";
      
    } catch (err) {
      setError(err.message || "Failed to submit data to API");
      setLoading(false);
      console.error("API Error:", err);
      alert("Failed to create receptionist profile. Please try again.");
    }
  };

  const titleList = [
    { name: "Profiling", linkTo: "" },
    { name: "Employee", linkTo: "" },
    { name: "Create", linkTo: "" },
  ];
  
  const receptionistFields = {
    personalInfo: [
      {
        name: "fullName",
        label: "Full Name",
        required: true,
        placeholder: "Enter your name",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "text",
        required: true,
        placeholder: "+91XXXXXXX",
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
        placeholder: "XXXXXXXX",
      },
      {
        name: "age",
        label: "Age",
        type: "text",
        required: true,
        placeholder: "XX",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "example@mail.com",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true,
        placeholder: "Enter your address",
      },
    ]
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {activePage === 'Primary' ? (
        <CustomProfileForm
          formHeading="Receptionist Profile Information"
          setActivePage={setActivePage}
          isSaved={isSaved}
          titleList={titleList}
          formFields={receptionistFields}
          onSubmit={handleSubmit}
        />
      ) : (
        <div>
          <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
            <span className="text-pink-600 text-xl">👤</span>
            <span>Profiling</span>
            <span className="text-gray-400">{'>'}</span>
            <span>Receptionist</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Create</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Primary Information</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-semibold">Shift Information</span>
          </div>
          <ShiftInformationForm onSubmit={handleShiftSubmit} />
        </div>
      )}
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-2 text-center">Processing...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;