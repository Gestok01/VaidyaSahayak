import DynamicSearchPage from "@/app/components/DynamicSearchPage";
import Header from "@/app/components/Header";
import NavBar from "@/app/components/NavBar";
import React from "react";

const Page = () => {
  const heading = "Vaccine > Vaccine Billing Search";
  const searchTags = ["ID", "Patient Name", "Patient Phone Number"];

  return (
    <div className="mx-4">
      <Header />
      <NavBar />
      <p className="text-2xl m-4">{heading}</p>
      <DynamicSearchPage tags={searchTags} />
    </div>
  );
};

export default Page;
