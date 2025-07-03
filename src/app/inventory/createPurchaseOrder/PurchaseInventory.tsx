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

interface PurchaseSection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  allowMultipleEntries?: boolean;
}

// Payment mode options
const paymentModes = [
  { value: "Cash", label: "Cash" },
  { value: "UPI", label: "UPI" },
  { value: "Card", label: "Card" },
  { value: "XXXXXX", label: "XXXXXX" }
];

// Status options
const statusOptions = [
  { value: "Confirmed", label: "Confirmed" },
  { value: "Pending", label: "Pending" }
];

// Category options
const categories = [
  { value: "medical", label: "Medical" },
  { value: "surgical", label: "Surgical" },
  { value: "pharmaceutical", label: "Pharmaceutical" }
];

// Unit options
const units = [
  { value: "kg", label: "Kilogram" },
  { value: "g", label: "Gram" },
  { value: "pieces", label: "Pieces" },
  { value: "boxes", label: "Boxes" }
];

const sections: PurchaseSection[] = [
  {
    id: "purchaseOrder",
    title: "Purchase Order",
    allowMultipleEntries: true,
    fields: [
      [
        {
          id: "requisitionDate",
          label: "Requisition Date",
          type: "date",
          required: true,
          className: "col-span-1"
        },
        {
          id: "expectedDate",
          label: "Expected Date",
          type: "date",
          required: true,
          className: "col-span-1"
        },
        {
          id: "supplierId",
          label: "Supplier ID",
          type: "text",
          placeholder: "XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "supplierName",
          label: "Supplier Name",
          type: "text",
          placeholder: "Lorem",
          required: true,
          className: "col-span-1"
        },
        {
          id: "totalAmount",
          label: "Total Amount",
          type: "number",
          placeholder: "₹ XXXXXX",
          required: true,
          className: "col-span-1"
        }
      ],
      [
        {
          id: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: paymentModes,
          required: true,
          className: "col-span-1"
        },
        {
          id: "status",
          label: "Status",
          type: "select",
          options: statusOptions,
          required: true,
          className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "requisitionDate", header: "REQUISITION DATE", accessor: "requisitionDate" },
      { id: "expectedDate", header: "EXPECTED DATE", accessor: "expectedDate" },
      { id: "supplierId", header: "SUPPLIER ID", accessor: "supplierId" },
      { id: "supplierName", header: "SUPPLIER NAME", accessor: "supplierName" },
      { id: "totalAmount", header: "TOTAL AMOUNT", accessor: "totalAmount" },
      { id: "paymentMode", header: "PAYMENT MODE", accessor: "paymentMode" },
      { id: "status", header: "STATUS", accessor: "status" }
    ],
    initialFormState: {
      requisitionDate: "",
      expectedDate: "",
      supplierId: "",
      supplierName: "",
      totalAmount: "",
      paymentMode: "",
      status: ""
    }
  },
  {
    id: "itemDetails",
    title: "Item",
    allowMultipleEntries: true,
    fields: [
      [
        {
          id: "purchaseId",
          label: "Purchase ID",
          type: "text",
          placeholder: "XXXXXX",
          required: true,
          className: "col-span-1"
        },
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
          required: true,
          className: "col-span-1"
        },
        {
          id: "unit",
          label: "Unit",
          type: "select",
          options: units,
          required: true,
          className: "col-span-1"
        }
        ],
        [
        {
          id: "quantity",
          label: "Quantity",
          type: "number",
          placeholder: "# XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "unitPrice",
          label: "Unit Price",
          type: "number",
          placeholder: "₹ XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "totalPrice",
          label: "Total Price",
          type: "number",
          placeholder: "₹ XXXXXX",
          required: true,
          className: "col-span-1"
        },
        {
          id: "remark",
          label: "Remark",
          type: "text",
          placeholder: "Lorem",
          required: false,
          className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "purchaseId", header: "PURCHASE ID", accessor: "purchaseId" },
      { id: "itemId", header: "ITEM ID", accessor: "itemId" },
      { id: "itemName", header: "ITEM NAME", accessor: "itemName" },
      { id: "category", header: "CATEGORY", accessor: "category" },
      { id: "unit", header: "UNIT", accessor: "unit" },
      { id: "quantity", header: "QUANTITY", accessor: "quantity" },
      { id: "unitPrice", header: "UNIT PRICE", accessor: "unitPrice" },
      { id: "totalPrice", header: "TOTAL PRICE", accessor: "totalPrice" },
      { id: "remark", header: "REMARK", accessor: "remark" }
    ],
    initialFormState: {
      purchaseId: "",
      itemId: "",
      itemName: "",
      category: "",
      unit: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      remark: ""
    }
  }
];

const PurchaseOrderCreate = () => {
  return (
    <DynamicInventoryForm
      pageName="Purchase Order"
      sections={sections}
    />
  );
};

export default PurchaseOrderCreate;