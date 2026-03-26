import { useEffect, useState } from 'react'

const Toast = ({ message, type = 'error', onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    const colors = {
        error: 'border-accent-error/40 text-accent-error',
        success: 'border-accent-success/40 text-accent-success',
        info: 'border-text-secondary/40 text-text-secondary',
    }

    return (
        <div className={`
      fixed bottom-6 right-6 z-50
      bg-bg-secondary border rounded-lg px-5 py-3
      text-sm font-mono shadow-lg
      transition-all duration-300
      ${colors[type]}
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
            {message}
        </div>
    )
}

export default Toast