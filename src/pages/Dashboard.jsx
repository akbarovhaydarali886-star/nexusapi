import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import { Sun, Moon, Bell, TrendingUp, TrendingDown, Key, AlertTriangle, DollarSign, Users, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { stats, usageData, recentActivity } from '../data/mockData'

const StatCard = ({ label, value, change, up, isDark }) => (
  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
    <div className="flex items-center justify-between mb-3">
      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
        up ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
      }`}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </span>
    </div>
    <p className="text-3xl font-extrabold">{value}</p>
  </div>
)

const ActivityIcon = ({ type, isDark }) => {
  const icons = {
    key_created: <Key size={16} className="text-indigo-400" />,
    validation_failed: <AlertTriangle size={16} className="text-red-400" />,
    payment: <DollarSign size={16} className="text-emerald-400" />,
    key_revoked: <Key size={16} className="text-orange-400" />,
    new_user: <Users size={16} className="text-blue-400" />,
  }
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
      {icons[type]}
    </div>
  )
}

const Dashboard = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl border text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-lg'}`}>
          <p className="font-semibold mb-1">{label}</p>
          {payload.map(p => (
            <p key={p.name} style={{ color: p.color }}>
              {p.name}: {typeof p.value === 'number' && p.value > 1000
                ? p.value.toLocaleString()
                : p.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Welcome back, Admin! Here's what's happening.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`p-2 rounded-lg relative ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <StatCard key={stat.label} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Area Chart */}
          <div className={`xl:col-span-2 p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">API Usage & Revenue</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />Requests</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />Revenue</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="indigo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
                <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={customTooltip} />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="url(#indigo)" strokeWidth={2} name="Requests" />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" fill="url(#purple)" strokeWidth={2} name="Revenue $" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Feed */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <ActivityIcon type={item.type} isDark={isDark} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.message}</p>
                    <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.user}</p>
                  </div>
                  <span className={`text-xs shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className="font-bold text-lg mb-6">Monthly Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
              <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} name="Revenue $" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
