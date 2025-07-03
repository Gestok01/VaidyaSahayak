'use client'
import DynamicGetMiddle from "@/app/components/DynamicGetMiddle";
import TitleList from "@/app/components/TitleList";
import React, { useState } from "react";

const page = () => {
  const [titleList, setTitleList] = useState([
    {
      name: "Profiling",
      linkTo: "",
    },
    {
        name: "Employee",
        linkTo: "",
      },
      {
        name: "Get",
        linkTo: "",
      },
      {
        name: "Get Employee Search",
        linkTo: "/getProfile/doctor",
      }
  ]);
  return (
    <div className="p-2 flex flex-col gap-4">
         <TitleList titleList = {titleList} setTitleList = {setTitleList}/>
      <DynamicGetMiddle unfilteredOption={{name: 'CHECK ALL EMPLOYEES'}} tags={["Employee Group", "Empoyee Name"]} />
    </div>
  );
};

export default page;
