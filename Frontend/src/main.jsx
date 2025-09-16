import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from '../src/Providers/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorFallback } from '../src/Components/ErrorFallback/ErrorFallback.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ErrorFallback>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorFallback>
    </AuthProvider>
  </StrictMode>,
)
