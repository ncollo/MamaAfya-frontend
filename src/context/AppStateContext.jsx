import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'mamaafya-auth';
const LANGUAGE_STORAGE_KEY = 'mamaafya-language';
const PHASE_STORAGE_KEY = 'mamaafya-phase';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
  );

  const [phase, setPhaseState] = useState(() => {
    const storedPhase = localStorage.getItem(PHASE_STORAGE_KEY);
    if (storedPhase === 'antenatal' || storedPhase === 'postpartum') {
      return storedPhase;
    }
    return 'antenatal';
  });

  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced' | 'pending'

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      // Auto sync phase from mother profile if available
      if (user.pregnancy_status) {
        setPhaseState(user.pregnancy_status);
        localStorage.setItem(PHASE_STORAGE_KEY, user.pregnancy_status);
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const setPhase = (newPhase) => {
    if (newPhase === 'antenatal' || newPhase === 'postpartum') {
      setPhaseState(newPhase);
      localStorage.setItem(PHASE_STORAGE_KEY, newPhase);
    }
  };

  const togglePhase = () => {
    const nextPhase = phase === 'antenatal' ? 'postpartum' : 'antenatal';
    setPhase(nextPhase);
  };

  const login = async (credentials) => {
    setSyncStatus('pending');
    const payload = {
      role: credentials.role,
      fullName: credentials.fullName?.trim() || '',
      email: credentials.email?.trim() || '',
      idNumber: credentials.idNumber?.trim() || '',
      phone: credentials.phone?.trim() || '',
      facility: credentials.facility?.trim() || '',
      identifier: credentials.email?.trim() || credentials.phone?.trim() || credentials.idNumber?.trim(),
      password: credentials.password || 'password123',
    };

    let remoteUser = null;

    try {
      const response = await fetch('/api/auth/login-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        remoteUser = data.user;
        remoteUser.token = data.access_token;
      }
    } catch {
      // Offline fallback
      remoteUser = null;
    }

    const session = remoteUser
      ? { ...remoteUser, role: remoteUser.role || payload.role }
      : {
          id: payload.idNumber || 'demo-user',
          full_name: payload.fullName || (payload.role === 'chw' ? 'Jane Mutua' : 'Amina Wanjiru'),
          email: payload.email,
          phone_number: payload.phone,
          role: payload.role,
          location: payload.facility || 'Nairobi, Kenya',
        };

    // If mother, attempt to fetch her medical profile to obtain real pregnancy phase
    if (session.role === 'mother' && session.token) {
      try {
        const profRes = await fetch('/api/mothers/profile', {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        if (profRes.ok) {
          const profData = await profRes.json();
          session.profile = profData;
          if (profData.pregnancy_status) {
            setPhase(profData.pregnancy_status);
          }
        }
      } catch (err) {
        console.warn('Could not fetch mother profile:', err);
      }
    }

    setUser(session);
    setSyncStatus('synced');
    return session;
  };

  const recordDelivery = async (deliveryDate, notes) => {
    setSyncStatus('pending');
    let success = false;
    if (user?.token) {
      try {
        const res = await fetch('/api/mothers/record-delivery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            delivery_date: deliveryDate || new Date().toISOString().split('T')[0],
            notes: notes || 'Delivery recorded via MamaAfya Web App',
          }),
        });
        if (res.ok) {
          success = true;
        }
      } catch (err) {
        console.warn('Failed to record delivery on backend:', err);
      }
    }
    // Visually update phase immediately regardless of network status (offline resilience)
    setPhase('postpartum');
    setSyncStatus('synced');
    return success;
  };

  const logout = () => {
    setUser(null);
    setPhaseState('antenatal');
    localStorage.removeItem(PHASE_STORAGE_KEY);
  };

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'sw' : 'en'));
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      language,
      toggleLanguage,
      phase,
      setPhase,
      togglePhase,
      syncStatus,
      setSyncStatus,
      recordDelivery,
      isAuthenticated: Boolean(user),
    }),
    [user, language, phase, syncStatus]
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
