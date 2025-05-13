"use client";

import React from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";
import { toast } from "react-toastify";

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

interface UsersTableProps {
  users: User[];
  getStudents: () => Promise<any>;
}

export default function UsersTable({ users, getStudents }: UsersTableProps) {
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
                {users.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="h-[70vh] overflow-auto">
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
                        className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider bg-gray-700/50"
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
                          <div className="flex space-x-2 justify-end">
                            <button
                              onClick={() => handleProfileClick(user.id)}
                              className="text-orange-500 hover:text-orange-400 bg-orange-500/10 px-4 py-2 rounded-lg transition-colors"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => handleResultsClick(user.id)}
                              className="text-blue-500 hover:text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg transition-colors"
                            >
                              View Results
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
                              Delete
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
        </div>
      </div>
    </div>
  );
}
