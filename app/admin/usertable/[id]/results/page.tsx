"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FiDownload,
  FiBarChart2,
  FiBookOpen,
  FiArrowLeft,
} from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PsychometricReportPDF from "@/app/user/components/PsychometricReportPDF";
import { findMatchingCareers } from "@/app/utils/careerMapping";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

interface TestResult {
  aptitude_test: {
    completedAt: string;
    scores: Array<{
      category: string;
      score: number;
      percentile: number;
      interpretation: string;
    }>;
    overallScore: number;
    overallPercentile: number;
    overallInterpretation: string;
  };
  personality_test?: {
    type: string;
    description: string;
    traits: {
      EI: { score: number; interpretation: string };
      SN: { score: number; interpretation: string };
      TF: { score: number; interpretation: string };
      JP: { score: number; interpretation: string };
      AT: { score: number; interpretation: string };
    };
  };
}

interface Student {
  id: number;
  student_uuid: string;
  name: string;
  email: string;
  phone: string;
} 

export default function UserResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [user, setUser] = useState<Student | null>(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUserResults = async (student_uuid: string) => {
    try {
      const response = await api.get(
        `${API_URL.RESULT.GET_RESULT(student_uuid)}`
      );
      console.log(response.data);
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setResults(response.data);
      } else {
        toast.error("No test results found for this user");
      }
    } catch (error) {
      console.error("Error fetching user results:", error);
      toast.error("Failed to fetch test results");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get(API_URL.STUDENT.BASIC);
      const matchedUser = response.data.results.find(
        (user: Student) => user.id == Number(id)
      );
      setUser(matchedUser);
      if (matchedUser?.student_uuid) {
        fetchUserResults(matchedUser.student_uuid);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user details");
    }
  };

  const formatUserData = (results: TestResult[]) => {
    if (!results || results.length === 0) return null;
    const result = results[0];

    return {
      personalInfo: {
        fullName: user?.name || "Unknown User",
        testDate: new Date(
          result.aptitude_test.completedAt
        ).toLocaleDateString(),
        testId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      },
      aptitudeResults: {
        overallScore: `${result.aptitude_test.overallScore}%`,
        overallPercentile: result.aptitude_test.overallPercentile,
        personalityTraits: result.aptitude_test.scores.map(
          (score) =>
            `${score.category}: ${score.score}% (${score.interpretation})`
        ),
      },
      recommendedFields: result.aptitude_test.scores
        .filter((score) => score.score >= 70)
        .map((score) => ({
          field: score.category,
          matchScore: score.score,
          reason: score.interpretation,
        })),
      educationInterests: result.aptitude_test.scores.map((score) => ({
        course: score.category,
        interest: `${score.score}%`,
        notes: score.interpretation,
      })),
      familyBackground: {
        notes: "Family background information not available",
        educationalHistory: [],
      },
      achievements: result.aptitude_test.scores
        .filter((score) => score.score >= 80)
        .map(
          (score) => `Strong aptitude in ${score.category} (${score.score}%)`
        ),
      assessmentHistory: [
        {
          test: "Aptitude Test",
          date: new Date(result.aptitude_test.completedAt).toLocaleDateString(),
          score: `${result.aptitude_test.overallScore}%`,
        },
      ],
      scores: result.aptitude_test.scores,
      personalityTraits: result.personality_test
        ? {
            type: result.personality_test.type,
            description: result.personality_test.description,
            traits: {
              EI: {
                primary: "Introversion",
                secondary: "Extraversion",
                score: result.personality_test.traits.EI.score,
                color: "#10B981",
              },
              SN: {
                primary: "Sensing",
                secondary: "Intuition",
                score: result.personality_test.traits.SN.score,
                color: "#F59E0B",
              },
              TF: {
                primary: "Feeling",
                secondary: "Thinking",
                score: result.personality_test.traits.TF.score,
                color: "#3B82F6",
              },
              JP: {
                primary: "Perceiving",
                secondary: "Judging",
                score: result.personality_test.traits.JP.score,
                color: "#8B5CF6",
              },
              AT: {
                primary: "Turbulent",
                secondary: "Assertive",
                score: result.personality_test.traits.AT.score,
                color: "#EC4899",
              },
            },
          }
        : undefined,
    };
  };

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-400 mb-4">
            This user has not completed any tests yet.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const userData = formatUserData(results);
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-orange-500 hover:text-orange-400"
          >
            <FiArrowLeft className="mr-2" />
            Back to User Profile
          </button>
          <PDFDownloadLink
            document={<PsychometricReportPDF userData={userData} />}
            fileName={`${user?.name || "user"}-psychometric-report.pdf`}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            {({ loading }) => (
              <>
                <FiDownload className="mr-2" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </>
            )}
          </PDFDownloadLink>
        </div>

        {/* Results Content */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">
            Psychometric Assessment Report
          </h1>

          {/* Header Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">
                Student: {user?.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p>
                  Date:{" "}
                  {new Date(
                    results[0].aptitude_test.completedAt
                  ).toLocaleDateString()}
                </p>
                <p>
                  Test ID:{" "}
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p>
                  Overall Score:{" "}
                  <span className="font-bold">
                    {results[0].aptitude_test.overallScore}%
                  </span>
                </p>
                <p>
                  Percentile:{" "}
                  <span className="font-bold">
                    {results[0].aptitude_test.overallPercentile}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Score Summary */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <FiBarChart2 className="mr-2 text-orange-500" /> Interest Analysis
            </h2>
            <div className="space-y-6">
              {[
                { name: "Realistic", color: "coral" },
                { name: "Investigative", color: "coral" },
                { name: "Artistic", color: "coral" },
                { name: "Social", color: "lime" },
                { name: "Enterprising", color: "lime" },
                { name: "Conventional", color: "coral" },
              ].map((category, index) => {
                const score =
                  results[0].aptitude_test.scores.find(
                    (s) => s.category === category.name
                  )?.score || 0;
                return (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-50 w-24">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-200">
                        {score}%
                      </span>
                    </div>
                    <div className="relative">
                      {/* Score ranges background */}
                      <div className="h-3 w-full flex rounded-full overflow-hidden">
                        <div className="w-1/3 bg-red-200 border-r border-white"></div>
                        <div className="w-1/3 bg-yellow-200 border-r border-white"></div>
                        <div className="w-1/3 bg-green-200"></div>
                      </div>
                      {/* Score bar */}
                      <div
                        className="absolute top-0 left-0 h-3 transition-all duration-500 rounded-full"
                        style={{
                          width: `${score}%`,
                          backgroundColor:
                            score <= 33
                              ? "#EF4444"
                              : score <= 66
                              ? "#F59E0B"
                              : "#10B981",
                        }}
                      ></div>
                      {/* Score marker */}
                      <div
                        className="absolute top-0 -mt-1"
                        style={{
                          left: `${score}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <div className="w-1 h-4 bg-gray-800"></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Score range labels */}
              <div className="flex justify-between text-xs mt-4">
                <div className="text-center">
                  <div className="text-red-600 font-medium">Low</div>
                  <div className="text-gray-500">(Score 1-3)</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-600 font-medium">Moderate</div>
                  <div className="text-gray-500">(Score 4-7)</div>
                </div>
                <div className="text-center">
                  <div className="text-green-600 font-medium">High</div>
                  <div className="text-gray-500">(Score 8-10)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Traits Section */}
          {results[0].personality_test && (
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
                <FiBookOpen className="mr-2 text-orange-500" /> Personality
                Traits
              </h2>

              {/* Personality Type and Description */}
              <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 px-2 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {results[0].personality_test.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      Personality Type: {results[0].personality_test.type}
                    </h3>
                    <p className="text-gray-300">
                      {results[0].personality_test.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personality Dimensions */}
              <div className="space-y-6">
                {Object.entries(results[0].personality_test.traits).map(
                  ([dimension, trait]) => (
                    <div key={dimension} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">
                          {dimension === "EI"
                            ? "Introversion"
                            : dimension === "SN"
                            ? "Sensing"
                            : dimension === "TF"
                            ? "Feeling"
                            : dimension === "JP"
                            ? "Perceiving"
                            : "Turbulent"}
                        </span>
                        <span className="text-gray-400 font-medium">
                          {dimension === "EI"
                            ? "Extraversion"
                            : dimension === "SN"
                            ? "Intuition"
                            : dimension === "TF"
                            ? "Thinking"
                            : dimension === "JP"
                            ? "Judging"
                            : "Assertive"}
                        </span>
                      </div>

                      {/* Score Bar */}
                      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${trait.score}%`,
                            backgroundColor:
                              dimension === "EI"
                                ? "#10B981"
                                : dimension === "SN"
                                ? "#F59E0B"
                                : dimension === "TF"
                                ? "#3B82F6"
                                : dimension === "JP"
                                ? "#8B5CF6"
                                : "#EC4899",
                          }}
                        />
                        <div
                          className="absolute top-0 h-full w-0.5 bg-white"
                          style={{ left: `${trait.score}%` }}
                        />
                      </div>

                      {/* Score Label */}
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-400">0%</span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            color:
                              dimension === "EI"
                                ? "#10B981"
                                : dimension === "SN"
                                ? "#F59E0B"
                                : dimension === "TF"
                                ? "#3B82F6"
                                : dimension === "JP"
                                ? "#8B5CF6"
                                : "#EC4899",
                          }}
                        >
                          {trait.score}%
                        </span>
                        <span className="text-sm text-gray-400">100%</span>
                      </div>

                      {/* Trait Description */}
                      <p className="mt-2 text-sm text-gray-400">
                        {trait.interpretation}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Career Recommendations */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-orange-500">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">
              Career Recommendations
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Career Path
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Required Education
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {findMatchingCareers(results[0].aptitude_test.scores).map(
                    (career, index) => (
                      <tr key={index} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-100">
                            {career.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-400">
                            {career.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <ul className="list-disc list-inside text-sm text-gray-400">
                            {career.education_pathway.map((edu, eduIndex) => (
                              <li key={eduIndex}>{edu}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall Interpretation */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <FiBookOpen className="mr-2 text-orange-500" /> Summary
            </h2>
            <div className="space-y-4">
              {results[0].aptitude_test.scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 2)
                .map((trait, index) => {
                  const strengthWords =
                    index === 0
                      ? "strongest characteristic"
                      : "second strongest characteristic";
                  return (
                    <p key={index} className="text-gray-300">
                      {user?.name}&apos;s {strengthWords} is in the {trait.category}{" "}
                      domain, with a score of {trait.score}%. This indicates{" "}
                      {trait.interpretation}.
                    </p>
                  );
                })}

              <p className="text-gray-300 mt-4">
                Based on the interest profile, {user?.name} would excel in
                careers that combine{" "}
                {results[0].aptitude_test.scores
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 2)
                  .map((trait) => trait.category.toLowerCase())
                  .join(" and ")}{" "}
                qualities. The recommended career paths align with natural
                inclinations and strengths, suggesting roles where they can{" "}
                {findMatchingCareers(results[0].aptitude_test.scores)
                  .slice(0, 1)
                  .map((career) => career.description.toLowerCase())
                  .join(", ")}
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
