// src/app/account-management/fix-cost/fix_cost_create.tsx
import React from "react";
import DynamicCreateForm from "../../components/DynamicCreateForm";
import Accountsvg from "../../../assets/svg/settings_account_box.svg";
import Image from "next/image";

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
    id: "itemDetails",
    title: "Item Details",
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
          id: "category",
          label: "Category",
          placeholder: "Select Category",
          type: "select",
          required: true,
          options: [
            { value: "equipment", label: "Equipment" },
            { value: "supplies", label: "Supplies" },
            { value: "maintenance", label: "Maintenance" },
            { value: "utilities", label: "Utilities" },
            { value: "other", label: "Other" }
          ],
          className: "col-span-1"
        }
      ],
      [
        {
          id: "unit",
          placeholder: "Enter Unit",
          label: "Unit",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "cost",
          placeholder: "Enter Cost",
          label: "Cost",
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
          className: "col-span-2"
        }
      ]
    ],
    tableColumns: [
      { id: "itemName", header: "Item Name", accessor: "itemName" },
      { id: "category", header: "Category", accessor: "category" },
      { id: "unit", header: "Unit", accessor: "unit" },
      { id: "cost", header: "Cost", accessor: "cost" },
      { id: "remark", header: "Remark", accessor: "remark" }
    ],
    initialFormState: {
      itemName: "",
      category: "",
      unit: "",
      cost: "",
      remark: ""
    },
    allowMultipleEntries: true
  }
];

const FixCostCreate = () => {
  return (
    <DynamicCreateForm
      pageName="Fix Cost"
      sections={sections}
      customBreadcrumb={[
        { 
          title: (
            <div className="flex items-center gap-2">
              <Image 
                src={Accountsvg} 
                alt="Account Management" 
                width={20} 
                height={20}
                className="text-[#999999]"
              />
              <span>Account Management</span>
            </div>
          ), 
          active: false 
        },
        { title: "Fix Cost", active: false },
        { title: "Create", active: true }
      ]}
      tableHeading="Item Details"
      sectionHeading="Item Details"
    />
  );
};

export default FixCostCreate;