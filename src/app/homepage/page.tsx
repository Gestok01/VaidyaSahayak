"use client";
import SideBar from "./Sidebar";
import DoctorSvg from "../../assets/svg/stethoscope_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import EmployeeSvg from "../../assets/svg/badge_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import TestTypeSvg from "../../assets/svg/lab_panel_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import PatientCardSvg from "../../assets/svg/id_card_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.svg";
import TodaysInfoCard from "./charts/TodaysInfoCard";
import OverviewCard from "./charts/Overview";
import DoctorsEfficiencyTable from "./charts/DoctorsEfficiencyTable";
import PendingReportsTable from "./charts/PendingReportsTable";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import {
  WeeklyAppointmentsChart,
  NewPatientsChart,
  TestDataChart,
} from "./charts/Charts";
const HomePage = () => {
  return (
    <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] h-screen w-full bg-center bg-no-repeat bg-contain mms:pt-[65px] sm:pt-[80] md:pt-[75px] lg:pt-[98px] xl:pt-[100px] ">
      <div className="fixed z-50">
        <Header />
        <NavBar />
      </div>
      <div className="flex">
        <div className="sticky mms:top-1 mms:h-[10vh] sm:top-1 md:top-[5px] md:h-[calc(80vh-4rem)] lg:top-[5px] lg:h-[calc(80vh-4rem)]">
          <SideBar />
        </div>
        <div className="flex-1">
          <div>
            <div className="grid mms:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:ml-1 lg:ml-0.5 2xl:ml-2 md:mb-1 lg:mb-2.5 md:mr-1 lg:mr-2 2xl:mr-1.5">
              <OverviewCard svg={DoctorSvg} name="Total Doctors" score={85} />
              <OverviewCard
                svg={EmployeeSvg}
                name="Total Employees"
                score={85}
              />
              <OverviewCard svg={TestTypeSvg} name="Type of tests" score={85} />
              <OverviewCard
                svg={PatientCardSvg}
                name="Patients with Cards"
                score={85}
              />
            </div>

            <div className="grid mms:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-32 mms:ml-0.5 md:ml-1 lg:ml-0.5 2xl:ml-2 md:-mt-2 mms:mr-0 md:mr-1 lg:mr-2">
              <TodaysInfoCard
                cardHeading="Today's Collection"
                number="₹25,000/-"
                stats={{ trend: "Up", percentage: "20" }}
              />
              <TodaysInfoCard
                cardHeading="Today's Tests"
                number="55"
                stats={{ trend: "Up", percentage: "10" }}
              />
              <TodaysInfoCard
                cardHeading="Today's Radiology"
                number="55"
                stats={{ trend: "Down", percentage: "10" }}
              />
              <TodaysInfoCard
                cardHeading="Today's Pathology"
                number="55"
                stats={{ trend: "Down", percentage: "40" }}
              />
            </div>
          </div>

          {/* Charts   */}
          <div className="grid mms:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 md:gap-1 lg:gap-1 2xl:gap-4 max-w-[100%] mms:pl-2 md:pl-3 lg:pl-3.5 2xl:pl-4 lg:mb-0.5 xl:mb-1 2xl:mb-2 mms:-ml-0.5 md:-ml-1 lg:-ml-2 2xl:-ml-0.5 mms:mt-[150px] sm:mt-3.5 md:mt-[40px] lg:-mt-[46px] 2xl:-mt-[33px] mms:mr-1 sm:mr-1 mr-1 lg:-mr-3 2xl:mr-3.5">
            {/* Weekly Appointments Card */}
            <div className="bg-[#FFFFFF] rounded-lg shadow-sm mms:px-1 md:px-3 mms:pt-1 md:pt-3 border border-[#98A2B3] h-[227px]">
              <div className="flex justify-between items-center mms:pl-1 md:pl-2.5 pt-0.5 mb-2">
                <h3 className="mms:text-[8px] md:text-[10px] font-medium text-[#1A1A1A]">
                  Weekly Appointments
                </h3>
                <button className="text-[#1A1A1A] flex mms:text-[8px] md:text-[10px] items-center gap-0">
                  View Details
                  <svg
                    className="mms:w-2 md:w-3 mms:h-2 md:h-3 ml-1 text-[#FB009C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <WeeklyAppointmentsChart />
              </div>
            </div>

            {/* New Patients Card */}
            <div className="bg-[#FFFFFF] rounded-lg shadow-sm mms:p-1 md:p-3 pt-3 border border-[#98A2B3]  h-[227px]">
              <div className="flex justify-between items-center pl-2.5 pt-0.5 mb-2">
                <h3 className="mms:text-[8px] md:text-[10px] font-medium text-[#1A1A1A]">
                  New Patients
                </h3>
                <button className="text-[#1A1A1A] flex mms:text-[8px] md:text-[10px] items-center">
                  View Details
                  <svg
                    className="w-3 h-3 ml-1 text-[#FB009C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <NewPatientsChart />
              </div>
            </div>

            {/* Test Data Card */}
            <div className="bg-[#FFFFFF] rounded-lg mms:p-1 md:p-3 pt-3 shadow-sm border border-[#98A2B3] h-[227px]">
              <div className="flex justify-between items-center pl-2.5 pt-0.5 mb-2">
                <h3 className="mms:text-[8px] md:text-[10px] font-medium text-[#1A1A1A]">
                  Test Data
                </h3>
                <button className="text-[#1A1A1A] flex mms:text-[8px] md:text-[10px] items-center">
                  View Details
                  <svg
                    className="w-3 h-3 ml-1 text-[#FB009C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <TestDataChart />
              </div>
            </div>
          </div>

          <div className="lg:flex mms:grid mms:grid-cols-1 lg:mt-0 xl:mt-1 2xl:mt-2.5 mms:mr-0 md:mr-2.5 lg:mr-1 2xl:mr-2.5 m-0 gap-1">
            <DoctorsEfficiencyTable />
            <PendingReportsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
