import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import { Zap, Eye, EyeOff, Sun, Moon, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react'

const LoginPage = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme()
  const { login, addToast } = useApp()

  const [tab, setTab] = useState('login') // 'login' | 'register'
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false })
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false })

  const [loginErrors, setLoginErrors] = useState({})
  const [regErrors, setRegErrors] = useState({})

  const bg = isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
  const card = isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
  const inp = (err) => `w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500 ${
    err
      ? 'border-red-500/60 bg-red-500/5 ring-1 ring-red-500/30'
      : isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`

  // Parol kuchi
  const passStrength = (p) => {
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^a-zA-Z0-9]/.test(p)) score++
    return score
  }
  const strength = passStrength(regForm.password)
  const strengthLabel = ['', 'Juda zaif', 'Zaif', 'O\'rtacha', 'Kuchli']
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500']

  // Validatsiya: Kirish
  const validateLogin = () => {
    const e = {}
    if (!loginForm.email.trim()) e.email = 'Email kiritilishi shart'
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) e.email = 'Email formati noto\'g\'ri'
    if (!loginForm.password) e.password = 'Parol kiritilishi shart'
    else if (loginForm.password.length < 6) e.password = 'Parol kamida 6 ta belgi bo\'lishi kerak'
    return e
  }

  // Validatsiya: Ro'yxatdan o'tish
  const validateReg = () => {
    const e = {}
    if (!regForm.name.trim()) e.name = 'To\'liq ism kiritilishi shart'
    else if (regForm.name.trim().length < 3) e.name = 'Ism kamida 3 ta harf bo\'lishi kerak'
    if (!regForm.email.trim()) e.email = 'Email kiritilishi shart'
    else if (!/\S+@\S+\.\S+/.test(regForm.email)) e.email = 'Email formati noto\'g\'ri'
    if (!regForm.password) e.password = 'Parol kiritilishi shart'
    else if (regForm.password.length < 8) e.password = 'Parol kamida 8 ta belgi bo\'lishi kerak'
    else if (passStrength(regForm.password) < 2) e.password = 'Parol kuchsiz: katta harf va raqam qo\'shing'
    if (regForm.password !== regForm.confirm) e.confirm = 'Parollar mos kelmadi'
    if (!regForm.agree) e.agree = 'Shartlarga rozilik bildiring'
    return e
  }

  const handleLogin = async () => {
    const errs = validateLogin()
    setLoginErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    login(loginForm.email, loginForm.password)
    onNavigate('dashboard')
    setLoading(false)
  }

  const handleRegister = async () => {
    const errs = validateReg()
    setRegErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    addToast('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi kiring.', 'success')
    setTab('login')
    setLoginForm(f => ({ ...f, email: regForm.email }))
    setLoading(false)
  }

  return (
    <div className={`min-h-screen flex ${bg}`}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white">NexusAPI</span>
        </div>

        {/* Main text */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            AI kompaniyalar uchun<br />
            <span className="text-indigo-200">eng yaxshi platforma</span>
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            API keylarni boshqaring, mijozlarni kuzating,<br />
            daromadingizni oshiring — barchasi bir joyda.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '500+', label: 'Kompaniya' },
              { val: '18B+', label: 'So\'rov' },
              { val: '99.9%', label: 'Uptime' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-indigo-200 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-4">
          <p className="text-white text-sm italic mb-2">
            "NexusAPI bizning API boshqaruvimizni butunlay o'zgartirdi. Endi hamma narsa nazorat ostida."
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">SC</div>
            <div>
              <p className="text-white text-xs font-semibold">Sara Chen</p>
              <p className="text-indigo-200 text-xs">CTO, DataFlow AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`absolute top-6 right-6 p-2 rounded-lg ${isDark ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-extrabold gradient-text">NexusAPI</span>
        </div>

        <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-8 ${card}`}>
          {/* Tabs */}
          <div className={`flex rounded-xl p-1 mb-6 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setLoginErrors({}); setRegErrors({}) }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t === 'login' ? '🔑 Kirish' : '📝 Ro\'yxatdan o\'tish'}
              </button>
            ))}
          </div>

          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <>
              <h1 className="text-2xl font-extrabold mb-1">Xush kelibsiz!</h1>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Akkauntingizga kiring
              </p>

              {/* Demo hint */}
              <div className={`flex items-start gap-2 p-3 rounded-xl text-xs mb-5 ${isDark ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border border-indigo-200 text-indigo-600'}`}>
                <CheckCircle size={14} className="shrink-0 mt-0.5" />
                <span><strong>Demo:</strong> istalgan email va 6+ belgili parol bilan kiring</span>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email manzil
                  </label>
                  <div className="relative">
                    <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${loginErrors.email ? 'text-red-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      placeholder="admin@example.com"
                      value={loginForm.email}
                      onChange={e => { setLoginForm(f => ({ ...f, email: e.target.value })); setLoginErrors(er => ({ ...er, email: '' })) }}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      className={inp(loginErrors.email)}
                      autoFocus
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} /> {loginErrors.email}
                    </p>
                  )}
                </div>

                {/* Parol */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Parol</label>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline">Parolni unutdingizmi?</button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${loginErrors.password ? 'text-red-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => { setLoginForm(f => ({ ...f, password: e.target.value })); setLoginErrors(er => ({ ...er, password: '' })) }}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      className={inp(loginErrors.password) + ' pr-10'}
                    />
                    <button onClick={() => setShowPass(!showPass)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} /> {loginErrors.password}
                    </p>
                  )}
                </div>

                {/* Eslab qolish */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={e => setLoginForm(f => ({ ...f, remember: e.target.checked }))}
                    className="w-4 h-4 accent-indigo-500"
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Meni eslab qol</span>
                </label>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Tekshirilmoqda...</>
                ) : '🚀 Kirish'}
              </button>

              <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Akkauntingiz yo'qmi?{' '}
                <button onClick={() => setTab('register')} className="text-indigo-400 hover:underline font-medium">
                  Ro'yxatdan o'ting
                </button>
              </p>
            </>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === 'register' && (
            <>
              <h1 className="text-2xl font-extrabold mb-1">Hisob yarating</h1>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Bepul boshlang, karta talab qilinmaydi
              </p>

              <div className="space-y-4">
                {/* To'liq ism */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>To'liq ism</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-base ${regErrors.name ? 'opacity-100' : 'opacity-60'}`}>👤</span>
                    <input
                      type="text"
                      placeholder="Ism Familiya"
                      value={regForm.name}
                      onChange={e => { setRegForm(f => ({ ...f, name: e.target.value })); setRegErrors(er => ({ ...er, name: '' })) }}
                      className={inp(regErrors.name)}
                      autoFocus
                    />
                  </div>
                  {regErrors.name && <p className="flex items-center gap-1 text-red-400 text-xs mt-1"><AlertCircle size={12} />{regErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email manzil</label>
                  <div className="relative">
                    <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${regErrors.email ? 'text-red-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      placeholder="siz@example.com"
                      value={regForm.email}
                      onChange={e => { setRegForm(f => ({ ...f, email: e.target.value })); setRegErrors(er => ({ ...er, email: '' })) }}
                      className={inp(regErrors.email)}
                    />
                  </div>
                  {regErrors.email && <p className="flex items-center gap-1 text-red-400 text-xs mt-1"><AlertCircle size={12} />{regErrors.email}</p>}
                </div>

                {/* Parol */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Parol</label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${regErrors.password ? 'text-red-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Kamida 8 ta belgi"
                      value={regForm.password}
                      onChange={e => { setRegForm(f => ({ ...f, password: e.target.value })); setRegErrors(er => ({ ...er, password: '' })) }}
                      className={inp(regErrors.password) + ' pr-10'}
                    />
                    <button onClick={() => setShowPass(!showPass)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {/* Parol kuchi */}
                  {regForm.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className={`text-xs ${strength >= 3 ? 'text-emerald-400' : strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                        Parol kuchi: {strengthLabel[strength] || ''}
                      </p>
                    </div>
                  )}
                  {regErrors.password && <p className="flex items-center gap-1 text-red-400 text-xs mt-1"><AlertCircle size={12} />{regErrors.password}</p>}
                </div>

                {/* Tasdiqlash */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Parolni tasdiqlang</label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${regErrors.confirm ? 'text-red-400' : regForm.confirm && regForm.password === regForm.confirm ? 'text-emerald-400' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Parolni qayta kiriting"
                      value={regForm.confirm}
                      onChange={e => { setRegForm(f => ({ ...f, confirm: e.target.value })); setRegErrors(er => ({ ...er, confirm: '' })) }}
                      className={inp(regErrors.confirm) + ' pr-10'}
                    />
                    <button onClick={() => setShowConfirm(!showConfirm)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {regForm.confirm && regForm.password === regForm.confirm && !regErrors.confirm && (
                    <p className="flex items-center gap-1 text-emerald-400 text-xs mt-1"><CheckCircle size={12} />Parollar mos keldi</p>
                  )}
                  {regErrors.confirm && <p className="flex items-center gap-1 text-red-400 text-xs mt-1"><AlertCircle size={12} />{regErrors.confirm}</p>}
                </div>

                {/* Shartlar */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regForm.agree}
                      onChange={e => { setRegForm(f => ({ ...f, agree: e.target.checked })); setRegErrors(er => ({ ...er, agree: '' })) }}
                      className="w-4 h-4 mt-0.5 accent-indigo-500"
                    />
                    <span className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <button className="text-indigo-400 hover:underline">Foydalanish shartlari</button>
                      {' '}va{' '}
                      <button className="text-indigo-400 hover:underline">Maxfiylik siyosati</button>
                      ga roziman
                    </span>
                  </label>
                  {regErrors.agree && <p className="flex items-center gap-1 text-red-400 text-xs mt-1 ml-6"><AlertCircle size={12} />{regErrors.agree}</p>}
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Yaratilmoqda...</>
                ) : '✅ Hisob yaratish'}
              </button>

              <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Hisobingiz bormi?{' '}
                <button onClick={() => setTab('login')} className="text-indigo-400 hover:underline font-medium">
                  Kiring
                </button>
              </p>
            </>
          )}
        </div>

        {/* Back to landing */}
        <button
          onClick={() => onNavigate('landing')}
          className={`mt-4 text-xs hover:underline ${isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
        >
          ← Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  )
}

export default LoginPage
