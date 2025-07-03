'use client';

import React, { useState } from 'react';

const Page = () => {
    const [selectedDoctor, setSelectedDoctor] = useState("Doctor 1");
    const heading = "Doctor > Search";
  
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900">
           
            <div className="max-w-3xl mx-2 mt-6 p-6 bg-white dark:bg-neutral-950 rounded-lg shadow-lg border border-pink-500">
                <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-300 mb-4">{heading}</h2>
                
                {/* Search Fields */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <select 
                            name="doctor" 
                            value={selectedDoctor} 
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            className="border border-pink-300 dark:border-pink-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 text-pink-700 dark:text-pink-300 focus:outline-none"
                        >
                            <option value="">Select your doctor</option>
                            <option value="Doctor 1">Doctor 1</option>
                            <option value="Doctor 2">Doctor 2</option>
                            <option value="Doctor 3">Doctor 3</option>
                        </select>

                        <input
                            type="date"
                            className="border border-pink-300 dark:border-pink-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 text-pink-700 dark:text-pink-300 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end mt-4">
                    <button className="bg-pink-400 dark:bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-400 transition-transform transform hover:scale-105">
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
