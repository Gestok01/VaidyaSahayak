import React from "react";
import TESTS from "@/assets/tests.json";
import SORT_ICON_WHITE from "@/assets/svg/swap_vert_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import SORT_ICON_PINK from "@/assets/svg/swap_vert_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EDIT_SVG from "@/assets/svg/edit_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import SEARCH_SVG from "@/assets/svg/search_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import DiagnosticRatesTable from "./DiagnosticRatesTable";
import Pagination from "@/app/components/Pagination";
import Image from "next/image";

const DiagnosticRates: React.FC = () => {
  const heading = "Diagnostics > Diagnostic Rates";

  const tableHeadings = [
    "SL.NO",
    "CATEGORY",
    "TEST NAME",
    "DISCOUNT SENIOR IN HOUSEPagination",
    "DISCOUNT MEMBERS IN HOUSE",
    "DISCOUNT SENIOR OUTSIDE",
    "PRICE",
    "STATUS",
  ];

  return (
    <>
      <DiagnosticRatesTable />
    </>
  );
};

export default DiagnosticRates;
