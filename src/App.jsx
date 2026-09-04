import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { I18nProvider } from './context/I18nContext'
import { ProgressProvider } from './context/ProgressContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/layout/ErrorBoundary'
import AppRoutes from './routes'

/**
 * Ilova ildizi — provayderlar tartibi:
 * Theme → I18n → Toast → Auth → Progress → Router
 */
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>
            <AuthProvider>
              <ProgressProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </ProgressProvider>
            </AuthProvider>
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
