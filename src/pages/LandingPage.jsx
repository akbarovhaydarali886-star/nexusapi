import { useTheme } from '../context/ThemeContext'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import {
  ArrowRight, Zap, Shield, BarChart3, Users,
  Key, CheckCircle, Star, Globe, TrendingUp,
  CreditCard, ChevronRight, GitBranch, AtSign, Link2
} from 'lucide-react'
import { plans } from '../data/mockData'

const LandingPage = ({ onNavigate }) => {
  const { isDark } = useTheme()
  const { isLoggedIn } = useApp()

  const features = [
    {
      icon: Key,
      title: 'API Key Boshqaruvi',
      desc: 'API keylarni yarating, bekor qiling va monitoring qiling. Ruxsatlar va foydalanish limitlari bilan.',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Enterprise Validatsiya',
      desc: 'Ko\'p qatlamli validatsiya tizimi — rate limit, ruxsat, muddat va foydalanishni millisekundlarda tekshiradi.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      title: 'O\'rnatilgan CRM',
      desc: 'Har bir mijozni, ularning API foydalanishi, tarif rejalari va to\'lov tarixini bir joyda kuzating.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: BarChart3,
      title: 'Real Vaqtli Tahlil',
      desc: 'API foydalanishi, daromad tendensiyalari va validatsiya metrikalarini chiroyli grafiklar bilan kuzating.',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: CreditCard,
      title: 'Foydalanishga Asoslangan Billing',
      desc: 'Mijozlardan haqiqiy API foydalanish asosida haq oling. Avtomatik hisob-faktura va moslashuvchan narxlar.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Globe,
      title: 'Ko\'p Platforma Tayyor',
      desc: 'OpenAI, Anthropic, Gemini, Mistral, Groq va boshqa istalgan AI API provayderi bilan ishlaydi.',
      color: 'from-yellow-500 to-orange-600',
    },
  ]

  const companies = ['OpenAI', 'Anthropic', 'Google AI', 'Mistral', 'Cohere', 'Groq', 'Together AI', 'Perplexity']

  const testimonials = [
    {
      name: 'Sara Chen',
      role: 'CTO, DataFlow AI',
      text: 'NexusAPI bizga oyiga 40+ soat tejadi. Validatsiya tizimi nihoyatda ishonchli.',
      avatar: 'SC',
    },
    {
      name: 'Marcus Johnson',
      role: 'Asoschisi, NeuralNet Labs',
      text: 'Nihoyat AI kompaniyalar uchun maxsus qurilgan CRM. Bir haftada tartibsizlikdan aniqlikka o\'tdik.',
      avatar: 'MJ',
    },
    {
      name: 'Priya Sharma',
      role: 'VP Muhandislik, CloudAI',
      text: 'Billing avtomatizatsiyasining o\'zi birinchi oyda o\'z qiymatini to\'ladi. Har qanday AI startapga tavsiya qilaman.',
      avatar: 'PS',
    },
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar onNavigate={onNavigate} currentPage="landing" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6 ${isDark ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' : 'border-indigo-200 bg-indigo-50 text-indigo-600'}`}>
            <Zap size={14} />
            AI Kompaniyalar uchun #1 API Boshqaruv Platformasi
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            AI APIlaringizni
            <br />
            <span className="gradient-text">Tartibsizliksiz Boshqaring</span>
          </h1>

          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            AI kompaniyalar uchun API keylarni boshqarish, so'rovlarni validatsiya qilish,
            billingni kuzatish va mijozlarni tushunish uchun yagona platforma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all glow"
            >
              {isLoggedIn ? 'Panelga o\'tish' : 'Bepul boshlash'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('login')}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border transition-colors ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Demo Ko'rish
            </button>
          </div>

          <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Dunyo bo'ylab 500+ AI kompaniyasi ishonadi
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {companies.map(c => (
              <span key={c} className={`text-sm font-semibold ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Statistika paneli */}
      <section className={`py-12 border-y ${isDark ? 'border-white/10' : 'border-gray-100 bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Boshqarilgan API Keylar', value: '2.4M+' },
            { label: 'Validatsiya Qilingan So\'rovlar', value: '18B+' },
            { label: 'Qayta Ishlangan Daromad', value: '$42M+' },
            { label: 'Ishlash Kafolati', value: '99.99%' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-extrabold gradient-text">{s.value}</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Xususiyatlar */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI biznesingizni o'stirish uchun
              <br />
              <span className="gradient-text">kerak bo'lgan hamma narsa</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              API keylarni elektron jadvalda boshqarishni to'xtating. NexusAPI AI kompaniyalarga
              API kirishini professional darajada sotish va boshqarish imkonini beradi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? 'bg-white/3 border-white/10 hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-200 shadow-sm'}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Muammo vs Yechim */}
      <section className={`py-20 px-6 ${isDark ? 'bg-white/2' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            API key muammosi{' '}
            <span className="gradient-text">siz o'ylagandan kattaroq</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-2xl border ${isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
              <h3 className="text-xl font-bold text-red-400 mb-6">❌ NexusAPIsiz</h3>
              <ul className="space-y-3">
                {[
                  'API keylar email orqali kuzatilmasdan sotiladi',
                  'Rate limiting yoki suiiste\'mol himoyasi yo\'q',
                  'Elektron jadvallar bilan qo\'lda billing',
                  'Mijozlarni ko\'rish yoki CRM yo\'q',
                  'Zaif yoki umuman validatsiya yo\'q',
                  'To\'lanmagan foydalanishdan daromad yo\'qoladi',
                ].map(item => (
                  <li key={item} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-red-400 mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-8 rounded-2xl border ${isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
              <h3 className="text-xl font-bold text-emerald-400 mb-6">✅ NexusAPI bilan</h3>
              <ul className="space-y-3">
                {[
                  'To\'liq audit jurnali bilan tezkor key ta\'minoti',
                  'Avtomatlashtirilgan rate limiting va suiiste\'molni aniqlash',
                  'Foydalanishga asoslangan billing va avto-hisob-faktura',
                  'Mijoz tushunchalari bilan to\'liq CRM',
                  'Millisekundlarda ko\'p qatlamli validatsiya',
                  '100% daromad yig\'ish kafolatlangan',
                ].map(item => (
                  <li key={item} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Narxlar */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Oddiy, shaffof{' '}
              <span className="gradient-text">narxlar</span>
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Bepul boshlang, o'sayotganingizda kengaytiring. Yashirin to'lovlar yo'q.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`relative p-8 rounded-2xl border transition-all ${
                plan.popular
                  ? isDark ? 'bg-indigo-500/10 border-indigo-500/50 shadow-2xl shadow-indigo-500/20' : 'bg-indigo-50 border-indigo-300 shadow-xl'
                  : isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full">
                      ENG MASHHUR
                    </span>
                  </div>
                )}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${plan.color} text-white text-xs font-bold mb-4`}>
                  {plan.name}
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/oy</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <CheckCircle size={15} className="text-emerald-400 shrink-0" />{f}
                    </li>
                  ))}
                  {plan.notIncluded.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      <span className="w-3.5 shrink-0 text-center">—</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('login')}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90'
                      : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Boshlash
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fikrlar */}
      <section className={`py-20 px-6 ${isDark ? 'bg-white/2' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">AI jamoalari</span> sevgan platforma
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className={`p-6 rounded-2xl border ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                APIlaringizni nazorat qilishga tayyormisiz?
              </h2>
              <p className="text-indigo-100 mb-8 text-lg">
                NexusAPI yordamida APIlarni boshqarayotgan 500+ AI kompaniyasiga qo'shiling.
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="px-10 py-4 rounded-xl bg-white text-indigo-600 font-bold text-lg hover:bg-indigo-50 transition-colors"
              >
                Bepul boshlash — Karta talab qilinmaydi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="gradient-text">NexusAPI</span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 NexusAPI. AI davri uchun yaratilgan.
          </p>
          <div className="flex items-center gap-4">
            <GitBranch size={20} className={`cursor-pointer ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} />
            <AtSign size={20} className={`cursor-pointer ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} />
            <Link2 size={20} className={`cursor-pointer ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
