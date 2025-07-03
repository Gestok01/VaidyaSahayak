// src/app/account-management/other-income-details/create_income_form.tsx
import React from "react";
import DynamicCreateForm from "../../components/DynamicCreateForm";
import Image from "next/image";
import Accountsvg from "../../../assets/svg/settings_account_box.svg"

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
    id: "incomeDetails",
    title: "Income Details",
    fields: [
      [
        {
          id: "incomeId",
          placeholder: "Enter Income ID",
          label: "Income ID",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "amount",
          placeholder: "Enter Amount",
          label: "Amount",
          type: "number",
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
            { value: "consultation", label: "Consultation" },
            { value: "procedure", label: "Procedure" },
            { value: "pharmacy", label: "Pharmacy" },
            { value: "lab", label: "Lab Test" },
            { value: "other", label: "Other" }
          ],
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
      { id: "incomeId", header: "Income ID", accessor: "incomeId" },
      { id: "amount", header: "Amount", accessor: "amount" },
      { id: "category", header: "Category", accessor: "category" },
      { id: "description", header: "Description", accessor: "description" }
    ],
    initialFormState: {
      incomeId: "",
      amount: "",
      category: "",
      description: ""
    },
    allowMultipleEntries: true
  }
];

const CreateIncomeForm = () => {
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
        { title: "Other Income Details", active: false },
        { title: "Create", active: true }
      ]}
      tableHeading="Income Details"
      sectionHeading="Income Details"
    />
  );
};

export default CreateIncomeForm;