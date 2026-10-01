import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/Sidebar'
import {
  Sun, Moon, CheckCircle, Clock, Download,
  CreditCard, Zap, TrendingUp, AlertCircle
} from 'lucide-react'
import { plans } from '../data/mockData'

const BillingPage = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()
  const { addToast } = useApp()
  const [activePlan, setActivePlan] = useState('Enterprise')
  const [confirmPlan, setConfirmPlan] = useState(null)

  const invoices = [
    { id: 'INV-2026-010', date: '2026-10-01', amount: '$499', status: 'pending',  plan: 'Enterprise' },
    { id: 'INV-2026-009', date: '2026-09-01', amount: '$499', status: 'paid',     plan: 'Enterprise' },
    { id: 'INV-2026-008', date: '2026-08-01', amount: '$499', status: 'paid',     plan: 'Enterprise' },
    { id: 'INV-2026-007', date: '2026-07-01', amount: '$99',  status: 'paid',     plan: 'Pro' },
    { id: 'INV-2026-006', date: '2026-06-01', amount: '$99',  status: 'paid',     plan: 'Pro' },
    { id: 'INV-2026-005', date: '2026-05-01', amount: '$29',  status: 'paid',     plan: 'Starter' },
  ]

  const usageMeters = [
    { label: 'API So\'rovlari',   used: 12849000, limit: null,  unit: 'so\'rov', unlimited: true  },
    { label: 'Faol API Keylar',  used: 23,        limit: null,  unit: 'ta key',  unlimited: true  },
    { label: 'Jamoa a\'zolari',  used: 8,         limit: 25,    unit: 'kishi',   unlimited: false },
    { label: 'Webhook so\'rovlar', used: 4200,    limit: null,  unit: 'ta',      unlimited: true  },
  ]

  const planPrices = { Starter: 29, Pro: 99, Enterprise: 499 }
  const planColors = {
    Starter:    'from-slate-500 to-slate-700',
    Pro:        'from-indigo-500 to-purple-600',
    Enterprise: 'from-purple-600 to-pink-600',
  }

  const handleSwitchPlan = (planName) => {
    if (planName === activePlan) return
    setConfirmPlan(planName)
  }

  const confirmSwitch = () => {
    addToast(`Plan "${confirmPlan}" ga o'zgartirildi! ✅`, 'success')
    setActivePlan(confirmPlan)
    setConfirmPlan(null)
  }

  const handleDownload = (id) => {
    addToast(`${id} yuklab olinmoqda...`, 'info')
  }

  const handlePayNow = () => {
    addToast('To\'lov sahifasiga yo\'naltirilmoqda...', 'info')
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 flex-1 p-8">
        {/* Sarlavha */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Hisob-kitob va Tariflar</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Obuna, foydalanish va to'lovlarni boshqaring
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Joriy tarif banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-indigo-200" />
                <p className="text-indigo-200 text-sm font-medium">Joriy tarif</p>
              </div>
              <h2 className="text-3xl font-extrabold mb-1">{activePlan} Tarif</h2>
              <p className="text-indigo-200 text-sm">
                {activePlan === 'Enterprise'
                  ? 'Cheksiz so\'rovlar • Cheksiz keylar • 24/7 qo\'llab-quvvatlash'
                  : activePlan === 'Pro'
                    ? '100,000 so\'rov/oy • 10 ta key • Ustuvor qo\'llab-quvvatlash'
                    : '10,000 so\'rov/oy • 1 ta key • Email qo\'llab-quvvatlash'}
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <p className="text-indigo-200 text-sm">Oylik to'lov</p>
              <p className="text-4xl font-extrabold">${planPrices[activePlan]}</p>
              <p className="text-indigo-200 text-xs mt-1">
                Keyingi to'lov: 1 Noyabr 2026
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handlePayNow}
                  className="px-4 py-1.5 rounded-lg bg-white text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors"
                >
                  Hozir to'lash
                </button>
                <button className="px-4 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors">
                  Tarixni ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Foydalanish ko'rsatgichlari */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {usageMeters.map(m => (
            <div key={m.label} className={`p-5 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{m.label}</p>
              <p className="text-xl font-bold mb-2">
                {m.unlimited ? (
                  <span className="gradient-text">∞ Cheksiz</span>
                ) : (
                  <span>{m.used} / {m.limit}</span>
                )}
              </p>
              {!m.unlimited && (
                <>
                  <div className={`h-1.5 rounded-full overflow-hidden mb-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all ${
                        (m.used / m.limit) > 0.9 ? 'bg-red-500'
                        : (m.used / m.limit) > 0.7 ? 'bg-orange-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                      }`}
                      style={{ width: `${Math.min((m.used / m.limit) * 100, 100)}%` }}
                    />
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {Math.round((m.used / m.limit) * 100)}% ishlatildi
                  </p>
                </>
              )}
              {m.unlimited && (
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{m.unit}</p>
              )}
            </div>
          ))}
        </div>

        {/* Tariflar */}
        <div className={`p-6 rounded-2xl border mb-8 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Mavjud Tariflar</h3>
            <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              Oylik hisob-kitob
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {['Starter', 'Pro', 'Enterprise'].map(planName => {
              const isActive = planName === activePlan
              const price = planPrices[planName]
              const featuresMap = {
                Starter:    ['10,000 so\'rov/oy', '1 ta API key', 'Asosiy validatsiya', 'Email qo\'llab-quvvatlash'],
                Pro:        ['100,000 so\'rov/oy', '10 ta API key', 'Kengaytirilgan validatsiya', 'Ustuvor qo\'llab-quvvatlash', 'CRM kirish'],
                Enterprise: ['Cheksiz so\'rovlar', 'Cheksiz API keylar', 'Enterprise validatsiya', '24/7 maxsus qo\'llab-quvvatlash', 'Kengaytirilgan tahlil', 'SLA kafolati (99.9%)'],
              }
              return (
                <div
                  key={planName}
                  className={`relative p-5 rounded-xl border transition-all ${
                    isActive
                      ? isDark ? 'border-indigo-500/60 bg-indigo-500/10' : 'border-indigo-400 bg-indigo-50 shadow-lg'
                      : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-0.5 text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                        JORIY TARIF
                      </span>
                    </div>
                  )}
                  <div className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${planColors[planName]} mb-3`}>
                    {planName}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold">${price}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/oy</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {featuresMap[planName].map(f => (
                      <li key={f} className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSwitchPlan(planName)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-400 cursor-default'
                        : planName === 'Enterprise' && !isActive
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                          : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {isActive ? '✓ Faol tarif' : `${planName} tarifiga o'tish`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* To'lov usuli */}
        <div className={`p-6 rounded-2xl border mb-8 ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">To'lov usuli</h3>
            <button
              onClick={() => addToast('Yangi karta qo\'shish sahifasi...', 'info')}
              className={`text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              + Karta qo'shish
            </button>
          </div>
          <div className={`flex items-center gap-4 p-4 rounded-xl border ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-gray-50'}`}>
            <div className="w-12 h-8 rounded bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <CreditCard size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">•••• •••• •••• 4242</p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Visa • Amal qilish muddati: 12/2028</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold text-emerald-400 bg-emerald-400/10`}>
              Asosiy
            </span>
          </div>
        </div>

        {/* To'lovlar tarixi */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200 shadow-sm'}`}>
          <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-gray-50'}`}>
            <h3 className="font-bold">To'lovlar tarixi</h3>
            <button
              onClick={() => addToast('Barcha to\'lovlar yuklab olinmoqda...', 'info')}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}
            >
              <Download size={14} /> Barchasini yuklab olish
            </button>
          </div>

          {/* Jadval sarlavhasi */}
          <div className={`grid grid-cols-5 px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDark ? 'bg-white/3 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
            <span>Hujjat</span>
            <span>Sana</span>
            <span>Tarif</span>
            <span>Miqdor</span>
            <span>Holat</span>
          </div>

          <div className={isDark ? 'divide-y divide-white/5' : 'divide-y divide-gray-100'}>
            {invoices.map(inv => (
              <div key={inv.id} className={`grid grid-cols-5 items-center px-6 py-4 transition-colors ${isDark ? 'hover:bg-white/3' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <CreditCard size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <span className="text-sm font-medium">{inv.id}</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{inv.date}</span>
                <span className="text-sm">{inv.plan}</span>
                <span className="text-sm font-bold">{inv.amount}</span>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    inv.status === 'paid'
                      ? 'text-emerald-400 bg-emerald-400/10'
                      : 'text-orange-400 bg-orange-400/10'
                  }`}>
                    {inv.status === 'paid' ? <CheckCircle size={11} /> : <Clock size={11} />}
                    {inv.status === 'paid' ? 'To\'landi' : 'Kutilmoqda'}
                  </span>
                  <button
                    onClick={() => handleDownload(inv.id)}
                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-500 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'}`}
                  >
                    <Download size={14} />
                  </button>
                  {inv.status === 'pending' && (
                    <button
                      onClick={handlePayNow}
                      className="px-3 py-1 rounded-lg bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
                    >
                      To'lash
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Tarif almashtirish modali */}
      {confirmPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={22} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Tarifni o'zgartirish</h3>
            <p className={`text-sm text-center mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <strong>{activePlan}</strong> tarifidan <strong>{confirmPlan}</strong> tarifiga o'tasizmi?
            </p>
            <p className={`text-center text-lg font-bold mb-6`}>
              <span className={isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through'}>${planPrices[activePlan]}/oy</span>
              {' → '}
              <span className="gradient-text">${planPrices[confirmPlan]}/oy</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmPlan(null)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmSwitch}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BillingPage
