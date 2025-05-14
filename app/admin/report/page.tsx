"use client";

import React, { useEffect, useState } from "react";
import { FiDownload, FiSearch } from "react-icons/fi";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PsychometricReportPDF from "@/app/user/components/PsychometricReportPDF";
import { findMatchingCareers } from "@/app/utils/careerMapping";
import * as XLSX from "xlsx";
import { RiExportFill } from "react-icons/ri";

interface StudentReport {
  id: string;
  student_uuid: string;
  name: string;
  email: string;
  phone: string;
  class_name: string;
  stream_name: string;
  test_date: string;
  personality_type?: string;
  primary_trait?: string;
  career_recommendations?: Array<{
    name: string;
    matchingScore: number;
  }>;
  scores?: Array<{
    category: string;
    score: number;
    interpretation: string;
  }>;
}

interface getStudents {
  id: number;
  student_uuid: string;
  name: string;
  email: string;
  phone: string;
  class_name: { id: number; name: string };
  stream_name: { id: number; name: string };
}

export default function ReportPage() {
  const [students, setStudents] = useState<StudentReport[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentReport[]>([]);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Calculate pagination
  // useEffect(() => {
  //   fetchStudentReports();
  // }, []);

  const fetchStudentReports = async (url?: string) => {
    try {
      const response = await api.get(url || API_URL.STUDENT.BASIC);
      console.log("API Response:", response.data);

      // Update pagination state
      setPrevPageUrl(response.data.previous);
      setNextPageUrl(response.data.next);
      setTotalCount(response.data.count);

      const studentData = response.data.results;

      // Fetch test results for each student
      const reports = await Promise.all(
        studentData.map(async (student: getStudents) => {
          try {
            const resultResponse = await api.get(
              API_URL.RESULT.GET_RESULT(student.student_uuid)
            );
            const testResult = resultResponse.data[0];

            return {
              id: student.id,
              name: student.name,
              email: student.email,
              phone: student.phone,
              class_name: student.class_name.name,
              stream_name: student.stream_name.name,
              test_date: testResult?.aptitude_test?.completedAt || "",
              personality_type:
                testResult?.personality_test?.type || "Not Available",
              primary_trait:
                testResult?.aptitude_test?.scores?.sort(
                  (a: any, b: any) => b.score - a.score
                )[0]?.category || "Not Available",
              career_recommendations:
                findMatchingCareers(testResult?.aptitude_test?.scores) || [],
            };
          } catch (error) {
            console.error(
              `Error fetching results for student ${student.name}:`,
              error
            );
            return null;
          }
        })
      );

      const validReports = reports.filter((report) => report !== null);
      setStudents(validReports);
      setFilteredStudents(validReports);

      // Update current page based on the URL
      if (url) {
        const pageMatch = url.match(/page=(\d+)/);
        if (pageMatch) {
          setCurrentPage(parseInt(pageMatch[1]));
        }
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching student reports:", error);
    }
  };

  console.log(students);
  console.log(filteredStudents);

  const handleDateFilter = () => {
    let filtered = [...students];

    if (dateRange.start) {
      filtered = filtered.filter(
        (student) => new Date(student.test_date) >= new Date(dateRange.start)
      );
    }

    if (dateRange.end) {
      filtered = filtered.filter(
        (student) => new Date(student.test_date) <= new Date(dateRange.end)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.stream_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const exportToExcel = () => {
    // Prepare data for Excel
    const excelData = filteredStudents.map((student) => ({
      "Student Name": student.name,
      Email: student.email,
      Class: student.class_name,
      Stream: student.stream_name,
      "Test Date": new Date(student.test_date).toLocaleDateString(),
      "Personality Type": student.personality_type,
      "Primary Trait": student.primary_trait,
      "Career Recommendations": student.career_recommendations
        ?.map((career) => career.name)
        .join(", "),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 25 }, // Student Name
      { wch: 30 }, // Email
      { wch: 15 }, // Class
      { wch: 15 }, // Stream
      { wch: 15 }, // Test Date
      { wch: 20 }, // Personality Type
      { wch: 20 }, // Primary Trait
      { wch: 40 }, // Career Recommendations
    ];
    worksheet["!cols"] = columnWidths;

    // Add header styling
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4B5563" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Reports");

    // Generate Excel file
    XLSX.writeFile(workbook, "student_reports.xlsx");
  };

  useEffect(() => {
    handleDateFilter();
    fetchStudentReports();
  }, [dateRange, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mt-10 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Student Reports</h1>
          <div className="flex gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
              <input
                type="date"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              onClick={exportToExcel}
              className="inline-flex items-center p-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <RiExportFill className="size-7" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto h-[70vh] overflow-y-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
              <thead className="bg-gray-900 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Test Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Personality Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Primary Trait
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Career Recommendations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-gray-400">{student.email}</div>
                        <div className="text-gray-400">
                          {student.class_name} - {student.stream_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(student.test_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {student.personality_type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {student.primary_trait}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.career_recommendations?.map(
                          (career: { name: string }, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-orange-500 text-white rounded-full"
                            >
                              {career.name}
                            </span>
                          )
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <PDFDownloadLink
                        document={
                          <PsychometricReportPDF
                            userData={{
                              personalInfo: {
                                fullName: student.name,
                                testDate: new Date(
                                  student.test_date
                                ).toLocaleDateString(),
                                testId: student.id,
                              },
                              scores: student.scores || [],
                              personalityTraits: student.personality_type
                                ? {
                                    type: student.personality_type,
                                    description: "",
                                    traits: {
                                      EI: {
                                        primary: "",
                                        secondary: "",
                                        score: 0,
                                        color: "",
                                      },
                                      SN: {
                                        primary: "",
                                        secondary: "",
                                        score: 0,
                                        color: "",
                                      },
                                      TF: {
                                        primary: "",
                                        secondary: "",
                                        score: 0,
                                        color: "",
                                      },
                                      JP: {
                                        primary: "",
                                        secondary: "",
                                        score: 0,
                                        color: "",
                                      },
                                      AT: {
                                        primary: "",
                                        secondary: "",
                                        score: 0,
                                        color: "",
                                      },
                                    },
                                  }
                                : undefined,
                            }}
                          />
                        }
                        fileName={`${student.name}-report.pdf`}
                        className="inline-flex items-center px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                      >
                        {({ loading }) => (
                          <>
                            <FiDownload className="mr-2" />
                            {loading ? "Generating..." : "Download"}
                          </>
                        )}
                      </PDFDownloadLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => {
                  if (prevPageUrl) {
                    fetchStudentReports(prevPageUrl);
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
                    fetchStudentReports(nextPageUrl);
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
                        fetchStudentReports(prevPageUrl);
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
                        fetchStudentReports(pageUrl);
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
                        fetchStudentReports(nextPageUrl);
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
