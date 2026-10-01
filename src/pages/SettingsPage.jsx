import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/Sidebar'
import { Sun, Moon, Save, Bell, Shield, Key, User, Check, Eye, EyeOff, RefreshCw } from 'lucide-react'

const SettingsPage = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()
  const { addToast } = useApp()
  const [activeTab, setActiveTab] = useState('profile')

  // Profile state
  const [profile, setProfile] = useState({ firstName: 'Admin', lastName: 'User', email: 'admin@nexusapi.io', company: 'NexusAPI Inc.' })

  // Security state
  const [security, setSecurity] = useState({ current: '', newPass: '', confirm: '' })
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false })
  const [twoFA, setTwoFA] = useState(true)

  // Notifications state
  const [notifs, setNotifs] = useState({
    keyCreated: true, validationFail: true, payment: true,
    usageWarning: true, newCustomer: false, weeklyReport: false,
  })

  // API Config state
  const [apiConfig, setApiConfig] = useState({ rateLimit: 1000, prefix: 'nxs_', expiry: 0, webhook: '' })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Xavfsizlik', icon: Shield },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
    { id: 'api', label: 'API Config', icon: Key },
  ]

  const handleSaveProfile = () => {
    if (!profile.firstName || !profile.email) {
      addToast('Majburiy maydonlarni to\'ldiring!', 'error')
      return
    }
    if (!/\S+@\S+\.\S+/.test(profile.email)) {
      addToast('Email noto\'g\'ri formatda!', 'error')
      return
    }
    addToast('Profil muvaffaqiyatli saqlandi!', 'success')
  }

  const handleSavePassword = () => {
    if (!security.current) { addToast('Joriy parolni kiriting!', 'error'); return }
    if (security.newPass.length < 6) { addToast('Yangi parol kamida 6 ta belgi!', 'error'); return }
    if (security.newPass !== security.confirm) { addToast('Parollar mos kelmaydi!', 'error'); return }
    addToast('Parol muvaffaqiyatli yangilandi!', 'success')
    setSecurity({ current: '', newPass: '', confirm: '' })
  }

  const handleSaveApiConfig = () => {
    if (!apiConfig.prefix) { addToast('Key prefiksi bo\'sh bo\'lishi mumkin emas!', 'error'); return }
    addToast('API konfiguratsiyasi saqlandi!', 'success')
  }

  const generateNewKey = () => {
    addToast('Yangi admin API key yaratildi!', 'success')
  }

  const inp = `w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
    isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`
  const lbl = `block text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Sozlamalar</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Akkaunt va platforma sozlamalari</p>
          </div>
          <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-600'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Tabs sidebar */}
          <div className="w-48 shrink-0 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400 border border-indigo-500/30'
                    : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className="font-bold text-lg mb-6">Profil ma'lumotlari</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{profile.firstName} {profile.lastName}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{profile.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={lbl}>Ism *</label>
                    <input type="text" value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Familiya *</label>
                    <input type="text" value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} className={inp} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={lbl}>Email *</label>
                  <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className={inp} />
                </div>
                <div className="mb-6">
                  <label className={lbl}>Kompaniya nomi</label>
                  <input type="text" value={profile.company} onChange={e => setProfile(p => ({ ...p, company: e.target.value }))} className={inp} />
                </div>
                <button onClick={handleSaveProfile} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90">
                  <Save size={16} /> Saqlash
                </button>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className="font-bold text-lg mb-6">Xavfsizlik sozlamalari</h2>

                {[
                  { label: 'Joriy parol', key: 'current' },
                  { label: 'Yangi parol', key: 'newPass' },
                  { label: 'Yangi parolni tasdiqlang', key: 'confirm' },
                ].map(({ label, key }) => (
                  <div key={key} className="mb-4">
                    <label className={lbl}>{label}</label>
                    <div className="relative">
                      <input
                        type={showPass[key] ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={security[key]}
                        onChange={e => setSecurity(s => ({ ...s, [key]: e.target.value }))}
                        className={inp + ' pr-10'}
                      />
                      <button
                        onClick={() => setShowPass(p => ({ ...p, [key]: !p[key] }))}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}
                      >
                        {showPass[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                ))}

                <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-gray-50'}`}>
                  <div>
                    <p className="font-medium text-sm">Ikki bosqichli autentifikatsiya</p>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Qo'shimcha himoya qatlami</p>
                  </div>
                  <button
                    onClick={() => { setTwoFA(!twoFA); addToast(`2FA ${!twoFA ? 'yoqildi' : 'o\'chirildi'}`, !twoFA ? 'success' : 'warning') }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${twoFA ? 'bg-indigo-500' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${twoFA ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>

                <button onClick={handleSavePassword} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90">
                  <Shield size={16} /> Parolni yangilash
                </button>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className="font-bold text-lg mb-6">Bildirishnoma sozlamalari</h2>
                <div className="space-y-3">
                  {[
                    { key: 'keyCreated', label: 'Yangi API key yaratildi', desc: 'Har yangi key yaratilganda xabar olish' },
                    { key: 'validationFail', label: 'Validatsiya xatoligi', desc: 'Takroriy xatolar haqida ogohlantirish' },
                    { key: 'payment', label: 'To\'lov qabul qilindi', desc: 'Muvaffaqiyatli to\'lovlarni tasdiqlash' },
                    { key: 'usageWarning', label: 'Limit ogohlantirishi', desc: '80% va 95% da xabar berish' },
                    { key: 'newCustomer', label: 'Yangi mijoz', desc: 'Ro\'yxatdan o\'tgan yangi foydalanuvchilar' },
                    { key: 'weeklyReport', label: 'Haftalik hisobot', desc: 'Har dushanba tahlil hisoboti' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/3 hover:bg-white/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNotifs(n => ({ ...n, [key]: !n[key] }))
                          addToast(`"${label}" ${!notifs[key] ? 'yoqildi' : 'o\'chirildi'}`, !notifs[key] ? 'success' : 'info')
                        }}
                        className={`w-12 h-6 rounded-full relative transition-colors ${notifs[key] ? 'bg-indigo-500' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${notifs[key] ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API CONFIG TAB */}
            {activeTab === 'api' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className="font-bold text-lg mb-6">API Konfiguratsiyasi</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={lbl}>Default Rate Limit (req/min)</label>
                    <input
                      type="number"
                      value={apiConfig.rateLimit}
                      onChange={e => setApiConfig(c => ({ ...c, rateLimit: +e.target.value }))}
                      min={1}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Key Prefiksi</label>
                    <input
                      type="text"
                      value={apiConfig.prefix}
                      onChange={e => setApiConfig(c => ({ ...c, prefix: e.target.value }))}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={lbl}>Key amal qilish muddati (kun, 0 = cheksiz)</label>
                  <input
                    type="number"
                    value={apiConfig.expiry}
                    onChange={e => setApiConfig(c => ({ ...c, expiry: +e.target.value }))}
                    min={0}
                    className={inp}
                  />
                </div>
                <div className="mb-6">
                  <label className={lbl}>Webhook URL (hodisalar uchun)</label>
                  <input
                    type="url"
                    placeholder="https://your-app.com/webhook"
                    value={apiConfig.webhook}
                    onChange={e => setApiConfig(c => ({ ...c, webhook: e.target.value }))}
                    className={inp}
                  />
                </div>

                <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'border-indigo-500/30 bg-indigo-500/10' : 'border-indigo-200 bg-indigo-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-indigo-400">⚡ Admin API Key</p>
                    <button onClick={generateNewKey} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300">
                      <RefreshCw size={12} /> Yangilash
                    </button>
                  </div>
                  <code className={`text-xs font-mono block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {apiConfig.prefix}admin_7r2p1n4k9x2m8f3j_live...
                  </code>
                </div>

                <button onClick={handleSaveApiConfig} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90">
                  <Save size={16} /> Saqlash
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
