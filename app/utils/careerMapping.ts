interface CareerPath {
  career: string;
  description: string;
  education: string[];
  traits: string[];
  minimumScore: number;
}

export const careerPaths: CareerPath[] = [
  {
    career: "Software Engineer",
    description:
      "Develops software applications and systems, solving complex technical problems through coding and algorithmic thinking",
    education: [
      "Bachelor's in Computer Science",
      "Bachelor's in Software Engineering",
      "Relevant coding bootcamps with strong portfolio",
    ],
    traits: ["Artistic", "Logical", "Problem Solving", "Technical"],
    minimumScore: 70,
  },
  {
    career: "Clinical Psychologist",
    description:
      "Assesses and treats mental, emotional, and behavioral disorders through observation, testing, and psychotherapy",
    education: [
      "Bachelor's in Psychology",
      "Master's in Clinical Psychology",
      "Doctorate in Psychology (Ph.D. or Psy.D.)",
    ],
    traits: ["Social", "Emotional Intelligence", "Analytical", "Communication"],
    minimumScore: 75,
  },
  {
    career: "UX/UI Designer",
    description:
      "Creates user-friendly digital interfaces by combining artistic skills with user behavior analysis",
    education: [
      "Bachelor's in Design",
      "Bachelor's in Human-Computer Interaction",
      "UX Design Certification Programs",
    ],
    traits: ["Creative", "Visual", "Problem Solving", "Communication"],
    minimumScore: 70,
  },
  {
    career: "Data Scientist",
    description:
      "Analyzes complex data sets to help organizations make informed decisions through statistical analysis and machine learning",
    education: [
      "Bachelor's in Statistics",
      "Master's in Data Science",
      "Bachelor's in Mathematics with Data Science specialization",
    ],
    traits: ["Analytical", "Mathematical", "Technical", "Problem Solving"],
    minimumScore: 75,
  },
  {
    career: "Marketing Manager",
    description:
      "Develops and implements marketing strategies to promote products or services and increase brand awareness",
    education: [
      "Bachelor's in Marketing",
      "Bachelor's in Business Administration",
      "Digital Marketing Certification Programs",
    ],
    traits: ["Creative", "Communication", "Strategic", "Social"],
    minimumScore: 70,
  },
  {
    career: "Environmental Scientist",
    description:
      "Studies environmental problems and develops solutions to protect human health and nature",
    education: [
      "Bachelor's in Environmental Science",
      "Master's in Environmental Studies",
      "Bachelor's in Earth Sciences",
    ],
    traits: ["Analytical", "Research", "Nature-Oriented", "Problem Solving"],
    minimumScore: 70,
  },
  {
    career: "Financial Analyst",
    description:
      "Evaluates financial data to guide business decisions and investment strategies",
    education: [
      "Bachelor's in Finance",
      "Bachelor's in Economics",
      "CFA Certification",
    ],
    traits: ["Analytical", "Mathematical", "Strategic", "Detail-Oriented"],
    minimumScore: 75,
  },
  {
    career: "Teacher",
    description:
      "Educates students and facilitates learning through various teaching methods and curriculum development",
    education: [
      "Bachelor's in Education",
      "Teaching Certification",
      "Master's in Education",
    ],
    traits: ["Communication", "Social", "Patient", "Organized"],
    minimumScore: 70,
  },
];

export function findMatchingCareers(
  scores: Array<{ category: string; score: number }>
) {
  console.log("Input scores:", scores);

  const matchingCareers = careerPaths.filter((career) => {
    // Check if the candidate's traits match the career requirements
    const matchingTraits = career.traits.filter((trait) =>
      scores.some((score) => {
        const matches =
          score.category.toLowerCase().includes(trait.toLowerCase()) &&
          score.score >= career.minimumScore; 
        console.log(
          `Trait: ${trait}, Score: ${score.category}, Matches: ${matches}`
        );
        return matches;
      })
    );

    console.log(matchingTraits);

    console.log(
      `Career: ${career.career}, Matching traits: ${matchingTraits.length}`
    );
    return matchingTraits.length >= 2;
  });

  const results = matchingCareers
    .map((career) => ({
      career: career.career,
      description: career.description,
      education: career.education,
      matchingScore: calculateMatchingScore(scores, career.traits),
    }))
    .sort((a, b) => b.matchingScore - a.matchingScore);

  console.log("Matching careers:", results);
  return results;
}

function calculateMatchingScore(
  scores: Array<{ category: string; score: number }>,
  requiredTraits: string[]
): number {
  let totalScore = 0;
  let matchCount = 0;

  requiredTraits.forEach((trait) => {
    const matchingScore = scores.find((score) =>
      score.category.includes(trait)
    );
    if (matchingScore) {
      totalScore += matchingScore.score;
      matchCount++;
    }
  });

  return matchCount > 0 ? totalScore / matchCount : 0;
}

export function generateStudentSummary(
  scores: Array<{ category: string; score: number }>
) {
  const matchingCareers = findMatchingCareers(scores);
  const topTraits = scores
    .filter((score) => score.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const summary = {
    strengths: topTraits.map((trait) => ({
      trait: trait.category,
      score: trait.score,
      description: getTraitDescription(trait.category),
    })),
    careerMatches: matchingCareers.slice(0, 3).map((career) => ({
      career: career.career,
      matchScore: career.matchingScore,
      keyTraits:
        careerPaths
          .find((c) => c.career === career.career)
          ?.traits.filter((trait) =>
            scores.some(
              (score) =>
                score.category.toLowerCase().includes(trait.toLowerCase()) &&
                score.score >= 70
            )
          ) || [],
    })),
    recommendations: generateRecommendations(topTraits, matchingCareers),
  };

  return summary;
}

function getTraitDescription(trait: string): string {
  const descriptions: Record<string, string> = {
    Analytical: "Strong problem-solving and critical thinking abilities",
    Creative: "Excellent at generating innovative ideas and solutions",
    Social: "Strong interpersonal and communication skills",
    Technical: "Proficient in technical and practical applications",
    Logical: "Excellent at systematic and structured thinking",
    Communication: "Effective in expressing ideas and understanding others",
    "Problem Solving": "Skilled at analyzing and resolving complex issues",
    Artistic: "Strong creative and aesthetic abilities",
    Mathematical: "Excellent numerical and quantitative skills",
    Strategic: "Good at planning and long-term thinking",
    "Detail-Oriented": "Meticulous and thorough in work",
    Research: "Strong investigative and analytical abilities",
    "Nature-Oriented": "Interested in environmental and natural sciences",
    "Emotional Intelligence": "High awareness and management of emotions",
    Patient: "Good at handling complex situations calmly",
    Organized: "Strong planning and organizational skills",
  };

  return descriptions[trait] || "Strong aptitude in this area";
}

function generateRecommendations(
  topTraits: Array<{ category: string; score: number }>,
  matchingCareers: Array<{
    career: string;
    matchingScore: number;
    description: string;
    education: string[];
  }>
): string[] {
  const recommendations: string[] = [];

  // Career development recommendations
  if (matchingCareers.length > 0) {
    recommendations.push(
      `Based on your strengths, you would excel in ${matchingCareers[0].career} or similar roles. Consider exploring ${matchingCareers[0].education[0]} as a potential educational path.`
    );
  }

  // Skill development recommendations
  if (topTraits.length > 0) {
    recommendations.push(
      `Your strongest trait is ${
        topTraits[0].category
      }. Consider developing complementary skills to enhance your ${topTraits[0].category.toLowerCase()} abilities.`
    );
  }

  // General recommendations
  recommendations.push(
    "Consider participating in extracurricular activities that align with your strengths to further develop your skills.",
    "Look for internship opportunities in fields that match your top career matches to gain practical experience.",
    "Connect with professionals in your matched career fields to learn more about their experiences and get guidance."
  );

  return recommendations;
}

export function generateConciseSummary(
  scores: Array<{ category: string; score: number }>
): string {
  const matchingCareers = findMatchingCareers(scores);
  const topTraits = scores
    .filter((score) => score.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const topCareer = matchingCareers[0];
  const educationPath = topCareer?.education[0] || "relevant field of study";

  const traitDescriptions = topTraits
    .map((trait) => `${trait.category.toLowerCase()} (${trait.score}%)`)
    .join(", ");

  return `Based on your assessment, you demonstrate strong ${traitDescriptions} abilities. Your profile aligns well with a career in ${
    topCareer?.career || "a technical field"
  }, where you can leverage your ${
    topTraits[0]?.category.toLowerCase() || "analytical"
  } skills. Consider pursuing ${educationPath} to build upon your natural strengths. Your combination of traits suggests you would excel in roles requiring ${
    topCareer?.description?.split(".")[0] ||
    "problem-solving and analytical thinking"
  }. Focus on developing practical experience through internships and projects in your chosen field to maximize your potential.`;
}
