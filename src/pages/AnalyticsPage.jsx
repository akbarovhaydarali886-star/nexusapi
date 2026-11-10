import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import DashboardLayout from '../components/DashboardLayout'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { usageData, validationData } from '../data/mockData'

const planDistribution = [
  { name: 'Enterprise', value: 45, color: '#a855f7' },
  { name: 'Pro', value: 35, color: '#6366f1' },
  { name: 'Starter', value: 20, color: '#64748b' },
]

const topUsers = [
  { name: 'NeuralNet Labs', requests: 4520000 },
  { name: 'DataFlow Sys', requests: 2890000 },
  { name: 'Elon Musk Corp', requests: 1284930 },
  { name: 'TechStartup Inc', requests: 450000 },
  { name: 'AppWorks Studio', requests: 78400 },
]

const AnalyticsPage = ({ currentPage, onNavigate }) => {
  const { isDark } = useTheme()
  const [period, setPeriod] = useState('7m')

  const tooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className={`p-3 rounded-xl border text-xs sm:text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 shadow-lg text-gray-900'}`}>
          <p className="font-semibold mb-1">{label}</p>
          {payload.map(p => (
            <p key={p.name} style={{ color: p.color || p.fill }}>
              {p.name}: {p.value?.toLocaleString ? p.value.toLocaleString() : p.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const pieTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className={`p-2.5 rounded-xl border text-xs sm:text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 shadow-lg text-gray-900'}`}>
          <p className="font-semibold">{payload[0].name}: {payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  const actions = (
    <select
      value={period}
      onChange={e => setPeriod(e.target.value)}
      className={`px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none font-medium transition-colors ${
        isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-sm'
      }`}
    >
      <option value="7m">Oxirgi 7 oy</option>
      <option value="30d">Oxirgi 30 kun</option>
      <option value="1y">O'tgan yil</option>
    </select>
  )

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={onNavigate}
      title="Tahlil va Metrikalar"
      subtitle="Barcha ko'rsatkichlar va API faoliyati bo'yicha real vaqtdagi tahlil"
      actions={actions}
    >
      {/* Row 1: Area + Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className={`xl:col-span-2 p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="font-bold text-base sm:text-lg">Daromad o'sish tendensiyasi ($)</h3>
            <span className="text-xs text-indigo-400 font-semibold">+24.8% bu oy</span>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
                <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={tooltip} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#rev)" strokeWidth={2.5} name="Daromad ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 flex flex-col justify-between ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className="font-bold text-base sm:text-lg mb-2">Tariflar taqsimoti</h3>
          <div className="h-44 sm:h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {planDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={pieTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 pt-2 border-t border-inherit">
            {planDistribution.map(p => (
              <div key={p.name} className="flex items-center justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ background: p.color }} />
                  {p.name}
                </span>
                <span className="font-bold">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Validation + Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Validation Rate */}
        <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="font-bold text-base sm:text-lg">Validatsiya darajasi (24 soat)</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Muvaffaqiyatli
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400" /> Xatolik
              </span>
            </div>
          </div>
          <div className="h-52 sm:h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={validationData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
                <XAxis dataKey="time" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} domain={[90, 100]} />
                <Tooltip content={tooltip} />
                <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={false} name="Muvaffaqiyatli %" />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} name="Xato %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users */}
        <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Eng faol mijozlar (So'rovlar soni)</h3>
          <div className="h-52 sm:h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topUsers} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} horizontal={false} />
                <XAxis type="number" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={tooltip} />
                <Bar dataKey="requests" fill="#a855f7" radius={[0, 6, 6, 0]} name="So'rovlar" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Request Volume Bar Chart */}
      <div className={`p-4 sm:p-6 rounded-2xl border min-w-0 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
        <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Oylik so'rovlar hajmi</h3>
        <div className="h-52 sm:h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
              <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={tooltip} />
              <Bar dataKey="requests" radius={[6, 6, 0, 0]} name="So'rovlar">
                {usageData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${245 + i * 8}, 80%, ${55 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AnalyticsPage
