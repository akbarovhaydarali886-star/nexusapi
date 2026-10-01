import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import { Sun, Moon, TrendingUp } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { usageData, validationData } from '../data/mockData'

const planDistribution = [
  { name: 'Enterprise', value: 45, color: '#a855f7' },
  { name: 'Pro', value: 35, color: '#6366f1' },
  { name: 'Starter', value: 20, color: '#64748b' },
]

const topUsers = [
  { name: 'NeuralNet Labs', requests: 4520000 },
  { name: 'DataFlow Systems', requests: 2890000 },
  { name: 'Elon Musk Corp', requests: 1284930 },
  { name: 'TechStartup Inc', requests: 450000 },
  { name: 'AppWorks Studio', requests: 78400 },
]

const AnalyticsPage = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()

  const tooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className={`p-3 rounded-xl border text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 shadow-lg text-gray-900'}`}>
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
        <div className={`p-3 rounded-xl border text-sm ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 shadow-lg text-gray-900'}`}>
          <p>{payload[0].name}: {payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Real-time insights across all metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <select className={`px-3 py-2 rounded-lg text-sm border outline-none ${isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Row 1: Area + Pie */}
        <div className="grid xl:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend */}
          <div className={`xl:col-span-2 p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className="font-bold mb-6">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
                <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={tooltip} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#rev)" strokeWidth={2.5} name="Revenue $" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className="font-bold mb-6">Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {planDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={pieTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {planDistribution.map(p => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-bold">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Validation + Top Users */}
        <div className="grid xl:grid-cols-2 gap-6 mb-6">
          {/* Validation Rate */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className="font-bold mb-6">Validation Rate (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={validationData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
                <XAxis dataKey="time" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} domain={[90, 100]} />
                <Tooltip content={tooltip} />
                <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={false} name="Success %" />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} name="Failed %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Users */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
            <h3 className="font-bold mb-6">Top Users by API Usage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topUsers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} horizontal={false} />
                <XAxis type="number" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip content={tooltip} />
                <Bar dataKey="requests" fill="#a855f7" radius={[0, 6, 6, 0]} name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Volume Bar Chart */}
        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className="font-bold mb-6">Monthly Request Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff08' : '#f0f0f0'} />
              <XAxis dataKey="month" tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={tooltip} />
              <Bar dataKey="requests" radius={[6, 6, 0, 0]} name="Requests">
                {usageData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${245 + i * 8}, 80%, ${55 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
