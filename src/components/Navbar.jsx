import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Sun, Moon, Zap } from 'lucide-react'

const Navbar = ({ onNavigate, currentPage }) => {
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn } = useApp()

  const navLinks = [
    { label: 'Xususiyatlar', id: 'features' },
    { label: 'Narxlar',      id: 'pricing'  },
    { label: 'Hujjatlar',   id: 'docs'     },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
      isDark ? 'bg-gray-950/80 border-white/10 text-white' : 'bg-white/80 border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="gradient-text">NexusAPI</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.id} className={`text-sm font-medium transition-colors hover:text-indigo-400 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              Panelga o'tish
            </button>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className={`hidden md:block px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Kirish
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
              >
                Boshlash
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
