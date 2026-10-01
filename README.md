# ⚡ NexusAPI — AI Kompaniyalar uchun API Boshqaruv Platformasi

<div align="center">

![NexusAPI Banner](https://img.shields.io/badge/NexusAPI-AI%20Management%20Platform-6366f1?style=for-the-badge&logo=zap&logoColor=white)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6384?style=flat-square)](https://recharts.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**OpenAI, Anthropic, Gemini va boshqa AI kompaniyalar uchun API key sotish, validatsiya qilish va mijozlarni boshqarish muammosini yechuvchi SaaS platforma.**

[🚀 Demo Ko'rish](#-demo) • [📸 Skrinshotlar](#-skrinshotlar) • [⚡ Tez Boshlash](#-tez-boshlash) • [✨ Xususiyatlar](#-xususiyatlar)

</div>

---

## 🎯 Loyiha haqida

Bugun kunda **OpenAI, Anthropic, Google Gemini, Mistral, Groq** kabi yuzlab AI kompaniyalari mavjud.
Ularning asosiy muammosi:

| Muammo | Tafsilot |
|--------|----------|
| 🔑 **Nazorafsiz API keylar** | Kim, qachon, qancha key olganini bilishmaydi |
| 💳 **Zaif billing** | Foydalanish asosida haq olish tizimi yo'q |
| ✅ **Kuchsiz validatsiya** | Har bir so'rovni tekshirish mexanizmi yetarli emas |
| 👥 **CRM yo'q** | Mijozlarni boshqarish, limit va plan — hech narsa yo'q |

**NexusAPI** — ana shu muammolarga yagona yechim: API keylarni sotish, validatsiya qilish, billing va CRM — barchasi bir joyda.

---

## ✨ Xususiyatlar

### 🔐 Autentifikatsiya
- Login va ro'yxatdan o'tish tizimi
- **Parol kuchi ko'rsatgichi** (4 daraja: Juda zaif → Kuchli)
- Real-time form validatsiyasi
- Himoyalangan sahifalar (login qilmasdan kirish imkonsiz)

### 📊 Boshqaruv Paneli
- Asosiy statistika kartalari (API keylar, foydalanuvchilar, daromad)
- **Interaktiv grafiklar** (Area, Bar chart — Recharts)
- Real vaqtli faoliyat lenti

### 🔑 API Key Boshqaruvi
- Key yaratish, o'chirish, to'xtatish, bekor qilish
- Foydalanish progress bar (limit ogohlantirishi bilan)
- Clipboard ga nusxalash
- Key ko'rsatish/yashirish
- Qidiruv va holat bo'yicha filter (Active / Suspended / Expired)

### 👥 CRM (Mijozlar Boshqaruvi)
- Mijoz qo'shish, o'chirish, holatini o'zgartirish
- Email validatsiyali forma
- Plan bo'yicha filter (Enterprise / Pro / Starter)
- Qator bosish → tafsilot paneli ochiladi
- Dropdown menyu (to'xtatish / o'chirish)

### 💳 Hisob-kitob
- Joriy tarif banner
- Foydalanish ko'rsatgichlari (progress bar)
- Tarif almashtirish (confirm modal bilan)
- To'lovlar tarixi + yuklab olish
- Karta boshqaruvi

### 📈 Tahlil
- 5 xil interaktiv grafik (Area, Bar, Line, Pie, Horizontal Bar)
- Validatsiya darajasi (24 soatlik)
- Top foydalanuvchilar reytingi
- Plan taqsimoti (doira grafik)

### ⚙️ Sozlamalar
- Profil tahrirlash (validatsiya bilan)
- Parol o'zgartirish + ko'rsatish/yashirish
- 2FA toggle
- Bildirishnoma sozlamalari (6 ta alohida toggle)
- API konfiguratsiyasi (rate limit, prefix, expiry, webhook)

### 🎨 UI/UX
- **Dark / Light** tema (localStorage da saqlanadi)
- Toast bildirishnomalar (4 tur: success, warning, error, info)
- Barcha matnlar **O'zbek tilida**
- Barcha tugmalar va formalar **ishlaydi**

---

## 🛠️ Texnologiyalar

```
Frontend    →  React 18 + Vite 8
Stil        →  Tailwind CSS v4
Grafiklar   →  Recharts
Ikonkalar   →  Lucide React
State       →  React Context API
Til         →  O'zbek tili
```

---

## ⚡ Tez Boshlash

### Talablar
- Node.js 18+
- npm yoki yarn

### O'rnatish

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/YOUR_USERNAME/nexusapi.git

# 2. Papkaga kirish
cd nexusapi

# 3. Bog'liqliklarni o'rnatish
npm install

# 4. Ishga tushirish
npm run dev
```

Brauzerda oching: **http://localhost:5173**

> 💡 **Demo kirish:** Istalgan email va 6+ belgili parol bilan kiring

### Build qilish

```bash
npm run build
```

---

## 📁 Loyiha Tuzilmasi

```
nexusapi/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Bosh navigatsiya
│   │   ├── Sidebar.jsx         # Dashboard yon panel
│   │   └── ToastContainer.jsx  # Bildirishnomalar
│   ├── context/
│   │   ├── AppContext.jsx       # Global holat (auth, CRUD)
│   │   └── ThemeContext.jsx     # Dark/Light tema
│   ├── data/
│   │   └── mockData.js         # Demo ma'lumotlar
│   ├── pages/
│   │   ├── LandingPage.jsx     # Bosh sahifa
│   │   ├── LoginPage.jsx       # Kirish / Ro'yxat
│   │   ├── Dashboard.jsx       # Boshqaruv paneli
│   │   ├── ApiKeysPage.jsx     # API Key boshqaruvi
│   │   ├── CRMPage.jsx         # Mijozlar
│   │   ├── BillingPage.jsx     # Hisob-kitob
│   │   ├── AnalyticsPage.jsx   # Tahlil
│   │   └── SettingsPage.jsx    # Sozlamalar
│   ├── App.jsx                 # Asosiy komponent + routing
│   ├── main.jsx                # Kirish nuqtasi
│   └── index.css               # Global stillar
├── public/
├── package.json
└── vite.config.js
```

---

## 🎭 Demo Ma'lumotlar

Loyihada quyidagi demo ma'lumotlar bor:
- **5 ta API key** (active, suspended, expired holatlarda)
- **6 ta mijoz** (Enterprise, Pro, Starter planlarda)
- **7 oylik** foydalanish va daromad statistikasi
- **To'lovlar tarixi** (6 ta hujjat)

---

## 🤝 Hissa Qo'shish

Pull requestlar xush kelibsiz!

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/ajoyib-xususiyat`)
3. Commit qiling (`git commit -m 'Yangi xususiyat qo'shdim'`)
4. Push qiling (`git push origin feature/ajoyib-xususiyat`)
5. Pull Request oching

---

## 📄 Litsenziya

MIT © 2026 NexusAPI

---

<div align="center">

**⚡ NexusAPI** — AI davri uchun yaratilgan

*Agar loyiha yoqgan bo'lsa, ⭐ qo'yishni unutmang!*

</div>
