import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, Key, Users, CreditCard,
  BarChart3, Settings, Zap, LogOut, ChevronRight
} from 'lucide-react'

const Sidebar = ({ currentPage, onNavigate }) => {
  const { isDark } = useTheme()
  const { logout, currentUser } = useApp()

  const menuItems = [
    { id: 'dashboard', label: 'Boshqaruv paneli', icon: LayoutDashboard },
    { id: 'keys',      label: 'API Keylar',       icon: Key },
    { id: 'customers', label: 'CRM — Mijozlar',   icon: Users },
    { id: 'billing',   label: 'Hisob-kitob',      icon: CreditCard },
    { id: 'analytics', label: 'Tahlil',           icon: BarChart3 },
    { id: 'settings',  label: 'Sozlamalar',       icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    onNavigate('landing')
  }

  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AD'

  return (
    <aside className={`w-64 h-screen fixed left-0 top-0 flex flex-col border-r z-40 ${
      isDark ? 'bg-gray-950 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
    }`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-inherit shrink-0">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="gradient-text">NexusAPI</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = currentPage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400 border border-indigo-500/30'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-indigo-400' : ''} />
              <span className="flex-1 text-left">{label}</span>
              {isActive && <ChevronRight size={14} className="text-indigo-400" />}
            </button>
          )
        })}
      </nav>

      {/* User section */}
      <div className={`p-4 border-t shrink-0 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {currentUser?.name || 'Admin Foydalanuvchi'}
            </p>
            <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {currentUser?.email || 'admin@nexusapi.io'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isDark
              ? 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
              : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <LogOut size={16} />
          Tizimdan chiqish
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
