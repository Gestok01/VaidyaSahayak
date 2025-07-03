import React, { useState } from "react";

const DynamicBillingModal = ({ sections, setSections, isEdited, setIsEdited }) => {
  const [formState, setFormState] = useState(() => {
    const state = {};
    Object.values(sections).forEach(section => {
      section.fields.forEach(field => {
        state[field.name] = field.initialValue;
      });
    });
    return state;
  });

  const handleChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const handleSave = () => {
    console.log("Saved:", formState);
    setIsEdited(false);
  };

  const paymentInfoFields = sections.paymentInformation?.fields || [];

  return (
    <div className="mt-4 text-black text-sm">
      {Object.entries(sections).map(([key, section]) => (
        <div key={key} className="mb-4">
          <h3 className="text-base font-semibold mb-2">{section.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            {section.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium mb-1">{field.label}</label>
                {field.editable ? (
                  field.type === "select" ? (
                    <select
                      value={formState[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full p-1 border rounded text-xs"
                    >
                      <option value="">Select</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formState[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full p-1 border rounded text-xs"
                    />
                  )
                ) : (
                  <input
                    type="text"
                    value={formState[field.name]}
                    readOnly
                    className="w-full p-1 border rounded bg-gray-100 text-xs"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Payment Info Table */}
      <div className="mt-6 border rounded-md overflow-hidden text-xs">
        <h4 className="bg-pink-100 px-3 py-1 font-semibold text-xs">Payment Information</h4>
        <table className="w-full text-left text-black">
          <thead className="bg-green-200">
            <tr>
              {paymentInfoFields.map(field => (
                <th key={field.name} className="px-3 py-1 uppercase font-medium">{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              {paymentInfoFields.map(field => (
                <td key={field.name} className="px-3 py-1">
                  {formState[field.name]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
<div className="flex justify-end space-x-2 mt-4">
  <button
    className={`px-3 py-1 rounded bg-pink-500 text-white text-xs ${isEdited ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={isEdited}
  >
    Print Preview
  </button>

  <button
    className={`px-3 py-1 rounded bg-pink-500 text-white text-xs ${isEdited ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={isEdited}
  >
    Print
  </button>

  {isEdited && (
    <button
      className="px-3 py-1 rounded bg-pink-600 text-white text-xs"
      onClick={handleSave}
    >
      Save
    </button>
  )}
</div>

    </div>
  );
};

export default DynamicBillingModal;
