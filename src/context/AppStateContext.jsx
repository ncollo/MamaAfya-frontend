import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'mamaafya-auth';
const LANGUAGE_STORAGE_KEY = 'mamaafya-language';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en');

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const login = async (credentials) => {
    const payload = {
      role: credentials.role,
      fullName: credentials.fullName.trim(),
      email: credentials.email.trim(),
      idNumber: credentials.idNumber.trim(),
      phone: credentials.phone?.trim() || '',
      facility: credentials.facility?.trim() || '',
    };

    let remoteUser = null;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        remoteUser = await response.json();
      }
    } catch {
      remoteUser = null;
    }

    const session = remoteUser?.user
      ? { ...remoteUser.user, role: remoteUser.user.role || payload.role }
      : {
          id: payload.idNumber,
          ...payload,
          assignedMothers: payload.role === 'chw' ? [] : undefined,
        };

    if (remoteUser?.token) {
      session.token = remoteUser.token;
    }

    setUser(session);
    return session;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'sw' : 'en'));
  };

  const value = useMemo(
    () => ({ user, login, logout, language, toggleLanguage, isAuthenticated: Boolean(user) }),
    [user, language]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
