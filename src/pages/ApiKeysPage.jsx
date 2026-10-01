import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/Sidebar'
import {
  Sun, Moon, Plus, Copy, Eye, EyeOff, Trash2,
  RefreshCw, Search, Filter, ToggleLeft, ToggleRight,
  Key, AlertCircle, CheckCircle
} from 'lucide-react'

const StatusBadge = ({ status }) => {
  const colors = {
    active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    suspended: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    expired: 'text-red-400 bg-red-400/10 border-red-400/20',
  }
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${colors[status] || colors.expired}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const PlanBadge = ({ plan }) => {
  const colors = {
    Enterprise: 'text-purple-400 bg-purple-400/10',
    Pro: 'text-indigo-400 bg-indigo-400/10',
    Starter: 'text-gray-400 bg-gray-400/10',
  }
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors[plan] || colors.Starter}`}>
      {plan}
    </span>
  )
}

const CUSTOMERS = ['Elon Musk Corp', 'TechStartup Inc', 'DataFlow Systems', 'NeuralNet Labs', 'AppWorks Studio']

const ApiKeysPage = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()
  const { keys, createKey, deleteKey, toggleKeyStatus, revokeKey, addToast } = useApp()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showKey, setShowKey] = useState({})
  const [copied, setCopied] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [form, setForm] = useState({ name: '', customer: CUSTOMERS[0], plan: 'Starter' })

  const filtered = keys.filter(k => {
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.user.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || k.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleCopy = (id, key) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopied(id)
      addToast('API key clipboard ga nusxalandi!', 'info')
      setTimeout(() => setCopied(null), 2000)
    }).catch(() => addToast('Nusxalash muvaffaqiyatsiz', 'error'))
  }

  const toggleShow = (id) => setShowKey(prev => ({ ...prev, [id]: !prev[id] }))

  const handleCreate = () => {
    if (!form.name.trim()) {
      addToast('Key nomini kiriting!', 'error')
      return
    }
    createKey({ name: form.name, customer: form.customer, plan: form.plan })
    setShowModal(false)
    setForm({ name: '', customer: CUSTOMERS[0], plan: 'Starter' })
  }

  const handleDelete = (id) => {
    deleteKey(id)
    setConfirmDelete(null)
  }

  const usagePct = (used, limit) => Math.min(Math.round((used / limit) * 100), 100)

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {keys.filter(k => k.status === 'active').length} active / {keys.length} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> New API Key
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active', count: keys.filter(k => k.status === 'active').length, color: 'text-emerald-400', filter: 'active' },
            { label: 'Suspended', count: keys.filter(k => k.status === 'suspended').length, color: 'text-orange-400', filter: 'suspended' },
            { label: 'Expired', count: keys.filter(k => k.status === 'expired').length, color: 'text-red-400', filter: 'expired' },
            { label: 'Total', count: keys.length, color: 'text-indigo-400', filter: 'all' },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setStatusFilter(s.filter)}
              className={`p-4 rounded-xl border text-left transition-all ${
                statusFilter === s.filter
                  ? isDark ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-indigo-300 bg-indigo-50'
                  : isDark ? 'bg-white/3 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className={`flex items-center gap-3 mb-6 p-3 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <Search size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          <input
            type="text"
            placeholder="Key nomi yoki mijoz bo'yicha qidiring..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'placeholder-gray-600 text-white' : 'placeholder-gray-400 text-gray-900'}`}
          />
          {search && (
            <button onClick={() => setSearch('')} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              Tozala
            </button>
          )}
        </div>

        {/* Keys List */}
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 rounded-2xl border ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-white'}`}>
            <Key size={40} className={isDark ? 'text-gray-700 mb-3' : 'text-gray-300 mb-3'} />
            <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>Hech narsa topilmadi</p>
            <button onClick={() => { setSearch(''); setStatusFilter('all') }} className="mt-3 text-indigo-400 text-sm hover:underline">
              Filtrni tozala
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(k => (
              <div key={k.id} className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-white/3 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold">{k.name}</h3>
                      <StatusBadge status={k.status} />
                      <PlanBadge plan={k.plan} />
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      👤 {k.user} • 📅 Yaratilgan: {k.created} • ⏱ Oxirgi: {k.lastUsed}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Toggle status */}
                    <button
                      onClick={() => toggleKeyStatus(k.id)}
                      title={k.status === 'active' ? 'To\'xtatish' : 'Faollashtirish'}
                      className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                    >
                      {k.status === 'active'
                        ? <ToggleRight size={18} className="text-emerald-400" />
                        : <ToggleLeft size={18} className="text-gray-400" />
                      }
                    </button>
                    {/* Revoke */}
                    <button
                      onClick={() => revokeKey(k.id)}
                      title="Bekor qilish"
                      className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-orange-400/10 text-gray-400 hover:text-orange-400' : 'hover:bg-orange-50 text-gray-400 hover:text-orange-500'}`}
                    >
                      <AlertCircle size={16} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setConfirmDelete(k.id)}
                      title="O'chirish"
                      className={`p-2 rounded-lg transition-colors text-red-400 ${isDark ? 'hover:bg-red-400/10' : 'hover:bg-red-50'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Key Display */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm mb-4 ${isDark ? 'bg-black/30' : 'bg-gray-50 border border-gray-200'}`}>
                  <span className="flex-1 truncate text-xs">
                    {showKey[k.id] ? k.key.replace('...', 'k9x2m1p8r3j7n5q6t2w9vb4') : k.key}
                  </span>
                  <button onClick={() => toggleShow(k.id)} className={isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}>
                    {showKey[k.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => handleCopy(k.id, k.key)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                      copied === k.id
                        ? 'text-emerald-400 bg-emerald-400/10'
                        : isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Copy size={12} />
                    {copied === k.id ? '✓ Nusxalandi' : 'Nusxala'}
                  </button>
                </div>

                {/* Usage Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {k.requests.toLocaleString()} / {k.limit === 0 ? '∞' : k.limit.toLocaleString()} so'rov
                    </span>
                    <span className={`font-semibold ${
                      usagePct(k.requests, k.limit) > 90 ? 'text-red-400'
                      : usagePct(k.requests, k.limit) > 70 ? 'text-orange-400'
                      : 'text-emerald-400'
                    }`}>
                      {k.limit === 0 ? '∞' : `${usagePct(k.requests, k.limit)}%`}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        usagePct(k.requests, k.limit) > 90 ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : usagePct(k.requests, k.limit) > 70 ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                      }`}
                      style={{ width: `${k.limit === 0 ? 20 : usagePct(k.requests, k.limit)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Key Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
              <h2 className="text-xl font-bold mb-1">Yangi API Key yaratish</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Barcha maydonlarni to'ldiring</p>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Key nomi *</label>
                  <input
                    type="text"
                    placeholder="mas. Production Key v2"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                    autoFocus
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mijoz</label>
                  <select
                    value={form.customer}
                    onChange={e => setForm(f => ({ ...f, customer: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-800 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                  >
                    {CUSTOMERS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Plan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Starter', 'Pro', 'Enterprise'].map(p => (
                      <button
                        key={p}
                        onClick={() => setForm(f => ({ ...f, plan: p }))}
                        className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                          form.plan === p
                            ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                            : isDark ? 'border-white/10 text-gray-400 hover:border-white/30' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`p-3 rounded-xl text-xs ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                  💡 Limit: <strong>{form.plan === 'Starter' ? '10,000' : form.plan === 'Pro' ? '100,000' : '5,000,000'}</strong> so'rov/oy
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className={`flex-1 py-3 rounded-xl text-sm font-semibold ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Bekor qilish
                </button>
                <button onClick={handleCreate} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90">
                  ✨ Yaratish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">O'chirishni tasdiqlang</h3>
              <p className={`text-sm text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Bu API keyni o'chirish qaytarib bo'lmaydi.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className={`flex-1 py-3 rounded-xl text-sm font-semibold ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Bekor qilish
                </button>
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ApiKeysPage
