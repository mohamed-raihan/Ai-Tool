"use client";

import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiUsers,
  FiBook,
  FiHeart,
  FiBriefcase,
  FiBarChart2,
  FiTarget,
  FiCpu,
  FiLayers,
  FiPieChart,
} from "react-icons/fi";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

export default function StudentProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await api.get(API_URL.STUDENT.BASIC);
      const studentId = localStorage.getItem("studentId");
      if (studentId) {
        const matchedUser = response.data.find(
          (user: any) => user.id === studentId
        );
        setUser(matchedUser);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-white text-xl">No user data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-100">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/3">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="bg-orange-500 p-4 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                  <FiUser className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-white/80">{user.email}</p>
              </div>
              <div className="p-4">
                {/* Basic Information */}
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" />
                      <span className="text-gray-300">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-gray-300">
                        {new Date(user.dob).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-gray-400" />
                      <span className="text-gray-300">{user.address}</span>
                    </div>
                  </div>
                </div>

                {/* Education Details */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FiBook className="text-gray-400" />
                      <span className="text-gray-300">{user.studying_in}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiTarget className="text-gray-400" />
                      <span className="text-gray-300">
                        {user.specification}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-gray-400" />
                      <span className="text-gray-300">{user.college}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3">
            {/* Personal Details Card */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100">
                  Personal Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Full Name</span>
                    <span className="text-gray-100">{user.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Email</span>
                    <span className="text-gray-100">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Phone</span>
                    <span className="text-gray-100">{user.phone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Date of Birth</span>
                    <span className="text-gray-100">
                      {new Date(user.dob).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Gender</span>
                    <span className="text-gray-100">{user.gender}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Address</span>
                    <span className="text-gray-100">{user.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Details */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100">
                  Educational Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Currently Studying
                    </span>
                    <span className="text-gray-100">{user.studying_in}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Specification</span>
                    <span className="text-gray-100">{user.specification}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">College</span>
                    <span className="text-gray-100">{user.college}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Course</span>
                    <span className="text-gray-100">{user.course}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Passing Year</span>
                    <span className="text-gray-100">{user.passing_year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">University</span>
                    <span className="text-gray-100">{user.university}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100">
                  Additional Information
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Hobbies</span>
                    <span className="text-gray-100">{user.hobbies}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Curricular Activities
                    </span>
                    <span className="text-gray-100">
                      {user.curicular_activities}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Achievements</span>
                    <span className="text-gray-100">{user.achievements}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Internship Projects
                    </span>
                    <span className="text-gray-100">
                      {user.internship_projects}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Languages Known
                    </span>
                    <span className="text-gray-100">
                      {user.languages_known}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
