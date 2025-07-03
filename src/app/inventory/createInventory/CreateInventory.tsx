import React from "react";
import DynamicInventoryFormClient from "../../components/DynamicInventoryForm";

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

interface InventorySection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  allowMultipleEntries?: boolean;
}

const sections: InventorySection[] = [
  {
    id: "inventoryDetails",
    title: "Inventory",
    fields: [
      [
        {
          id: "itemId",
          label: "Item ID",
          placeholder: "Enter Item ID",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "itemName",
          label: "Item Name",
          placeholder: "Enter Item Name",
          type: "text",
          required: true,
          className: "col-span-1"
        },
        {
          id: "category",
          label: "Category",
          placeholder: "Select Category",
          type: "select",
          required: false,
          options: [
            { value: "medical", label: "Medical" },
            { value: "surgical", label: "Surgical" },
            { value: "pharmaceutical", label: "Pharmaceutical" },
            { value: "consumables", label: "Consumables" }
          ],
          className: "col-span-1"
        },
        {
          id: "unit",
          label: "Unit",
          placeholder: "Select Unit",
          type: "select",
          required: false,
          options: [
            { value: "kg", label: "Kilogram" },
            { value: "g", label: "Gram" },
            { value: "mg", label: "Milligram" },
            { value: "l", label: "Liter" },
            { value: "ml", label: "Milliliter" },
            { value: "pieces", label: "Pieces" },
            { value: "boxes", label: "Boxes" }
          ],
          className: "col-span-1"
        },
        {
          id: "stock",
          label: "Stock",
          placeholder: "Enter Stock Quantity",
          type: "number",
          required: true,
          className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "itemId", header: "Item ID", accessor: "itemId" },
      { id: "itemName", header: "Item Name", accessor: "itemName" },
      { id: "category", header: "Category", accessor: "category" },
      { id: "unit", header: "Unit", accessor: "unit" },
      { id: "stock", header: "Current Stock", accessor: "stock" }
    ],
    initialFormState: {
      itemId: "",
      itemName: "",
      category: "",
      unit: "",
      stock: ""
    },
    allowMultipleEntries: true
  }
];

const CreateInventory = () => {
  return (
    <DynamicInventoryFormClient
      pageName="Inventory"
      sections={sections}
    />
  );
};

export default CreateInventory;