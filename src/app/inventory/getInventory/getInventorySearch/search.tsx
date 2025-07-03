"use client"
import DynamicSearchPage from '@/app/components/DynamicSearchPage'
import React from 'react'
import Image from "next/image";
import BAG from '@/assets/svg/shopping_bag.svg'
import { useRouter } from 'next/navigation';

const page = () => {
    const searchTags = ["Item Name", "Category"];
    const router = useRouter();
    
    const categoryOptions = [
        { label: "Medical", value: "Medical" },
        { label: "Surgical", value: "Surgical" },
        { label: "Pharmacuetical", value: "Pharmaceutical" }
    ];

    const handleSearch = (searchValues: Record<string, string>) => {
        console.log('Search values:', searchValues);
        router.push('/inventory/getInventory/getInventoryTable');
    };
    
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
                    src={BAG} 
                    alt="Bag icon" 
                    width={20}  
                    height={20} 
                    className="mr-1"
                />
                <span className="text-[#999999] text-2xl font-semibold">
                    Inventory Management
                </span>
                <span className="text-[#999999] text-2xl">&gt;</span>
                <span className="text-[#999999] text-2xl font-semibold">
                    Inventory
                </span>
                <span className="text-[#999999] text-2xl">&gt;</span>
                <span className="text-[#999999] text-2xl font-semibold">
                    Get
                </span>
                <span className="text-[#4D4D4D] text-2xl">&gt;</span>
                <span className="text-[#4D4D4D] text-2xl font-semibold">
                    Search Get Inventory
                </span>
            </div>

            <div 
                className="absolute"
                style={{
                    width: '1039px',
                    height: '151px',
                    top: '108px',
                    left: '42px'
                }}
            >
                <DynamicSearchPage 
                    tags={searchTags} 
                    categoryOptions={categoryOptions}
                    onSearch={handleSearch}
                />
            </div>
        </div>
    )
}

export default page;