import api from "../lib/axios";

export interface Question {
  id: number | string;
  text: string;
  category: { id: number; name: string; description: string | null; careers: [] };
  class_name: { id: number; name: string };
  stream_name: { id: number; name: string };
  dimension?: string | null;
  primary_trait?: string | null;
  secondary_trait?: string | null;
}

export interface CreateQuestionDto {
  text: string;
  category_id: string;
  class_id: string;
  stream_id: string;
}

// These are sample psychometric questions. Replace with your actual questions.
const defaultQuestions: Question[] = [
  {
    id: 1,
    text: "Are you interested in how machines or software work under the hood?",
    category: { id: 4, name: "Realistic", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Technical",
    secondary_trait: "Analytical",
  },
  {
    id: 2,
    text: "Do you like solving science or logic problems that require deep thinking?",
    category: { id: 11, name: "Investigative", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Investigative",
    secondary_trait: "Scientific Thinking",
  },
  {
    id: 3,
    text: "Do you prefer creative tasks like writing, drawing, or composing music?",
    category: { id: 4, name: "Artistic", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 4,
    text: "Do you feel energized when interacting with other people or working in teams?",
    category: { id: 19, name: "Social", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Social",
    secondary_trait: "Teamwork",
  },
  {
    id: 5,
    text: "Do you enjoy selling, leading, or persuading others?",
    category: { id: 6, name: "Enterprising", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 6,
    text: "Do you prefer organizing files, numbers, or schedules accurately?",
    category: { id: 7, name: "Conventional", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 7,
    text: "Do you enjoy building or configuring things like computers, electronics, or apps?",
    category: { id: 4, name: "Realistic", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Technical",
    secondary_trait: "Hands-On",
  },
  {
    id: 8,
    text: "Do you like solving complex problems or puzzles?",
    category: { id: 3, name: "Investigative", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 9,
    text: "Are you drawn to activities that allow self-expression?",
    category: { id: 4, name: "Artistic", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 10,
    text: "Do you find satisfaction in helping others with their problems?",
    category: { id: 5, name: "Social", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 11,
    text: "Do you enjoy persuading others and selling ideas or products?",
    category: { id: 6, name: "Enterprising", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },
  {
    id: 12,
    text: "Do you like organizing information and maintaining records?",
    category: { id: 7, name: "Conventional", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: null,
    secondary_trait: null,
  },

  {
    id: 13,
    text: "Do you feel energized after spending time with a large group of people?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "EI",
    primary_trait: "Extraverted",
    secondary_trait: "Introverted",
  },
  {
    id: 14,
    text: "Do you prefer focusing on concrete facts rather than exploring theoretical concepts?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "SN",
    primary_trait: "Sensing",
    secondary_trait: "Intuitive",
  },
  {
    id: 15,
    text: "Do you make decisions based more on logic than personal feelings?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "TF",
    primary_trait: "Thinking",
    secondary_trait: "Feeling",
  },
  {
    id: 16,
    text: "Do you prefer having a detailed plan rather than being spontaneous?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "JP",
    primary_trait: "Judging",
    secondary_trait: "Prospecting",
  },
  {
    id: 17,
    text: "Do you generally feel confident in handling stressful situations?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "AT",
    primary_trait: "Assertive",
    secondary_trait: "Turbulent",
  },
  {
    id: 18,
    text: "Do you prefer initiating conversations rather than waiting for others to approach you?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "EI",
    primary_trait: "Extraverted",
    secondary_trait: "Introverted",
  },
  {
    id: 19,
    text: "Do you trust your instincts and hunches more than direct experiences?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "SN",
    primary_trait: "Intuitive",
    secondary_trait: "Sensing",
  },
  {
    id: 20,
    text: "Do you consider how decisions will affect others' feelings before taking action?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "TF",
    primary_trait: "Feeling",
    secondary_trait: "Thinking",
  },
  {
    id: 21,
    text: "Do you prefer keeping your options open rather than having things settled?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "JP",
    primary_trait: "Prospecting",
    secondary_trait: "Judging",
  },
  {
    id: 22,
    text: "Do you often second-guess your decisions and actions?",
    category: { id: 8, name: "Personality", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: "AT",
    primary_trait: "Turbulent",
    secondary_trait: "Assertive",
  },
  {
    id: 23,
    text: "Do you enjoy planning ahead and thinking about long-term outcomes?",
    category: { id: 18, name: "Strategic", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Strategic",
    secondary_trait: "Planning",
  },
  {
    id: 24,
    text: "Do you enjoy investigating how things work and looking for patterns in data or behavior?",
    category: { id: 20, name: "Research", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Research",
    secondary_trait: "Curiosity",
  },
  {
    id: 25,
    text: "Do you feel connected to nature and enjoy spending time in natural surroundings?",
    category: { id: 21, name: "Nature-Oriented", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Nature-Oriented",
    secondary_trait: "Environmental Awareness",
  },
  {
    id: 26,
    text: "Do people often turn to you for emotional support or advice?",
    category: { id: 6, name: "Emotional Intelligence", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Emotional Intelligence",
    secondary_trait: "Social Sensitivity",
  },
  {
    id: 27,
    text: "Do you enjoy working with colors, patterns, and layouts?",
    category: { id: 10, name: "Visual", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Visual",
    secondary_trait: "Design-Oriented",
  },
  {
    id: 28,
    text: "Do you enjoy explaining ideas clearly to others?",
    category: { id: 17, name: "Communication", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Communication",
    secondary_trait: "Clarity",
  },
  {
    id: 29,
    text: "Do you enjoy expressing yourself through art, writing, or other creative activities?",
    category: { id: 16, name: "Creative", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Creative",
    secondary_trait: "Expression",
  },
  {
    id: 30,
    text: "Do you enjoy investigating how things work and looking for patterns in data or behavior?",
    category: { id: 20, name: "Research", description: null, careers: [] },
    class_name: { id: 1, name: "10th" },
    stream_name: { id: 1, name: "CBSE (10th)" },
    dimension: null,
    primary_trait: "Research",
    secondary_trait: "Curiosity",
  },

  // {
  //   id: "13",
  //   text: "Do you prefer hands-on activities and working outdoors?",
  //   category: "Realistic,Practical",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "14",
  //   text: "Are you curious about understanding how things work?",
  //   category: "Investigative,Scientific",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "15",
  //   text: "Do you enjoy designing or creating new things?",
  //   category: "Artistic,Innovative",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "16",
  //   text: "Do you like working in team environments and collaborating with others?",
  //   category: "Social,Cooperative",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "17",
  //   text: "Are you comfortable making decisions that affect others?",
  //   category: "Enterprising,Decision-Making",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "18",
  //   text: "Do you prefer following established procedures and guidelines?",
  //   category: "Conventional,Systematic",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "19",
  //   text: "Do you enjoy starting and managing your own projects?",
  //   category: "Enterprising,Initiative",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
  // {
  //   id: "20",
  //   text: "Do you like analyzing data and working with numbers?",
  //   category: "Investigative,Analytical",
  //   class_id: "",
  //   stream_id: "",
  //   class_name: { id: 0, name: "" },
  //   stream_name: { id: 0, name: "" },
  // },
];

export const questionsService = {
  async getQuestions(): Promise<Question[]> {
    try {
      const response = await api.get("/api/question/");
      console.log(response.data);
      if (response.data.length > 0) {
        console.log(defaultQuestions);
        return defaultQuestions;
        // return response.data;
      } else {
        return defaultQuestions;
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Fallback to default questions if API fails
      return defaultQuestions;
    }
  },

  async createQuestion(questionData: CreateQuestionDto): Promise<Question> {
    try {
      // Validate categories
      // const categories = questionData.category.split(",").map((c) => c.trim());
      // if (categories.length !== 2) {
      //   throw new Error("Each question must have exactly two categories");
      // }
      console.log(questionData);
      const response = await api.post("/api/question/", questionData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  async deleteQuestion(id: string): Promise<void> {
    try {
      await api.delete(`/api/question/${id}/`);
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  },

  async updateQuestion(
    id: string | number,
    questionData: CreateQuestionDto
  ): Promise<Question> {
    try {
      const response = await api.put(`/api/question/${id}/`, questionData);
      return response.data;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  },
};
