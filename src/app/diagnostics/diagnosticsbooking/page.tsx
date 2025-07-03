import React from "react";
import DiagnosticBookingForm from "../diagnosticbooking/DiagnosticBookingForm";

const page = () => {
  const Heading = "Diagnostics > Diagnostic Booking";

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 my-4 mx-8 ">
          {Heading}
        </h2>
        <DiagnosticBookingForm />
      </div>
    </>
  );
};

export default page;
