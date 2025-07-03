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
    id: "oxygenCosting",
    title: "Oxygen",
    fields: [
      [
        {
          id: "itemName",
          placeholder: "Enter Item Name",
          label: "Item Name",
          type: "text",
          required: true,
          className: "col-span-2" // Increased width for better visibility
        },
        {
          id: "itemGroup",
          label: "Item Group",
          placeholder: "Select Item Group",
          type: "select",
          required: true,
          options: [
            { value: "cylinder", label: "Oxygen Cylinder" },
            { value: "concentrator", label: "Oxygen Concentrator" },
            { value: "liquid", label: "Liquid Oxygen" },
            { value: "other", label: "Other" }
          ],
          className: "col-span-2" // Increased width for dropdown
        },
        {
          id: "costPerDay",
          placeholder: "Enter Cost Per Day",
          label: "Cost Per Day",
          type: "number",
          required: true,
          className: "col-span-2" // Standard width for numbers
        },
        {
          id: "costPerUnit",
          placeholder: "Enter Cost Per Unit",
          label: "Cost Per Unit",
          type: "number",
          required: true,
          className: "col-span-2" // Standard width for numbers
        },
        {
          id: "remark",
          label: "Remark",
          placeholder: "Enter Remark",
          type: "text",
          required: false,
          className: "col-span-4" // Wider space for remarks
        }
      ]
    ],
    tableColumns: [
      { id: "itemName", header: "Item Name", accessor: "itemName" },
      { id: "itemGroup", header: "Item Group", accessor: "itemGroup" },
      { id: "costPerDay", header: "Cost Per Day", accessor: "costPerDay" },
      { id: "costPerUnit", header: "Cost Per Unit", accessor: "costPerUnit" },
      { id: "remark", header: "Remark", accessor: "remark" }
    ],
    initialFormState: {
      itemName: "",
      itemGroup: "",
      costPerDay: "",
      costPerUnit: "",
      remark: ""
    },
    allowMultipleEntries: true
  }
];

const OxygenCreateForm = () => {
  return (
    <DynamicCostFormClient
      pageName="Oxygen"
      sections={sections}
    />
  );
};

export default OxygenCreateForm;