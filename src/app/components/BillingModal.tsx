"use client";

import { X } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";

type BillType = 'appointment' | 'diagnostic';

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  discount: number;
  amount: number;
  testDate?: string; // Only for diagnostic bills
}

interface BillData {
  type: BillType;
  billNo: string;
  billDate: string;
  patientName: string;
  patientId?: string;
  ageGender: string;
  address: string;
  mobileNo: string;
  doctorName?: string;
  visitLocation?: string;
  visitDate?: string;
  visitTime?: string;
  items: BillItem[];
  subtotal: number;
  tax?: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  paymentMode: string;
  receivedBy: string;
  company: string;
  billGeneratedTime: string;
  additionalNotes?: string;
}

interface BillingProps {
  isOpen: boolean;
  onClose: () => void;
  billData?: Partial<BillData>;
  onSave?: (data: BillData) => void;
  editable?: boolean;
  printOptions?: {
    showPrintPreview?: boolean;
    showPrint?: boolean;
  };
}

const BillModal: React.FC<BillingProps> = ({
  isOpen,
  onClose,
  billData = {},
  onSave,
  editable = true,
  printOptions = { showPrintPreview: true, showPrint: true }
}) => {
  const billRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BillData>({
    type: 'appointment',
    billNo: '',
    billDate: new Date().toLocaleDateString('en-IN'),
    patientName: '',
    ageGender: '',
    address: '',
    mobileNo: '',
    items: [],
    subtotal: 0,
    discount: 0,
    totalAmount: 0,
    paidAmount: 0,
    balance: 0,
    paymentMode: 'CASH',
    receivedBy: 'Staff Member',
    company: 'Healthcare Provider',
    billGeneratedTime: new Date().toLocaleString('en-IN'),
  });

  const calculateSubtotal = useCallback((items: BillItem[]) => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  }, []);

  const calculateTotalAmount = useCallback((subtotal: number, discount: number) => {
    return (subtotal || 0) - (discount || 0);
  }, []);

  const calculateBalance = useCallback((totalAmount: number, paidAmount: number) => {
    return (totalAmount || 0) - (paidAmount || 0);
  }, []);

  useEffect(() => {
    if (isOpen && billData) {
      const initialItems = billData.items || [{
        id: `item-${Date.now()}`,
        description: billData.type === 'diagnostic' ? 'Diagnostic Test' : 'Consultation Fee',
        quantity: 1,
        rate: billData.totalAmount ? Number(billData.totalAmount) : 0,
        discount: 0,
        amount: billData.totalAmount ? Number(billData.totalAmount) : 0,
        ...(billData.type === 'diagnostic' && { testDate: new Date().toLocaleDateString('en-IN') })
      }];

      const initialDiscount = billData.discount || 0;
      const initialPaidAmount = billData.paidAmount || 0;

      const initialSubtotal = calculateSubtotal(initialItems);
      const initialTotalAmount = calculateTotalAmount(initialSubtotal, initialDiscount);
      const initialBalance = calculateBalance(initialTotalAmount, initialPaidAmount);

      setFormData({
        type: billData.type || 'appointment',
        billNo: billData.billNo || '',
        billDate: billData.billDate || new Date().toLocaleDateString('en-IN'),
        patientName: billData.patientName || '',
        patientId: billData.patientId,
        ageGender: billData.ageGender || '30/M',
        address: billData.address || '',
        mobileNo: billData.mobileNo || '',
        doctorName: billData.doctorName,
        visitLocation: billData.visitLocation,
        visitDate: billData.visitDate,
        visitTime: billData.visitTime,
        items: initialItems,
        subtotal: initialSubtotal,
        discount: initialDiscount,
        totalAmount: initialTotalAmount,
        paidAmount: initialPaidAmount,
        balance: initialBalance,
        paymentMode: billData.paymentMode || 'CASH',
        receivedBy: billData.receivedBy || 'Staff Member',
        company: billData.company || 'Healthcare Provider',
        billGeneratedTime: billData.billGeneratedTime || new Date().toLocaleString('en-IN'),
        additionalNotes: billData.additionalNotes
      });
    }
  }, [isOpen, billData, calculateSubtotal, calculateTotalAmount, calculateBalance]);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print { 
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none; }
      }
    `,
    documentTitle: `${formData.type.toUpperCase()}_Bill_${formData.billNo}`,
    onAfterPrint: () => console.log('Printed successfully')
  });

  const handlePrintPreview = async () => {
    if (!billRef.current) return;
    
    try {
      const canvas = await html2canvas(billRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF'
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      window.open(URL.createObjectURL(pdf.output('blob')));
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: keyof BillItem, value: string | number) => {
    const newItems = [...formData.items];
    const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    
    newItems[index] = { ...newItems[index], [field]: numericValue };
    
    if (['rate', 'quantity', 'discount'].includes(field)) {
      const quantity = newItems[index].quantity || 0;
      const rate = newItems[index].rate || 0;
      const discount = newItems[index].discount || 0;
      newItems[index].amount = (quantity * rate) - discount;
    }
    
    const newSubtotal = calculateSubtotal(newItems);
    const newTotalAmount = calculateTotalAmount(newSubtotal, formData.discount);
    const newBalance = calculateBalance(newTotalAmount, formData.paidAmount);
    
    setFormData(prev => ({
      ...prev,
      items: newItems,
      subtotal: newSubtotal,
      totalAmount: newTotalAmount,
      balance: newBalance
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          description: 'New Item',
          quantity: 1,
          rate: 0,
          discount: 0,
          amount: 0,
          ...(prev.type === 'diagnostic' && { testDate: new Date().toLocaleDateString('en-IN') })
        }
      ]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const newSubtotal = calculateSubtotal(newItems);
    const newTotalAmount = calculateTotalAmount(newSubtotal, formData.discount);
    const newBalance = calculateBalance(newTotalAmount, formData.paidAmount);
    
    setFormData(prev => ({
      ...prev,
      items: newItems,
      subtotal: newSubtotal,
      totalAmount: newTotalAmount,
      balance: newBalance
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-full">
      <div className="bg-white w-full max-w-3xl shadow-lg p-6 overflow-y-auto max-h-full">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold capitalize">
            {formData.type === 'diagnostic' ? 'Diagnostic' : 'Appointment'} Bill - {formData.billNo}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 ml-auto"
            aria-label="Close bill modal"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="border-t border-gray-300 mb-5 mt-4"></div>

        {isEditing ? (
          <div className="space-y-6">
            <div className="flex justify-between text-sm font-semibold text-black">
              {formData.type === 'appointment' && <p>Doctor ID: D12345</p>}
              <p>Patient ID: {formData.patientId || 'N/A'}</p>
              <p>Date: {formData.billDate}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-700">Patient Details</h3>
            <div className="grid grid-cols-2 gap-6 text-black">
              <div className="space-y-2">
                <div>
                  <label className="block font-semibold">Patient Name:</label>
                  <input
                    type="text"
                    name="patientName"
                    className="w-full p-2 border rounded-md"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Address:</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full p-2 border rounded-md"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block font-semibold">Age/Gender:</label>
                  <input
                    type="text"
                    name="ageGender"
                    className="w-full p-2 border rounded-md"
                    value={formData.ageGender}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Mobile No:</label>
                  <input
                    type="text"
                    name="mobileNo"
                    className="w-full p-2 border rounded-md"
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {formData.type === 'appointment' && (
              <div className="grid grid-cols-2 gap-6 text-black">
                <div>
                  <label className="block font-semibold">Doctor Name:</label>
                  <input
                    type="text"
                    name="doctorName"
                    className="w-full p-2 border rounded-md"
                    value={formData.doctorName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Visit Location:</label>
                  <input
                    type="text"
                    name="visitLocation"
                    className="w-full p-2 border rounded-md"
                    value={formData.visitLocation || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="border-t border-gray-300 my-4"></div>

            <h3 className="text-lg font-semibold text-gray-700">Bill Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-black border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Rate</th>
                    <th className="p-2 border">Discount</th>
                    {formData.type === 'diagnostic' && <th className="p-2 border">Test Date</th>}
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="number"
                          min="1"
                          className="w-full p-1 border rounded"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full p-1 border rounded"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full p-1 border rounded"
                          value={item.discount}
                          onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                        />
                      </td>
                      {formData.type === 'diagnostic' && (
                        <td className="p-2 border">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={item.testDate || ''}
                            onChange={(e) => handleItemChange(index, 'testDate', e.target.value)}
                          />
                        </td>
                      )}
                      <td className="p-2 border font-medium">
                        {(item.amount || 0).toFixed(2)}
                      </td>
                      <td className="p-2 border">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={addItem}
                className="mt-2 text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm"
              >
                + Add Item
              </button>
            </div>

            <div className={`grid ${formData.type === 'diagnostic' ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mt-4`}>
              <div>
                <label className="block font-semibold">Subtotal:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-gray-100"
                  value={(formData.subtotal || 0).toFixed(2)}
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold">Discount:</label>
                <input
                  type="number"
                  min="0"
                  name="discount"
                  className="w-full p-2 border rounded-md"
                  value={formData.discount}
                  onChange={(e) => {
                    const discount = parseFloat(e.target.value) || 0;
                    setFormData(prev => ({
                      ...prev,
                      discount,
                      totalAmount: calculateTotalAmount(prev.subtotal, discount),
                      balance: calculateBalance(
                        calculateTotalAmount(prev.subtotal, discount),
                        prev.paidAmount
                      )
                    }));
                  }}
                />
              </div>
              {formData.type === 'diagnostic' && (
                <div>
                  <label className="block font-semibold">Tax (5%):</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md bg-gray-100"
                    value={((formData.subtotal || 0) * 0.05).toFixed(2)}
                    readOnly
                  />
                </div>
              )}
              <div>
                <label className="block font-semibold">Total Amount:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-gray-100 font-medium"
                  value={(formData.totalAmount || 0).toFixed(2)}
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold">Paid Amount:</label>
                <input
                  type="number"
                  min="0"
                  name="paidAmount"
                  className="w-full p-2 border rounded-md"
                  value={formData.paidAmount}
                  onChange={(e) => {
                    const paidAmount = parseFloat(e.target.value) || 0;
                    setFormData(prev => ({
                      ...prev,
                      paidAmount,
                      balance: calculateBalance(prev.totalAmount, paidAmount)
                    }));
                  }}
                />
              </div>
              <div>
                <label className="block font-semibold">Balance:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-gray-100 font-medium"
                  value={(formData.balance || 0).toFixed(2)}
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold">Payment Mode:</label>
                <select
                  name="paymentMode"
                  className="w-full p-2 border rounded-md"
                  value={formData.paymentMode}
                  onChange={handleChange}
                >
                  <option value="CASH">Cash</option>
                  <option value="CARD">Card</option>
                  <option value="ONLINE">Online</option>
                  <option value="INSURANCE">Insurance</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Received By:</label>
                <input
                  type="text"
                  name="receivedBy"
                  className="w-full p-2 border rounded-md"
                  value={formData.receivedBy}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-semibold">For (Company):</label>
                <input
                  type="text"
                  name="company"
                  className="w-full p-2 border rounded-md"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Additional Notes:</label>
              <textarea
                name="additionalNotes"
                className="w-full p-2 border rounded-md"
                value={formData.additionalNotes || ''}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div ref={billRef} className="border border-gray-300 p-4 rounded-md bg-white">
            <h3 className="text-center font-semibold my-4 text-black underline">
              {formData.type === 'diagnostic' ? 'DIAGNOSTIC' : 'APPOINTMENT'} BILL CUM RECEIPT
            </h3>
            
            <div className="flex justify-between text-sm mb-4">
              <p><span className="font-semibold">Bill No:</span> {formData.billNo}</p>
              <p><span className="font-semibold">Date:</span> {formData.billDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm text-black">
              <div className="space-y-1">
                <p><span className="font-semibold">Patient Name:</span> {formData.patientName}</p>
                <p><span className="font-semibold">Address:</span> {formData.address}</p>
                <p><span className="font-semibold">Age/Gender:</span> {formData.ageGender}</p>
                <p><span className="font-semibold">Mobile No:</span> {formData.mobileNo}</p>
              </div>
              <div className="space-y-1">
                {formData.patientId && (
                  <p><span className="font-semibold">Patient ID:</span> {formData.patientId}</p>
                )}
                {formData.type === 'appointment' && formData.doctorName && (
                  <p><span className="font-semibold">Doctor Name:</span> {formData.doctorName}</p>
                )}
                {formData.visitDate && (
                  <p><span className="font-semibold">Visit Date:</span> {formData.visitDate}</p>
                )}
                {formData.visitTime && (
                  <p><span className="font-semibold">Visit Time:</span> {formData.visitTime}</p>
                )}
                {formData.visitLocation && (
                  <p><span className="font-semibold">Location:</span> {formData.visitLocation}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="mt-4 border border-gray-300 rounded-md overflow-hidden text-black">
              <table className="w-full text-sm text-left text-black border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Rate</th>
                    <th className="p-2 border">Discount</th>
                    {formData.type === 'diagnostic' && <th className="p-2 border">Test Date</th>}
                    <th className="p-2 border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 border">{item.description}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">{(item.rate || 0).toFixed(2)}</td>
                      <td className="p-2 border">{(item.discount || 0).toFixed(2)}</td>
                      {formData.type === 'diagnostic' && (
                        <td className="p-2 border">{item.testDate || ''}</td>
                      )}
                      <td className="p-2 border">{(item.amount || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={formData.type === 'diagnostic' ? 4 : 3} className="p-2 border font-semibold">Subtotal</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border font-semibold">{(formData.subtotal || 0).toFixed(2)}</td>
                  </tr>
                  {(formData.discount || 0) > 0 && (
                    <tr>
                      <td colSpan={formData.type === 'diagnostic' ? 4 : 3} className="p-2 border font-semibold">Discount</td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border font-semibold">-{(formData.discount || 0).toFixed(2)}</td>
                    </tr>
                  )}
                  {formData.type === 'diagnostic' && (
                    <tr>
                      <td colSpan={4} className="p-2 border font-semibold">Tax (5%)</td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border font-semibold">{((formData.subtotal || 0) * 0.05).toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan={formData.type === 'diagnostic' ? 4 : 3} className="p-2 border font-semibold">Total Amount</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border font-semibold">{(formData.totalAmount || 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={formData.type === 'diagnostic' ? 4 : 3} className="p-2 border font-semibold">Paid Amount</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border font-semibold">{(formData.paidAmount || 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={formData.type === 'diagnostic' ? 4 : 3} className="p-2 border font-semibold">Balance</td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border font-semibold">{(formData.balance || 0).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-2 text-sm">
              <p><span className="font-semibold">Payment Mode:</span> {formData.paymentMode}</p>
            </div>

            <div className="mt-4 text-black text-sm">
              <p>
                <span className="font-semibold">Received With Thanks From:</span><br />
                {formData.patientName} an amount of <span className="font-semibold">Rs. {(formData.paidAmount || 0).toFixed(2)}</span>
              </p>
            </div>

            <div className="flex justify-between items-start mt-2 text-black text-sm">
              <div>
                <p><span className="font-semibold">Bill Generated Time:</span> {formData.billGeneratedTime}</p>
              </div>
              <div className="text-right">
                <p><span className="font-semibold">Received By:</span> {formData.receivedBy}</p>
                <p><span className="font-semibold">For:</span> {formData.company}</p>
              </div>
            </div>

            {formData.type === 'diagnostic' && (
              <>
                <div className="mt-2 text-sm italic text-black">
                  <p>**Please bring this slip during entry</p>
                </div>
                <div className="mt-1 text-sm italic text-black underline">
                  <p>Donations are exempted from Income Tax U/S 80G of Income Tax Act 1961</p>
                </div>
              </>
            )}

            {formData.additionalNotes && (
              <div className="mt-2 text-sm italic">
                <p>{formData.additionalNotes}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6 border-t pt-4 no-print">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          ) : (
            <>
              {editable && (
                <button
                  onClick={handleEdit}
                  className="text-pink-600 border border-pink-600 px-4 py-2 rounded-md hover:bg-pink-50 transition-colors"
                >
                  Edit Bill
                </button>
              )}
              {printOptions.showPrintPreview && (
                <button
                  onClick={handlePrintPreview}
                  className="text-pink-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Print Preview
                </button>
              )}
              {printOptions.showPrint && (
                <button
                  onClick={handlePrint}
                  className="text-white bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                >
                  Print Bill
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillModal;