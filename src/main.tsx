import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { AuthProvider } from './context/AuthContext'
import { CryptoProvider } from './context/CryptoContext'
import { ThemeProvider } from './styles/ThemeContext'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CryptoProvider>
          <App />
        </CryptoProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
