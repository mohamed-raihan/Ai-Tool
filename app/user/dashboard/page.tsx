// pages/dashboard.tsx
"use client";
import { act, useState } from "react";
import { Home, BarChart2, FileText, User } from "lucide-react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TestPage from "./test/page";
import ProfileWizard from "./profile/page";

// Define types for our component
type MenuItem = string;

interface EmployeeData {
  name: string;
  avatarColor: string;
  contract: number;
  client: number;
  intern: number;
  sickLeave: string;
  unsubmitted: number;
  overtime: string | number;
}

const Dashboard: NextPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>("home");
  const router = useRouter();

  // Sample employee data
  const employeeData: EmployeeData[] = [
    {
      name: "Leon Nils",
      avatarColor: "bg-red-500",
      contract: 432,
      client: 29,
      intern: 78,
      sickLeave: "0/5",
      unsubmitted: 23,
      overtime: "-",
    },
    {
      name: "Friedrich Beren",
      avatarColor: "bg-amber-500",
      contract: 589,
      client: 189,
      intern: 48,
      sickLeave: "2/1",
      unsubmitted: 12,
      overtime: 1.5,
    },
    {
      name: "Bruno Soares",
      avatarColor: "bg-gray-400",
      contract: 298,
      client: 489,
      intern: 109,
      sickLeave: "8/12",
      unsubmitted: 8,
      overtime: "-",
    },
  ];

  // Handle navigation to test page
  const handleTestNavigation = () => {
    setActiveMenuItem("test");
    // router.push("/user/dashboard/test");
  };

  const handleProfileNavigation = () => {
    setActiveMenuItem("profile");
    // router.push("/user/dashboard/profile");
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-8 border-r border-gray-800">
        <div className="mb-8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 4L4 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "home" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveMenuItem("home")}
        >
          <Home size={20} />
        </button>

        <button
          className={`p-3 rounded-lg ${
            activeMenuItem === "test" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handleTestNavigation}
        >
          <FileText size={20} />
        </button>

        <button
          className={`p-3 rounded-lg my-2 ${
            activeMenuItem === "analytics" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveMenuItem("analytics")}
        >
          <BarChart2 size={20} />
        </button>

        <button
          className={`p-3 rounded-lg ${
            activeMenuItem === "profile" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handleProfileNavigation}
        >
          <User size={20} />
        </button>

        <div className="mt-auto">
          <button className="p-3 rounded-lg hover:bg-gray-800">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
              <path d="M12 8V16" stroke="white" strokeWidth="2" />
              <path d="M8 12H16" stroke="white" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeMenuItem === "home" && (
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex gap-5 ms-3">
              <Image
                src="/footerlogo.png"
                width={100}
                height={50}
                alt="Prepacademy logo"
              />
              {/* <h1 className="text-xl font-semibold">Prepacademy</h1> */}
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-800">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-sm font-medium">JS</span>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Check Section */}
            <div className="bg-gray-50 text-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Check</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-500">100% complete</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-amber-200 p-3 rounded-md flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-300 p-1 rounded-md">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L19 8"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>2 Missing invoices</span>
                  </div>
                </div>

                <div className="bg-amber-200 p-3 rounded-md flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-300 p-1 rounded-md">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L19 8"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>9 missing hours in time sheets</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs">
                    JS
                  </div>
                </div>

                <div className="bg-amber-200 p-3 rounded-md flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-300 p-1 rounded-md">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12L10 17L19 8"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Unreconciled Accounts Receivable</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs">
                    JS
                  </div>
                </div>
              </div>
            </div>

            {/* Report Section */}
            <div className="bg-orange-400 rounded-lg p-4">
              <h2 className="font-medium text-white mb-4">Report</h2>

              <div className="space-y-2">
                <div className="bg-orange-200 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-black font-medium">Report, 15 Oct</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        in progress
                      </span>
                      <button>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-xs">
                      JS
                    </div>
                    <span>Shared with CFO</span>
                  </div>
                </div>

                <div className="bg-orange-200 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-black font-medium">Report, 10 Sep</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        Realistic
                      </span>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                        Complete
                      </span>
                      <button>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-xs">
                      JS
                    </div>
                    <span>Shared with Investors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Understand Section */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Understand</h2>
                <div className="text-xs text-gray-400">Time Entry Week</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-orange-400 rounded-md p-3 text-center">
                  <div className="text-xl font-semibold">3,458</div>
                  <div className="text-xs">Contract Hours</div>
                </div>

                <div className="bg-orange-300 rounded-md p-3 text-center">
                  <div className="text-xl font-semibold">1,059</div>
                  <div className="text-xs">Client Hours</div>
                </div>

                <div className="bg-amber-200 text-black rounded-md p-3 text-center">
                  <div className="text-xl font-semibold">30.62%</div>
                  <div className="text-xs">Utilization</div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <span>Last 12 week</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1">
                  <span>Specific week</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1">
                  <span>Active employee</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1">
                  <span>Employee</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-xs text-gray-400 grid grid-cols-7 gap-2 mb-2">
                <div>Employee</div>
                <div>Contract</div>
                <div>Client</div>
                <div>Intern</div>
                <div>Sick/Leave</div>
                <div>Unsubmitted</div>
                <div>Overtime</div>
              </div>

              <div className="space-y-2 text-sm">
                {employeeData.map((employee, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 gap-2 items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full ${employee.avatarColor}`}
                      ></div>
                      <span>{employee.name}</span>
                    </div>
                    <div>{employee.contract}</div>
                    <div>{employee.client}</div>
                    <div>{employee.intern}</div>
                    <div>{employee.sickLeave}</div>
                    <div>{employee.unsubmitted}</div>
                    <div>{employee.overtime}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Section */}
            <div className="bg-amber-100 text-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Plan</h2>
                <div className="flex items-center gap-2">
                  <button className="bg-white px-3 py-1 rounded-md text-sm font-medium">
                    Optimistic
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium text-gray-600">
                    Realistic
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium text-gray-600">
                    Analyze
                  </button>
                </div>
              </div>

              <div className="h-64 relative">
                {/* This is a simplified representation of the chart */}
                <div className="absolute inset-0 flex items-end justify-between">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                    <div
                      key={month}
                      className="h-1/3 w-6 bg-white rounded-t-md"
                      style={{
                        height: `${Math.floor(Math.random() * 70) + 10}%`,
                      }}
                    ></div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-300">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, index) => (
                    <div key={index}>{month}</div>
                  ))}
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-1/3 w-2 h-32 bg-black rounded-full"></div>

                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-600">
                  <div>450K €</div>
                  <div>300K €</div>
                  <div>150K €</div>
                  <div>0 €</div>
                  <div>-150K €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMenuItem === "test" && (
        <div className="w-full">
          <TestPage />
        </div>
      )}

      {activeMenuItem === "profile" && (
        <div className="w-full">
          <ProfileWizard />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
