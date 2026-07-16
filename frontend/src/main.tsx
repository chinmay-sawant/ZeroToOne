import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import '@/index.css'
import { applyTheme, loadTheme } from '@/lib/storage'

// Apply saved theme before first paint to avoid a flash of the wrong mode.
applyTheme(loadTheme())

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found')
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
