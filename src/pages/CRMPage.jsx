import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/Sidebar'
import {
  Sun, Moon, Search, Plus, Trash2, Mail, Key,
  DollarSign, MoreVertical, UserCheck, UserX, ChevronDown
} from 'lucide-react'

const StatusBadge = ({ status }) => {
  const colors = {
    active: 'text-emerald-400 bg-emerald-400/10',
    suspended: 'text-orange-400 bg-orange-400/10',
    inactive: 'text-gray-400 bg-gray-400/10',
  }
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[status] || colors.inactive}`}>
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

const CRMPage = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()
  const { customers, addCustomer, deleteCustomer, updateCustomerStatus } = useApp()

  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', plan: 'Starter' })
  const [errors, setErrors] = useState({})

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === 'all' || c.plan === planFilter
    return matchSearch && matchPlan
  })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Ism majburiy'
    if (!form.email.trim()) e.email = 'Email majburiy'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email noto\'g\'ri'
    return e
  }

  const handleAdd = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    addCustomer(form)
    setShowModal(false)
    setForm({ name: '', email: '', plan: 'Starter' })
    setErrors({})
  }

  const inp = `w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
    isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}
      onClick={() => setOpenMenu(null)}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">CRM — Mijozlar</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {customers.filter(c => c.status === 'active').length} faol / {customers.length} jami
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90">
              <Plus size={16} /> Mijoz qo'shish
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Jami', value: customers.length, emoji: '👥', filter: 'all', plan: false },
            { label: 'Enterprise', value: customers.filter(c => c.plan === 'Enterprise').length, emoji: '🏆', filter: 'Enterprise', plan: true },
            { label: 'Pro', value: customers.filter(c => c.plan === 'Pro').length, emoji: '⚡', filter: 'Pro', plan: true },
            { label: 'Starter', value: customers.filter(c => c.plan === 'Starter').length, emoji: '🌱', filter: 'Starter', plan: true },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setPlanFilter(s.plan ? s.filter : 'all')}
              className={`p-4 rounded-xl border text-left transition-all ${
                planFilter === s.filter
                  ? isDark ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-indigo-300 bg-indigo-50'
                  : isDark ? 'bg-white/3 border-white/10 hover:border-white/20' : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'
              }`}
            >
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={`flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <Search size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          <input
            type="text"
            placeholder="Ism yoki email bo'yicha qidiring..."
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

        {/* Table */}
        <div className={`rounded-2xl border overflow-hidden mb-6 ${isDark ? 'border-white/10' : 'border-gray-200 shadow-sm'}`}>
          <div className={`grid grid-cols-12 px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
            <span className="col-span-4">Mijoz</span>
            <span className="col-span-2">Plan</span>
            <span className="col-span-2">Holat</span>
            <span className="col-span-1">Keylar</span>
            <span className="col-span-2">Sarflagan</span>
            <span className="col-span-1"></span>
          </div>

          <div className={isDark ? 'divide-y divide-white/5' : 'divide-y divide-gray-100'}>
            {filtered.length === 0 ? (
              <div className={`py-12 text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                Mijoz topilmadi
              </div>
            ) : filtered.map(c => (
              <div key={c.id}>
                <div
                  onClick={() => setSelected(selected?.id === c.id ? null : c)}
                  className={`grid grid-cols-12 px-6 py-4 cursor-pointer transition-colors items-center ${
                    selected?.id === c.id
                      ? isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'
                      : isDark ? 'hover:bg-white/3' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {c.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{c.email}</p>
                    </div>
                  </div>
                  <div className="col-span-2"><PlanBadge plan={c.plan} /></div>
                  <div className="col-span-2"><StatusBadge status={c.status} /></div>
                  <div className="col-span-1 flex items-center gap-1 text-sm">
                    <Key size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    {c.keys}
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-emerald-400">{c.spent}</div>
                  <div className="col-span-1 flex justify-end" onClick={e => e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                        className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === c.id && (
                        <div className={`absolute right-0 top-8 w-44 rounded-xl border shadow-2xl z-20 py-1 ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
                          <button
                            onClick={() => { updateCustomerStatus(c.id, c.status === 'active' ? 'suspended' : 'active'); setOpenMenu(null) }}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                          >
                            {c.status === 'active' ? <UserX size={14} className="text-orange-400" /> : <UserCheck size={14} className="text-emerald-400" />}
                            {c.status === 'active' ? 'To\'xtatish' : 'Faollashtirish'}
                          </button>
                          <button
                            onClick={() => { setConfirmDelete(c.id); setOpenMenu(null) }}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 text-left ${isDark ? 'hover:bg-red-400/10' : 'hover:bg-red-50'}`}
                          >
                            <Trash2 size={14} /> O'chirish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {selected?.id === c.id && (
                  <div className={`px-6 pb-5 grid grid-cols-2 md:grid-cols-4 gap-3 border-t ${isDark ? 'border-white/5 bg-indigo-500/5' : 'border-indigo-100 bg-indigo-50/50'}`}>
                    {[
                      { label: 'Email', value: c.email, icon: Mail },
                      { label: 'API Keylar', value: c.keys, icon: Key },
                      { label: 'Jami sarflagan', value: c.spent, icon: DollarSign },
                      { label: 'Qo\'shilgan sana', value: c.joined, icon: null },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className={`p-3 rounded-xl mt-3 ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                        <p className={`text-xs mb-1 flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {Icon && <Icon size={11} />} {label}
                        </p>
                        <p className="font-semibold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Customer Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
              <h2 className="text-xl font-bold mb-1">Yangi mijoz qo'shish</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Mijoz ma'lumotlarini kiriting</p>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>To'liq ism *</label>
                  <input
                    type="text"
                    placeholder="mas. John Doe Corp"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                    className={`${inp} ${errors.name ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
                    autoFocus
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email *</label>
                  <input
                    type="email"
                    placeholder="admin@company.com"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                    className={`${inp} ${errors.email ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
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
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowModal(false); setErrors({}) }} className={`flex-1 py-3 rounded-xl text-sm font-semibold ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Bekor qilish
                </button>
                <button onClick={handleAdd} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90">
                  ✅ Qo'shish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Delete */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
              <div className="w-12 h-12 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">O'chirishni tasdiqlang</h3>
              <p className={`text-sm text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Bu mijozni o'chirish barcha ma'lumotlarini yo'q qiladi.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className={`flex-1 py-3 rounded-xl text-sm font-semibold ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Bekor qilish
                </button>
                <button onClick={() => { deleteCustomer(confirmDelete); setConfirmDelete(null); setSelected(null) }} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">
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

export default CRMPage
