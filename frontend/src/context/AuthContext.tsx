import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, company: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kamdaengineering.onrender.com/api';
const API_URL = `${API_BASE_URL}/auth`;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restore session
    try {
      const sessionUser = localStorage.getItem('kamda_user');
      const sessionToken = localStorage.getItem('kamda_token');
      if (sessionUser && sessionToken) {
        setUser(JSON.parse(sessionUser));
        setToken(sessionToken);
      }
    } catch {
      localStorage.removeItem('kamda_user');
      localStorage.removeItem('kamda_token');
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }
      
      if (!response.ok) {
        return { success: false, error: data?.message || `Login failed (${response.status})` };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('kamda_user', JSON.stringify(data.user));
      localStorage.setItem('kamda_token', data.token);

      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    company: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company, role })
      });
      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return { success: false, error: data?.message || `Signup failed (${response.status})` };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('kamda_user', JSON.stringify(data.user));
      localStorage.setItem('kamda_token', data.token);

      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kamda_user');
    localStorage.removeItem('kamda_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
