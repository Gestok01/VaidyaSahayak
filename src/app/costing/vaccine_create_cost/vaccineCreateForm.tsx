import React from "react";
import DynamicCostFormClient from "../../components/DynamicCreateForm";

// Define the required interfaces
interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
}

interface TableColumn {
  id: string;
  header: string;
  accessor: string;
}

interface CostSection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  allowMultipleEntries?: boolean;
}

const sections: CostSection[] = [
  {
    id: "vaccineCosting",
    title: "Vaccine",
    fields: [
      [
        {
          id: "itemName",
          placeholder: "Enter Item Name",
          label: "Item Name",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "ageGroup",
          placeholder: "Enter Age Group",
          label: "Age Group",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "costPerDose",
          placeholder: "Enter Cost Per Dose",
          label: "Cost Per Dose",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ],
      [
        {
          id: "description",
          placeholder: "Enter Description",
          label: "Description",
          type: "text",
          required: true,
          className: "col-span-2"
        }
      ],
      [
        {
          id: "expiryDate",
          placeholder: "Select Expiry Date",
          label: "Expiry Date",
          type: "date",
          required: true,
          className: "col-span-1"
        },
        {
          id: "instructions",
          placeholder: "Enter Instructions",
          label: "Instructions",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "numberOfDoses",
          placeholder: "Enter No. of Doses",
          label: "No. of Doses",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ],
      [
        {
          id: "remark",
          placeholder: "Enter Remark",
          label: "Remark",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "storageInstructions",
          placeholder: "Enter Storage Instructions",
          label: "Storage Instructions",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "itemName", header: "Item Name", accessor: "itemName" },
      { id: "ageGroup", header: "Age Group", accessor: "ageGroup" },
      { id: "costPerDose", header: "Cost Per Dose", accessor: "costPerDose" },
      { id: "description", header: "Description", accessor: "description" },
      { id: "expiryDate", header: "Expiry Date", accessor: "expiryDate" },
      { id: "instructions", header: "Instructions", accessor: "instructions" },
      { id: "numberOfDoses", header: "No. of Doses", accessor: "numberOfDoses" },
      { id: "remark", header: "Remark", accessor: "remark" },
      { id: "storageInstructions", header: "Storage Instructions", accessor: "storageInstructions" }
    ],
    initialFormState: {
      itemName: "",
      ageGroup: "",
      costPerDose: "",
      description: "",
      expiryDate: "",
      instructions: "",
      numberOfDoses: "",
      remark: "",
      storageInstructions: ""
    },
    allowMultipleEntries: true
  }
];

const VaccineCreateForm = () => {
  return (
    <DynamicCostFormClient
      pageName="Vaccine"
      sections={sections}
    />
  );
};

export default VaccineCreateForm;