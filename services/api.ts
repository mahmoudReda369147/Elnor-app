const API_URL = 'http://localhost:5000/api';

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    country: string;
    stageNumber: number;
  };
}

interface UserResponse {
  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    country: string;
    stageNumber: number;
  };
}

// Store token in localStorage
const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// API calls
export const api = {
  // Register new user
  register: async (data: {
    fullName: string;
    phoneNumber: string;
    country: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'حدث خطأ في التسجيل');
    }

    setToken(result.token);
    localStorage.setItem('user', JSON.stringify(result.user));

    return result;
  },

  // Login user
  login: async (phoneNumber: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'حدث خطأ في تسجيل الدخول');
    }

    setToken(result.token);
    localStorage.setItem('user', JSON.stringify(result.user));

    return result;
  },

  // Get current user
  getCurrentUser: async (): Promise<UserResponse> => {
    const token = getToken();

    if (!token) {
      throw new Error('لم يتم تسجيل الدخول');
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      removeToken();
      throw new Error(result.message || 'جلسة غير صالحة');
    }

    return result;
  },

  // Logout
  logout: () => {
    removeToken();
  },

  // Check if logged in
  isLoggedIn: (): boolean => {
    return !!getToken();
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update stage number
  updateStage: async (stageNumber: number): Promise<{ message: string; stageNumber: number }> => {
    const token = getToken();

    if (!token) {
      throw new Error('لم يتم تسجيل الدخول');
    }

    const response = await fetch(`${API_URL}/auth/stage`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stageNumber }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'حدث خطأ');
    }

    // Update stored user
    const user = api.getStoredUser();
    if (user) {
      user.stageNumber = stageNumber;
      localStorage.setItem('user', JSON.stringify(user));
    }

    return result;
  },
};

export default api;
