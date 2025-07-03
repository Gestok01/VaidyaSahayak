"use client"
import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import React from 'react'
import Image from "next/image";
import UPLOAD from '@/assets/svg/person_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg'
import { useRouter } from 'next/navigation';

const page = () => {
    const searchTags = ["Employee Name", "Date"];
    const router = useRouter();
    const handleSearch = () => {
    router.push('/employment_management/depositStatement/depositstatement');};
    
    return (
        <div className="relative" style={{ width: '100%', minHeight: '100vh' }}>
            <div 
                className="absolute flex items-center gap-2"
                style={{
                    width: '881px',
                    height: '20px',
                    top: '52px',
                    left: '42px'
                }}
            >
                <Image 
                    src={UPLOAD} 
                    alt="Upload icon" 
                    width={20}  
                    height={20} 
                    className="mr-1"
                />
                <span className="text-[#999999] text-2xl font-semibold">
                    Employee Management
                </span>
                <span className="text-[#999999] text-2xl">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold">
                    Deposit Statement of Employee Search
                </span>
            </div>

            <div 
                className="absolute"
                style={{
                    width: '1039px',
                    height: '153px',
                    top: '108px',
                    left: '42px'
                }}
            >
                <DynamicSearchPage tags={searchTags} 
                onSearch={handleSearch}/>
            </div>
        </div>
    )
}

export default page;