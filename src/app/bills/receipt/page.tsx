"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RECEIPT_SVG from "@/assets/svg/receipt_long_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import BillSearchInitial from "./BillSearchInitial";

const Page = () => {
  const router = useRouter();

  const handleSearch = ({ billType, billId }: { billType: string; billId: string }) => {
    console.log(billId);
    let route = "";

    switch (billType) {
      case "appointment_bill":
        route = "/doctor/appointment_billing_search/appointment_billing?case=1";
        break;
      case "ambulance_bill":
        route = "/ambulance/ambulance_billing?case=2";
        break;
      case "vaccine_bill":
        route = "/vaccine/vaccine_billing_search/vaccine_billing/?case=3";
        break;
      case "oxygen_bill":
        route = "/oxygen/?case=4";
        break;
      case "pharmacy_bill":
        route = "/pharmacy/?case=5";
        break;
      case "test_bill":
        route = "/diagnostics/diagnosticbilling/?case=6";
        break;
      default:
        route = "/bills/all-bills";
    }

    // Append query param
    router.push(`${route}?billId=${billId}`);
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute flex items-center gap-2 top-[52px] left-[42px] w-[881px] h-[20px]">
        <Image src={RECEIPT_SVG} alt="Bag icon" width={20} height={20} className="mr-1" />
        <span className="text-[#999999] text-2xl font-semibold">Bills/Receipt</span>
        <span className="text-[#4D4D4D] text-2xl">&gt;</span>
        <span className="text-[#4D4D4D] text-2xl font-semibold">Search</span>
      </div>

      <div className="absolute top-[108px] left-[42px] w-[1039px] h-[151px]">
        <BillSearchInitial onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Page;
