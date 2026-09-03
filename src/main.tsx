import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './contexts/UserContexts.tsx'
import { ToastProvider } from '@heroui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ToastProvider />
      <App />
    </UserProvider>
  </StrictMode>,
)
