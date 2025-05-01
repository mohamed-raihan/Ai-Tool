// import { axiosInstance } from '../lib/axios';

import api from "../lib/axios";


interface BasicDetails {
  name: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  password: string;
  role: string;
  class_id: string;
  stream_id: string;
}

interface RegisterResponse {
  tokens: {
    access: string;
  };
  id: number;
}

interface PersonalDetails {
  hobbies: string;
  curicular_activities: string;
  achievements: string;
  internship_projects: string;
  languages_known: string;
}

interface EducationDetails {
  studying_in: string;
  specification: string;
  college: string;
  course: string;
  passing_year: string;
  university: string;
  planning_to_study: boolean;
  preparing_for_entrance_exam: boolean;
}

export const studentService = {
  async updateBasicDetails(data: BasicDetails) {
    try {
      // First register the user
      const registerData = {
        name: data.name,
        phone_number: data.phone,
        email: data.email,
        password: data.password,
        role: data.role || 'student'
      };

      // Register the user and get the access token
      const registerResponse = await api.post<RegisterResponse>('/api/register/', registerData);
      console.log('Register Response:', registerResponse);
      
      if (!registerResponse.data?.tokens?.access) {
        throw new Error('Invalid response structure: tokens.access not found');
      }
      
      const accessToken = registerResponse.data.tokens.access;
      const studentId = registerResponse.data.id;

      // Set the access token in the headers for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log(data);
      
      // Then create student profile
      const studentData = {
        student: studentId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        dob: data.dob,
        address: data.address,
        class_id: data.class_id,
        stream_id: data.stream_id
      };

      console.log(studentData);
      
      const response = await api.post('/api/student/', studentData);
      return { data: response.data, accessToken, studentId };
    } catch (error) {
      throw error;
    }
  },

  async updatePersonalDetails(data: PersonalDetails, studentId: number) {
    try {
      const response = await api.post('/api/personal/', { ...data, student: studentId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateEducationDetails(data: EducationDetails, studentId: number) {
    try {
      const response = await api.post('/api/education/', { ...data, student: studentId });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 