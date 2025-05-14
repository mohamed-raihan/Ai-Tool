"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  findMatchingCareers,
} from "@/app/utils/careerMapping";

// Define interfaces for the data structure
// interface PersonalInfo {
//   fullName: string;
//   [key: string]: string;
// }

// interface AptitudeResults {
//   personalityTraits: string[];
//   overallScore: string;
//   overallPercentile: number;
//   [key: string]: string | string[] | number;
// }

// interface RecommendedField {
//   field: string;
//   matchScore: number;
//   reason: string;
// }

// interface EducationInterest {
//   course: string;
//   interest: string;
//   notes: string;
// }

// interface FamilyMember {
//   relation: string;
//   name: string;
//   education: string;
//   profession: string;
// }

// interface FamilyBackground {
//   notes: string;
//   educationalHistory: FamilyMember[];
// }

// interface Assessment {
//   test: string;
//   date: string;
//   score?: string;
//   primaryInterests?: string;
//   style?: string;
// }

// interface UserData {
//   personalInfo: PersonalInfo;
//   aptitudeResults: AptitudeResults;
//   recommendedFields: RecommendedField[];
//   educationInterests: EducationInterest[];
//   familyBackground: FamilyBackground;
//   achievements: string[];
//   assessmentHistory: Assessment[];
// }

interface CareerRecommendation {
  id: string;
  name: string;
  description: string;
  education_pathway: string[];
  matchingScore: number;
}

// Optional: Add a Google font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
    },
  ],
});

// Tailwind-like styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#1a2332",
    color: "#ffffff",
  },
  coverPage: {
    flex: 1,
    backgroundColor: "#181e2a",
    position: "relative",
    justifyContent: "space-between",
    padding: 0,
  },
  coverTop: {
    marginTop: 48,
    marginLeft: 48,
  },
  coverBrand: {
    fontSize: 14,
    letterSpacing: 4,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 0,
  },
  coverCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 48,
    marginTop: 80,
  },
  coverMainTitle: {
    fontSize: 28,
    color: "#ffffff",
    letterSpacing: 2,
    fontWeight: 400,
    marginBottom: 0,
  },
  coverAccentTitle: {
    fontSize: 36,
    color: "#ff6b00",
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 0,
  },
  coverBottom: {
    marginLeft: 48,
    marginBottom: 48,
  },
  coverInfo: {
    fontSize: 12,
    color: "#d1d5db",
    letterSpacing: 2,
    marginBottom: 4,
  },
  // Abstract shapes (right side)
  coverShape1: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 260,
    height: 600,
    backgroundColor: "#232c3e",
    borderTopLeftRadius: 300,
    borderBottomLeftRadius: 300,
    opacity: 0.85,
  },
  coverShape2: {
    position: "absolute",
    right: -30,
    top: 80,
    width: 200,
    height: 500,
    backgroundColor: "#28344a",
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 200,
    opacity: 0.6,
  },
  coverShape3: {
    position: "absolute",
    right: 10,
    top: 200,
    width: 120,
    height: 300,
    backgroundColor: "#ff6b00",
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    opacity: 0.18,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  subHeader: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#1f2937",
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 12,
  },
  scoreText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "right",
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#1f2937",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  chartIcon: {
    marginRight: 8,
    color: "#ff6b00",
  },
  interestBar: {
    marginBottom: 18,
  },
  interestLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  labelText: {
    color: "#ffffff",
    fontSize: 12,
    width: 80,
  },
  progressBarWrapper: {
    position: "relative",
    height: 12,
    marginBottom: 2,
  },
  progressBarRanges: {
    flexDirection: "row",
    width: "100%",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarRangeLow: {
    flex: 1,
    backgroundColor: "#ef4444",
    opacity: 0.18,
    borderRightWidth: 1,
    borderRightColor: "#fff",
  },
  progressBarRangeModerate: {
    flex: 1,
    backgroundColor: "#f59e0b",
    opacity: 0.18,
    borderRightWidth: 1,
    borderRightColor: "#fff",
  },
  progressBarRangeHigh: {
    flex: 1,
    backgroundColor: "#10b981",
    opacity: 0.18,
  },
  progressBarFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 12,
    borderRadius: 6,
  },
  progressBarMarker: {
    position: "absolute",
    top: -2,
    width: 2,
    height: 16,
    backgroundColor: "#1a2332",
    borderRadius: 1,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  legendCol: {
    alignItems: "center",
    flex: 1,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 2,
  },
  legendLabelModerate: {
    color: "#f59e0b",
  },
  legendLabelHigh: {
    color: "#10b981",
  },
  legendRange: {
    fontSize: 9,
    color: "#9ca3af",
  },
  interestCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6b00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  circleNumber: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  interestContent: {
    flex: 1,
  },
  interestTitle: {
    color: "#ff6b00",
    fontSize: 14,
    marginBottom: 5,
  },
  interestDescription: {
    color: "#9ca3af",
    fontSize: 12,
  },
  careerSection: {
    marginTop: 20,
  },
  careerTitle: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 15,
  },
  careerTable: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#374151",
    padding: 10,
    marginBottom: 5,
  },
  tableHeaderText: {
    color: "#ffffff",
    flex: 1,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  tableCell: {
    flex: 1,
    color: "#ffffff",
    fontSize: 11,
  },
  tableCellSpacer: {
    width: 20,
  },
  summarySection: {
    marginTop: 20,
  },
  summaryTitle: {
    color: "#ff6b00",
    fontSize: 16,
    marginBottom: 10,
  },
  summaryText: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 1.5,
  },
  bookIcon: {
    marginRight: 8,
    color: "#ff6b00",
  },
});

// const defaultScores = [
//   { category: "Realistic", score: 0 },
//   { category: "Investigative", score: 0 },
//   { category: "Artistic", score: 50 },
//   { category: "Social", score: 100 },
//   { category: "Enterprising", score: 0 },
//   { category: "Conventional", score: 0 },
// ];

interface PsychometricReportPDFProps {
  userData: {
    personalInfo: {
      fullName: string;
      testDate: string;
      testId: string;
    };
    scores: Array<{
      category: string;
      score: number;
      interpretation: string;
    }>;
    personalityTraits?: {
      type: string;
      description: string;
      traits: {
        EI: {
          primary: string;
          secondary: string;
          score: number;
          color: string;
        };
        SN: {
          primary: string;
          secondary: string;
          score: number;
          color: string;
        };
        TF: {
          primary: string;
          secondary: string;
          score: number;
          color: string;
        };
        JP: {
          primary: string;
          secondary: string;
          score: number;
          color: string;
        };
        AT: {
          primary: string;
          secondary: string;
          score: number;
          color: string;
        };
      };
    };
  };
}

const PsychometricReportPDF: React.FC<PsychometricReportPDFProps> = ({
  userData,
}) => {
  // const getProgressBarStyle = (score: number) => {
  //   if (score <= 30) return styles.progressBarLow;
  //   if (score <= 70) return styles.progressBarModerate;
  //   return styles.progressBarHigh;
  // };

  // Get top two interests based on scores
  const topInterests = [...userData.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // Get career recommendations from the matching careers function
  const matchingCareers = findMatchingCareers(userData.scores);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        {/* Abstract shapes */}
        <View style={styles.coverShape1} />
        <View style={styles.coverShape2} />
        <View style={styles.coverShape3} />
        {/* Top brand */}
        <View style={styles.coverTop}>
          <Text style={styles.coverBrand}>PREPACADEMY</Text>
        </View>
        {/* Centered main title */}
        <View style={styles.coverCenter}>
          <Text style={styles.coverMainTitle}>PSYCHOMETRIC</Text>
          <Text style={styles.coverAccentTitle}>REPORT</Text>
        </View>
        {/* Bottom info */}
        <View style={styles.coverBottom}>
          <Text style={styles.coverInfo}>Prepared for: {userData.personalInfo.fullName}</Text>
          <Text style={styles.coverInfo}>Date: {userData.personalInfo.testDate}</Text>
          <Text style={styles.coverInfo}>Test ID: {userData.personalInfo.testId}</Text>
        </View>
      </Page>

      {/* Main Content Page */}
      <Page size="A4" style={styles.page}>
        {/* Main Header */}
        <Text style={styles.title}>Psychometric Assessment Report</Text>

        {/* Info Section */}
        <View style={styles.subHeader}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Date: {userData.personalInfo.testDate}
            </Text>
            <Text style={styles.scoreText}>
              Overall Score: {topInterests[0]?.score || 0}%
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Test ID: {userData.personalInfo.testId}
            </Text>
            <Text style={styles.scoreText}>
              Percentile: {topInterests[0]?.score || 0}
            </Text>
          </View>
        </View>

        {/* Interest Analysis Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text>Your Interest Analysis</Text>
          </View>

          {/* Only show the 6 main categories, in order */}
          {[
            { name: "Realistic", color: "#ef4444" },
            { name: "Investigative", color: "#ef4444" },
            { name: "Artistic", color: "#ef4444" },
            { name: "Social", color: "#10b981" },
            { name: "Enterprising", color: "#10b981" },
            { name: "Conventional", color: "#ef4444" },
          ].map((category, index) => {
            const score = userData.scores.find((s) => s.category === category.name)?.score || 0;
            // Bar color logic
            let barColor = "#ef4444";
            if (score > 66) barColor = "#10b981";
            else if (score > 33) barColor = "#f59e0b";
            // Marker position
            const markerLeft = `${score}%`;
            return (
              <View key={index} style={styles.interestBar}>
                <View style={styles.interestLabel}>
                  <Text style={styles.labelText}>{category.name}</Text>
                  <Text style={styles.labelText}>{score}%</Text>
                </View>
                <View style={styles.progressBarWrapper}>
                  {/* Score ranges background */}
                  <View style={styles.progressBarRanges}>
                    <View style={styles.progressBarRangeLow} />
                    <View style={styles.progressBarRangeModerate} />
                    <View style={styles.progressBarRangeHigh} />
                  </View>
                  {/* Score bar */}
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${score}%`,
                        backgroundColor: barColor,
                      },
                    ]}
                  />
                  {/* Score marker */}
                  <View
                    style={[
                      styles.progressBarMarker,
                      { left: markerLeft },
                    ]}
                  />
                </View>
              </View>
            );
          })}

          {/* Score range labels */}
          <View style={styles.legend}>
            <View style={styles.legendCol}>
              <Text style={styles.legendLabel}>Low</Text>
              <Text style={styles.legendRange}>(Score 1-3)</Text>
            </View>
            <View style={styles.legendCol}>
              <Text style={[styles.legendLabel, styles.legendLabelModerate]}>Moderate</Text>
              <Text style={styles.legendRange}>(Score 4-7)</Text>
            </View>
            <View style={styles.legendCol}>
              <Text style={[styles.legendLabel, styles.legendLabelHigh]}>High</Text>
              <Text style={styles.legendRange}>(Score 8-10)</Text>
            </View>
          </View>
        </View>

        {/* Primary and Secondary Interests */}
        <View style={styles.section}>
          {topInterests.map((interest, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <View style={styles.interestCircle}>
                <Text style={styles.circleNumber}>{index + 1}</Text>
              </View>
              <View style={styles.interestContent}>
                <Text style={styles.interestTitle}>
                  {index === 0
                    ? `Your Primary Interest - ${interest.category}`
                    : `Your Secondary Interest - ${interest.category}`}
                </Text>
                <Text style={styles.interestDescription}>
                  {interest.interpretation || "Description not available."}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Personality Traits Section */}
        {userData.personalityTraits && (
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>Personality Profile</Text>
            </View>

            {/* Personality Type */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Your Personality Type:</Text>
              <Text style={styles.scoreText}>
                {userData.personalityTraits.type}
              </Text>
            </View>

            {/* Personality Description */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {userData.personalityTraits.description}
              </Text>
            </View>

            {/* Personality Traits */}
            {Object.entries(userData.personalityTraits.traits).map(
              ([dimension, trait]) => (
                <View key={dimension} style={styles.interestBar}>
                  <View style={styles.interestLabel}>
                    <Text style={styles.labelText}>
                      {trait.primary} vs {trait.secondary}
                    </Text>
                    <Text style={styles.scoreText}>{trait.score}%</Text>
                  </View>
                  <View style={styles.progressBarWrapper}>
                    <View style={styles.progressBarRanges}>
                      <View style={styles.progressBarRangeLow} />
                      <View style={styles.progressBarRangeModerate} />
                      <View style={styles.progressBarRangeHigh} />
                    </View>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${trait.score}%`,
                          backgroundColor: trait.color,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.progressBarMarker,
                        { left: `${trait.score}%` },
                      ]}
                    />
                  </View>
                </View>
              )
            )}
          </View>
        )}

        {/* Career Recommendations */}
        <View style={styles.section}>
          <Text style={styles.careerTitle}>Career Recommendations</Text>
          <View style={styles.careerTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>CAREER PATH</Text>
              <Text style={styles.tableHeaderText}>DESCRIPTION</Text>
              <Text style={styles.tableHeaderText}>REQUIRED EDUCATION</Text>
            </View>
            {matchingCareers.map(
              (career: CareerRecommendation, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{career.name}</Text>
                  <Text style={styles.tableCell}>{career.description}</Text>
                  <View style={styles.tableCellSpacer} />
                  <Text style={styles.tableCell}>
                    {career.education_pathway
                      .map((edu: string) => `• ${edu}`)
                      .join("\n")}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>
            Your strongest characteristic is in the {topInterests[0]?.category}{" "}
            domain, with a score of {topInterests[0]?.score}%. This indicates{" "}
            {topInterests[0]?.interpretation}.{"\n\n"}
            Your second strongest characteristic is in the{" "}
            {topInterests[1]?.category} domain, with a score of{" "}
            {topInterests[1]?.score}%. This indicates{" "}
            {topInterests[1]?.interpretation}.{"\n\n"}
            Based on your interest profile, you would excel in careers that
            combine {topInterests[0]?.category.toLowerCase()} and{" "}
            {topInterests[1]?.category.toLowerCase()} qualities. The recommended
            career paths align with your natural inclinations and strengths,
            suggesting roles where you can{" "}
            {matchingCareers[0]?.description.toLowerCase()}.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PsychometricReportPDF;
