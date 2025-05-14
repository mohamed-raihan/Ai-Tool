"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

// Extend jsPDF with autotable plugin
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
    lastAutoTable?: {
      finalY: number;
    };
  }
}

interface Student {
  id: number;
  student_uuid: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
}

export default function StudentProfilePage() {
  const { id } = useParams();
  console.log(id)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [user, setUser] = useState<Student>();

  // Mock user data - in a real app, you'd fetch this using the id
  const userData = {
    id: id as string,
    personalInfo: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      dob: user?.dob,
      gender: user?.gender,
    },
    aptitudeResults: {
      analyticalThinking: 87,
      verbalReasoning: 92,
      spatialAwareness: 76,
      numericalAbility: 85,
      abstractReasoning: 79,
      personalityTraits: [
        "Analytical",
        "Inquisitive",
        "Detail-oriented",
        "Persistent",
      ],
    },
    recommendedFields: [
      {
        field: "Computer Science",
        matchScore: 95,
        reason: "Strong analytical thinking and problem-solving abilities",
      },
      {
        field: "Data Science",
        matchScore: 92,
        reason: "Excellent numerical ability combined with analytical skills",
      },
      {
        field: "Engineering",
        matchScore: 88,
        reason: "Good spatial awareness and mathematical aptitude",
      },
      {
        field: "Research",
        matchScore: 85,
        reason: "Strong analytical skills and persistence in problem-solving",
      },
      {
        field: "Technical Writing",
        matchScore: 80,
        reason: "Above-average verbal skills with technical understanding",
      },
    ],
    educationInterests: [
      {
        course: "Advanced Programming",
        interest: "High",
        notes: "Has completed several coding bootcamps",
      },
      {
        course: "Calculus",
        interest: "Medium",
        notes: "Currently taking AP Calculus",
      },
      {
        course: "Physics",
        interest: "High",
        notes: "Science fair winner in Physics category",
      },
      {
        course: "Data Analysis",
        interest: "High",
        notes: "Self-studying through online courses",
      },
      {
        course: "Engineering Design",
        interest: "Medium",
        notes: "Participated in robotics club",
      },
    ],
    familyBackground: {
      academicEnvironment: "Supportive",
      educationalHistory: [
        {
          relation: "Father",
          name: "Robert Valdez",
          education: "MS in Electrical Engineering",
          profession: "Systems Engineer",
        },
        {
          relation: "Mother",
          name: "Maria Valdez",
          education: "BA in Education",
          profession: "High School Teacher",
        },
        {
          relation: "Brother",
          name: "David Valdez",
          education: "BS in Computer Science",
          profession: "Software Developer",
        },
        {
          relation: "Sister",
          name: "Anna Valdez",
          education: "BFA in Design",
          profession: "UI/UX Designer",
        },
      ],
      notes:
        "Family has strong technical and educational background. Parents actively involved in academic guidance.",
    },
    achievements: [
      "National Merit Scholar Semifinalist",
      "First Place in Regional Science Competition",
      "Advanced Placement Scholar with Distinction",
      "President of School Coding Club",
    ],
    assessmentHistory: [
      {
        test: "Cognitive Aptitude Assessment",
        date: "2023-10-15",
        score: "92nd percentile",
      },
      {
        test: "Career Interest Inventory",
        date: "2023-09-20",
        primaryInterests: "STEM, Technology",
      },
      {
        test: "Learning Style Assessment",
        date: "2023-08-05",
        style: "Visual-Logical",
      },
      {
        test: "Emotional Intelligence Assessment",
        date: "2023-07-12",
        score: "Above Average",
      },
    ],
  };

  // Helper function to render progress bars with labels
  // const renderProgressBar = (value: number, label: string) => (
  //   <div className="mb-3">
  //     <div className="flex justify-between mb-1">
  //       <span className="text-sm font-medium text-gray-700">{label}</span>
  //       <span className="text-sm font-medium text-gray-700">{value}%</span>
  //     </div>
  //     <div className="w-full bg-gray-200 rounded-full h-2.5">
  //       <div
  //         className="h-2.5 rounded-full"
  //         style={{
  //           width: `${value}%`,
  //           backgroundColor:
  //             value > 90
  //               ? "#10B981"
  //               : value > 75
  //               ? "#3B82F6"
  //               : value > 60
  //               ? "#F59E0B"
  //               : "#EF4444",
  //         }}
  //       ></div>
  //     </div>
  //   </div>
  // );

  // Function to generate and download PDF
  const generatePDF = () => {
    setIsGeneratingPdf(true);

    // Create a new PDF document
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;

    // Add header with logo placeholder
    doc.setFillColor(66, 133, 244); // Blue header
    doc.rect(0, 0, pageWidth, 80, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Student Aptitude Profile", margin, 50);

    // Student name and basic info
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(userData.personalInfo.name || 'N/A', margin, 75);

    // Personal Information Section
    let yPosition = 110;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Information", margin, yPosition);
    yPosition += 25;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const personalInfoTable = [
      ["Full Name:", userData.personalInfo.name || 'N/A'],
      ["Email:", userData.personalInfo.email || 'N/A'],
      ["Phone:", userData.personalInfo.phone || 'N/A'],
      ["Date of Birth:", userData.personalInfo.dob ? new Date(userData.personalInfo.dob).toLocaleDateString() : 'N/A'],
      ["Gender:", userData.personalInfo.gender || 'N/A'],
      ["Address:", userData.personalInfo.address || 'N/A'],
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: personalInfoTable,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 120 },
        1: { cellWidth: "auto" },
      },
      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Aptitude Results Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Aptitude Assessment Results", margin, yPosition);
    yPosition += 25;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Create table data for aptitude results
    const aptitudeData = [
      [
        "Analytical Thinking:",
        `${userData.aptitudeResults.analyticalThinking}%`,
      ],
      ["Verbal Reasoning:", `${userData.aptitudeResults.verbalReasoning}%`],
      ["Spatial Awareness:", `${userData.aptitudeResults.spatialAwareness}%`],
      ["Numerical Ability:", `${userData.aptitudeResults.numericalAbility}%`],
      ["Abstract Reasoning:", `${userData.aptitudeResults.abstractReasoning}%`],
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: aptitudeData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 120 },
        1: { cellWidth: "auto" },
      },

      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Personality Traits
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Personality Traits:", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      userData.aptitudeResults.personalityTraits.join(", "),
      margin,
      yPosition
    );
    yPosition += 25;

    // Career Recommendations Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Career Fields", margin, yPosition);
    yPosition += 25;

    // Create table data for career recommendations
    const careerData = userData.recommendedFields.map((field) => [
      field.field,
      `${field.matchScore}%`,
      field.reason,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Field", "Match Score", "Reason"]],
      body: careerData,
      theme: "striped",
      headStyles: {
        fillColor: [66, 133, 244],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { fontStyle: "bold" },
      },
      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Add a new page if we're running out of space
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = 40;
    }

    // Educational Interests Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Educational Interests & Aptitude", margin, yPosition);
    yPosition += 25;

    // Create table data for educational interests
    const educationData = userData.educationInterests.map((course) => [
      course.course,
      course.interest,
      course.notes,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Course", "Interest Level", "Notes"]],
      body: educationData,
      theme: "striped",
      headStyles: {
        fillColor: [66, 133, 244],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Add a new page for achievements and assessment history
    doc.addPage();
    yPosition = 40;

    // Academic Achievements Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Academic Achievements", margin, yPosition);
    yPosition += 25;

    // Create bullet points for achievements
    const achievementData = userData.achievements.map((achievement) => [
      "•",
      achievement,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: achievementData,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: "auto" },
      },
      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Family Background Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Family Educational Background", margin, yPosition);
    yPosition += 25;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Academic Environment: ${userData.familyBackground.academicEnvironment}`,
      margin,
      yPosition
    );
    yPosition += 20;

    doc.text("Notes:", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    doc.text(userData.familyBackground.notes, margin, yPosition, {
      maxWidth: pageWidth - 2 * margin,
    });
    yPosition += 30;

    // Create table data for family background
    const familyData = userData.familyBackground.educationalHistory.map(
      (member) => [
        `${member.relation}: ${member.name}`,
        member.education,
        member.profession,
      ]
    );

    autoTable(doc, {
      startY: yPosition,
      head: [["Family Member", "Education", "Profession"]],
      body: familyData,
      theme: "striped",
      headStyles: {
        fillColor: [66, 133, 244],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: margin, right: margin },
    });

    yPosition = doc.lastAutoTable?.finalY || yPosition + 20;
    yPosition += 20;

    // Assessment History Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Assessment History", margin, yPosition);
    yPosition += 25;

    // Create table data for assessment history
    const assessmentData = userData.assessmentHistory.map((assessment) => [
      assessment.test || "N/A",
      new Date(assessment.date).toLocaleDateString(),
      assessment.score ??
        assessment.primaryInterests ??
        assessment.style ??
        "N/A",
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Assessment Type", "Date", "Results"]],
      body: assessmentData,
      theme: "striped",
      headStyles: {
        fillColor: [66, 133, 244],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: margin, right: margin },
    });

    // Footer with page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${totalPages} - Generated on ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        pageHeight - 20,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save(
      `${(userData.personalInfo.name || 'Student').replace(
        /\s+/g,
        "_"
      )}_Aptitude_Profile.pdf`
    );
    setIsGeneratingPdf(false);
  };

  const getUser = async ()=>{
    try{
      const response = await api.get(API_URL.STUDENT.BASIC)
      console.log(response.data.results)
      const matchedUser = response.data.results.find((user:Student)=>user.id === Number(id))
      console.log(matchedUser)
      setUser(matchedUser)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">
              Student Profile
            </h1>
          </div>

          {/* PDF Download Button */}
          <button
            onClick={generatePDF}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors shadow-md disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FiDownload className="w-4 h-4" />
                <span>Download PDF Report</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/3">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="bg-orange-500 p-4 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Student"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {userData.personalInfo.name}
                </h2>
                {/* <p className="text-sm text-white/80">
                  {userData.personalInfo.grade}
                </p>
                <p className="text-xs text-white/80">
                  {userData.personalInfo.school}
                </p> */}
              </div>
              <div className="p-4">
                {/* Aptitude Overview */}
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Aptitude Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        Analytical Thinking:{" "}
                        {userData.aptitudeResults.analyticalThinking}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        Verbal Reasoning:{" "}
                        {userData.aptitudeResults.verbalReasoning}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        Spatial Awareness:{" "}
                        {userData.aptitudeResults.spatialAwareness}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        Numerical Ability:{" "}
                        {userData.aptitudeResults.numericalAbility}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        Abstract Reasoning:{" "}
                        {userData.aptitudeResults.abstractReasoning}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Personality Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.aptitudeResults.personalityTraits.map(
                      (trait, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-500/10 text-orange-400 text-sm rounded-md"
                        >
                          {trait}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-100">
                    Academic Achievements
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {userData.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-gray-300">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3">
            {/* Personal Information Card */}
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
                    <span className="text-gray-100">
                      {userData.personalInfo.name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Email</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Phone</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.phone}
                    </span>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">School</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.school}
                    </span>
                  </div> */}
                  {/* <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Grade</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.grade}
                    </span>
                  </div> */}
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Date of Birth</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.dob ? new Date(userData.personalInfo.dob).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Gender</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.gender}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Address</span>
                    <span className="text-gray-100">
                      {userData.personalInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Details */}
            {/* <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100">
                  Family Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.familyBackground.educationalHistory
                    .filter(
                      (member) =>
                        member.relation === "Father" ||
                        member.relation === "Mother"
                    )
                    .map((member, index) => (
                      <div
                        key={index}
                        className="border border-gray-700 rounded-lg p-4 bg-gray-800/50"
                      >
                        <h4 className="font-medium text-lg mb-2 text-gray-100">
                          {member.relation}
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-400 text-sm">Name</span>
                            <p className="text-gray-100">{member.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">
                              Profession
                            </span>
                            <p className="text-gray-100">{member.profession}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">
                              Education
                            </span>
                            <p className="text-gray-100">{member.education}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div> */}

            {/* Educational Details */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100">
                  Educational Details
                </h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Current Grade:
                  </span>
                  {/* <span className="text-sm ml-2 text-gray-100">
                    {userData.personalInfo.grade}
                  </span> */}
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    School:
                  </span>
                  {/* <span className="text-sm ml-2 text-gray-100">
                    {userData.personalInfo.school}
                  </span> */}
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Academic Interests:
                  </span>
                  <div className="mt-2 space-y-3">
                    {userData.educationInterests.map((interest, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <span className="font-medium text-gray-100">
                            {interest.course}
                          </span>
                          <span
                            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              interest.interest === "High"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {interest.interest}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {interest.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xl font-bold text-gray-100">
                    Assessment History
                  </span>
                  <div className="mt-2 space-y-3">
                    {userData.assessmentHistory.map((assessment, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-700 pb-3 last:border-b-0"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-100">
                            {assessment.test}
                          </span>
                          <span className="text-gray-400">
                            {assessment.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {assessment.score ||
                            assessment.primaryInterests ||
                            assessment.style}
                        </p>
                      </div>
                    ))}
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
