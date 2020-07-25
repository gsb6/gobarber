import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

interface Auth {
  user: User;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (!token || !user) {
      return {} as AuthState;
    }

    return {
      token,
      user: JSON.parse(user),
    };
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): Auth => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
