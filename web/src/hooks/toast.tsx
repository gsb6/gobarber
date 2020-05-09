import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface Toast {
  addToast(message: Omit<Message, 'id'>): void;
  removeToast(id: string): void;
}

export interface Message {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

const ToastContext = createContext<Toast>({} as Toast);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<Message, 'id'>) => {
      const id = uuid();

      const newToast = {
        id,
        type,
        title,
        description,
      };

      setMessages((oldMessages) => [...oldMessages, newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): Toast => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must bem used within a ToastProvider');
  }

  return context;
};
