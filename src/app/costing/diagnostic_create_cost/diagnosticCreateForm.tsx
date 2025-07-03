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
    id: "diagnosticsCosting",
    title: "Diagnostics Costing",
    fields: [
      [
        {
          id: "testName",
          placeholder: "Enter Test Name",
          label: "Test Name",
          type: "text",
          required: true,
          className: "col-span-2"
        },
        {
          id: "testGroup",
          placeholder: "Enter Test Group",
          label: "Test Group",
          type: "text",
          required: true,
          className: "col-span-2"
        },
        {
          id: "isActive",
          label: "Is Active",
          placeholder: "Select",
          type: "select",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          className: "col-span-2"
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
          id: "inMemDisc",
          placeholder: "Enter In Mem Disc",
          label: "In Mem Disc",
          type: "number",
          required: true,
          className: "col-span-2"
        },
        {
          id: "inSenDisc",
          label: "In Sen Disc",
          placeholder: "Enter In Sen Disc",
          type: "number",
          required: true,
          className: "col-span-2"
        },
        {
          id: "otherMemDisc",
          label: "Other Mem Disc",
          placeholder: "Enter Other Mem Disc",
          type: "number",
          required: true,
          className: "col-span-2"
        },
        {
          id: "otherLabDisc",
          label: "Other Lab Disc",
          placeholder: "Enter Other Lab Disc",
          type: "number",
          required: true,
          className: "col-span-2"
        }
      ],
      [
        {
          id: "remark",
          label: "Remark",
          placeholder: "Enter Remark",
          type: "text",
          required: true,
          className: "col-span-3"
        }
      ]
    ],
    tableColumns: [
      { id: "testName", header: "Test Name", accessor: "testName" },
      { id: "testGroup", header: "Test Group", accessor: "testGroup" },
      { id: "isActive", header: "Is Active", accessor: "isActive" },
      { id: "description", header: "Description", accessor: "description" },
      { id: "inMemDisc", header: "In Mem Disc", accessor: "inMemDisc" },
      { id: "inSenDisc", header: "In Sen Disc", accessor: "inSenDisc" },
      { id: "otherMemDisc", header: "Other Mem Disc", accessor: "otherMemDisc" },
      { id: "otherLabDisc", header: "Other Lab Disc", accessor: "otherLabDisc" },
      { id: "remark", header: "Remark", accessor: "remark" }
    ],
    initialFormState: {
      testName: "",
      testGroup: "",
      isActive: "",
      description: "",
      inMemDisc: "",
      inSenDisc: "",
      otherMemDisc: "",
      otherLabDisc: "",
      remark: ""
    },
    allowMultipleEntries: true
  }
];

const DiagnosticCreateForm = () => {
  return (
    <DynamicCostFormClient
      pageName="Diagnostics"
      sections={sections}
    />
  );
};

export default DiagnosticCreateForm;