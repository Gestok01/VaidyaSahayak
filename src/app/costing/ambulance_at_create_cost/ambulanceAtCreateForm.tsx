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
    id: "ambulanceCosting",
    title: "Ambulance Attribute",
    fields: [
      [
        {
          id: "attributeName",
          placeholder: "Enter Attribute Name",
          label: "Attribute Name",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "costPerHour",
          placeholder: "Enter Cost Per Hour",
          label: "Cost Per Hour",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "costPerUse",
          placeholder: "Enter Cost Per Use",
          label: "Cost Per Use",
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
      ]
    ],
    tableColumns: [
      { id: "attributeName", header: "Attribute Name", accessor: "attributeName" },
      { id: "costPerHour", header: "Cost Per Hour", accessor: "costPerHour" },
      { id: "costPerUse", header: "Cost Per Use", accessor: "costPerUse" },
      { id: "description", header: "Description", accessor: "description" }
    ],
    initialFormState: {
      attributeName: "",
      costPerHour: "",
      costPerUse: "",
      description: ""
    },
    allowMultipleEntries: true
  }
];

const AmbulanceAtCreateForm = () => {
  return (
    <DynamicCostFormClient
      pageName="Ambulance Attributes"
      sections={sections}
    />
  );
};

export default AmbulanceAtCreateForm;