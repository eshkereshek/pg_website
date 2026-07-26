import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// Использовать URL из .env (VITE_API_URL) или запасной локальный хост
export const API_URL = import.meta.env.VITE_API_URL || 'https://pg-sync-server.onrender.com/api';

export interface User {
  username: string;
  skinUrl: string | null;
  capeUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('pg_token'));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pg_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          });
          setUser(res.data);
          localStorage.setItem('pg_user', JSON.stringify(res.data));
        } catch (error: any) {
          console.error("Token verification failed", error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            logout();
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem('pg_user');
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [token]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('pg_token', newToken);
    localStorage.setItem('pg_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pg_token');
    localStorage.removeItem('pg_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: User) => {
    localStorage.setItem('pg_user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      updateUser,
      isAuthenticated: !!token,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
