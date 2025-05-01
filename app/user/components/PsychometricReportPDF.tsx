"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import {
  generateConciseSummary,
  findMatchingCareers,
} from "@/app/utils/careerMapping";

// Define interfaces for the data structure
interface PersonalInfo {
  fullName: string;
  [key: string]: string;
}

interface AptitudeResults {
  personalityTraits: string[];
  overallScore: string;
  overallPercentile: number;
  [key: string]: string | string[] | number;
}

interface RecommendedField {
  field: string;
  matchScore: number;
  reason: string;
}

interface EducationInterest {
  course: string;
  interest: string;
  notes: string;
}

interface FamilyMember {
  relation: string;
  name: string;
  education: string;
  profession: string;
}

interface FamilyBackground {
  notes: string;
  educationalHistory: FamilyMember[];
}

interface Assessment {
  test: string;
  date: string;
  score?: string;
  primaryInterests?: string;
  style?: string;
}

interface UserData {
  personalInfo: PersonalInfo;
  aptitudeResults: AptitudeResults;
  recommendedFields: RecommendedField[];
  educationInterests: EducationInterest[];
  familyBackground: FamilyBackground;
  achievements: string[];
  assessmentHistory: Assessment[];
}

interface CareerRecommendation {
  career: string;
  description: string;
  education: string[];
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
    marginBottom: 15,
  },
  interestLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  labelText: {
    color: "#ffffff",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    marginTop: 5,
  },
  progressBarLow: {
    height: "100%",
    backgroundColor: "#ef4444",
    borderRadius: 4,
  },
  progressBarModerate: {
    height: "100%",
    backgroundColor: "#f59e0b",
    borderRadius: 4,
  },
  progressBarHigh: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 4,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  legendItem: {
    color: "#9ca3af",
    fontSize: 10,
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

const defaultScores = [
  { category: "Realistic", score: 0 },
  { category: "Investigative", score: 0 },
  { category: "Artistic", score: 50 },
  { category: "Social", score: 100 },
  { category: "Enterprising", score: 0 },
  { category: "Conventional", score: 0 },
];

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
  const getProgressBarStyle = (score: number) => {
    if (score <= 30) return styles.progressBarLow;
    if (score <= 70) return styles.progressBarModerate;
    return styles.progressBarHigh;
  };

  // Get top two interests based on scores
  const topInterests = [...userData.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // Get career recommendations from the matching careers function
  const matchingCareers = findMatchingCareers(userData.scores);

  return (
    <Document>
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

          {userData.scores.map((score, index) => (
            <View key={index} style={styles.interestBar}>
              <View style={styles.interestLabel}>
                <Text style={styles.labelText}>{score.category}</Text>
                <Text style={styles.labelText}>{score.score}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    getProgressBarStyle(score.score),
                    { width: `${score.score}%` },
                  ]}
                />
              </View>
            </View>
          ))}

          <View style={styles.legend}>
            <Text style={styles.legendItem}>Low (Score 1-3)</Text>
            <Text style={styles.legendItem}>Moderate (Score 4-7)</Text>
            <Text style={styles.legendItem}>High (Score 8-10)</Text>
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
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBarHigh,
                        {
                          width: `${trait.score}%`,
                          backgroundColor: trait.color,
                        },
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
                  <Text style={styles.tableCell}>{career.career}</Text>
                  <Text style={styles.tableCell}>{career.description}</Text>
                  <Text style={styles.tableCell}>
                    {career.education
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
