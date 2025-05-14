import { careerService } from "../services/careers.service";

interface CareerPath {
  id: string;
  name: string;
  description: string;
  education_pathway: string[];
  traits: string[];
  score: string;
}

export const careerPaths: CareerPath[] = [
  {
    id: "1",
    name: "Software Engineer",
    description:
      "Develops software applications and systems, solving complex technical problems through coding and algorithmic thinking",
    education_pathway: [
      "Bachelor's in Computer Science",
      "Bachelor's in Software Engineering",
      "Relevant coding bootcamps with strong portfolio",
    ],
    traits: ["Artistic", "Logical", "Problem Solving", "Technical"],
    score: "70",
  },
  {
    id: "2",
    name: "Clinical Psychologist",
    description:
      "Assesses and treats mental, emotional, and behavioral disorders through observation, testing, and psychotherapy",
    education_pathway: [
      "Bachelor's in Psychology",
      "Master's in Clinical Psychology",
      "Doctorate in Psychology (Ph.D. or Psy.D.)",
    ],
    traits: ["Social", "Emotional Intelligence", "Analytical", "Communication"],
    score: "75",
  },
  {
    id: "3",
    name: "Entrepreneur",
    description:
      "Starts and manages new business ventures, taking financial risks to innovate, lead teams, and drive growth in competitive markets.",
    education_pathway: [
      "Bachelor's in Business Administration or Entrepreneurship",
      "Startup Incubator or Accelerator Programs",
      "Practical experience and market research",
    ],
    traits: ["Enterprising", "Strategic", "Leadership", "Risk-Taking"],
    score: "80",
  },
  {
    id: "4",
    name: "Data Scientist",
    description:
      "Analyzes complex data sets to help organizations make informed decisions through statistical analysis and machine learning",
    education_pathway: [
      "Bachelor's in Statistics",
      "Master's in Data Science",
      "Bachelor's in Mathematics with Data Science specialization",
    ],
    traits: ["Analytical", "Mathematical", "Technical", "Problem Solving"],
    score: "75",
  },
  {
    id: "5",
    name: "Marketing Manager",
    description:
      "Develops and implements marketing strategies to promote products or services and increase brand awareness",
    education_pathway: [
      "Bachelor's in Marketing",
      "Bachelor's in Business Administration",
      "Digital Marketing Certification Programs",
    ],
    traits: ["Creative", "Communication", "Strategic", "Social"],
    score: "70",
  },
  {
    id: "6",
    name: "Environmental Scientist",
    description:
      "Studies environmental problems and develops solutions to protect human health and nature",
    education_pathway: [
      "Bachelor's in Environmental Science",
      "Master's in Environmental Studies",
      "Bachelor's in Earth Sciences",
    ],
    traits: ["Analytical", "Research", "Nature-Oriented", "Problem Solving"],
    score: "70",
  },
  {
    id: "7",
    name: "Financial Analyst",
    description:
      "Evaluates financial data to guide business decisions and investment strategies",
    education_pathway: [
      "Bachelor's in Finance",
      "Bachelor's in Economics",
      "CFA Certification",
    ],
    traits: ["Analytical", "Mathematical", "Strategic", "Detail-Oriented"],
    score: "75",
  },
  {
    id: "8",
    name: "Teacher",
    description:
      "Educates students and facilitates learning through various teaching methods and curriculum development",
    education_pathway: [
      "Bachelor's in Education",
      "Teaching Certification",
      "Master's in Education",
    ],
    traits: ["Communication", "Social", "Patient", "Organized"],
    score: "70",
  },
  {
    id: "9",
    name: "Civil Engineer",
    description:
      "Designs, constructs, and maintains infrastructure projects such as roads, bridges, and buildings, ensuring safety and functionality.",
    education_pathway: [
      "Bachelor's in Civil Engineering",
      "Master's in Structural or Environmental Engineering",
      "Certification in Project Management or AutoCAD tools",
    ],
    traits: ["Technical", "Realistic", "Problem Solving", "Organized"],
    score: "70",
  },
  {
    id: "10",
    name: "Human Resources Manager",
    description:
      "Oversees recruitment, employee relations, and organizational development while ensuring a productive and healthy work environment.",
    education_pathway: [
      "Bachelor's in Human Resource Management",
      "MBA in HR or Organizational Psychology",
      "Certification in Industrial Relations or Labor Law",
    ],
    traits: ["Communication", "Social", "Emotional Intelligence", "Organized"],
    score: "70",
  },
  {
    id: "11",
    name: "Film Director",
    description:
      "Leads the creative and technical aspects of film production, turning scripts into compelling visual stories through artistic direction.",
    education_pathway: [
      "Bachelor's in Film Studies or Media Arts",
      "Workshops or Internships in Cinematography",
      "Experience in screenwriting, editing, or theater",
    ],
    traits: ["Creative", "Artistic", "Strategic", "Visual"],
    score: "75",
  },
  {
    id: "12",
    name: "Biomedical Scientist",
    description:
      "Conducts research and laboratory tests to improve medical treatments and understand diseases at a molecular level.",
    education_pathway: [
      "Bachelor's in Biomedical Science",
      "Master's or Ph.D. in Biomedical Research",
      "Lab Certifications or Clinical Training",
    ],
    traits: ["Investigative", "Analytical", "Detail-Oriented", "Technical"],
    score: "75",
  },
  {
    id: "13",
    name: "Full-Stack Developer",
    description:
      "Builds both the front-end and back-end of web applications, integrating user interfaces with server-side logic and databases.",
    education_pathway: [
      "Bachelor's in Computer Science or Software Engineering",
      "Full-Stack Web Development Bootcamp",
      "Self-learning with projects and GitHub portfolio",
    ],
    traits: ["Technical", "Problem Solving", "Logical", "Creative"],
    score: "75",
  },
  {
    id: "14",
    name: "Chartered Accountant",
    description:
      "Manages financial records, audits, tax planning, and business advisory for individuals or corporations.",
    education_pathway: [
      "Bachelor's in Commerce or Accounting",
      "CA Course (ICAI, ACCA, or equivalent)",
      "Internship with auditing firm",
    ],
    traits: ["Analytical", "Detail-Oriented", "Mathematical", "Strategic"],
    score: "80",
  },
  {
    id: "15",
    name: "Digital Marketer",
    description:
      "Plans and executes online marketing campaigns to grow brand awareness and drive user engagement across digital platforms.",
    education_pathway: [
      "Bachelor's in Marketing, Mass Communication, or Business",
      "Certification in Digital Marketing (Google, HubSpot, Meta)",
      "Hands-on experience with SEO, SEM, and Social Media Ads",
    ],
    traits: ["Creative", "Communication", "Strategic", "Social"],
    score: "70",
  },
  {
    id: "16",
    name: "Lawyer",
    description:
      "Represents and advises clients on legal issues, drafts documents, and presents cases in court or legal negotiations.",
    education_pathway: [
      "Bachelor's in Law (LLB)",
      "Master's in Law (LLM) (Optional)",
      "Bar Examination and License to Practice",
    ],
    traits: ["Analytical", "Communication", "Detail-Oriented", "Strategic"],
    score: "75",
  },
  {
    id: "17",
    name: "Nurse Practitioner",
    description:
      "Provides advanced healthcare services, including diagnosis and treatment, often acting as a primary care provider.",
    education_pathway: [
      "Bachelor of Science in Nursing (BSN)",
      "Master’s in Nursing (MSN) or DNP",
      "State Licensure and Clinical Training",
    ],
    traits: ["Organized", "Patient", "Problem Solving", "Social"],
    score: "75",
  },
  {
    id: "18",
    name: "Business Development Manager",
    description:
      "Identifies growth opportunities, builds strategic partnerships, and drives revenue by expanding customer base or market presence.",
    education_pathway: [
      "Bachelor's in Business Administration, Marketing, or Management",
      "MBA (Preferred)",
      "Courses in Sales, CRM, and Negotiation Skills",
    ],
    traits: ["Enterprising", "Communication", "Strategic", "Persuasive"],
    score: "75",
  }
];

let careerPathsData: CareerPath[] = careerPaths;

// const fetchCareerPaths = async () => {
//   try {
//     const res = await careerService.getCareers();
//     console.log(res);
//     if (res && res.length > 0) {
//       careerPathsData = res.map((career: any) => ({
//         id: career.id,
//         name: career.name,
//         description: career.description,
//         education_pathway: career.education_pathway,
//         traits: career.traits,
//         score: career.score || "70",
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching career paths:", error);
//   }
// };

// Fetch career paths on module load
// fetchCareerPaths();

export function findMatchingCareers(
  scores: Array<{ category: string; score: number }>
) {
  console.log("Input scores:", scores);
  console.log("Career paths data:", careerPathsData);

  const matchingCareers = careerPathsData.filter((career) => {
    // Check if the candidate's traits match the career requirements
    const matchingTraits = career.traits.filter((trait) =>
      scores?.some((score) => {
        const matches =
          score.category.toLowerCase().includes(trait.toLowerCase()) &&
          score.score >= parseInt(career.score);
        // console.log(
        //   `Trait: ${trait}, Score: ${score.category}, Matches: ${matches}`
        // );
        return matches;
      })
    );

    // console.log(matchingTraits);

    // console.log(
    //   `Career: ${career.name}, Matching traits: ${matchingTraits.length}`
    // );
    return matchingTraits.length >= 1;
  });

  // console.log(matchingCareers);

  const results = matchingCareers
    .map((career) => ({
      id: career.id,
      name: career.name,
      description: career.description,
      education_pathway: career.education_pathway,
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
  console.log(scores);

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
      career: career.name,
      matchScore: career.matchingScore,
      keyTraits:
        careerPaths
          .find((c) => c.name === career.name)
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
    id: string;
    name: string;
    matchingScore: number;
    description: string;
    education_pathway: string[];
  }>
): string[] {
  const recommendations: string[] = [];

  // Career development recommendations
  if (matchingCareers.length > 0) {
    recommendations.push(
      `Based on your strengths, you would excel in ${matchingCareers[0].name} or similar roles. Consider exploring ${matchingCareers[0].education_pathway[0]} as a potential educational path.`
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
  const educationPath =
    topCareer?.education_pathway[0] || "relevant field of study";

  const traitDescriptions = topTraits
    .map((trait) => `${trait.category.toLowerCase()} (${trait.score}%)`)
    .join(", ");

  return `Based on your assessment, you demonstrate strong ${traitDescriptions} abilities. Your profile aligns well with a career in ${
    topCareer?.name || "a technical field"
  }, where you can leverage your ${
    topTraits[0]?.category.toLowerCase() || "analytical"
  } skills. Consider pursuing ${educationPath} to build upon your natural strengths. Your combination of traits suggests you would excel in roles requiring ${
    topCareer?.description?.split(".")[0] ||
    "problem-solving and analytical thinking"
  }. Focus on developing practical experience through internships and projects in your chosen field to maximize your potential.`;
}
