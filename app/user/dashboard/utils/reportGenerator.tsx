export type TraitSummary = {
    trait: string;
    description: string;
    suggestedCareers: string[];
    learningTips: string[];
  };
  
  const traitData: Record<string, TraitSummary> = {
    Introvert: {
      trait: "Introvert",
      description: "You are reflective, thoughtful, and recharge best in solitude.",
      suggestedCareers: ["Writer", "Researcher", "Software Developer"],
      learningTips: [
        "Study in a quiet space",
        "Use written notes and reflection",
        "Avoid overstimulation during learning",
      ],
    },
    Extrovert: {
      trait: "Extrovert",
      description: "You thrive in social settings and enjoy active collaboration.",
      suggestedCareers: ["Teacher", "Sales Manager", "Event Planner"],
      learningTips: [
        "Group study sessions work well",
        "Use discussion-based learning",
        "Present ideas out loud to retain them",
      ],
    },
    Artistic: {
      trait: "Artistic",
      description: "You express yourself creatively and value originality.",
      suggestedCareers: ["Graphic Designer", "Animator", "Interior Designer"],
      learningTips: [
        "Use mind maps and visual learning tools",
        "Incorporate creative projects into study",
        "Allow room for self-expression in assignments",
      ],
    },
    Visual: {
      trait: "Visual",
      description: "You understand and retain information best through images, diagrams, and spatial understanding.",
      suggestedCareers: ["Architect", "Photographer", "UX Designer"],
      learningTips: [
        "Use charts, maps, and visual tools",
        "Watch tutorial videos",
        "Highlight text with colors and symbols",
      ],
    },
    Auditory: {
      trait: "Auditory",
      description: "You process information best through sound and spoken words.",
      suggestedCareers: ["Musician", "Podcaster", "Language Teacher"],
      learningTips: [
        "Record and replay lectures",
        "Study by explaining out loud",
        "Use rhymes or music to memorize",
      ],
    },
    Realistic: {
        trait: "Realistic",
        description:
          "You are practical, hands-on, and prefer working with physical tools, machines, or nature.",
        suggestedCareers: ["Engineer", "Mechanic", "Construction Manager", "Electrician"],
        learningTips: [
          "Use real-world examples and hands-on activities",
          "Learn by doing — experiments, demos, and projects",
          "Minimize theory-heavy material; focus on application",
        ],
      },
    // Add more traits like Realistic, Investigative, Social, etc.
  };
  
  export const generateReport = (topTraits: string[]): TraitSummary[] => {
    return topTraits
      .map((trait) => traitData[trait])
      .filter((data): data is TraitSummary => data !== undefined);
  };
  