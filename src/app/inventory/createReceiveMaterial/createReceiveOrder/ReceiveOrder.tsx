'use client'
import React from "react";
import DynamicInventoryForm from "../../../components/DynamicReceiveInventoryForm";

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

interface ReceiveSection {
  id: string;
  title: string;
  fields: FormFieldConfig[][];
  tableColumns: TableColumn[];
  initialFormState: Record<string, any>;
  allowMultipleEntries?: boolean;
}

// Payment Status options
const paymentStatus = [
    { value: "Paid", label: "Paid" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "Partial Paid", label: "Partial Paid" }
  ];

// Delivery Status options
const deliveryStatus = [
    { value: "Partial", label: "Partial" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Returned", label: "Returned" }
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
  

const sections: ReceiveSection[] = [
  {
    id: "receiveOrder",
    title: "Order",
    allowMultipleEntries: true,
    fields: [
      [
        {
            id: "purchaseorderID",
            label: "Purchase Order ID",
            type: "number",
            placeholder: "XXXXX",
            required: false,
            className: "col-span-1"
        },
        {
            id: "vendorName",
            label: "Vendor Name",
            type: "text",
            placeholder: "Lorem",
            required: true,
            className: "col-span-1"
        },
        {
          id: "paymentStatus",
          label: "Payment Status",
          type: "select",
          options: paymentStatus,
          required: true,
          className: "col-span-1"
        },
        {
            id: "deliveryStatus",
            label: "Delivery Status",
            type: "select",
            options: deliveryStatus,
            required: true,
            className: "col-span-1"
        }
      ]
    ],
    tableColumns: [
      { id: "purchaseorderID", header: "PURCHASE ORDER ID", accessor: "purchaseorderID" },
      { id: "vendorName", header: "VENDOR NAME", accessor: "vendorName" },
      { id: "paymentStatus", header: "PAYMENT STATUS", accessor: "paymentStatus" },
      { id: "deliveryStatus", header: "DELIVERY STATUS", accessor: "deliveryStatus" }
    ],
    initialFormState: {
      purchaseorderID: "",
      vendorName: "",
      paymentStatus: "",
      deliveryStatus: ""
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
        },
        {
            id: "expquantity",
            label: "Expected Quantity",
            type: "number",
            placeholder: "# XXXXXX",
            required: false,
            className: "col-span-1"
        }
      ],
      [
        {
          id: "recquantity",
          label: "Received Quantity",
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
      { id: "unit", header: "UNIT", accessor: "unit" },
      { id: "expquantity", header: "EXPECTED QUANTITY", accessor: "expquantity" },
      { id: "recquantity", header: "RECEIVED QUANTITY", accessor: "recquantity" },
      { id: "remark", header: "REMARK", accessor: "remark" }
    ],
    initialFormState: {
      itemId: "",
      itemName: "",
      category: "",
      unit: "",
      expquantity: "",
      recquantity: "",
      remark: ""
    }
  }
];

const PurchaseOrderCreate = () => {
  return (
    <DynamicInventoryForm
      pageName="Receive Order"
      sections={sections}
    />
  );
};

export default PurchaseOrderCreate;