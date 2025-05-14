export interface TestResult {
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
}

export type Category =
  | "Introvert"
  | "Analytical"
  | "Realistic"
  | "Practical"
  | "Artistic"
  | "Creative"
  | "Conventional"
  | "Organized"
  | "Visual"
  | "Spatial"
  | "Auditory"
  | "Communication"
  | "Extrovert"
  | "Social";

interface CategoryScores {
  [key: string]: { score: number; total: number };
}

// This maps question IDs to their categories
const questionCategoryMap: Record<string, Category[]> = {};

export const calculateScores = (
  responses: Record<string, string>,
  questions: Array<{ id: string; category: string }>
): TestResult => {
  const categoryScores: CategoryScores = {};

  console.log(questions);
  // First, build the questionCategoryMap from the questions array
  questions.forEach((question) => {
    const categories = question.category.split(",") as Category[];
    questionCategoryMap[question.id] = categories;
  });

  // Initialize all categories
  const allCategories = new Set<string>();
  questions.forEach((question) => {
    question.category.split(",").forEach((category) => {
      allCategories.add(category.trim());
      if (!categoryScores[category.trim()]) {
        categoryScores[category.trim()] = { score: 0, total: 0 };
      }
    });
  });

  // Calculate scores
  for (const [questionId, answer] of Object.entries(responses)) {
    const categories = questionCategoryMap[questionId];
    if (!categories) continue;

    const value = parseInt(answer);
    categories.forEach((category) => {
      categoryScores[category].total += 1;
      if (value === 1) {
        // "Yes" answer
        categoryScores[category].score += 1;
      }
    });
  }

  // Calculate percentages and create score objects
  let totalScore = 0;
  const scores = Array.from(allCategories).map((category) => {
    const data = categoryScores[category];
    const score =
      data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
    totalScore += score;

    return {
      category,
      score,
      percentile: calculatePercentile(score),
      interpretation: getInterpretation(category, score),
    };
  });

  const overallScore =
    scores.length > 0 ? Math.round(totalScore / scores.length) : 0;

  return {
    testName: "Psychometric Assessment",
    completedAt: new Date().toISOString(),
    scores: scores.sort((a, b) => b.score - a.score), // Sort by score descending
    overallScore,
    overallPercentile: calculatePercentile(overallScore),
    overallInterpretation: getOverallInterpretation(scores),
  };
};

function calculatePercentile(score: number): number {
  // This is a simplified percentile calculation
  return Math.round((score / 100) * 100);
}

function getInterpretation(category: string, score: number): string {
  if (score >= 80) return `Strong ${category} tendencies`;
  if (score >= 60) return `Moderate ${category} tendencies`;
  return `Low ${category} tendencies`;
}

function getOverallInterpretation(
  scores: Array<{ category: string; score: number }>
): string {
  const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 3);

  return `Your assessment shows strong tendencies in ${topScores
    .map((s) => s.category)
    .join(", ")}. 
    This suggests you would excel in roles that require these traits.`;
}
