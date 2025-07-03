"use client";
import Link from "next/link";
import React, { useState } from "react";
import TitleList from "@/app/components/TitleList";

const Page = () => {
  // Track which sections are completed
 const [titleList,setTitleList] = useState([
        { name: "Profiling", linkTo: "" },
        { name: "Doctor", linkTo: "" },
        { name: "Create", linkTo: "" },
        { name: "Primary Information", linkTo: "/profiling/doctor_profile" },
      ]);
  const [isSaved, setIsSaved] = useState(false);
  const [filledSections, setFilledSections] = useState({
    personalInfo: false,
    educationalInfo: false,
    experienceInfo: false,
  });

  const handleSave = () => {
    console.log("All section data:", entries);
    setIsSaved(true);
  };

  // Form sections configuration
  const [sections] = useState([
    {
      id: "personal",
      title: "Personal Information",
      fields: [
        {
          label: "Full Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
        },
        {
          label: "Phone Number",
          type: "tel",
          placeholder: "+91 XXXXXXXXX",
          required: true,
        },
        {
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Others"],
          placeholder: "Select gender",
          required: true,
        },
        {
          label: "DOB",
          type: "date",
          placeholder: "dd-mm-yy",
          required: false,
        },
        {
          label: "Email",
          type: "email",
          placeholder: "LoremIpsum@gmail.com",
          required: false,
        },
      ],
    },
    {
      id: "educational",
      title: "Educational Information",
      fields: [
        {
          label: "College Name",
          type: "text",
          placeholder: "LoremIpsum",
          required: false,
        },
        {
          label: "Year of Passing",
          type: "date",
          placeholder: "dd-mm-yy",
          required: false,
        },
        {
          label: "Qualification",
          type: "text",
          placeholder: "LoremIpsum",
          required: true,
        },
        {
          label: "Specialization",
          type: "text",
          placeholder: "LoremIpsum",
          required: true,
        },
      ],
    },
    {
      id: "experience",
      title: "Experience Information",
      fields: [
        {
          label: "NMC Doctor ID",
          type: "text",
          placeholder: "XXXXXXX",
          required: true,
        },
        {
          label: "Organization Name",
          type: "text",
          placeholder: "Lorem",
          required: false,
        },
        {
          label: "Position",
          type: "text",
          placeholder: "LoremIpsum",
          required: true,
        },
        {
          label: "Years of Experience",
          type: "number",
          placeholder: "XX",
          required: true,
          min: 0,
        },
      ],
    },
  ]);

  const [entries, setEntries] = useState({});
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Calculate progress percentage (0-100)
  const progress =
  (Object.values(filledSections).filter(Boolean).length / sections.length) * 100;


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

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field.label]: value,
      },
    }));
  };

  const handleAdd = (section) => {
    const sectionConfig = sections.find((s) => s.title === section);
    const requiredFields = sectionConfig.fields.filter(
      (field) => field.required
    );
    const missingFields = requiredFields.filter(
      (field) => !formData[section]?.[field.label]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill all required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    setEntries((prev) => ({
      ...prev,
      [section]: [formData[section] || {}],
    }));

    // Mark section as filled
    const sectionKey = `${sectionConfig.id}Info`;
    setFilledSections((prev) => ({
      ...prev,
      [sectionKey]: true,
    }));

    // Reset form data for this section
    setFormData((prev) => ({
      ...prev,
      [section]: {},
    }));
  };

  const handleRemove = (section) => {
    const sectionConfig = sections.find((s) => s.title === section);

    setEntries((prev) => {
      const newEntries = { ...prev };
      delete newEntries[section];

      // Mark section as not filled
      const sectionKey = `${sectionConfig.id}Info`;
      setFilledSections((prev) => ({
        ...prev,
        [sectionKey]: false,
      }));

      return newEntries;
    });
  };

  // Check if previous section is filled to enable current section
  const isSectionEnabled = (sectionName) => {
    switch (sectionName) {
      case "Educational Information":
        return filledSections.personalInfo;
      case "Experience Information":
        return filledSections.educationalInfo;
      default:
        return true;
    }
  };

  return (
    <div>
     <TitleList titleList = {titleList} setTitleList = {setTitleList}/>

      <div className="p-6 mx-auto">
        <div className="flex gap-8">
          {/* Left Column - Profile Image */}
          <div className="">
            <div className="flex flex-col items-center gap-4 sticky top-6">
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

          <div className="w-full border border-gray-500">
            <p className="text-xs font-semibold p-2 border border-b-2">Doctor Information</p>
            <div className="p-2">
              <div className="mb-8 mx-auto">
                <div className="grid grid-cols-3 mb-1">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`text-xs py-4 ${
                        index === 0
                          ? "text-left font-medium text-[#1A1A1A]"
                          : index === sections.length - 1
                          ? "text-right text-[#4D4D4D] font-normal"
                          : "text-center text-[#4D4D4D] font-normal"
                      }`}
                    >
                      {section.title}
                    </div>
                  ))}
                </div>
                <div className="relative h-0.5 mx-12 bg-[#1A1A1A] flex items-center mb-1">
                  <div
                    className="absolute left-0 top-0 h-0.5 bg-[#FB009C] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>

                  {sections.map((section, index) => {
                    const position = index / (sections.length - 1);
                    const completed = filledSections[`${section.id}Info`];

                    return (
                      <div
                        key={section.id}
                        className={`absolute w-4 h-4 rounded-full border-2 border-[#B3DB8A] bg-white flex items-center justify-center`}
                        style={{
                          left: `${position * 100}%`,
                          transform: "translate(-50%, -50%)",
                          top: "50%",
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            completed ? "bg-[#B3DB8A]" : "bg-white"
                          }`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
          
              <div className="">
                {sections.map(({ id, title, fields }) => {
                  const isEnabled = isSectionEnabled(title);
                  const isFilled = filledSections[`${id}Info`];
                  const hasEntry = entries[title]?.length > 0;

                  return (
                    <div
                      key={id}
                      className={`mb-8 border-b pb-6 ${
                        !isEnabled ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <div className="flex gap-2 items-center mb-4">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        {!hasEntry && (
                          <button
                            onClick={() => handleAdd(title)}
                            className="text-pink-500 hover:text-pink-700 text-sm font-medium flex items-center"
                          >
                            <span className="mr-1">+</span> Add
                          </button>
                        )}
                      </div>

                      <div className={`flex flex-wrap gap-4 mb-6 ${hasEntry ? 'opacity-50 pointer-events-none' : ''}`}>
                        {fields.map((field, idx) => (
                          <div key={idx} className="mb-4 w-72">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                        
                          {field.type === "select" ? (
                            <select
                              value={formData[title]?.[field.label] || ""}
                              onChange={(e) => handleInputChange(title, field, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                              required={field.required}
                              disabled={hasEntry}
                            >
                              <option value="">{field.placeholder}</option>
                              {field.options.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "date" ? (
                            <div
                              onClick={(e) =>
                                !hasEntry && e.currentTarget.querySelector("input")?.showPicker()
                              }
                              className="cursor-pointer"
                            >
                              <input
                                type="date"
                                value={formData[title]?.[field.label] || ""}
                                onChange={(e) => handleInputChange(title, field, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                required={field.required}
                                disabled={hasEntry}
                              />
                            </div>
                          ) : field.label === "Years of Experience" ? (
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={formData[title]?.[field.label] || ""}
                              onChange={(e) => handleInputChange(title, field, e.target.value)}
                              onKeyDown={(e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ];
                                if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder={field.placeholder}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500 appearance-none"
                              required={field.required}
                              disabled={hasEntry}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={formData[title]?.[field.label] || ""}
                              onChange={(e) => handleInputChange(title, field, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                              required={field.required}
                              disabled={hasEntry}
                              min={field.min}
                            />
                          )}
                        </div>
                        
                        ))}
                      </div>

                      {hasEntry && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                {fields.map((field, idx) => (
                                  <th
                                    key={idx}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    {field.label}
                                  </th>
                                ))}
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {entries[title].map((entry, entryIdx) => (
                                <tr key={entryIdx} className="hover:bg-gray-50">
                                  {fields.map((field, fieldIdx) => (
                                    <td
                                      key={fieldIdx}
                                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                                    >
                                      {entry[field.label] || "-"}
                                    </td>
                                  ))}
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                      onClick={() => handleRemove(title)}
                                      className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          
            {
              <div className="flex justify-end mx-2 mb-2 gap-2">
            {
              isSaved &&   <Link href="/profiling/doctor_profile/shift_info">
              <div
             
              className="bg-[#FB009C] text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors cursor-pointer text-center">
                Next
              </div>
            </Link>
            }
          
          <button
  className={`${isSaved ? 'bg-[#B3DB8A]' : 'bg-[#FB009C] hover:bg-pink-600'} text-white px-6 py-2 rounded-md transition-colors 
    ${!Object.values(filledSections).every(Boolean) ? 'bg-[#FAD0D0] cursor-not-allowed' : ''}
  `}
  onClick={handleSave}
  disabled={!Object.values(filledSections).every(Boolean)}
>
  {isSaved ? 'Saved' : 'Save'}
</button>

            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;