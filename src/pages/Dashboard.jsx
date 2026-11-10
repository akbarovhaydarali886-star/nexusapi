import { useTheme } from '../context/ThemeContext'
import DashboardLayout from '../components/DashboardLayout'
import { Bell, TrendingUp, TrendingDown, Key, AlertTriangle, DollarSign, Users } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { stats, usageData, recentActivity } from '../data/mockData'

const StatCard = ({ label, value, change, up, isDark }) => (
  <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${isDark ? 'bg-white/3 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
    <div className="flex items-center justify-between mb-3">
      <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        up ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
      }`}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </span>
    </div>
    <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{value}</p>
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
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
      {icons[type] || <Key size={16} className="text-indigo-400" />}
    </div>
  )
}

const Dashboard = ({ currentPage, onNavigate }) => {
  const { isDark } = useTheme()

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl border text-xs sm:text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-lg'}`}>
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

  const actions = (
    <button className={`p-2.5 rounded-xl relative transition-colors ${
      isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'
    }`}>
      <Bell size={18} />
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  )

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={onNavigate}
      title="Boshqaruv paneli"
      subtitle="Xush kelibsiz! Platformadagi so'nggi ma'lumotlar va statistika."
      actions={actions}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 sm:mb-8">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} isDark={isDark} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6 sm:mb-8">
        {/* Area Chart */}
        <div className={`xl:col-span-2 p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <h3 className="font-bold text-base sm:text-lg">API Foydalanish va Daromad</h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                So'rovlar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Daromad ($)
              </span>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={customTooltip} />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" fill="url(#indigo)" strokeWidth={2} name="So'rovlar" />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" fill="url(#purple)" strokeWidth={2} name="Daromad ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">So'nggi harakatlar</h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map(item => (
              <div key={item.id} className="flex items-start gap-3">
                <ActivityIcon type={item.type} isDark={isDark} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium leading-snug">{item.message}</p>
                  <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.user}</p>
                </div>
                <span className={`text-[10px] sm:text-xs shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
        <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Oylik daromad dinamikasi ($)</h3>
        <div className="h-52 sm:h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
              <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={customTooltip} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} name="Daromad ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
