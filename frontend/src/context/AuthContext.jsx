import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function readSavedUser() {
  try {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(readSavedUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const me = await authApi.me();
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    bootstrap();
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    };

    window.addEventListener('anipick:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('anipick:unauthorized', handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading: authLoading,
      authLoading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === 'ADMIN',
      login: ({ token: nextToken, user: nextUser }) => {
        localStorage.setItem(TOKEN_KEY, nextToken);
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        setToken(nextToken);
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      },
      refreshUser: async () => {
        const me = await authApi.me();
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      },
    }),
    [token, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
