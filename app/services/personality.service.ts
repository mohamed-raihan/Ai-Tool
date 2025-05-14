import { Answer } from "../types/test";

export interface PersonalityTrait {
  primary: string;
  secondary: string;
  score: number;
  color: string;
}

export interface PersonalityTraitResult {
  traits: {
    EI: PersonalityTrait; // Extraverted vs Introverted
    SN: PersonalityTrait; // Sensing vs iNtuitive
    TF: PersonalityTrait; // Thinking vs Feeling
    JP: PersonalityTrait; // Judging vs Prospecting
    AT: PersonalityTrait; // Assertive vs Turbulent
  };
  type: string; // e.g., "ENFP-A"
  description: string;
}

interface QuestionMapping {
  dimension: "EI" | "SN" | "TF" | "JP" | "AT";
  EI: { primaryTrait: string; secondaryTrait: string };
  SN: { primaryTrait: string; secondaryTrait: string };
  TF: { primaryTrait: string; secondaryTrait: string };
  JP: { primaryTrait: string; secondaryTrait: string };
  AT: { primaryTrait: string; secondaryTrait: string };
}

// Map each question to its corresponding personality dimension
const questionMappings: { [key: number]: QuestionMapping } = {
  13: {
    dimension: "EI",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  14: {
    dimension: "SN",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  15: {
    dimension: "TF",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  16: {
    dimension: "JP",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  17: {
    dimension: "AT",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  18: {
    dimension: "EI",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  19: {
    dimension: "SN",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  20: {
    dimension: "TF",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  21: {
    dimension: "JP",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  22: {
    dimension: "AT",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
};

// Define dimension colors for visualization
const dimensionColors = {
  EI: "#3B82F6", // Blue
  SN: "#F59E0B", // Yellow
  TF: "#10B981", // Green
  JP: "#8B5CF6", // Purple
  AT: "#EF4444", // Red
};

export class PersonalityService {
  calculatePersonalityTraits(answers: Answer[]): PersonalityTraitResult {
    
    // Initialize counters for each trait
    const traitCounters = {
      EI: { primary: 0, secondary: 0, total: 0 },
      SN: { primary: 0, secondary: 0, total: 0 },
      TF: { primary: 0, secondary: 0, total: 0 },
      JP: { primary: 0, secondary: 0, total: 0 },
      AT: { primary: 0, secondary: 0, total: 0 },
    };

    
    // Process each answer
    answers.forEach((answer) => {
      const mapping = questionMappings[answer.questionId];
      if (mapping) {
        const counter = traitCounters[mapping.dimension];
        counter.total++;

        if (answer.answer === "yes") {
          counter.primary++;
        } else {
          counter.secondary++;
        }
      }
    });

    // Calculate percentages and create trait objects
    const traits = this.calculateTraitPercentages(traitCounters);

    // Determine personality type (e.g., "ENFP-A")
    const type = this.determinePersonalityType(traits);

    // Generate description based on type
    const description = this.generatePersonalityDescription(type);

    return {
      traits,
      type,
      description,
    };
  }

  private calculateTraitPercentages(counters: {
    EI: { primary: number; total: number };
    SN: { primary: number; total: number };
    TF: { primary: number; total: number };
    JP: { primary: number; total: number };
    AT: { primary: number; total: number };
  }): {
    EI: PersonalityTrait;
    SN: PersonalityTrait;
    TF: PersonalityTrait;
    JP: PersonalityTrait;
    AT: PersonalityTrait;
  } {
    const traits = {
      EI: this.calculateTrait("EI", counters.EI),
      SN: this.calculateTrait("SN", counters.SN),
      TF: this.calculateTrait("TF", counters.TF),
      JP: this.calculateTrait("JP", counters.JP),
      AT: this.calculateTrait("AT", counters.AT),
    };

    return traits;
  }

  private calculateTrait(
    dimension: keyof typeof dimensionColors,
    counter: { primary: number; total: number }
  ): PersonalityTrait {
    const primaryPercentage =
      counter.total > 0 ? (counter.primary / counter.total) * 100 : 50;
    const mapping = questionMappings[13]; // Use the first question mapping as template

    return {
      primary: mapping[dimension].primaryTrait,
      secondary: mapping[dimension].secondaryTrait,
      score: Math.round(primaryPercentage),
      color: dimensionColors[dimension],
    };
  }

  private determinePersonalityType(traits: {
    [key: string]: PersonalityTrait;
  }): string {
    // Get the first four letters (E/I, S/N, T/F, J/P)
    const type = [
      traits.EI.score >= 50 ? "E" : "I",
      traits.SN.score >= 50 ? "S" : "N",
      traits.TF.score >= 50 ? "T" : "F",
      traits.JP.score >= 50 ? "J" : "P",
    ].join("");

    // Add the Assertive/Turbulent suffix
    const suffix = traits.AT.score >= 50 ? "A" : "T";

    return `${type}-${suffix}`;
  }

  private generatePersonalityDescription(type: string): string {
    console.log("Generating personality description for type:", type);
    // Add personality type descriptions here
    const descriptions: { [key: string]: string } = {
      "ENFP-A":
        "You're likely very adaptable, easygoing and flexible, prioritizing spontaneity over stability. Your extroverted and intuitive nature makes you excellent at reading people and situations.",
      "ENFP-T":
        "You're creative, enthusiastic, and spontaneous, but may sometimes struggle with self-doubt. Your extroverted and intuitive nature makes you excellent at reading people and situations.",
      "INFP-A":
        "You're idealistic, creative, and empathetic, with a strong sense of personal values. Your introverted and intuitive nature makes you deeply reflective and insightful.",
      "INFP-T":
        "You're idealistic, creative, and empathetic, but may sometimes be overly sensitive to criticism. Your introverted and intuitive nature makes you deeply reflective and insightful.",
      "ENTP-A":
        "You're innovative, curious, and quick-witted, with a love for intellectual challenges. Your extroverted and intuitive nature makes you excellent at generating new ideas.",
      "ENTP-T":
        "You're innovative, curious, and quick-witted, but may sometimes struggle with follow-through. Your extroverted and intuitive nature makes you excellent at generating new ideas.",
      "INTJ-A":
        "You're strategic, analytical, and independent, with a strong vision for the future. Your introverted and intuitive nature makes you excellent at solving complex problems.",
      "INTJ-T":
        "You're strategic, analytical, and independent, but may sometimes be overly critical. Your introverted and intuitive nature makes you excellent at solving complex problems.",
      "ENTJ-A":
        "You're confident, decisive, and natural leader, with a strong drive for achievement. Your extroverted and intuitive nature makes you excellent at organizing and leading others.",
      "ENTJ-T":
        "You're confident, decisive, and natural leader, but may sometimes be too demanding. Your extroverted and intuitive nature makes you excellent at organizing and leading others.",
      "INFJ-A":
        "You're insightful, compassionate, and determined, with a strong sense of purpose. Your introverted and intuitive nature makes you excellent at understanding others.",
      "INFJ-T":
        "You're insightful, compassionate, and determined, but may sometimes be too idealistic. Your introverted and intuitive nature makes you excellent at understanding others.",
      "ENFJ-A":
        "You're charismatic, empathetic, and organized, with a natural ability to inspire others. Your extroverted and intuitive nature makes you excellent at motivating and leading teams.",
      "ENFJ-T":
        "You're charismatic, empathetic, and organized, but may sometimes be too self-sacrificing. Your extroverted and intuitive nature makes you excellent at motivating and leading teams.",
      "ISTJ-A":
        "You're responsible, organized, and practical, with a strong sense of duty. Your introverted and sensing nature makes you excellent at maintaining order and stability.",
      "ISTJ-T":
        "You're responsible, organized, and practical, but may sometimes be too rigid. Your introverted and sensing nature makes you excellent at maintaining order and stability.",
      "ESTJ-A":
        "You're efficient, organized, and direct, with a strong sense of tradition. Your extroverted and sensing nature makes you excellent at managing and organizing people.",
      "ESTJ-T":
        "You're efficient, organized, and direct, but may sometimes be too controlling. Your extroverted and sensing nature makes you excellent at managing and organizing people.",
      "ISFJ-A":
        "You're caring, organized, and loyal, with a strong sense of responsibility. Your introverted and sensing nature makes you excellent at supporting and helping others.",
      "ISFJ-T":
        "You're caring, organized, and loyal, but may sometimes be too self-sacrificing. Your introverted and sensing nature makes you excellent at supporting and helping others.",
      "ESFJ-A":
        "You're sociable, caring, and organized, with a strong sense of community. Your extroverted and sensing nature makes you excellent at creating harmony and supporting others.",
      "ESFJ-T":
        "You're sociable, caring, and organized, but may sometimes be too sensitive to criticism. Your extroverted and sensing nature makes you excellent at creating harmony and supporting others.",
      "ISTP-A":
        "You're practical, analytical, and spontaneous, with a love for hands-on activities. Your introverted and sensing nature makes you excellent at solving practical problems.",
      "ISTP-T":
        "You're practical, analytical, and spontaneous, but may sometimes be too private. Your introverted and sensing nature makes you excellent at solving practical problems.",
      "ESTP-A":
        "You're energetic, practical, and spontaneous, with a love for action and adventure. Your extroverted and sensing nature makes you excellent at thinking on your feet.",
      "ESTP-T":
        "You're energetic, practical, and spontaneous, but may sometimes be too impulsive. Your extroverted and sensing nature makes you excellent at thinking on your feet.",
      "ISFP-A":
        "You're artistic, gentle, and adaptable, with a strong appreciation for beauty. Your introverted and sensing nature makes you excellent at creating and appreciating art.",
      "ISFP-T":
        "You're artistic, gentle, and adaptable, but may sometimes be too sensitive. Your introverted and sensing nature makes you excellent at creating and appreciating art.",
      "ESFP-A":
        "You're spontaneous, enthusiastic, and friendly, with a love for life and people. Your extroverted and sensing nature makes you excellent at entertaining and engaging others.",
      "ESFP-T":
        "You're spontaneous, enthusiastic, and friendly, but may sometimes be too impulsive. Your extroverted and sensing nature makes you excellent at entertaining and engaging others.",
    };

    return (
      descriptions[type] ||
      "A unique combination of personality traits that shapes your approach to life and work."
    );
  }

  getTraitDescription(dimension: string, score: number): string {
    const descriptions: { [key: string]: { high: string; low: string } } = {
      EI: {
        high: "You gain energy from social interaction and prefer group activities",
        low: "You prefer solitary activities and need time alone to recharge",
      },
      SN: {
        high: "You focus on concrete facts and present realities",
        low: "You focus on possibilities and abstract connections",
      },
      TF: {
        high: "You make decisions based on logic and objective analysis",
        low: "You make decisions based on personal values and harmony",
      },
      JP: {
        high: "You prefer structure, planning, and organization",
        low: "You prefer flexibility, adaptability, and spontaneity",
      },
      AT: {
        high: "You are self-assured and resistant to stress",
        low: "You are sensitive to stress and emotionally reactive",
      },
    };

    const trait = descriptions[dimension];
    return score >= 50 ? trait.high : trait.low;
  }
}
