import React from 'react';
import Image from 'next/image';
import nexusLogo from "../../../../public/diagnostic/nexus-logo-navbar.png";

const page = () => {
  return (
    <div className="min-h-screen bg-[url('/imgs/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
      {/* Top Logo */}
      <div className="container mx-auto pt-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <Image
            src={nexusLogo}
            alt="Nexus Logo"
            width={120}
            height={40}
            className="ml-32"
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-screen-lg mx-auto border-2 border-pink-300 rounded-lg shadow-md p-4 md:p-8 bg-white/90">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Admin Account
          </h1>

          {/* Personal Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter your first name" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your middle name" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter your last name" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (DOB)*</label>
                <input 
                  type="date" 
                  placeholder="dd-mm-yyyy" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <select className="w-full border-2 border-pink-400 rounded-md p-2 bg-white focus:ring-pink-500 focus:border-pink-500 outline-none">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age*</label>
                <input 
                  type="number" 
                  placeholder="Enter your age" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <div className="flex">
                  <div className="border-2 border-pink-400 rounded-l-md p-2 bg-gray-50 flex items-center">
                    <span className="text-gray-500">+</span>
                    <input 
                      type="text" 
                      placeholder="91" 
                      className="w-10 bg-transparent outline-none"
                    />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full border-2 border-pink-400 border-l-0 rounded-r-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark*</label>
                <input 
                  type="text" 
                  placeholder="Enter your landmark" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                <input 
                  type="text" 
                  placeholder="Enter your city" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                <select className="w-full border-2 border-pink-400 rounded-md p-2 bg-white focus:ring-pink-500 focus:border-pink-500 outline-none">
                  <option value="">Select</option>
                  <option value="state1">State 1</option>
                  <option value="state2">State 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode*</label>
                <input 
                  type="text" 
                  placeholder="Enter your Postal Code" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">Address Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1*</label>
                <input 
                  type="text" 
                  placeholder="House/Flat Number, Building Name, Street" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2*</label>
                <input 
                  type="text" 
                  placeholder="Apartment name, Nearby Landmark" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Security & Credentials Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4 pb-1 border-b border-gray-200">Security & Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <input 
                  type="password" 
                  placeholder="Create a Password" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                <input 
                  type="password" 
                  placeholder="Re-enter Password" 
                  className="w-full border-2 border-pink-400 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition duration-200 font-medium shadow-sm">
              Next
            </button>
          </div>
        </div>

        {/* Footer Navigation Dots */}
        <div className="flex justify-center gap-3 mt-6 mb-8">
          <div className="w-3 h-3 rounded-full bg-pink-500" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default page;