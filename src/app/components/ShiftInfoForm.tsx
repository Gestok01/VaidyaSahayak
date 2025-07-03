'use client'
import React, { useRef, useState } from "react";

interface Shift {
  workingDay: string;
  startTime: string;
  endTime: string;
}

interface ShiftInformationFormProps {
  onSubmit: (shifts: Shift[]) => void;
}

const ShiftInformationForm: React.FC<ShiftInformationFormProps> = ({ onSubmit }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [formData, setFormData] = useState<Shift>({
    workingDay: "",
    startTime: "",
    endTime: ""
  });
  
  const startTimeRef = useRef<HTMLInputElement | null>(null);
  const endTimeRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    if (!formData.workingDay || !formData.startTime || !formData.endTime) {
      alert("Please fill all required fields");
      return;
    }

    setShifts([...shifts, formData]);
    setFormData({
      workingDay: "",
      startTime: "",
      endTime: ""
    });
  };

  const handleRemove = (index: number) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (shifts.length === 0) {
      alert("Please add at least one shift");
      return;
    }

    onSubmit(shifts);
  };

  return (
    <div className="min-h-[75vh] p-6">
      {/* Card Container */}
      <div className="bg-white shadow border rounded-md p-4 max-w-4xl">
        {/* Card Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-medium text-gray-700">Shift Information</h2>
          <button
            onClick={handleAdd}
            className="text-sm text-pink-500 hover:underline"
          >
            Add
          </button>
        </div>

        {/* Form Grid */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Working Day */}
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

          {/* Start Time */}
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

          {/* End Time */}
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

        {/* Shifts Table */}
        {shifts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">SHIFT INFORMATION</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      WORKING DAY
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      START TIME
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      END TIME
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shifts.map((shift, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {shift.workingDay}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {shift.startTime}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {shift.endTime}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
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

        {/* Save Button */}
        <div className="mt-6 text-right">
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftInformationForm;