"use client";

import React, { useState, useEffect } from "react";
import { Check, Trash2, Plus, Search, Lock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarMonth } from "@mui/icons-material";

export interface FormFieldConfig {
  id: string;
  label: string;
  type:
    | "text"
    | "select"
    | "date"
    | "tel"
    | "search"
    | "number"
    | "radio"
    | "toggle"
    | "time";
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  options?: { value: string; label: string }[];
  radioOptions?: { value: string; label: string }[];
  width?: "full" | "half" | "third" | "quarter";
  className?: string;
  calculateValue?: (formData: any) => string;
  dependsOn?: string[];
  min?: string | number;
  max?: number;
  pattern?: string;
  inputMode?: "numeric" | "tel" | "text";
  sectionTitle?: string;
}

export interface TableColumn {
  id: string;
  header: string;
  accessor: string;
}

export interface BookingSection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  validation?: (formData: Record<string, any>) => string | null;
  showMemberToggle?: boolean;
  showAddButton?: boolean;
  allowMultipleEntries?: boolean;
  hideFromProgress?: boolean;
}

interface BookingFormProps {
  bookingType: string;
  sections: BookingSection[];
  onSave?: (data: { [key: string]: any[] }) => void;
  showPatientId?: boolean;
  hideDefaultHeader?: boolean;
  customHeader?: React.ReactNode;
  disablePatientToggle?: boolean;
  saveButtonText?: string;
}

interface ExistingPatient {
  id: string;
  name: string;
  phone: string;
  gender: string;
  age: string;
  bookingDate: string;
  isMember?: boolean;
}

interface AdditionalDetail {
  itemName: string;
  itemAmount: string;
  remarks: string;
}

const BookingFormManager: React.FC<BookingFormProps> = ({
  bookingType,
  sections,
  onSave,
  showPatientId = false,
  hideDefaultHeader = false,
  customHeader,
  disablePatientToggle = false,
  saveButtonText,
}) => {
  const [phoneSearch, setPhoneSearch] = useState("");
  const [patientType, setPatientType] = useState("new");
  const [memberType, setMemberType] = useState("non-member");
  const [membershipId, setMembershipId] = useState("");
  const [availableSections, setAvailableSections] = useState<
    Record<string, boolean>
  >({});
  const [allEntries, setAllEntries] = useState<Record<string, any[]>>({});
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [dates, setDates] = useState<Record<string, Date | null>>({});
  const [progress, setProgress] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [lockedSections, setLockedSections] = useState<Record<string, boolean>>(
    {}
  );
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState<
    AdditionalDetail[]
  >([]);
  const [tempAdditionalDetail, setTempAdditionalDetail] =
    useState<AdditionalDetail>({
      itemName: "",
      itemAmount: "",
      remarks: "",
    });
  const [showFacilitiesFields, setShowFacilitiesFields] = useState<
    Record<string, boolean>
  >({});
  const [facilitiesActive, setFacilitiesActive] = useState(false);

  const [existingPatients, setExistingPatients] = useState<ExistingPatient[]>([
    {
      id: "1",
      name: "John Smith",
      phone: "+91 98765 12345",
      gender: "Male",
      age: "32",
      bookingDate: "12-11-2009",
      isMember: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      phone: "+91 87654 23456",
      gender: "Female",
      age: "28",
      bookingDate: "13-11-2009",
      isMember: false,
    },
    {
      id: "3",
      name: "Bob Johnson",
      phone: "+91 76543 34567",
      gender: "Male",
      age: "45",
      bookingDate: "14-11-2009",
      isMember: true,
    },
    {
      id: "4",
      name: "Sarah Williams",
      phone: "+91 65432 45678",
      gender: "Female",
      age: "37",
      bookingDate: "15-11-2009",
      isMember: false,
    },
    {
      id: "5",
      name: "Alex Turner",
      phone: "+91 54321 56789",
      gender: "Male",
      age: "25",
      bookingDate: "16-11-2009",
      isMember: true,
    },
  ]);

  useEffect(() => {
    const initialAvailable: Record<string, boolean> = {};
    const initialShowFields: Record<string, boolean> = {};

    if (sections.length > 0) {
      sections.forEach((section, index) => {
        initialAvailable[section.id] = index === 0 && !section.hideFromProgress;
        initialShowFields[section.id] =
          section.id === "additionalFacilities" ? false : true;
      });
      setActiveSection(sections[0].id);
    }
    setAvailableSections(initialAvailable);
    setShowFacilitiesFields(initialShowFields);
  }, [sections]);

  const isSectionAccessible = (sectionId: string) => {
    if (sectionId === "additionalFacilities") return true;
    return availableSections[sectionId] === true;
  };

  useEffect(() => {
    const initialFormValues: Record<string, any> = {};
    const initialEntries: Record<string, any[]> = {};
    const initialLockedSections: Record<string, boolean> = {};

    sections.forEach((section) => {
      initialFormValues[section.id] = { ...section.initialFormState };
      if (section.showMemberToggle) {
        initialFormValues[section.id].memberType = memberType;
      }
      initialEntries[section.id] = [];
      initialLockedSections[section.id] = false;
    });

    setFormValues(initialFormValues);
    setAllEntries(initialEntries);
    setLockedSections(initialLockedSections);
  }, [sections, memberType]);

  useEffect(() => {
    const sectionsForProgress = sections.filter(
      (section) => !section.hideFromProgress
    );
    const totalSections = sectionsForProgress.length;
    let completedSections = 0;

    sectionsForProgress.forEach((section) => {
      if ((allEntries[section.id]?.length || 0) > 0) completedSections++;
    });

    setProgress((completedSections / totalSections) * 100);

    const newLockedSections: Record<string, boolean> = {};
    sections.forEach((section) => {
      newLockedSections[section.id] = (allEntries[section.id]?.length || 0) > 0;
    });

    setLockedSections(newLockedSections);
  }, [allEntries, sections]);

  useEffect(() => {
    const newFormValues = { ...formValues };
    let hasChanges = false;

    sections.forEach((section) => {
      section.fields.flat().forEach((field) => {
        if (field.calculateValue && field.dependsOn) {
          const shouldRecalculate = field.dependsOn.some(
            (dependencyId) =>
              formValues[section.id]?.[dependencyId] !== undefined
          );

          if (shouldRecalculate) {
            const newValue = field.calculateValue(formValues[section.id] || {});
            if (newFormValues[section.id]?.[field.id] !== newValue) {
              if (!newFormValues[section.id]) newFormValues[section.id] = {};
              newFormValues[section.id][field.id] = newValue;
              hasChanges = true;
            }
          }
        }
      });
    });

    if (hasChanges) {
      setFormValues(newFormValues);
    }
  }, [formValues, sections]);

  const validateInput = (field: FormFieldConfig, value: string): string => {
    const numericFields = [
      "paidAmount",
      "oxygenUnits",
      "consultationFee",
      "totalBill",
      "waitingCharges",
      "amountPaid",
      "totalBill",
      "discount",
      "age",
      "startKm",
      "endKm",
      "waitingTime",
      "totalDiscount",
      "batchNumber",
      "pricePerVaccine",
      "itemPrice",
    ];

    if (field.type === "tel") {
      return value.replace(/[^\d\s+]/g, "");
    } else if (field.type === "number" || numericFields.includes(field.id)) {
      return value.replace(/[^\d]/g, "");
    }
    return value;
  };

  const handleInputChange = (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (isSectionLocked(sectionId) && sectionId !== "additionalFacilities")
      return;

    if (sectionId === "additionalFacilities") {
      setFacilitiesActive(true);
    } else {
      setActiveSection(sectionId);
    }

    const { name, value } = e.target;

    const field = sections
      .find((s) => s.id === sectionId)
      ?.fields.flat()
      .find((f) => f.id === name);

    if (field) {
      const validatedValue = validateInput(field, value);
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [name]: validatedValue,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [name]: value,
        },
      }));
    }
  };

  const handleDateChange = (
    sectionId: string,
    fieldId: string,
    date: Date | null
  ) => {
    if (isSectionLocked(sectionId)) return;

    if (sectionId === "additionalFacilities") {
      setFacilitiesActive(true);
    } else {
      setActiveSection(sectionId);
    }

    setDates((prev) => ({
      ...prev,
      [`${sectionId}-${fieldId}`]: date,
    }));

    if (date) {
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;

      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [fieldId]: formattedDate,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [fieldId]: "",
        },
      }));
    }
  };

  const handleMemberToggle = () => {
    if (Object.values(lockedSections).some((locked) => locked)) return;
    const newMemberType = memberType === "member" ? "non-member" : "member";
    setMemberType(newMemberType);
  };

  const handlePatientTypeToggle = () => {
    if (
      disablePatientToggle ||
      Object.values(lockedSections).some((locked) => locked)
    )
      return;

    const newPatientType = patientType === "existing" ? "new" : "existing";
    setPatientType(newPatientType);

    if (newPatientType === "new") {
      const patientSection = sections.find((s) => s.id === "patient");
      if (patientSection) {
        setFormValues((prev) => ({
          ...prev,
          patient: { ...patientSection.initialFormState },
        }));
      }
      setShowPhoneDropdown(false);
      setMemberType("non-member");
      setMembershipId("");
    }
  };

  const handleSelectExistingPatient = (patient: ExistingPatient) => {
    setActiveSection("patient");
    setPhoneSearch(patient.phone);
    setShowPhoneDropdown(false);

    const updatedFormValues = {
      ...formValues,
      patient: {
        ...formValues.patient,
        name: patient.name,
        phone: patient.phone,
        gender: patient.gender,
        age: patient.age,
        bookingDate: patient.bookingDate,
      },
    };

    setFormValues(updatedFormValues);

    if (patient.isMember) {
      setMemberType("member");
      setMembershipId(`MEM-${patient.id.padStart(6, "0")}`);
    } else {
      setMemberType("non-member");
      setMembershipId("");
    }

    if (patient.bookingDate) {
      try {
        const [day, month, year] = patient.bookingDate
          .split("-")
          .map((num) => parseInt(num));
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const bookingDateObj = new Date(year, month - 1, day);
          setDates((prev) => ({
            ...prev,
            "patient-bookingDate": bookingDateObj,
          }));
        }
      } catch (error) {
        console.error("Error parsing booking date:", error);
      }
    }
  };

  const handleRadioChange = (
    sectionId: string,
    fieldId: string,
    value: string
  ) => {
    if (isSectionLocked(sectionId) && sectionId !== "additionalFacilities")
      return;

    if (sectionId === "additionalFacilities") {
      setFacilitiesActive(true);
    } else {
      setActiveSection(sectionId);
    }

    if (fieldId === "memberType") {
      setMemberType(value);
    }

    setFormValues((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [fieldId]: value,
      },
    }));
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  const handleFacilitiesAddClick = (sectionId: string) => {
    if (!showFacilitiesFields[sectionId]) {
      // First click - show fields
      setShowFacilitiesFields((prev) => ({
        ...prev,
        [sectionId]: true,
      }));
      setFacilitiesActive(true);
    } else {
      // Subsequent clicks - add entry
      const section = sections.find((s) => s.id === sectionId);
      if (!section) return;

      if (section.validation) {
        const validationError = section.validation(formValues[sectionId] || {});
        if (validationError) {
          alert(validationError);
          return;
        }
      }

      let formDataToAdd = { ...formValues[sectionId] };
      if (section.showMemberToggle) {
        formDataToAdd.memberType = memberType;
      }

      setAllEntries((prev) => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), formDataToAdd],
      }));

      if (!section.allowMultipleEntries) {
        setLockedSections((prev) => ({
          ...prev,
          [sectionId]: true,
        }));
      }

      setFormValues((prev) => {
        const resetState = { ...section.initialFormState };
        if (section.showMemberToggle) {
          resetState.memberType = memberType;
        }
        return {
          ...prev,
          [sectionId]: resetState,
        };
      });

      const dateFieldIds = section.fields
        .flat()
        .filter((field) => field.type === "date")
        .map((field) => `${sectionId}-${field.id}`);

      const newDates = { ...dates };
      dateFieldIds.forEach((dateId) => {
        newDates[dateId] = null;
      });
      setDates(newDates);

      setFacilitiesActive(false);
    }
  };

  const addEntry = (sectionId: string) => {
    if (sectionId === "additionalFacilities") {
      handleFacilitiesAddClick(sectionId);
      return;
    }
    

    if (
      lockedSections[sectionId] &&
      !sections.find((s) => s.id === sectionId)?.allowMultipleEntries
    ) {
      alert(
        `This section already has an entry. Please delete it first to add a new one.`
      );
      return;
    }

    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    if (section.validation) {
      const validationError = section.validation(formValues[sectionId] || {});
      if (validationError) {
        alert(validationError);
        return;
      }
    }

    let formDataToAdd = { ...formValues[sectionId] };
    if (section.showMemberToggle) {
      formDataToAdd.memberType = memberType;
    }

    setAllEntries((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), formDataToAdd],
    }));

    if (!section.allowMultipleEntries) {
      setLockedSections((prev) => ({
        ...prev,
        [sectionId]: true,
      }));
    }

    setFormValues((prev) => {
      const resetState = { ...section.initialFormState };
      if (section.showMemberToggle) {
        resetState.memberType = memberType;
      }
      return {
        ...prev,
        [sectionId]: resetState,
      };
    });

    const dateFieldIds = section.fields
      .flat()
      .filter((field) => field.type === "date")
      .map((field) => `${sectionId}-${field.id}`);

    const newDates = { ...dates };
    dateFieldIds.forEach((dateId) => {
      newDates[dateId] = null;
    });
    setDates(newDates);

    // For ambulance section, skip additional facilities and go directly to payment
    if (sectionId === "ambulance") {
      setAvailableSections((prev) => ({
        ...prev,
        ["payment"]: true,
      }));
      setActiveSection("payment");
    }
    // For other sections (except additionalFacilities), follow normal progression
    else if (sectionId !== "additionalFacilities") {
      const currentIndex = sections.findIndex((s) => s.id === sectionId);
      const nextSectionId = sections[currentIndex + 1]?.id;

      if (nextSectionId) {
        setAvailableSections((prev) => ({
          ...prev,
          [nextSectionId]: true,
        }));
        setActiveSection(nextSectionId);
      } else {
        setActiveSection(null);
      }
    }

    if (sectionId === "payment") {
      setAdditionalDetails([]);
      setShowAdditionalDetails(false);
    }
  };

  const removeEntry = (sectionId: string, index: number) => {
    setAllEntries((prev) => {
      const newEntries = { ...prev };
      newEntries[sectionId] = prev[sectionId].filter(
        (_, entryIndex) => entryIndex !== index
      );
      return newEntries;
    });

    setTimeout(() => {
      setAllEntries((prev) => {
        if (prev[sectionId]?.length === 0) {
          setLockedSections((prevLocks) => ({
            ...prevLocks,
            [sectionId]: false,
          }));

          // Special handling for additionalFacilities section
          if (sectionId === "additionalFacilities") {
            setShowFacilitiesFields((prev) => ({
              ...prev,
              [sectionId]: true,
            }));
            setFacilitiesActive(true);
          } else {
            setShowFacilitiesFields((prev) => ({
              ...prev,
              [sectionId]: false,
            }));
          }
        }
        return prev;
      });
    }, 0);

    // Only update available sections if it's not additionalFacilities
    if (sectionId !== "additionalFacilities") {
      const currentIndex = sections.findIndex((s) => s.id === sectionId);
      const newAvailableSections = { ...availableSections };
      sections.forEach((section, idx) => {
        if (idx > currentIndex && !section.hideFromProgress) {
          newAvailableSections[section.id] = false;
        }
      });
      setAvailableSections(newAvailableSections);
    }

    setActiveSection(sectionId);
  };

  const handleSave = () => {
    const sectionsForValidation = sections.filter(
      (section) => !section.hideFromProgress
    );
    const allSectionsHaveEntries = sectionsForValidation.every(
      (section) => (allEntries[section.id] || []).length > 0
    );

    if (!allSectionsHaveEntries) {
      alert("Please complete all required sections before booking");
      return;
    }

    const newBookingId = Math.floor(1000 + Math.random() * 9000).toString();
    setBookingId(newBookingId);
    setShowSuccessModal(true);

    if (onSave) {
      onSave(allEntries);
    }
  };

  const handleBookAnother = () => {
    const initialFormValues: Record<string, any> = {};
    const initialEntries: Record<string, any[]> = {};
    const initialLockedSections: Record<string, boolean> = {};
    const initialAvailableSections: Record<string, boolean> = {};
    const initialShowFields: Record<string, boolean> = {};

    sections.forEach((section, index) => {
      initialFormValues[section.id] = { ...section.initialFormState };
      initialEntries[section.id] = [];
      initialLockedSections[section.id] = false;
      initialAvailableSections[section.id] =
        index === 0 && !section.hideFromProgress;
      initialShowFields[section.id] =
        section.id === "additionalFacilities" ? false : true;
    });

    setFormValues(initialFormValues);
    setAllEntries(initialEntries);
    setLockedSections(initialLockedSections);
    setAvailableSections(initialAvailableSections);
    setShowFacilitiesFields(initialShowFields);
    setActiveSection(sections[0].id);
    setDates({});
    setShowSuccessModal(false);
    setPatientType("new");
    setMemberType("non-member");
    setMembershipId("");
    setProgress(0);
    setAdditionalDetails([]);
    setShowAdditionalDetails(false);
    setFacilitiesActive(false);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const isSectionLocked = (sectionId: string) => {
    if (sectionId === "additionalFacilities") return false;

    if (lockedSections[sectionId] === true) {
      return true;
    }

    if (!isSectionAccessible(sectionId)) {
      return true;
    }

    if (
      activeSection !== null &&
      activeSection !== sectionId &&
      !facilitiesActive
    ) {
      return true;
    }

    return false;
  };

  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(!showAdditionalDetails);
  };

  const handleAdditionalDetailChange = (
    field: keyof AdditionalDetail,
    value: string
  ) => {
    setTempAdditionalDetail((prev) => ({
      ...prev,
      [field]: field === "itemAmount" ? value.replace(/[^\d.]/g, "") : value,
    }));
  };

  const addAdditionalDetail = () => {
    if (!tempAdditionalDetail.itemName || !tempAdditionalDetail.itemAmount) {
      alert("Item Name and Item Amount are required");
      return;
    }

    setAdditionalDetails((prev) => [...prev, tempAdditionalDetail]);
    setTempAdditionalDetail({
      itemName: "",
      itemAmount: "",
      remarks: "",
    });
  };

  const removeAdditionalDetail = (index: number) => {
    setAdditionalDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const renderField = (
    section: BookingSection,
    field: FormFieldConfig,
    rowIndex: number
  ) => {
    const sectionId = section.id;
    const formData = formValues[sectionId] || {};
    const dateKey = `${sectionId}-${field.id}`;
    const isLocked = isSectionLocked(sectionId);

    if (field.id === "phone" && sectionId === "patient") {
      if (patientType === "existing") {
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <input
                type="tel"
                name={field.id}
                placeholder="Search by phone number..."
                value={phoneSearch}
                onChange={(e) => {
                  setPhoneSearch(e.target.value);
                  setShowPhoneDropdown(true);
                }}
                onFocus={() => setShowPhoneDropdown(true)}
                className={`w-full placeholder:font-normal placeholder:text-[#383838] placeholder:text-[10px] p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FB009C]${
                  isLocked
                    ? "bg-[#E6E6E6] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
              />

              {showPhoneDropdown && !isLocked && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-[#FB009C] rounded shadow-lg max-h-[200px] overflow-y-auto">
                  {existingPatients
                    .filter(
                      (patient) =>
                        phoneSearch === "" ||
                        patient.phone.includes(phoneSearch)
                    )
                    .map((patient, idx) => (
                      <div
                        key={idx}
                        className="p-2 hover:bg-gray-100 border-b border-[#CCCCCC] cursor-pointer flex justify-between items-center"
                        onClick={() => handleSelectExistingPatient(patient)}
                      >
                        <div className="text-xs font-normal text-[#1A1A1A]">
                          {patient.phone}
                        </div>
                        <div className="font-normal text-xs text-[#1A1A1A] text-right">
                          {patient.name}
                          {patient.isMember && (
                            <span className="ml-2 text-[10px] text-green-600">
                              (Member)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                  {existingPatients.filter(
                    (patient) =>
                      phoneSearch === "" || patient.phone.includes(phoneSearch)
                  ).length === 0 && (
                    <div className="p-2 text-xs text-gray-500 text-center">
                      No matching patients found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <input
                type="tel"
                name={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
                disabled={isLocked}
                className={`w-full placeholder:font-normal text-xs placeholder:text-[10px] placeholder:text-[#383838] text-[#4D4D4D] p-2 border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked
                    ? "bg-[#E6E6E6] border border-[#999999] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
              />
            </div>
          </div>
        );
      }
    }

    let inputMode: "text" | "numeric" | "tel" | undefined = field.inputMode;
    if (!inputMode) {
      if (field.type === "tel") inputMode = "tel";
      else if (
        field.type === "number" ||
        field.id === "age" ||
        field.id === "startKm" ||
        field.id === "endKm" ||
        field.id === "waitingCharges" ||
        field.id === "ambulanceNumber" ||
        field.id === "waitingTime" ||
        field.id === "amountPaid" ||
        field.id === "totalDiscount" ||
        field.id === "totalBill" ||
        field.id === "itemPrice"
      ) {
        inputMode = "numeric";
      }
    }

    switch (field.type) {
      case "text":
      case "tel":
      case "number":
        return (
          <div key={field.id} className={field.className || "col-span-1"}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <input
                type={field.type === "number" ? "text" : field.type}
                name={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
                readOnly={
                  field.readOnly ||
                  (patientType === "existing" && sectionId === "patient") ||
                  isLocked
                }
                min={field.min}
                max={field.max}
                pattern={field.pattern}
                inputMode={inputMode}
                disabled={isLocked}
                className={`w-full p-2 placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked
                    ? "bg-[#E6E6E6] border border-[#999999] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
              />
            </div>
          </div>
        );

      case "select":
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <select
                name={field.id}
                value={formData[field.id] || ""}
                onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
                className={`w-full p-2 font-normal text-[10px] text-[#383838] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked
                    ? "bg-[#E6E6E6] border border-[#999999] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
                disabled={
                  (patientType === "existing" && sectionId === "patient") ||
                  isLocked
                }
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none"></div>
            </div>
          </div>
        );

      case "date":
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative ">
              <DatePicker
                selected={dates[dateKey] || null}
                onChange={(date) =>
                  !isLocked && handleDateChange(sectionId, field.id, date)
                }
                dateFormat="dd-MM-yyyy"
                placeholderText={
                  formData[field.id] || field.placeholder || "dd-mm-yyyy"
                }
                className={`w-[250px] placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] p-2 text-xs text-[#4D4D4D] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked ? "bg-[#E6E6E6] cursor-not-allowed" : ""
                }`}
                disabled={isLocked}
              />
              <CalendarMonth
                style={{ fontSize: "18px" }}
                className={`absolute bottom-1.5 right-2 
                ${isLocked ? "text-gray-500" : "text-pink-500"}`}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#383838] pointer-events-none"></div>
            </div>
          </div>
        );

      case "time":
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <input
                type="time"
                name={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
                disabled={isLocked}
                className={`w-full p-2 text-xs text-[#383838] border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked
                    ? "bg-[#E6E6E6] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
              />
            </div>
          </div>
        );

      case "search":
        return (
          <div key={field.id} className={field.className}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                name={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => !isLocked && handleInputChange(sectionId, e)}
                disabled={isLocked}
                className={`w-full placeholder:font-normal placeholder:text-[10px] placeholder:text-[#383838] p-2 text-xs font-medium text-pink-500 border border-[#999999] rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                  isLocked
                    ? "bg-[#E6E6E6] border border-[#999999] cursor-not-allowed text-[#383838]"
                    : ""
                }`}
              />
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#383838]"
                size={18}
              />
            </div>
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className={field.className || "mb-4"}>
            <label className="block text-xs font-medium text-[#1A1A1A] mb-1">
              {field.label}
              {field.required && (
                <span className="text-prd-fix-value-indicator-negative">*</span>
              )}
            </label>
            <div className="flex gap-4">
              {field.radioOptions?.map((option) => (
                <label
                  key={option.value}
                  className={`inline-flex items-center ${
                    isLocked
                      ? "cursor-not-allowed text-[#383838]"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio"
                    name={field.id}
                    value={option.value}
                    checked={formData[field.id] === option.value}
                    onChange={() =>
                      !isLocked &&
                      handleRadioChange(sectionId, field.id, option.value)
                    }
                    disabled={isLocked}
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getGridColumnsClass = (numColumns: number) => {
    return "grid-cols-5";
  };

  return (
    <>
      {/* Conditionally render the default header */}
      {!hideDefaultHeader && (
        <div className="mms:ml-2 md:ml-4 mms:p-1 md:p-4 flex items-center gap-3 mms:-mt-10 md:-mt-7">
          <span className="text-[#999999]  mms:text-[15px] md:text-xl font-semibold">
            {bookingType}
          </span>
          <span className="text-[#999999] mms:text-[28px] md:text-[40px] pb-2">
            &rsaquo;
          </span>
          <span className="text-[#4D4D4D] mms:text-[15px] md:text-xl font-semibold">
            {bookingType} Booking
          </span>
        </div>
      )}

      <div className="min-h-screen mms: md:-mt-2 mms:ml-3 md:ml-8">
        {/* Main Form Container */}
        <div className="max-w-[1480px] mx-auto bg-white rounded-lg border border-[#999999] mb-10">
          {/* Header Section - Simplified */}
          {customHeader ? (
            <>
              {customHeader}
              <div className="-mt-1">
                <hr className="h-4 border-[#999999]" />
              </div>
            </>
          ) : (
            !disablePatientToggle && (
              <>
                <div className="w-full flex justify-between px-4 py-2 items-center">
                  {memberType === "member" && (
                    <div className="text-[#1A1A1A] font-medium">
                      Member ID: {membershipId}
                    </div>
                  )}
                  {memberType === "non-member" && <div></div>}
                  <div className="flex items-center">
                    <span
                      className={`text-xs pb-2 pr-2 font-medium ${
                        patientType === "new"
                          ? "text-[#000000]"
                          : "text-[#999999]"
                      }`}
                    >
                      New Patient
                    </span>
                    <div
                      className={`relative inline-block w-11 h-7 ${
                        Object.values(lockedSections).some((locked) => locked)
                          ? "opacity-50"
                          : ""
                      }`}
                      onClick={handlePatientTypeToggle}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={patientType === "existing"}
                        onChange={handlePatientTypeToggle}
                        disabled={Object.values(lockedSections).some(
                          (locked) => locked
                        )}
                      />
                      <div
                        className={`block w-7 h-4 rounded-full ${
                          patientType === "existing"
                            ? "bg-[#b3db8a]"
                            : "bg-[#E6E6E6]"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform ${
                          patientType === "existing"
                            ? "transform translate-x-3"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-xs pb-2 font-medium ${
                        patientType === "existing"
                          ? "text-[#000000]"
                          : "text-[#999999]"
                      }`}
                    >
                      Existing Patient
                    </span>
                  </div>
                </div>
                <div className="-mt-1">
                  <hr className="h-4 border-[#999999]" />
                </div>
              </>
            )
          )}

          {/* Progress Bar Section */}
          <div className="mb-8 px-8 mx-auto max-w-full -mt-5">
            {/* Section Titles */}
            <div className="grid grid-cols-3 mb-1">
              {sections
                .filter((section) => !section.hideFromProgress)
                .map((section, index, filteredSections) => (
                  <div
                    key={section.id}
                    className={`text-xs py-4 ${
                      index === 0
                        ? "text-left font-medium text-gray-900"
                        : index === filteredSections.length - 1
                        ? "text-right text-gray-700 font-normal"
                        : "text-center text-gray-700 font-normal"
                    }`}
                  >
                    {section.title}
                  </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="relative h-0.5 mx-12 bg-gray-900 flex items-center mb-1">
              {/* Progress Indicator */}
              <div
                className="absolute left-0 top-0 h-0.5 bg-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />

              {/* Progress Dots */}
              {sections
                .filter((section) => !section.hideFromProgress)
                .map((section, index, filteredSections) => {
                  const position = index / (filteredSections.length - 1);
                  const completed = allEntries[section.id]?.length > 0;

                  return (
                    <div
                      key={section.id}
                      className="absolute w-4 h-3.5 rounded-full border-2 border-green-300 bg-white flex items-center justify-center"
                      style={{
                        left: `${position * 100}%`,
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                      }}
                    >
                      <div
                        className={`w-4 h-3 rounded-full ${
                          completed ? "bg-green-300" : "bg-white"
                        }`}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Form Sections */}
          {sections.map((section) => {
            const isLocked = lockedSections[section.id];
            const hasEntries = (allEntries[section.id]?.length || 0) > 0;
            const showAddButton = !hasEntries || section.allowMultipleEntries;
            const showFields =
              section.id === "additionalFacilities"
                ? showFacilitiesFields[section.id]
                : true;
            const isFacilitiesSection = section.id === "additionalFacilities";
            const isActive = isFacilitiesSection
              ? facilitiesActive
              : activeSection === section.id;

            return (
              <div key={section.id} className="p-2">
                <div className="flex justify-start items-center mb-2">
                  <h2 className="text-xs font-semibold flex items-center">
                    {section.title}
                    {showAddButton && (
                      <button
                        className={`px-4 text-[#FB009C] text-xs font-medium flex items-center ${
                          isLocked && !isFacilitiesSection
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          !(isLocked && !isFacilitiesSection) &&
                          addEntry(section.id)
                        }
                        disabled={isLocked && !isFacilitiesSection}
                      >
                        <span>Add</span>
                      </button>
                    )}
                    {section.showAddButton && (
                      <span className="text-[#FB009C] text-xs font-medium ml-2 cursor-pointer">
                        <span className="ml-1 bg-[#FB009C] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                          +
                        </span>
                      </span>
                    )}
                  </h2>
                  {section.showMemberToggle && (
                    <div className="flex justify-start pt-4">
                      <span
                        className={`mr-2 text-xs font-medium ${
                          memberType === "non-member"
                            ? "text-[#000000]"
                            : "text-[#999999]"
                        }`}
                      >
                        Non-Member
                      </span>
                      <label
                        className={`relative inline-block w-11 h-7 ${
                          Object.values(lockedSections).some((locked) => locked)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={memberType === "member"}
                          onChange={handleMemberToggle}
                          disabled={
                            Object.values(lockedSections).some(
                              (locked) => locked
                            ) || patientType === "existing"
                          }
                        />
                        <div
                          className={`block w-7 h-4 rounded-full ${
                            memberType === "member"
                              ? "bg-[#999999]"
                              : "bg-[#E6E6E6]"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-0.5 top-0.5 bg-[#FFFFFF] w-3 h-3 rounded-full transition-transform ${
                            memberType === "member"
                              ? "transform translate-x-3"
                              : ""
                          }`}
                        ></div>
                      </label>
                      <span
                        className={`text-xs font-medium ${
                          memberType === "member"
                            ? "text-[#000000]"
                            : "text-[#999999]"
                        }`}
                      >
                        Member
                      </span>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                {showFields &&
                  section.fields.map((row, rowIndex) => (
                    <div
                      key={`${section.id}-row-${rowIndex}`}
                      className={`grid ${getGridColumnsClass(
                        row.length
                      )} gap-12 mb-4`}
                    >
                      {row.map((field) =>
                        renderField(section, field, rowIndex)
                      )}
                    </div>
                  ))}

                {/* Table */}
                {hasEntries && (
                  <div className="w-full bg-white rounded-md border border-[#999999] overflow-hidden mx-1">
                    <div className="text-xs font-medium text-[#1A1A1A] px-1 py-2 ">
                      {section.title}
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-[#FB009C] to-[#B3DB8A]"></div>
                    <table className="w-full justify-center rounded-md">
                      <thead className="bg-[#E6F3D8] px-2 py-2 justify-center ">
                        <tr>
                          {section.tableColumns.map((column) => (
                            <th
                              key={column.id}
                              className="px-1 py-1.5 text-[10px] font-normal text-[#1A1A1A] uppercase"
                            >
                              {column.header}
                            </th>
                          ))}
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="px-1 py-2 justify-center">
                        {allEntries[section.id]?.map((entry, entryIndex) => (
                          <tr key={entryIndex} className="">
                            {section.tableColumns.map((column) => (
                              <td
                                key={column.id}
                                className="px-1 py-3.5 text-[10px] font-normal text-center"
                              >
                                {entry[column.accessor] || "--"}
                              </td>
                            ))}
                            <td className="px-2 py-1 text-[10px] text-right">
                              <button
                                className="text-[#FB009C] pr-6"
                                onClick={() =>
                                  removeEntry(section.id, entryIndex)
                                }
                              >
                                <Trash2 size={16} />
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

        {/* Book Button */}
        <div className="flex relative right-2 bottom-7 justify-end">
          <button
            className={`relative px-2 py-1.5 rounded-md text-xs font-medium border border-white shadow-sm ${
              sections
                .filter((section) => !section.hideFromProgress)
                .every((section) => (allEntries[section.id] || []).length > 0)
                ? "bg-[#FB009C] text-white shadow-[#FB009C]/80"
                : "bg-[#FF94D6] text-white shadow-[#FB009C]/80 opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={
              !sections
                .filter((section) => !section.hideFromProgress)
                .every((section) => (allEntries[section.id] || []).length > 0)
            }
          >
            {saveButtonText || "Book"} {/* Use the prop or default to "Book" */}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center">
                <span className="text-xs text-[#1A1A1A] font-semibold">
                  {bookingType === "Add New Patient"
                    ? `Your Profile `
                    : `Your ${bookingType} `}
                  <span className="text-[#FB009C] font-bold underline">
                    #{bookingId}
                  </span>{" "}
                  {bookingType === "Add New Patient"
                    ? "has been created successfully"
                    : "has been booked successfully"}
                </span>
                <div className="ml-2 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#FB009C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBookAnother}
                className="bg-white text-xs shadow-sm shadow-[#FB009C]/80 text-[#FB009C] px-3 py-1.5 rounded-md hover:bg-pink-50 transition-colors duration-200"
              >
                {bookingType === "Add New Patient"
                  ? "Create Another"
                  : "Book Another"}
              </button>
              <button
                onClick={handleGoHome}
                className="bg-[#FB009C] text-xs text-white border border-white shadow-sm shadow-[#FB009C]/80 px-2 py-1.5 rounded-md hover:bg-pink-600 transition-colors duration-200"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingFormManager;
