import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from '../src/Providers/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../src/Components/ErrorFallback/ErrorFallback.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  </StrictMode>,
)
