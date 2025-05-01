import api from "../lib/axios";

export interface Career {
  id?: string;
  name: string;
  description: string;
  education_pathway: string[];
  category: string;
}

class CareerService {
  private baseUrl = "/api/careers/";

  async getCareers(): Promise<Career[]> {
    try {
      const { data } = await api.get(this.baseUrl);
      return data;
    } catch (error) {
      console.error("Error fetching careers:", error);
      throw error;
    }
  }

  async createCareer(career: Career): Promise<Career> {
    try {
      const { data } = await api.post(this.baseUrl, career);
      return data;
    } catch (error) {
      console.error("Error creating career:", error);
      throw error;
    }
  }

  async updateCareer(id: string, career: Career): Promise<Career> {
    try {
      const { data } = await api.patch(`${this.baseUrl}${id}/`, career);
      return data;
    } catch (error) {
      console.error("Error updating career:", error);
      throw error;
    }
  }

  async deleteCareer(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}${id}/`);
    } catch (error) {
      console.error("Error deleting career:", error);
      throw error;
    }
  }
}

export const careerService = new CareerService();
