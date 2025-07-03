'use client'
import React from "react";
import DynamicInventoryForm from "../../components/DynamicInventoryForm";

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

interface IssueSection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  allowMultipleEntries?: boolean;
}

// Category options
const categories = [
  { value: "medical", label: "Medical" },
  { value: "surgical", label: "Surgical" },
  { value: "pharmaceutical", label: "Pharmaceutical" }
];

const sections: IssueSection[] = [
  {
    id: "issueOrder",
    title: "Issue Order",
    allowMultipleEntries: true,
    fields: [
      [
        {
            id: "employeeName",
            label: "Employee Name",
            type: "text",
            placeholder: "Lorem",
            required: true,
            className: "col-span-1"
        },
        {
          id: "issueDate",
          label: "Issue Date",
          type: "date",
          required: true,
          className: "col-span-1"
        },
        {
            id: "remark",
            label: "Remark",
            type: "text",
            placeholder: "Lorem",
            required: true,
            className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "employeeName", header: "EMPLOYEE NAME", accessor: "employeeName" },
      { id: "issueDate", header: "ISSUE DATE", accessor: "issueDate" },
      { id: "remark", header: "REMARK", accessor: "remark" }
    ],
    initialFormState: {
      employeeName: "",
      issueDate: "",
      remark: ""
    }
  },
  {
    id: "itemDetails",
    title: "Item",
    allowMultipleEntries: true,
    fields: [
      [
        {
          id: "itemId",
          label: "Item ID",
          type: "text",
          placeholder: "XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "itemName",
          label: "Item Name",
          type: "text",
          placeholder: "Lorem",
          required: true,
          className: "col-span-1"
        },
        {
          id: "category",
          label: "Category",
          type: "select",
          options: categories,
          required: false,
          className: "col-span-1"
        },
        {
          id: "quantity",
          label: "Quantity",
          type: "number",
          placeholder: "# XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "remark",
          label: "Remark",
          type: "text",
          placeholder: "Lorem",
          required: true,
          className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "itemId", header: "ITEM ID", accessor: "itemId" },
      { id: "itemName", header: "ITEM NAME", accessor: "itemName" },
      { id: "category", header: "CATEGORY", accessor: "category" },
      { id: "quantity", header: "QUANTITY", accessor: "quantity" },
      { id: "remark", header: "REMARK", accessor: "remark" }
    ],
    initialFormState: {
      itemId: "",
      itemName: "",
      category: "",
      quantity: "",
      remark: ""
    }
  }
];

const PurchaseOrderCreate = () => {
  return (
    <DynamicInventoryForm
      pageName="Issue Order"
      sections={sections}
    />
  );
};

export default PurchaseOrderCreate;