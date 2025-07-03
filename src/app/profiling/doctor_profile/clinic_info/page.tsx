'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ClinicInformationForm = () => {
  const [clinics, setClinics] = useState<{
    consultationFee: string;
    clinicCut: string;
    doctorCut: string;
    membershipDiscount: string;
  }[]>([]);
  const [formData, setFormData] = useState({
    consultationFee: '',
    clinicCut: '',
    doctorCut: '',
    membershipDiscount: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleAdd = () => {
    // Validate all fields are filled and contain valid numbers
    if (!formData.consultationFee || !formData.clinicCut || 
        !formData.doctorCut || !formData.membershipDiscount) {
      alert("Please fill all required fields");
      return;
    }

    // Validate all fields contain only numbers
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(formData.consultationFee) || 
        !numberRegex.test(formData.clinicCut) ||
        !numberRegex.test(formData.doctorCut) ||
        !numberRegex.test(formData.membershipDiscount)) {
      alert("Please enter numbers only in all fields");
      return;
    }

    setClinics([...clinics, formData]);
    setFormData({
      consultationFee: '',
      clinicCut: '',
      doctorCut: '',
      membershipDiscount: ''
    });
    setIsSaved(false);
  };

  const handleRemove = (index: number) => {
    const updatedClinics = clinics.filter((_, i) => i !== index);
    setClinics(updatedClinics);
    if (updatedClinics.length === 0) setIsSaved(false);
  };

  const handleNumberChange = (index: number, field: string, value: string) => {
    // Only allow numbers
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    const updated = [...clinics];
    updated[index][field as keyof typeof updated[0]] = sanitizedValue;
    setClinics(updated);
  };

  const handleFormNumberChange = (field: string, value: string) => {
    // Only allow numbers in form inputs
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSave = () => {
    if (clinics.length === 0) return;
    setIsSaved(true);
  };

  const breadcrumbTitles = [
    { name: 'Profiling', linkTo: '' },
    { name: 'Doctor', linkTo: '' },
    { name: 'Create', linkTo: '' },
    { name: 'Primary Information', linkTo: '/profiling/doctor_profile' },
    { name: 'Shift Information', linkTo: '/profiling/doctor_profile/shift_info' },
    { name: 'Clinic Information', linkTo: '/profiling/doctor_profile/clinic_info' }
  ];

  return (
    <div className="min-h-[75vh] p-6 bg-gradient-to-br from-white via-pink-50 to-pink-100">
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

      {/* Card Container */}
      <div className="bg-white shadow border rounded-md p-4 max-w-6xl  mt-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-medium text-gray-700">Clinic Information</h2>
          {clinics.length === 0 && (
  <button 
    onClick={handleAdd}
    className="text-sm text-pink-500 hover:underline"
  >
    Add
  </button>
)}

        </div>

        {/* Form Inputs */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultation Fees (₹)<span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="500"
              value={formData.consultationFee}
              onChange={(e) => handleFormNumberChange('consultationFee', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinic Cut (%)<span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="30"
              value={formData.clinicCut}
              onChange={(e) => handleFormNumberChange('clinicCut', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Cut (%)<span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="70"
              value={formData.doctorCut}
              onChange={(e) => handleFormNumberChange('doctorCut', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membership Discount (%)<span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="10"
              value={formData.membershipDiscount}
              onChange={(e) => handleFormNumberChange('membershipDiscount', e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              inputMode="numeric"
            />
          </div>
        </form>

        {/* Table */}
        {clinics.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">CLINIC INFORMATION</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONSULTATION FEES</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLINIC CUT</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOCTOR CUT</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEMBERSHIP DISCOUNT</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clinics.map((clinic, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-500">₹{clinic.consultationFee}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{clinic.clinicCut}%</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{clinic.doctorCut}%</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{clinic.membershipDiscount}%</td>
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
         
          <button
            onClick={handleSave}
            disabled={clinics.length === 0}
            className={`
              px-6 py-2 rounded-md transition-colors text-sm
              ${clinics.length === 0 
                ? 'bg-[#FAD0D0] text-white cursor-not-allowed' 
                : isSaved 
                  ? 'bg-[#B3DB8A] text-white cursor-default'
                  : 'bg-[#FB009C] hover:bg-pink-600 text-white'}
            `}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicInformationForm;