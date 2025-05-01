import api from "../lib/axios";

export interface Question {
  id: string;
  text: string;
  category: string;
  class_id: string;
  stream_id: string;
  class_name?: {
    id: number;
    name: string;
  };
  stream_name?: {
    id: number;
    name: string;
  };
  dimension?: string;
  primaryTrait?: string;
  secondaryTrait?: string;
}

export interface CreateQuestionDto {
  text: string;
  category: string;
  class_id: string;
  stream_id: string;
}

// These are sample psychometric questions. Replace with your actual questions.
const defaultQuestions: Question[] = [
  {
    id: "1",
    text: "Do you enjoy building or fixing physical things like tools, machines, or furniture?",
    category: "Realistic,Technical",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "2",
    text: "Do you like solving math or science problems independently?",
    category: "Investigative,Analytical",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "3",
    text: "Do you prefer creative tasks like writing, drawing, or composing music?",
    category: "Artistic,Creative",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "4",
    text: "Are you energized by helping others with their problems or needs?",
    category: "Social,Teaching",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "5",
    text: "Do you enjoy selling, leading, or persuading others?",
    category: "Enterprising,Leadership",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "6",
    text: "Do you prefer organizing files, numbers, or schedules accurately?",
    category: "Conventional,Organized",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "7",
    text: "Do you enjoy fixing or repairing mechanical things?",
    category: "Realistic,Mechanical",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "8",
    text: "Do you like solving complex problems or puzzles?",
    category: "Investigative,Problem-Solving",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "9",
    text: "Are you drawn to activities that allow self-expression?",
    category: "Artistic,Expressive",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "10",
    text: "Do you find satisfaction in helping others with their problems?",
    category: "Social,Helping",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "11",
    text: "Do you enjoy persuading others and selling ideas or products?",
    category: "Enterprising,Persuasive",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },
  {
    id: "12",
    text: "Do you like organizing information and maintaining records?",
    category: "Conventional,Detail-Oriented",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
  },

  {
    id: "13",
    text: "Do you feel energized after spending time with a large group of people?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "EI",
    primaryTrait: "Extraverted",
    secondaryTrait: "Introverted",
  },
  {
    id: "14",
    text: "Do you prefer focusing on concrete facts rather than exploring theoretical concepts?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "SN",
    primaryTrait: "Sensing",
    secondaryTrait: "Intuitive",
  },
  {
    id: "15",
    text: "Do you make decisions based more on logic than personal feelings?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" }, 
    dimension: "TF",
    primaryTrait: "Thinking",
    secondaryTrait: "Feeling",
  },
  {
    id: "16",
    text: "Do you prefer having a detailed plan rather than being spontaneous?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "JP",
    primaryTrait: "Judging",
    secondaryTrait: "Prospecting",
  },
  {
    id: "17",
    text: "Do you generally feel confident in handling stressful situations?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "AT",
    primaryTrait: "Assertive",
    secondaryTrait: "Turbulent",
  },
  {
    id: "18",
    text: "Do you prefer initiating conversations rather than waiting for others to approach you?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "EI",
    primaryTrait: "Extraverted",
    secondaryTrait: "Introverted",
  },
  {
    id: "19",
    text: "Do you trust your instincts and hunches more than direct experiences?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "SN",
    primaryTrait: "Intuitive",
    secondaryTrait: "Sensing",
  },
  {
    id: "20",
    text: "Do you consider how decisions will affect others' feelings before taking action?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "TF",
    primaryTrait: "Feeling",
    secondaryTrait: "Thinking",
  },
  {
    id: "21",
    text: "Do you prefer keeping your options open rather than having things settled?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "JP",
    primaryTrait: "Prospecting",
    secondaryTrait: "Judging",
  },
  {
    id: "22",
    text: "Do you often second-guess your decisions and actions?",
    category: "Personality",
    class_id: "",
    stream_id: "",
    class_name: { id: 0, name: "" },
    stream_name: { id: 0, name: "" },
    dimension: "AT",
    primaryTrait: "Turbulent",
    secondaryTrait: "Assertive",
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
      if (response.data > 0) {
        return response.data;
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
      const categories = questionData.category.split(",").map((c) => c.trim());
      if (categories.length !== 2) {
        throw new Error("Each question must have exactly two categories");
      }

      const response = await api.post("/api/question/", questionData);
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
    id: string,
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
