import { SessionManager } from '@/utils/sessionManager';

const API_BASE_URL = import.meta.env.VITE_AKU_API_URL || 'https://api.localhost';

interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gradeLevel?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

interface ApiError {
  error: string;
}

interface StudentApiResponse {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  grade_level?: string;
  student_competency_level_theta?: number;
  has_taken_onboarding_assessment?: boolean;
  //city?: string;
  //region?: string;
  //school?: string;
  //has_consent?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface CourseApiResponse {
  id: string;
  name: string;
  description?: string;
  grade_level: string;
  subject_area?: string;
  is_available: boolean;
  course_competency_level_theta: number;
  competency_percentage: number;
  created_at?: string;
  updated_at?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Get access token from session manager
    const accessToken = SessionManager.getAccessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Signup failed');
    }

    return result;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    return result;
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Logout failed');
    }
  }

  async getStudentData(userId: string): Promise<StudentApiResponse> {
    const response = await fetch(`${this.baseUrl}/api/students/${userId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch student data');
    }

    return result;
  }

  async updateStudentData(userId: string, updates: Partial<StudentApiResponse>): Promise<StudentApiResponse> {
    const response = await fetch(`${this.baseUrl}/api/students/${userId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(updates),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update student data');
    }

    return result;
  }

  async getStudentCourses(userId: string): Promise<CourseApiResponse[]> {
    const response = await fetch(`${this.baseUrl}/api/students/${userId}/courses`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch student courses');
    }

    return result;
  }

}

export const apiService = new ApiService();
export type { SignupRequest, LoginRequest, AuthResponse, ApiError, StudentApiResponse, CourseApiResponse };
