'use client';
import React from "react";
import Image from "next/image";
import Avatar from "@/assets/svg/Avatar.svg";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg'

const PatientProfile = () => {
  // Sample data
  const profileData = [{
    id: 1,
    Id: "UIXXXXX",
    Name: "LOREM IPSUM",
    designation: "RECEPTIONIST",
    gender: "MALE",
    dob: "11-03-2001",
    age: "24",
    contact: "+91XXXXXXXXXX",
    email: "LOREM@GMAIL.COM",
  }];

  const clinicData = [{
    id: 1,
    salary: "XXXXX",
    shift: "DAY",
    workingDays: "XX",
    rbac: "LOREM IPSUM"
  }];

  return (
    <div className="font-medium">
      {/* Breadcrumb Heading */}
      <div className="px-6 py-2">
        <h1 className="mt-24 text-[24px] flex items-center">
            <Image 
                src={UPLOAD} 
                alt="Upload icon" 
                width={20}  
                height={20} 
                className="mr-1"
            />
          <span className="text-[#999999]">Profiling</span>
          <span className="mx-2 text-[#999999]">&gt;</span>
          <span className="text-[#999999]">Employee</span>
          <span className="mx-2 text-[#999999]">&gt;</span>
          <span className="text-[#999999]">Get</span>
          <span className="mx-2 text-[#999999]">&gt;</span>
          <span className="text-[#4D4D4D]">Get Employee Search</span>
          <span className="mx-2 text-[#4D4D4D]">&gt;</span>
          <span className="text-[#4D4D4D]">Get Employee Profile List</span>
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
          <div className="flex gap-4">
          <button className="w-[109px] h-[36px] rounded-[8px] text-sm text-[#D11288] hover:text-pink-700 mt-8 px-4 py-1 border-l border-r border-b border-[#FB009C] border-t-0 hover:border-t hover:border-t-[#FB009C] transition-all shadow-[0_2px_8px_rgba(251,0,156,0.2)] 
                  hover:shadow-[0_4px_12px_rgba(251,0,156,0.3)]">
            CHANGE
          </button>
          <button className="w-[170px] h-[36px] rounded-[8px] text-sm text-[#D11288] hover:text-pink-700 mt-8 px-4 py-1 border-l border-r border-b border-[#FB009C] border-t-0 hover:border-t hover:border-t-[#FB009C] transition-all shadow-[0_2px_8px_rgba(251,0,156,0.2)] 
                  hover:shadow-[0_4px_12px_rgba(251,0,156,0.3)]">
            CHANGE PASSWORD
          </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Shifts Completed */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Shifts Completed</span>
                <div className="flex left-[170px] top-[32px] w-[128px] h-[1px]"
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

            {/* Total Days Worked */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Days Worked</span>
                <div className="flex left-[151.37px] top-[32px] w-[137.05px] h-[1px]"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #FB009C, #FFFFFF)'
                  }}>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center 
                    border-t-2 border-l-2 border-b-2 border-r-0
                    border-t-pink-500 border-l-pink-500 border-b-green-500
                    relative">
                    <span className="font-bold text-[#1A1A1A] text-xl">515</span>
                    <div className="absolute inset-0 rounded-full border-2 border-r-green-500 border-l-0 border-t-0 border-b-0"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-100"></div>
            </div>

            {/* Total Leaves Taken */}
            <div className="bg-white border border-pink-200 rounded-lg relative overflow-hidden shadow-sm h-[64px]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-200"></div>
              <div className="flex items-center justify-between h-full px-4">
                <span className="text-[#1A1A1A] text-sm">Total Leaves Taken</span>
                <div className="flex left-[152.37px] top-[32px] w-[151.37px] h-[1px]"
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
          </div>
          
          {/* Personal Details Section */}
          <div className="mt-4 border border-[#999999] rounded-md overflow-hidden bg-white">
            <div className="relative">
              <header className="px-4 py-3 font-semibold text-[#1A1A1A] text-xs bg-white">
                PERSONAL DETAILS
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
              <span>ID</span>
              <span>NAME</span>
              <span>DESIGNATION</span>
              <span>GENDER</span>
              <span>DOB</span>
              <span>AGE</span>
              <span>CONTACT</span>
              <span>EMAIL</span>
            </div>
            
            {/* Table Body */}
            <div>
              {profileData.map((row) => (
                <div key={row.id} className="grid grid-cols-9 gap-4 px-4 py-4 border-b items-center text-[#1A1A1A] text-xs">
                  <div>{row.Id}</div>
                  <div>{row.Name}</div>
                  <div>{row.designation}</div>
                  <div>{row.gender}</div>
                  <div>{row.dob}</div>
                  <div>{row.age}</div>
                  <div>{row.contact}</div>
                  <div>{row.email}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinic Details */}
          <div className="mt-4 border border-[#999999] rounded-md overflow-hidden bg-white">
            <div className="relative">
              <header className="px-4 py-3 font-semibold text-[#1A1A1A] text-xs bg-white">
                CLINIC DETAILS
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
              <span>SALARY</span>
              <span>SHIFT</span>
              <span>WORKING DAYS</span>
              <span>RBAC</span>
            </div>
            
            {/* Table Body */}
            <div>
              {clinicData.map((row) => (
                <div key={row.id} className="grid grid-cols-4 gap-4 px-4 py-4 border-b items-center text-[#1A1A1A] text-xs">
                  <div>{row.salary}</div>
                  <div>{row.shift}</div>
                  <div>{row.workingDays}</div>
                  <div>{row.rbac}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;