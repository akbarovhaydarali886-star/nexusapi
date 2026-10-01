import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider, useApp } from './context/AppContext'
import ToastContainer from './components/ToastContainer'
import LandingPage  from './pages/LandingPage'
import LoginPage    from './pages/LoginPage'
import Dashboard    from './pages/Dashboard'
import ApiKeysPage  from './pages/ApiKeysPage'
import CRMPage      from './pages/CRMPage'
import BillingPage  from './pages/BillingPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import './index.css'

// Dashboard sahifalariga faqat login qilgan foydalanuvchi kira oladi
const ProtectedRoute = ({ children, onNavigate }) => {
  const { isLoggedIn } = useApp()
  if (!isLoggedIn) {
    onNavigate('login')
    return null
  }
  return children
}

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const dashboardPages = ['dashboard', 'keys', 'customers', 'billing', 'analytics', 'settings']

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />

      case 'login':
        return <LoginPage onNavigate={navigate} />

      case 'dashboard':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <Dashboard currentPage="dashboard" onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'keys':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <ApiKeysPage currentPage="keys" onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'customers':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <CRMPage currentPage="customers" onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'billing':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <BillingPage currentPage="billing" onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'analytics':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <AnalyticsPage currentPage="analytics" onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'settings':
        return (
          <ProtectedRoute onNavigate={navigate}>
            <SettingsPage currentPage="settings" onNavigate={navigate} />
          </ProtectedRoute>
        )
      default:
        return <LandingPage onNavigate={navigate} />
    }
  }

  return (
    <>
      {renderPage()}
      <ToastContainer />
    </>
  )
}

const App = () => (
  <ThemeProvider>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </ThemeProvider>
)

export default App
