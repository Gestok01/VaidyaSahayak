'use client';
import React from "react";
import Image from "next/image";
import Avatar from "@/assets/svg/Avatar.svg";

const PatientProfile = () => {
  // Sample data
  const profileData = [{
    id: 1,
    patientId: "UIXXXXX",
    patientName: "LOREM IPSUM",
    gender: "MALE",
    age: "24",
    contact: "+91XXXXXXXXXX",
    secContact: "+91XXXXXXXXXX",
    email: "LOREM@GMAIL.COM",
    address: "OLIVE ENCLAVE",
    pincode: "XXXXX"
  }];

  const clinicData = [{
    id: 1,
    membershipId: "UIXXXXX",
    membershipEndDate: "XX/XX/XXXX",
    createdAt: "XX/XX/XXXX",
    chronicDisease: "DISEASE"
  }];

  return (
    <div className="font-medium">
      {/* Breadcrumb Heading */}
      <div className="px-6 py-4">
        <h1 className="mt-24 text-[24px]">
          <span className="text-[#999999]">Clinic Patient List</span>
          <span className="mx-2 text-[#999999]">&gt;</span>
          <span className="text-[#4D4D4D]">Existing Patient Profiles Search</span>
          <span className="mx-2 text-[#4D4D4D]">&gt;</span>
          <span className="text-[#4D4D4D]">Existing Patient Profiles</span>
          <span className="mx-2 text-[#4D4D4D]">&gt;</span>
          <span className="text-[#4D4D4D]">Lorem Ipsum</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-6">
        {/* Image */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <div className="w-[302px] h-[302px] rounded-full border-[4px] border-[#B3DB8A] overflow-hidden relative bg-gray-100">
            <Image
              src={Avatar}
              alt="Olivia Rhye"
              width={300}
              height={300}
              className="absolute inset-0 m-auto object-cover"
              style={{
                width: 'calc(100% - 8px)',
                height: 'calc(100% - 8px)',
                borderRadius: '50%'
              }}
            />
          </div>
          <button className="w-[109px] h-[36px] rounded-[8px] text-sm text-[#D11288] hover:text-pink-700 mt-8 px-4 py-1 border-l border-r border-b border-[#FB009C] border-t-0 hover:border-t hover:border-t-[#FB009C] transition-all shadow-[0_2px_8px_rgba(251,0,156,0.2)] 
                  hover:shadow-[0_4px_12px_rgba(251,0,156,0.3)]">
            CHANGE
          </button>
        </div>

        {/* Details */}
        <div className="flex-1">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tests */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Tests</span>
                <div className="absolute left-[93.07px] top-[32px] w-[195.35px] h-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #FB009C, #FFFFFF)'
                  }}>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center 
                    border-t-2 border-l-2 border-b-2 border-r-0
                    border-t-pink-500 border-l-pink-500 border-b-green-500
                    relative">
                    <span className="font-bold text-[#1A1A1A] text-xl">45</span>
                    <div className="absolute inset-0 rounded-full border-2 border-r-green-500 border-l-0 border-t-0 border-b-0"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-100"></div>
            </div>

            {/* Total Appointments */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Appointments</span>
                <div className="absolute left-[151.37px] top-[32px] w-[137.05px] h-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #FB009C, #FFFFFF)'
                  }}>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center 
                    border-t-2 border-l-2 border-b-2 border-r-0
                    border-t-pink-500 border-l-pink-500 border-b-green-500
                    relative">
                    <span className="font-bold text-[#1A1A1A] text-xl">15</span>
                    <div className="absolute inset-0 rounded-full border-2 border-r-green-500 border-l-0 border-t-0 border-b-0"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-100"></div>
            </div>

            {/* Total Diagnostics */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Diagnostics</span>
                <div className="absolute left-[152.37px] top-[32px] w-[151.37px] h-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #FB009C, #FFFFFF)'
                  }}>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center 
                    border-t-2 border-l-2 border-b-2 border-r-0
                    border-t-pink-500 border-l-pink-500 border-b-green-500
                    relative">
                    <span className="font-bold text-[#1A1A1A] text-xl">85</span>
                    <div className="absolute inset-0 rounded-full border-2 border-r-green-500 border-l-0 border-t-0 border-b-0"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-100"></div>
            </div>

            {/* Total Vaccines */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Vaccines</span>
                <div className="absolute left-[116.6px] top-[32px] w-[171.83px] h-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #FB009C, #FFFFFF)'
                  }}>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center 
                    border-t-2 border-l-2 border-b-2 border-r-0
                    border-t-pink-500 border-l-pink-500 border-b-green-500
                    relative">
                    <span className="font-bold text-[#1A1A1A] text-xl">17</span>
                    <div className="absolute inset-0 rounded-full border-2 border-r-green-500 border-l-0 border-t-0 border-b-0"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-100"></div>
            </div>
          </div>
          
          {/* Profile Details Section */}
          <div className="mt-4 border border-[#999999] rounded-md overflow-hidden bg-white">
            <div className="relative">
              <header className="px-4 py-3 font-semibold text-[#1A1A1A] text-xs bg-white">
                PROFILE DETAILS
              </header>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px]"
                style={{
                  borderBottom: '1px solid',
                  borderImageSource: 'linear-gradient(90deg, #FB009C 0%, #B3DB8A 100%)',
                  borderImageSlice: '1'
                }}
              ></div>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-9 gap-4 font-semibold text-[#1A1A1A] bg-[#E6F3D8] border-b pb-2 px-4 py-3 uppercase text-xs">
              <span>PATIENT ID</span>
              <span>PATIENT NAME</span>
              <span>GENDER</span>
              <span>AGE</span>
              <span>CONTACT</span>
              <span>SEC. CONTACT</span>
              <span>EMAIL</span>
              <span>ADDRESS</span>
              <span>PINCODE</span>
            </div>
            
            {/* Table Body */}
            <div>
              {profileData.map((row) => (
                <div key={row.id} className="grid grid-cols-9 gap-4 px-4 py-4 border-b items-center text-[#1A1A1A] text-xs">
                  <div>{row.patientId}</div>
                  <div>{row.patientName}</div>
                  <div>{row.gender}</div>
                  <div>{row.age}</div>
                  <div>{row.contact}</div>
                  <div>{row.secContact}</div>
                  <div>{row.email}</div>
                  <div>{row.address}</div>
                  <div>{row.pincode}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Clinic Details */}
          <div className="mt-4 border border-[#999999] rounded-md overflow-hidden bg-white">
            <div className="relative">
              <header className="px-4 py-3 font-semibold text-[#1A1A1A] text-xs bg-white">
                PATIENT CLINIC DETAILS
              </header>
              <div 
                className="absolute bottom-0 left-0 w-full h-[1px]"
                style={{
                  borderBottom: '1px solid',
                  borderImageSource: 'linear-gradient(90deg, #FB009C 0%, #B3DB8A 100%)',
                  borderImageSlice: '1'
                }}
              ></div>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 font-semibold text-[#1A1A1A] bg-[#E6F3D8] border-b pb-2 px-4 py-3 uppercase text-xs">
              <span>MEMBERSHIP ID</span>
              <span>MEMBERSHIP END DATE</span>
              <span>CREATED AT</span>
              <span>CHRONIC DISEASE</span>
            </div>
            
            {/* Table Body */}
            <div>
              {clinicData.map((row) => (
                <div key={row.id} className="grid grid-cols-4 gap-4 px-4 py-4 border-b items-center text-[#1A1A1A] text-xs">
                  <div>{row.membershipId}</div>
                  <div>{row.membershipEndDate}</div>
                  <div>{row.createdAt}</div>
                  <div>{row.chronicDisease}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards Section */}
      <div className="mt-8 px-6 ml-4">
        <div className="flex flex-nowrap overflow-x-auto gap-10 pb-4">
          {/* Appointments Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">APPOINTMENTS</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">View Details <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>

          {/* Ambulances Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">AMBULANCES</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">View Details <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>

          {/* Tests Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">TESTS</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">View Details <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>

          {/* Vaccines Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">VACCINES</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">View Details <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>

          {/* Oxygen Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">OXYGEN</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">View Details <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>

          {/* Prescription Folders Card */}
          <div className="bg-white border border-[#999999] rounded-lg shadow-sm flex-shrink-0 relative" style={{ width: '295px', height: '88px' }}>
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#1A1A1A] font-medium">PRESCRIPTION FOLDERS</span>
                <div className="absolute left-0 right-0 h-[1px] mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FB009C, #B3DB8A)'
                  }}></div>
              </div>
              <button className="text-[#1A1A1A] text-sm self-end pt-4">Access all <span className="text-[#D11288]">&gt;</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;