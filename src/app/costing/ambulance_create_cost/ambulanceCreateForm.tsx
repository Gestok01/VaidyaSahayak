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
    id: "ambulanceDetails",
    title: "Ambulance",
    fields: [
      [
        {
          id: "ambulanceNo",
          placeholder: "Enter Ambulance Number",
          label: "Ambulance No",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "ambulanceStatus",
          label: "Ambulance Status",
          placeholder: "Select Status",
          type: "select",
          required: true,
          options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "maintenance", label: "Under Maintenance" }
          ],
          className: "col-span-1"
        },
        {
          id: "ambulanceType",
          label: "Ambulance Type",
          placeholder: "Select Type",
          type: "select",
          required: true,
          options: [
            { value: "basic", label: "Basic" },
            { value: "advanced", label: "Advanced" },
            { value: "neonatal", label: "Neonatal" },
            { value: "mobile_icu", label: "Mobile ICU" }
          ],
          className: "col-span-1"
        }
      ],
      [
        {
          id: "ambulanceModel",
          label: "Ambulance Model",
          placeholder: "Select Model",
          type: "select",
          required: true,
          options: [
            { value: "tata_winger", label: "Tata Winger" },
            { value: "mahindra_suv", label: "Mahindra SUV" },
            { value: "force_traveller", label: "Force Traveller" },
            { value: "others", label: "Others" }
          ],
          className: "col-span-1"
        },
        {
          id: "isAC",
          label: "Is AC",
          placeholder: "Select",
          type: "select",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          className: "col-span-1"
        },
        {
          id: "acCost",
          placeholder: "Enter AC Cost",
          label: "AC Cost",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ],
      [
        {
          id: "longTripCost",
          placeholder: "Enter Long Trip Cost",
          label: "Long Trip Cost",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "longTripWithAC",
          placeholder: "Enter Long Trip With AC",
          label: "Long Trip With AC",
          type: "number",
          required: true,
          className: "col-span-1"
        },
        {
          id: "perTripCost",
          placeholder: "Enter Per Trip Cost",
          label: "Per Trip Cost",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ],
      [
        {
          id: "remark",
          label: "Remark",
          placeholder: "Enter Remark",
          type: "text",
          required: false,
          className: "col-span-2"
        }
      ]
    ],
    tableColumns: [
      { id: "ambulanceNo", header: "Ambulance No", accessor: "ambulanceNo" },
      { id: "ambulanceStatus", header: "Status", accessor: "ambulanceStatus" },
      { id: "ambulanceType", header: "Type", accessor: "ambulanceType" },
      { id: "ambulanceModel", header: "Model", accessor: "ambulanceModel" },
      { id: "isAC", header: "Is AC", accessor: "isAC" },
      { id: "acCost", header: "AC Cost", accessor: "acCost" },
      { id: "longTripCost", header: "Long Trip Cost", accessor: "longTripCost" },
      { id: "longTripWithAC", header: "Long Trip With AC", accessor: "longTripWithAC" },
      { id: "perTripCost", header: "Per Trip Cost", accessor: "perTripCost" },
      { id: "remark", header: "Remark", accessor: "remark" }
    ],
    initialFormState: {
      ambulanceNo: "",
      ambulanceStatus: "",
      ambulanceType: "",
      ambulanceModel: "",
      isAC: "",
      acCost: "",
      longTripCost: "",
      longTripWithAC: "",
      perTripCost: "",
      remark: ""
    },
    allowMultipleEntries: true
  }
];

const AmbulanceCreateForm = () => {
  return (
    <DynamicCostFormClient
      pageName="Ambulance"
      sections={sections}
    />
  );
};

export default AmbulanceCreateForm;