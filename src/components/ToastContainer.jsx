import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { CheckCircle, AlertTriangle, XCircle, X, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle size={18} className="text-emerald-400 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-yellow-400 shrink-0" />,
  error: <XCircle size={18} className="text-red-400 shrink-0" />,
  info: <Info size={18} className="text-blue-400 shrink-0" />,
}

const colors = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  warning: 'border-yellow-500/30 bg-yellow-500/10',
  error: 'border-red-500/30 bg-red-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
}

const Toast = ({ id, message, type }) => {
  const { removeToast } = useApp()
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl min-w-64 max-w-sm animate-[fadeIn_0.3s_ease] ${colors[type]}`}
      style={{ animation: 'slideIn 0.3s ease' }}>
      {icons[type]}
      <p className="text-sm font-medium text-white flex-1">{message}</p>
      <button onClick={() => removeToast(id)} className="text-gray-400 hover:text-white">
        <X size={14} />
      </button>
    </div>
  )
}

const ToastContainer = () => {
  const { toasts } = useApp()
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map(t => <Toast key={t.id} {...t} />)}
    </div>
  )
}

export default ToastContainer
