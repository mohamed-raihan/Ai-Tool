"use client";

import React from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";

interface User {
  id: string;
  student_uuid: string;
  firebase_user_id: string;
  name: string;
  email: string;
  phone: string;
  class_name: { name: string };
  stream_name: { name: string };
  role: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class_name: { id: number; name: string };
  stream_name: { id: number; name: string };
}

interface StudentResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
}

interface UsersTableProps {
  users: User[];
  getStudents: (url?: string) => Promise<StudentResponse>;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function UsersTable({
  users,
  getStudents,
  nextPageUrl,
  prevPageUrl,
  totalCount,
  currentPage,
  setCurrentPage,
}: UsersTableProps) {
  const router = useRouter();

  console.log(users);

  const handleProfileClick = (userId: string) => {
    router.push(`/admin/usertable/${userId}`);
  };

  const handleResultsClick = (userId: string) => {
    router.push(`/admin/usertable/${userId}/results`);
  };

  const handleDelete = async (
    student_uuid: string,
    firebase_user_id: string
  ) => {
    try {
      // Try to delete Firebase user but don't throw error if it fails
      try {
        await api.delete(
          API_URL.FIREBASE.DELETE_PHONE_NUMBER(firebase_user_id)
        );
      } catch (firebaseError) {
        console.log("Firebase deletion failed:", firebaseError);
      }

      // Continue with student deletion
      const response = await api.delete(
        API_URL.STUDENT.DELETE_BASIC(student_uuid)
      );
      console.log(response);
      getStudents();
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("User deletion failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Users Management</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 rounded-lg px-3 py-2 flex items-center">
              <span className="text-gray-400 mr-2">Total Users:</span>
              <span className="text-orange-500 font-semibold">
                {totalCount}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="h-[70vh] overflow-auto custom-scrollbar">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50 sticky top-0 z-10">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Stream
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-gray-800 overflow-y-auto">
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-gray-700/50 transition-colors ${
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-800/50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-200">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {user.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          >
                            {user.class_name?.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                          >
                            {user.stream_name?.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={() => handleProfileClick(user.id)}
                              className="text-orange-500 hover:text-orange-400 bg-orange-500/10 px-4 py-2 rounded-lg transition-colors"
                            >
                              <PiStudentBold size={20} />
                            </button>
                            <button
                              onClick={() => handleResultsClick(user.id)}
                              className="text-blue-500 hover:text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg transition-colors"
                            >
                              <BiSolidReport size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(
                                  user.student_uuid,
                                  user.firebase_user_id
                                )
                              }
                              className="text-red-500 hover:text-red-400 bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
                            >
                              <FaRegTrashAlt size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => {
                  if (prevPageUrl) {
                    getStudents(prevPageUrl);
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={!prevPageUrl}
                className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (nextPageUrl) {
                    getStudents(nextPageUrl);
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={!nextPageUrl}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * 10 + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, totalCount)}
                  </span>{" "}
                  of <span className="font-medium">{totalCount}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => {
                      if (prevPageUrl) {
                        getStudents(prevPageUrl);
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    disabled={!prevPageUrl}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(Math.ceil(totalCount / 10))].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => {
                        const pageUrl = `${API_URL.STUDENT.BASIC}?page=${
                          index + 1
                        }`;
                        getStudents(pageUrl);
                        setCurrentPage(index + 1);
                      }}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium ${
                        currentPage === index + 1
                          ? "z-10 bg-orange-500 border-orange-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      if (nextPageUrl) {
                        getStudents(nextPageUrl);
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    disabled={!nextPageUrl}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
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
}
