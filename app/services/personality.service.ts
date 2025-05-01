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
  1: {
    dimension: "EI",
    EI: { primaryTrait: "Extraverted", secondaryTrait: "Introverted" },
    SN: { primaryTrait: "Sensing", secondaryTrait: "Intuitive" },
    TF: { primaryTrait: "Thinking", secondaryTrait: "Feeling" },
    JP: { primaryTrait: "Judging", secondaryTrait: "Prospecting" },
    AT: { primaryTrait: "Assertive", secondaryTrait: "Turbulent" },
  },
  // Add more questions...
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

  private calculateTraitPercentages(counters: any): {
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
    const primaryPercentage = (counter.primary / counter.total) * 100;
    const mapping = questionMappings[1];

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
    const type = [
      traits.EI.score >= 50 ? "E" : "I",
      traits.SN.score >= 50 ? "S" : "N",
      traits.TF.score >= 50 ? "T" : "F",
      traits.JP.score >= 50 ? "J" : "P",
      traits.AT.score >= 50 ? "A" : "T",
    ].join("");

    return type;
  }

  private generatePersonalityDescription(type: string): string {
    // Add personality type descriptions here
    const descriptions: { [key: string]: string } = {
      "ENFP-A":
        "Youre likely very adaptable, easygoing and flexible, prioritizing spontaneity over stability. Your extroverted and intuitive nature makes you excellent at reading people and situations.",
      // Add more descriptions for other types...
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
