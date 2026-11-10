import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Sun, Moon, Zap, Menu, X } from 'lucide-react'

const Navbar = ({ onNavigate, currentPage }) => {
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Xususiyatlar', id: 'features' },
    { label: 'Narxlar',      id: 'pricing'  },
    { label: 'Hujjatlar',   id: 'docs'     },
  ]

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors ${
      isDark ? 'bg-gray-950/85 border-white/10 text-white' : 'bg-white/85 border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <span className="gradient-text">NexusAPI</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop actions & theme */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title="Temani almashtirish"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              Panelga o'tish
            </button>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Kirish
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
              >
                Boshlash
              </button>
            </>
          )}
        </div>

        {/* Mobile buttons: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-white/10 text-yellow-400' : 'bg-gray-100 text-gray-600'
            }`}
            aria-label="Tema"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
            }`}
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 transition-all ${
          isDark ? 'bg-gray-950/95 border-white/10' : 'bg-white/95 border-gray-200'
        }`}>
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-inherit flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigate('dashboard')
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center"
              >
                Panelga o'tish
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onNavigate('login')
                  }}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium border text-center transition-colors ${
                    isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Kirish
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onNavigate('login')
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center"
                >
                  Boshlash
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
