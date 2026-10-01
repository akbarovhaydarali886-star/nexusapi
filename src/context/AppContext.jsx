import { createContext, useContext, useState, useCallback } from 'react'
import { apiKeys as initialKeys, customers as initialCustomers } from '../data/mockData'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [keys, setKeys] = useState(initialKeys)
  const [customers, setCustomers] = useState(initialCustomers)
  const [toasts, setToasts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // ─── Toast tizimi ───────────────────────────────────────────
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ─── Auth ────────────────────────────────────────────────────
  const login = useCallback((email, password) => {
    // Demo: har qanday to'g'ri email/parol qabul qilinadi
    const user = { name: 'Admin Foydalanuvchi', email, role: 'Administrator' }
    setCurrentUser(user)
    setIsLoggedIn(true)
    addToast(`Xush kelibsiz, ${email}!`, 'success')
    return true
  }, [addToast])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    addToast('Tizimdan chiqildi. Xayr!', 'info')
  }, [addToast])

  // ─── API Keys CRUD ───────────────────────────────────────────
  const createKey = useCallback((data) => {
    const limitMap = { Starter: 10000, Pro: 100000, Enterprise: 5000000 }
    const newKey = {
      id: Date.now(),
      name: data.name || 'Yangi API Key',
      key: `nxs_${(data.plan || 'str').toLowerCase().slice(0, 4)}_${Math.random().toString(36).slice(2, 8)}...${Math.random().toString(36).slice(2, 6)}`,
      status: 'active',
      user: data.customer || 'Noma\'lum',
      plan: data.plan || 'Starter',
      requests: 0,
      limit: limitMap[data.plan] || 10000,
      created: new Date().toISOString().split('T')[0],
      lastUsed: '—',
    }
    setKeys(prev => [newKey, ...prev])
    addToast(`"${newKey.name}" API keyi yaratildi!`, 'success')
    return newKey
  }, [addToast])

  const deleteKey = useCallback((id) => {
    setKeys(prev => prev.filter(k => k.id !== id))
    addToast('API key o\'chirildi', 'warning')
  }, [addToast])

  const toggleKeyStatus = useCallback((id) => {
    setKeys(prev => prev.map(k => {
      if (k.id !== id) return k
      const newStatus = k.status === 'active' ? 'suspended' : 'active'
      addToast(`Key ${newStatus === 'active' ? 'faollashtirildi ✅' : 'to\'xtatildi ⏸'}`, newStatus === 'active' ? 'success' : 'warning')
      return { ...k, status: newStatus }
    }))
  }, [addToast])

  const revokeKey = useCallback((id) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'expired' } : k))
    addToast('API key bekor qilindi', 'error')
  }, [addToast])

  // ─── Customers CRUD ──────────────────────────────────────────
  const addCustomer = useCallback((data) => {
    const newCustomer = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      plan: data.plan || 'Starter',
      status: 'active',
      keys: 0,
      spent: '$0',
      joined: new Date().toISOString().split('T')[0],
      avatar: data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    }
    setCustomers(prev => [newCustomer, ...prev])
    addToast(`"${data.name}" mijoz qo'shildi!`, 'success')
    return newCustomer
  }, [addToast])

  const deleteCustomer = useCallback((id) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
    addToast('Mijoz o\'chirildi', 'warning')
  }, [addToast])

  const updateCustomerStatus = useCallback((id, status) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    const labels = { active: 'faollashtirildi ✅', suspended: 'to\'xtatildi ⏸', inactive: 'nofaol qilindi' }
    addToast(`Mijoz holati ${labels[status] || 'yangilandi'}`, 'success')
  }, [addToast])

  return (
    <AppContext.Provider value={{
      keys, customers, toasts, isLoggedIn, currentUser,
      addToast, removeToast,
      login, logout,
      createKey, deleteKey, toggleKeyStatus, revokeKey,
      addCustomer, deleteCustomer, updateCustomerStatus,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
