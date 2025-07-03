import React from 'react';

const DropDownInputBox = ({ dropdowns }) => {

  
  return (
    <div className='w-[320px]'>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {dropdowns.fieldName} <span className="text-red-500">*</span>
      </label>
      <select 
        className="w-full p-2 border rounded-md bg-white text-black focus:ring focus:ring-pink-400"
        defaultValue=""
      >
        <option value="" disabled>Select</option>
        {dropdowns.options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownInputBox;
