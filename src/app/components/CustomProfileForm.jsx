"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

const CustomProfileForm = ({
  formHeading,
  isSaved,
  setActivePage,
  titleList = [],
  formFields = {
    personalInfo: [],
    educationInfo: [],
    workInfo: [],
  },
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [entries, setEntries] = useState({
    personalInfo: [],
    educationInfo: [],
    workInfo: [],
  });
  const [lockedSections, setLockedSections] = useState({
    personalInfo: false,
    educationInfo: false,
    workInfo: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = (sectionName) => {

    const requiredFields = formFields[sectionName].filter(
      (field) => field.required
    );
    const missingFields = requiredFields.filter(
      (field) => !formData[field.name]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill all required fields`
      );
      return;
    }

  
    setEntries((prev) => ({
      ...prev,
      [sectionName]: [...prev[sectionName], formData],
    }));

    // Disable all fields of that section
    setLockedSections((prev) => ({
      ...prev,
      [sectionName]: true,
    }));

    // Reset form data for this section
    const initialData = {};
    formFields[sectionName].forEach((field) => {
      initialData[field.name] = "";
    });
    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  };

  const handleRemoveEntry = (sectionName, index) => {
    setEntries((prev) => {
      const newEntries = [...prev[sectionName]];
      newEntries.splice(index, 1);
      return {
        ...prev,
        [sectionName]: newEntries,
      };
    });

    // If no more entries, unlock the section
    if (entries[sectionName].length <= 1) {
      setLockedSections((prev) => ({
        ...prev,
        [sectionName]: false,
      }));
    }
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };



  const renderTable = (sectionName) => {
    const sectionLabel =
      sectionName === "personalInfo"
        ? "Personal Information"
        : sectionName === "workInfo"
        ? "Work Information"
        : sectionName === "educationInfo"
        ? "Education Information"
        : sectionName;

    const currentFields = formFields[sectionName];

    if (!entries[sectionName] || entries[sectionName].length === 0) return null;

    return (
      <div className="mt-4">
        {/* Heading same as the section */}
        <h2 className="text-lg font-bold mb-2">{sectionLabel}</h2>

        <div className="">
          <table className="min-w-full text-sm border border-gray-200 dark:border-neutral-800 rounded">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                {currentFields.map((field) => (
                  <th
                    key={field.name}
                    className="border px-4 py-2 text-left font-semibold"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="border px-4 py-2 text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {entries[sectionName].map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-900"
                >
                  {currentFields.map((field) => (
                    <td key={field.name} className="border px-4 py-2">
                      {field.type === "file" &&
                      entry[field.name] instanceof File ? (
                        <img
                          src={URL.createObjectURL(entry[field.name])}
                          alt="Uploaded"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        entry[field.name] || "-"
                      )}
                    </td>
                  ))}
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => handleRemoveEntry(sectionName, index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-h-[80vh] ml-8">
      <div className="max-w-[1480px] mx-auto bg-white rounded-lg mb-10">
        <h1 className="text-2xl font-semibold mb-6 flex gap-4 p-4">
          {titleList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className={
                  idx < titleList.length - 1
                    ? "text-[#999999]"
                    : "text-[#4D4D4D]"
                }
              >
                {item.name}
              </span>
              {idx < titleList.length - 1 && (
                <span className="text-[#999999] text-[40px] pb-2">
                  &rsaquo;
                </span>
              )}
            </div>
          ))}
        </h1>

        <div className="flex gap-8 p-4">
          {/* Profile Image Section */}
          <div className="w-1/4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-[200px] h-[200px] bg-gray-200 border border-[#999999] rounded-full flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <label className="w-[109px] h-[36px] border border-[#FB009C] rounded-md flex items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors">
                Change
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-3/4 border border-[#999999] p-4">
            <form onSubmit = {()=>{
              e.preventDefault();
            }}>
              {/* Personal Information Section */}
              {formFields.personalInfo.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xs font-semibold">
                      Personal Information
                    </h2>
                    {!lockedSections.personalInfo && (
                      <button
                        onClick={() => handleAddClick("personalInfo")}
                        className="text-[#FB009C] text-xs px-3 font-semibold flex items-center"
                      >
                        <span>Add</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-6">
                    {formFields.personalInfo.map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
                          {field.label}
                          {field.required && (
                            <span className="text-prd-fix-value-indicator-negative">
                              *
                            </span>
                          )}
                        </label>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                              lockedSections.personalInfo
                                ? "bg-[#E6E6E6] cursor-not-allowed"
                                : ""
                            }`}
                            required={field.required}
                            onChange={handleInputChange}
                            value={formData[field.name] || ""}
                            disabled={lockedSections.personalInfo}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : field.name === "age" || field.name === "phone" ? (
                          <input
                            type="text"
                            name={field.name}
                            placeholder={
                              field.placeholder ||
                              `Enter ${field.label.toLowerCase()}`
                            }
                            className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                              lockedSections.personalInfo
                                ? "bg-[#E6E6E6] cursor-not-allowed"
                                : ""
                            }`}
                            required={field.required}
                            onChange={handleNumberInput}
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={formData[field.name] || ""}
                            disabled={lockedSections.personalInfo}
                          />
                        ) : field.type === "date" ? (
                          <input
                            type="date"
                            name={field.name}
                            className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                              lockedSections.personalInfo
                                ? "bg-[#E6E6E6] cursor-not-allowed"
                                : ""
                            }`}
                            required={field.required}
                            onChange={handleInputChange}
                            onClick={(e) => e.target.showPicker()}
                            value={formData[field.name] || ""}
                            disabled={lockedSections.personalInfo}
                          />
                        ) : (
                          <input
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={
                              field.placeholder ||
                              `Enter ${field.label.toLowerCase()}`
                            }
                            className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                              lockedSections.personalInfo
                                ? "bg-[#E6E6E6] cursor-not-allowed"
                                : ""
                            }`}
                            required={field.required}
                            onChange={handleInputChange}
                            value={formData[field.name] || ""}
                            disabled={lockedSections.personalInfo}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {renderTable("personalInfo")}
                </div>
              )}

           
{formFields.workInfo && formFields.workInfo.length > 0 && (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <h2 className="text-xs font-semibold">Work Information</h2>
      {!lockedSections.workInfo && (
        <button
          onClick={() => handleAddClick("workInfo")}
          className="text-[#FB009C] text-xs px-3 font-semibold flex items-center"
          disabled={!lockedSections.personalInfo}
        >
          <span>Add</span>
        </button>
      )}
    </div>

    <div className="grid grid-cols-5 gap-6">
      {formFields.workInfo.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
            {field.label}
            {field.required && (
              <span className="text-prd-fix-value-indicator-negative">
                *
              </span>
            )}
          </label>
          {field.type === "select" ? (
            <select
              name={field.name}
              className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                !lockedSections.personalInfo || lockedSections.workInfo
                  ? "bg-[#E6E6E6] cursor-not-allowed"
                  : ""
              }`}
              required={field.required}
              onChange={handleInputChange}
              value={formData[field.name] || ""}
              disabled={
                !lockedSections.personalInfo || lockedSections.workInfo
              }
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.name === "age" || field.name === "phone" ? (
            <input
              type="text"
              name={field.name}
              placeholder={
                field.placeholder ||
                `Enter ${field.label.toLowerCase()}`
              }
              className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                !lockedSections.personalInfo || lockedSections.workInfo
                  ? "bg-[#E6E6E6] cursor-not-allowed"
                  : ""
              }`}
              required={field.required}
              onChange={handleNumberInput}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData[field.name] || ""}
              disabled={
                !lockedSections.personalInfo || lockedSections.workInfo
              }
            />
          ) : field.type === "date" ? (
            <input
              type="date"
              name={field.name}
              className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                !lockedSections.personalInfo || lockedSections.workInfo
                  ? "bg-[#E6E6E6] cursor-not-allowed"
                  : ""
              }`}
              required={field.required}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}
              value={formData[field.name] || ""}
              disabled={!lockedSections.personalInfo || lockedSections.workInfo}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={
                field.placeholder ||
                `Enter ${field.label.toLowerCase()}`
              }
              className={`w-full p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                !lockedSections.personalInfo || lockedSections.workInfo
                  ? "bg-[#E6E6E6] cursor-not-allowed"
                  : ""
              }`}
              required={field.required}
              onChange={handleInputChange}
              value={formData[field.name] || ""}
              disabled={
                !lockedSections.personalInfo || lockedSections.workInfo
              }
            />
          )}
        </div>
      ))}
    </div>
    {/* Add this line to render the workInfo table */}
    {renderTable("workInfo")}
  </div>
)}
            </form>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end p-4 gap-4">
          {
            isSaved && <button
            onClick={()=>{setActivePage('Shift')}}
            className="px-6 py-1 rounded-md bg-[#FB009C] text-white hover:bg-[#E0008C] 
                       focus:outline-none focus:ring-2 focus:ring-[#FB009C] focus:ring-offset-2 
                       transition-colors duration-200 shadow-sm"
          >
            Next
          </button>
          }
        <button
  onClick={(e) => {
    e.preventDefault();
    onSubmit({ ...formData, entries });
  }}
  className={`px-6 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 focus:ring-offset-2 transition-colors ${
    !isSaved 
      ? "bg-[#FB009C] text-white hover:bg-pink-600" 
      : "bg-green-400 text-white"
  }`}
>
 {
  isSaved ? 'Saved' :' Save'
 }
</button>
        </div>
      </div>
    </div>
  );
};

export default CustomProfileForm;
