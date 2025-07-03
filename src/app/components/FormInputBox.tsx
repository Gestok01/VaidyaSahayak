import React from 'react'

const FormInputBox = ({data}) => {
  console.log("Form input box:", data);
  
  return (
    <div className='w-[320px]'>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      <span>{data.fieldName}</span>{
        data?.isRequired && <span className="text-red-500">*</span>
      }
    </label>
    <input
      type={data.fieldType}
      name={data.fieldName}
      placeholder={data.fieldPlaceholder}
     
      className="w-full p-2 border rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
  )
}
export default FormInputBox;