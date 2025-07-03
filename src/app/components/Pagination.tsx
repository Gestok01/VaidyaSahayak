import React from "react";
import Image from "next/image";
import LEFT_ICN from '@/assets/svg/chevron_left_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';
import RIGHT_ICN from '@/assets/svg/chevron_right_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg';

const Pagination = () => {
  const pages = 10;

  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-md px-3">
        
        {/* Previous Button */}
        <button className="px-3 flex items-center gap-2 text-pink-600 font-semibold hover:bg-gray-200 rounded-md transition">
          <Image src={LEFT_ICN} alt="Previous" width={16} height={16} />
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: pages }).map((_, idx) => (
          <button
            key={idx}
            className="px-3 py-1 border border-gray-300 hover:bg-[#E8F4DC] transition"
          >
            {idx + 1}
          </button>
        ))}

        {/* Next Button */}
        <button className="px-3 flex items-center gap-2 text-pink-600 font-semibold hover:bg-gray-200 rounded-md transition">
          Next
          <Image src={RIGHT_ICN} alt="Next" width={16} height={16} />
        </button>

      </div>
    </div>
  );
};

export default Pagination;
