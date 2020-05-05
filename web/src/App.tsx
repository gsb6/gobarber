import React from 'react';

import { AuthProvider } from './hooks/Auth';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  );
};

export default App;
