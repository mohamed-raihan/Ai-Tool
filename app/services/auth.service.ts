import api from '../lib/axios';
import { API_URL } from './api_url';


export interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
}

export interface AuthResponse {
  tokens: {
    access: string;
    refresh: string;
    role: string;
  };
  user: {
    id: number | string;
    email: string;
    name: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log(credentials);
    try {
      const response = await api.post<AuthResponse>(API_URL.AUTH.LOGIN, credentials);
      this.setTokens(response.data.tokens.access, response.data.tokens.refresh);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async signup(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(API_URL.AUTH.SIGNUP, data);
      this.setTokens(response.data.tokens.access, response.data.tokens.refresh);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // async logout(): Promise<void> {
  //   try {
  //     const refreshToken = localStorage.getItem('refreshToken');
  //     if (refreshToken) {
  //       await api.post(API_URL.AUTH.LOGOUT, { refreshToken });
  //     }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   } finally {
  //     this.clearTokens();
  //   }
  // }

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post(API_URL.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // async resetPassword(token: string, newPassword: string): Promise<void> {
  //   try {
  //     await api.post(API_URL.AUTH.RESET_PASSWORD, {
  //       token,
  //       newPassword,
  //     });
  //   } catch (error) {
  //     throw this.handleError(error);
  //   }
  // }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'An error occurred';
      return new Error(message);
    }
    if (error.request) {
      // Request made but no response
      return new Error('No response from server');
    }
    // Other errors
    return new Error('Request failed');
  }
}

export const authService = new AuthService(); 