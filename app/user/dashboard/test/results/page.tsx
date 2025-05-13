"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  FiDownload,
  FiBarChart2,
  FiAward,
  FiBookOpen,
  FiBook,
} from "react-icons/fi";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PsychometricReportPDF from "@/app/user/components/PsychometricReportPDF";
import { findMatchingCareers } from "@/app/utils/careerMapping";
import {
  PersonalityService,
  PersonalityTraitResult,
} from "@/app/services/personality.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

interface TestResult {
  testName: string;
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
  personalityTraits?: PersonalityTraitResult;
}

const ResultsPage = () => {
  const [results, setResults] = useState<TestResult | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const router = useRouter();

  console.log(results?.scores);
  const matchingCareers = findMatchingCareers(results?.scores || []);
  console.log(matchingCareers);

  useEffect(() => {
    try {
      // Get aptitude results
      const storedAptitudeResults = localStorage.getItem("aptitudeResults");
      const storedPersonalityResults =
        localStorage.getItem("personalityResults");

      if (!storedAptitudeResults || !storedPersonalityResults) {
        toast.error("Test results not found");
        return;
      }

      const aptitudeResults = JSON.parse(storedAptitudeResults);
      const personalityResults = JSON.parse(storedPersonalityResults);

      console.log("Loaded Personality Results:", personalityResults); // Debug log

      if (!aptitudeResults || !personalityResults) {
        toast.error("Invalid test results format");
        return;
      }

      // Check if all scores are 0 (all answers were "No")
      const allScoresZero = aptitudeResults.scores.every(
        (score: { score: number }) => score.score === 0
      );
      if (allScoresZero) {
        setResults(null);
        return;
      }

      setResults({
        ...aptitudeResults,
        personalityTraits: personalityResults,
      });
    } catch (error) {
      console.error("Error loading test results:", error);
      toast.error("Failed to load test results");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasSubscription(sessionStorage.getItem("hasSubscription") === "true");
    }

    const student = JSON.parse(sessionStorage.getItem("student") || "{}");
    console.log(student);

    const aptitudeResults = JSON.parse(
      localStorage.getItem("aptitudeResults") || "{}"
    );
    const personalityResults = JSON.parse(
      localStorage.getItem("personalityResults") || "{}"
    );

    console.log(aptitudeResults);
    console.log(personalityResults);

    const saveResults = async () => {
      try {
        const response = await api.post(API_URL.RESULT.POST_RESULT, {
          student_uuid: student.student_uuid,
          aptitude_test: aptitudeResults,
          personality_test: personalityResults,
          summary: "results",
        });
        console.log(response);
      } catch (error) {
        console.error("Error saving results:", error);
      }
    };

    saveResults();
  }, []);

  console.log(results);

  const formatUserData = (results: TestResult) => {
    return {
      personalInfo: {
        fullName: "Test User", // You can replace this with actual user data
        testDate: new Date(results.completedAt).toLocaleDateString(),
        testId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      },
      aptitudeResults: {
        overallScore: `${results.overallScore}%`,
        overallPercentile: results.overallPercentile,
        personalityTraits: results.scores.map(
          (score) =>
            `${score.category}: ${score.score}% (${score.interpretation})`
        ),
      },
      recommendedFields: results.scores
        .filter((score) => score.score >= 70)
        .map((score) => ({
          field: score.category,
          matchScore: score.score,
          reason: score.interpretation,
        })),
      educationInterests: results.scores.map((score) => ({
        course: score.category,
        interest: `${score.score}%`,
        notes: score.interpretation,
      })),
      familyBackground: {
        notes: "Family background information not available",
        educationalHistory: [],
      },
      achievements: results.scores
        .filter((score) => score.score >= 80)
        .map(
          (score) => `Strong aptitude in ${score.category} (${score.score}%)`
        ),
      assessmentHistory: [
        {
          test: results.testName,
          date: new Date(results.completedAt).toLocaleDateString(),
          score: `${results.overallScore}%`,
        },
      ],
      scores: results.scores,
      personalityTraits: results.personalityTraits
        ? {
            type: results.personalityTraits.type,
            description: results.personalityTraits.description,
            traits: {
              EI: {
                primary: results.personalityTraits.traits.EI.primary,
                secondary: results.personalityTraits.traits.EI.secondary,
                score: results.personalityTraits.traits.EI.score,
                color: results.personalityTraits.traits.EI.color,
              },
              SN: {
                primary: results.personalityTraits.traits.SN.primary,
                secondary: results.personalityTraits.traits.SN.secondary,
                score: results.personalityTraits.traits.SN.score,
                color: results.personalityTraits.traits.SN.color,
              },
              TF: {
                primary: results.personalityTraits.traits.TF.primary,
                secondary: results.personalityTraits.traits.TF.secondary,
                score: results.personalityTraits.traits.TF.score,
                color: results.personalityTraits.traits.TF.color,
              },
              JP: {
                primary: results.personalityTraits.traits.JP.primary,
                secondary: results.personalityTraits.traits.JP.secondary,
                score: results.personalityTraits.traits.JP.score,
                color: results.personalityTraits.traits.JP.color,
              },
              AT: {
                primary: results.personalityTraits.traits.AT.primary,
                secondary: results.personalityTraits.traits.AT.secondary,
                score: results.personalityTraits.traits.AT.score,
                color: results.personalityTraits.traits.AT.color,
              },
            },
          }
        : undefined,
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-sky-600";
    return "text-amber-600";
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-sky-500";
    return "bg-amber-500";
  };

  const getRecommendedFields = (
    scores: Array<{ category: string; score: number }>
  ) => {
    const recommendations = [
      {
        categories: ["Analytical", "Logical"],
        field: "Computer Science",
        description: "Strong analytical thinking and problem-solving abilities",
      },
      {
        categories: ["Creative", "Artistic"],
        field: "Design",
        description: "Excellence in creative and artistic expression",
      },
      {
        categories: ["Social", "Communication"],
        field: "Psychology",
        description: "Strong interpersonal and communication skills",
      },
      // Add more field recommendations based on category combinations
    ];

    return recommendations.filter((rec) =>
      rec.categories.some((cat) =>
        scores.some(
          (score) => score.category.includes(cat) && score.score >= 70
        )
      )
    );
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-400 mb-4">
            All questions were answered as "No". Please retake the test and
            provide more varied responses for accurate results.
          </p>
          <Link
            href="/user/dashboard/test"
            className="inline-block px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Retake Test
          </Link>
        </div>
      </div>
    );
  }

  const userData = formatUserData(results);
  console.log(userData);
  const recommendedFields = getRecommendedFields(results.scores);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PDF Download Button */}
        <div className="mb-6 flex justify-end">
          <PDFDownloadLink
            document={<PsychometricReportPDF userData={userData} />}
            fileName="psychometric-report.pdf"
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

        {/* PDF Preview */}
        {showPDF && (
          <div className="h-[600px] mb-6">
            <PDFViewer className="w-full h-full">
              <PsychometricReportPDF userData={userData} />
            </PDFViewer>
          </div>
        )}

        {/* Results Content */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">
            Psychometric Assessment Report
          </h1>

          {/* Header Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">
                Psychometric Assessment Report
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p>
                  Date: {new Date(results.completedAt).toLocaleDateString()}
                </p>
                <p>
                  Test ID:{" "}
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p>
                  Overall Score:{" "}
                  <span className="font-bold">{results.overallScore}%</span>
                </p>
                <p>
                  Percentile:{" "}
                  <span className="font-bold">{results.overallPercentile}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Score Summary */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <FiBarChart2 className="mr-2 text-orange-500" /> Your Interest
              Analysis
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
                  results.scores.find((s) => s.category === category.name)
                    ?.score || 0;
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

          {/* Interest Description Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <div className="space-y-8">
              {/* Primary Interest */}
              {results.scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 2)
                .map((trait, index) => {
                  const traitDescriptions: {
                    [key: string]: { title: string; description: string };
                  } = {
                    Realistic: {
                      title: "The 'Doer'",
                      description:
                        "This means you enjoy working with your hands and solving practical problems.",
                    },
                    Investigative: {
                      title: "The 'Thinker'",
                      description:
                        "This means you enjoy analyzing problems and discovering new solutions.",
                    },
                    Artistic: {
                      title: "The 'Creator'",
                      description:
                        "This means you enjoy expressing yourself creatively and thinking outside the box.",
                    },
                    Social: {
                      title: "The 'Helper'",
                      description:
                        "This means that you enjoy helping, teaching or guiding others.",
                    },
                    Enterprising: {
                      title: "The 'Persuader'",
                      description:
                        "This means you like leading, encouraging and influencing others.",
                    },
                    Conventional: {
                      title: "The 'Organizer'",
                      description:
                        "This means you enjoy working with data, numbers and detailed information.",
                    },
                  };

                  const traitInfo = traitDescriptions[trait.category] || {
                    title: "",
                    description: "Description not available.",
                  };

                  return (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-full border-4 ${
                            index === 0
                              ? "border-orange-400"
                              : "border-orange-300"
                          } flex items-center justify-center bg-gray-900`}
                        >
                          <span
                            className={`text-2xl font-bold ${
                              index === 0
                                ? "text-orange-400"
                                : "text-orange-300"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-100 font-medium mb-2">
                          {index === 0
                            ? "Your Primary Interest"
                            : "Your Secondary Interest"}{" "}
                          -{" "}
                          <span
                            className={
                              index === 0
                                ? "text-orange-400"
                                : "text-orange-300"
                            }
                          >
                            {trait.category} - {traitInfo.title}
                          </span>
                        </h3>
                        <p className="text-gray-400">{traitInfo.description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Personality Traits Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <FiBookOpen className="mr-2 text-orange-500" /> Personality Traits
            </h2>

            {/* Personality Type and Description */}
            {results?.personalityTraits && (
              <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 px-2 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {results.personalityTraits.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      Your Personality Type: {results.personalityTraits.type}
                    </h3>
                    <p className="text-gray-300">
                      {results.personalityTraits.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Personality Dimensions */}
            <div className="space-y-6">
              {results?.personalityTraits?.traits &&
                Object.entries(results.personalityTraits.traits).map(
                  ([dimension, trait]) => {
                    console.log("Rendering trait:", dimension, trait); // Debug log
                    return (
                      <div key={dimension} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">
                            {trait.secondary}
                          </span>
                          <span className="text-gray-400 font-medium">
                            {trait.primary}
                          </span>
                        </div>

                        {/* Score Bar */}
                        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${trait.score}%`,
                              backgroundColor: trait.color,
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
                            style={{ color: trait.color }}
                          >
                            {trait.score}%
                          </span>
                          <span className="text-sm text-gray-400">100%</span>
                        </div>

                        {/* Trait Description */}
                        <p className="mt-2 text-sm text-gray-400">
                          {trait.score >= 50
                            ? `You show strong ${trait.primary.toLowerCase()} tendencies`
                            : `You show strong ${trait.secondary.toLowerCase()} tendencies`}
                        </p>
                      </div>
                    );
                  }
                )}
            </div>
          </div>

          {/* Career Recommendations Table */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300">
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
                {!hasSubscription ? (
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {findMatchingCareers(results.scores).map(
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
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="py-8">
                        <div className="bg-gray-900 rounded-lg shadow-md p-8 border-t-4 border-orange-500 flex flex-col items-center max-w-md mx-auto">
                          <div className="-mt-12 mb-2 flex justify-center w-full">
                            <div className="bg-orange-500 rounded-full p-2 border-4 border-gray-900 shadow-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2 text-center">
                            Unlock now
                          </h3>
                          <p className="text-gray-300 mb-6 text-center">
                            Get the full report to discover your personalized
                            career recommendations.
                          </p>
                          <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
                            onClick={() => setShowSubscriptionModal(true)}
                          >
                            Get access now
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>

          {/* Overall Interpretation */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <FiBookOpen className="mr-2 text-orange-500" /> Summary
            </h2>
            {!hasSubscription ? (
              <div className="space-y-4">
                {results.scores
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 2)
                  .map((trait, index) => {
                    const strengthWords =
                      index === 0
                        ? "strongest characteristic"
                        : "second strongest characteristic";
                    return (
                      <p key={index} className="text-gray-300">
                        Your {strengthWords} is in the {trait.category} domain,
                        with a score of {trait.score}%. This indicates{" "}
                        {trait.interpretation}.
                      </p>
                    );
                  })}

                <p className="text-gray-300 mt-4">
                  Based on your interest profile, you would excel in careers
                  that combine{" "}
                  {results.scores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 2)
                    .map((trait) => trait.category.toLowerCase())
                    .join(" and ")}{" "}
                  qualities. The recommended career paths align with your
                  natural inclinations and strengths, suggesting roles where you
                  can{" "}
                  {findMatchingCareers(results.scores)
                    .slice(0, 1)
                    .map((career) => career.description.toLowerCase())
                    .join(", ")}
                  .
                </p>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg shadow-md p-8 border-t-4 border-orange-500 flex flex-col items-center max-w-md mx-auto">
                <div className="-mt-12 mb-2 flex justify-center w-full">
                  <div className="bg-orange-500 rounded-full p-2 border-4 border-gray-900 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 text-center">
                  Unlock now
                </h3>
                <p className="text-gray-300 mb-6 text-center">
                  Get the full report to discover more hidden strengths and
                  insights.
                </p>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
                  onClick={() => setShowSubscriptionModal(true)}
                >
                  Get access now
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            {hasSubscription ? (
              <Link
                href="/user/dashboard/test"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Retake Test
              </Link>
            ) : (
              <button
                className="px-6 py-2 bg-gray-700 text-white rounded-md opacity-60 cursor-not-allowed"
                disabled
                title="Unlock premium to retake the test"
              >
                Retake Test
              </button>
            )}
            <Link
              href="/user/dashboard"
              className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row p-8 relative border border-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="absolute top-4 right-4 text-orange-400 hover:text-orange-200 bg-gray-800 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center md:mr-8 mb-8 md:mb-0">
              {/* Replace src with your own illustration if available */}
              {/* <img
                src="/subscription-illustration.png"
                alt="Unlock"
                className="w-56 h-56 object-contain rounded-xl bg-gray-800 p-4"
              /> */}
              <Image
                src="/prepMascot.png"
                alt="Unlock"
                className="object-contain rounded-xl"
                width={300}
                height={300}
              />
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1 rounded-full mb-3 w-max">
                UNLOCK NOW
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">
                Your story isn't complete yet
              </h2>
              <p className="text-gray-300 mb-4 text-lg">
                Dive deeper into your unique traits like perfectionism,
                resilience, and emotional intelligence. Unlock the premium
                report to discover these hidden facets of your personality,
                along with personalized insights for personal growth.
              </p>
              <div className="text-2xl font-bold text-orange-400 mb-6">
                
              </div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors flex items-center justify-center mb-4"
                onClick={() => router.push("/payment")}
              >
                Unlock full results
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              {/* <div className="text-gray-400 text-sm text-center">
                30-day money-back guarantee if you are not satisfied.
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
