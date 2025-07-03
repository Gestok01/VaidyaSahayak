import React from "react";
import { Search } from "lucide-react";
import Header from "@/app/components/Header";
import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import OxygenBillingSearch from "../OxygenBillingSearch";
import OxygenBilling from "../page";
import DynamicSearchPage from "@/app/components/DynamicSearchPage";
const Page = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <DynamicSearchPage tags={["ID", "Patient Name", "date"]} />
    </div>
  );
};

export default Page;
