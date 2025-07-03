'use client'

import React, { useRef, useState } from "react";
import Link from 'next/link';

interface Shift {
  workingDay: string;
  startTime: string;
  endTime: string;
}

const ShiftInformationForm = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [formData, setFormData] = useState<Shift>({
    workingDay: "",
    startTime: "",
    endTime: ""
  });
  const [isSaved, setIsSaved] = useState(false);

  const startTimeRef = useRef<HTMLInputElement | null>(null);
  const endTimeRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    if (!formData.workingDay || !formData.startTime || !formData.endTime) {
      alert("Please fill all required fields");
      return;
    }

    setShifts(prev => [...prev, formData]);
    setFormData({
      workingDay: "",
      startTime: "",
      endTime: ""
    });
    setIsSaved(false); // Reset saved if adding more shifts
  };

  const handleRemove = (index: number) => {
    const updatedShifts = shifts.filter((_, i) => i !== index);
    setShifts(updatedShifts);
    if (updatedShifts.length === 0) setIsSaved(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (shifts.length === 0) return;
    // You can also trigger an API call here
    setIsSaved(true);
  };

  const breadcrumbTitles = [
    { name: 'Profiling', linkTo: '' },
    { name: 'Doctor', linkTo: '' },
    { name: 'Create', linkTo: '' },
    { name: 'Primary Information', linkTo: '/profiling/doctor_profile' },
    { name: 'Shift Information', linkTo: '/profiling/doctor_profile/shift_info' }
  ];

  return (
    <div className="min-h-[75vh] p-6">

      {/* Breadcrumb */}
      <div className="flex text-xl py-2 px-4">
        {breadcrumbTitles.map((title, idx) => (
          <React.Fragment key={idx}>
            {title.linkTo ? (
              <Link href={title.linkTo}>
                <span className="text-black font-semibold cursor-pointer hover:underline">
                  {title.name}
                </span>
              </Link>
            ) : (
              <span className="text-gray-400">{title.name}</span>
            )}
            {idx < breadcrumbTitles.length - 1 && (
              <span className="text-gray-400 mx-1">{'>'}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white shadow border rounded-md p-4 max-w-4xl">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-medium text-gray-700">Shift Information</h2>
          <button
            onClick={handleAdd}
            className="text-sm text-pink-500 hover:underline"
          >
            Add
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Day<span className="text-pink-500">*</span>
            </label>
            <input
              name="workingDay"
              type="text"
              placeholder="Monday"
              className="w-full border rounded px-3 py-2 text-sm"
              required
              value={formData.workingDay}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time<span className="text-pink-500">*</span>
            </label>
            <input
              name="startTime"
              type="time"
              ref={startTimeRef}
              onClick={() => startTimeRef.current?.showPicker?.()}
              className="w-full border rounded px-3 py-2 text-sm"
              required
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time<span className="text-pink-500">*</span>
            </label>
            <input
              name="endTime"
              type="time"
              ref={endTimeRef}
              onClick={() => endTimeRef.current?.showPicker?.()}
              className="w-full border rounded px-3 py-2 text-sm"
              required
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </form>

        {/* Table */}
        {shifts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">SHIFT INFORMATION</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WORKING DAY</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">START TIME</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">END TIME</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shifts.map((shift, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-500">{shift.workingDay}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{shift.startTime}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{shift.endTime}</td>
                      <td className="px-4 py-2 text-sm">
                        <button
                          onClick={() => handleRemove(index)}
                          className="text-pink-500 hover:text-pink-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
        {isSaved && (
  <Link href="/profiling/doctor_profile/clinic_info">
    <button
      className="bg-[#FB009C] text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors cursor-pointer text-center"
    >
      Next
    </button>
  </Link>
)}
          <button
            onClick={handleSave}
            disabled={shifts.length === 0}
            className={`
              px-6 py-2 rounded-md  transition-colors text-sm
              ${shifts.length === 0 ? 'bg-[#FAD0D0] cursor-not-allowed' :
                isSaved ? 'bg-[#B3DB8A]' : 'bg-pink-500 hover:bg-pink-600'}
            `}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default ShiftInformationForm;
