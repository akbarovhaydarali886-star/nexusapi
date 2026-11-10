import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from './Sidebar'
import { Menu, Sun, Moon, Zap } from 'lucide-react'

const DashboardLayout = ({
  currentPage,
  onNavigate,
  title,
  subtitle,
  children,
  actions
}) => {
  const { isDark, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar with drawer support */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        {/* Mobile top bar (< lg) */}
        <header className={`lg:hidden sticky top-0 z-30 h-16 px-4 flex items-center justify-between border-b backdrop-blur-xl ${
          isDark ? 'bg-gray-950/85 border-white/10 text-white' : 'bg-white/85 border-gray-200 text-gray-900'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-xl transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              aria-label="Menyuni ochish"
            >
              <Menu size={20} />
            </button>
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <span className="gradient-text font-bold">NexusAPI</span>
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'bg-white/10 text-yellow-400' : 'bg-gray-100 text-gray-600'
            }`}
            aria-label="Tema"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Page Header (desktop & mobile) */}
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="min-w-0">
                {title && <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">{title}</h1>}
                {subtitle && (
                  <p className={`text-xs sm:text-sm mt-1 truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Desktop Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className={`hidden lg:flex p-2.5 rounded-xl transition-colors ${
                    isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 shadow-sm'
                  }`}
                  title="Temani almashtirish"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                {actions}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
