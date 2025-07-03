import React from 'react'

const FormProgressBar = () => {
  return (
    <div className="mb-8 mx-6">
            <div className="grid grid-cols-3 mb-1">
              <div className="text-sm font-medium">Patient Information</div>
              <div className="text-sm font-medium text-center">
                Oxygen Information
              </div>
              <div className="text-sm font-medium text-right">
                Payment Information
              </div>
            </div>
            <div className="relative h-1 bg-gray-200 flex items-center mb-1">
              <div className="absolute left-0 top-0 h-1 w-full bg-pink-500 rounded-full"></div>
              <div className="absolute left-0 w-5 h-5 rounded-full  bg-green-200 mt-1 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-green-200 mt-1 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute right-0 w-5 h-5 rounded-full bg-green-200 mt-1 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
  )
}

export default FormProgressBar