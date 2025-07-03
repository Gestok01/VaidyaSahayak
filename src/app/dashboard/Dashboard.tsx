
import DiagnosticRates from "./DiagnosticRate";
import { WeeklyAppointmentsChart, NewPatientsChart, TestDataChart }   from "./Charts";

export default function Dashboard() {
  return (
    <div className="">
    
      <div className="grid grid-cols-3 gap-4 w-full px-4">
      {/* Weekly Appointments Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Weekly Appointments</h3>
          <button className="text-pink-500 text-sm hover:text-pink-600 flex items-center">
            View Details
            <svg 
              className="w-4 h-4 ml-1" 
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
        <div className="h-48">
          <WeeklyAppointmentsChart />
        </div>
      </div>

      {/* New Patients Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">New Patients</h3>
          <button className="text-pink-500 text-sm hover:text-pink-600 flex items-center">
            View Details
            <svg 
              className="w-4 h-4 ml-1" 
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
        <div className="h-48">
          <NewPatientsChart />
        </div>
      </div>

      {/* Test Data Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Test Data</h3>
          <button className="text-pink-500 text-sm hover:text-pink-600 flex items-center">
            View Details
            <svg 
              className="w-4 h-4 ml-1" 
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
        <div className="h-48">
          <TestDataChart />
        </div>
      </div>
    </div>
      <DiagnosticRates />
      
    </div>
  );
}
