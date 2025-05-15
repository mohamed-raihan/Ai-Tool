// pages/dashboard.tsx
"use client";
import { useEffect, useState } from "react";
import { Home, Users, FilePlus } from "lucide-react";
import type { NextPage } from "next";
import Image from "next/image";
import TestPage from "@/app/user/dashboard/test/page";
// import UsersTable from "../usertable/Usertable";
import AdminUsersPage from "../usertable/page";
import QuestionCard from "@/app/admin/questions/page";
import CareersPage from "../careers/page";
import { FaUserGraduate } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import CategoryManagement from "../category/page";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import PaymentManagement from "../payment/page";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";
import { TbReport } from "react-icons/tb";
import ReportPage from "../report/page";

// Define types for our component
type MenuItem = string;

interface StudentData {
  name: string;
  avatarColor: string;
  Email: string;
  Phone: string;
  Class: string;
  Stream: string;
  created_at?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class_name: { name: string };
  stream_name: { name: string };
  created_at: string;
  is_subscribed: boolean;
}

const Dashboard: NextPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>("");
  // const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [subscribedCount, setSubscribedCount] = useState<number>(0);

  const fetchStudents = async (url?: string) => {
    try {
      const respons = await api.get(url || API_URL.STUDENT.BASIC);
      console.log(respons.data);

      const filterSubscribedStudents = respons.data.results.filter(
        (student: Student) => student?.is_subscribed === true
      );
      setSubscribedCount(filterSubscribedStudents?.length);
      setCount(respons.data?.count);
      setStudents(respons.data?.results);
      setNextPageUrl(respons.data?.next);
      setPrevPageUrl(respons.data?.previous);
      setTotalCount(respons.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    if (sessionStorage.getItem("activeMenuItem")) {
      setActiveMenuItem(sessionStorage.getItem("activeMenuItem") as MenuItem);
    }
  }, []);

  // Sample student data
  const studentData: StudentData[] = students?.map((student) => ({
    name: student.name,
    avatarColor: "bg-red-500",
    Email: student.email,
    Phone: student.phone,
    Class: student.class_name.name,
    Stream: student.stream_name.name,
    created_at: student.created_at,
  }));

  // Get the latest 10 students by login (created_at)
  const loginData = [...studentData]
    .filter((s) => !!s.created_at)
    .sort(
      (a, b) =>
        new Date(b.created_at as string).getTime() -
        new Date(a.created_at as string).getTime()
    )
    .slice(0, 10);

  console.log(loginData);

  
  // const handleTestNavigation = () => {
  //   setActiveMenuItem("test");
  //   // router.push("/test");
  // };

  const handleUserNavigation = () => {
    setActiveMenuItem("user");
    sessionStorage.setItem("activeMenuItem", "user");
    // router.push("/admin/usertable");
  };

  const handlequestionNavigation = () => {
    setActiveMenuItem("questions");
    sessionStorage.setItem("activeMenuItem", "questions");
    // router.push("/admin/usertable");
  };

  const handlecreerNavigation = () => {
    setActiveMenuItem("creer");
    sessionStorage.setItem("activeMenuItem", "creer");
    // router.push("/admin/usertable");
  };

  const handlecategoryNavigation = () => {
    setActiveMenuItem("category");
    sessionStorage.setItem("activeMenuItem", "category");
    // router.push("/admin/usertable");
  };

  const handlepaymentNavigation = () => {
    setActiveMenuItem("payment");
    sessionStorage.setItem("activeMenuItem", "payment");
    // router.push("/admin/usertable");
  };

  const handlereportNavigation = () => {
    setActiveMenuItem("report");
    sessionStorage.setItem("activeMenuItem", "report");
    // router.push("/admin/usertable");
  };

  const handleHomeNavigation = () => {
    setActiveMenuItem("home");
    sessionStorage.setItem("activeMenuItem", "home");
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden text-white">
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
          onClick={handleHomeNavigation}
        >
          <Home size={20} />
        </button>

        {/* <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "analytics" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveMenuItem("analytics")}
        >
          <BarChart2 size={20} />
        </button> */}

        {/* <button
          className={`p-3 rounded-lg ${
            activeMenuItem === "test" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handleTestNavigation}
        >
          <FileText size={20} />
        </button> */}

        <button
          className={`p-3 rounded-lg my-2 ${
            activeMenuItem === "user" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handleUserNavigation}
        >
          <Users size={20} />
        </button>

        <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "questions" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handlequestionNavigation}
        >
          <FilePlus size={20} />
        </button>

        <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "creer" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handlecreerNavigation}
        >
          <FaUserGraduate size={20} />
          {/* <FilePlus size={20} /> */}
        </button>

        <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "category" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handlecategoryNavigation}
        >
          <BiCategory size={20} />
          {/* <FilePlus size={20} /> */}
        </button>

        <button
          className={`p-3 rounded-lg mb-2 ${
            activeMenuItem === "payment" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handlepaymentNavigation}
        >
          <RiMoneyRupeeCircleLine size={20} />
          {/* <FilePlus size={20} /> */}
        </button>

        <button
          className={`p-3 rounded-lg ${
            activeMenuItem === "report" ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={handlereportNavigation}
        >
          <TbReport size={20} />
        </button>
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
              <div className="w-14 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-sm font-bold">Admin</span>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-4 grid grid-cols-1 h-[85vh] rounded-lg overflow-y-hidden md:grid-cols-2 gap-4">
            {/* Understand Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-white text-lg">Students</h2>
                {/* <div className="text-xs text-gray-400">Time Entry Week</div> */}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-md p-3 text-center shadow-lg">
                  <div className="text-xl font-semibold">{count}</div>
                  <div className="text-xs">Total Students</div>
                </div>

                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-md p-3 text-center shadow-lg">
                  <div className="text-xl font-semibold">{subscribedCount}</div>
                  <div className="text-xs">Subscribed Students</div>
                </div>

                <div className="bg-gradient-to-br from-orange-300 to-orange-400 rounded-md p-3 text-center shadow-lg">
                  <div className="text-xl font-semibold">{count}</div>
                  <div className="text-xs">No of test taken</div>
                </div>
              </div>

              <div className="overflow-x-auto flex-1 min-h-0">
                <div className="h-[55vh] overflow-y-auto rounded custom-scrollbar">
                  <table className="min-w-full divide-y divide-gray-700/50">
                    <thead>
                      <tr className="text-xs text-gray-400 bg-gray-900/50">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Class</th>
                        <th className="px-4 py-2 text-left">Stream</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {studentData.map((student, index) => (
                        <tr
                          key={index}
                          className="text-sm hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-medium">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                              <span>{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2">{student.Email}</td>
                          <td className="px-4 py-2">{student.Phone}</td>
                          <td className="px-4 py-2">{student.Class}</td>
                          <td className="px-4 py-2">{student.Stream}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => {
                      if (prevPageUrl) {
                        fetchStudents(prevPageUrl);
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }
                    }}
                    disabled={!prevPageUrl}
                  >
                    Previous
                  </button>
                  <span className="text-gray-300">
                    Page {currentPage} of {Math.ceil(totalCount / 10)}
                  </span>
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => {
                      if (nextPageUrl) {
                        fetchStudents(nextPageUrl);
                        setCurrentPage((prev) => prev + 1);
                      }
                    }}
                    disabled={!nextPageUrl}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Report Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700/50 flex flex-col">
              <h2 className="font-medium text-white text-lg mb-4">
                Recent Login
              </h2>

              <div className="space-y-2 flex-1 min-h-0">
                <div className="h-[70vh] overflow-y-auto rounded custom-scrollbar px-2">
                  {studentData.map((student, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors my-2"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-medium">
                          {student.name}
                        </div>
                        <div className="flex items-center gap-1">
                          {/* <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                            {student.created_at}
                          </span> */}
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
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xs text-white">
                          {student.name.charAt(0)}
                        </div>
                        <span>{student.Phone}</span>
                      </div>
                    </div>
                  ))}
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

      {activeMenuItem === "user" && (
        <div className="w-full">
          <AdminUsersPage />
        </div>
      )}

      {activeMenuItem === "questions" && (
        <div className="w-full">
          <QuestionCard />
        </div>
      )}

      {activeMenuItem === "creer" && (
        <div className="w-full">
          <CareersPage />
        </div>
      )}

      {activeMenuItem === "category" && (
        <div className="w-full">
          <CategoryManagement />
        </div>
      )}

      {activeMenuItem === "payment" && (
        <div className="w-full">
          <PaymentManagement />
        </div>
      )}

      {activeMenuItem === "report" && (
        <div className="w-full">
          <ReportPage />
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) rgba(31, 41, 55, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
