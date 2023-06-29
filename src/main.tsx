import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AdapterErrorBoundary } from './components/system/AdapterErrorBoundary.tsx'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <AdapterErrorBoundary>
      <App />
    </AdapterErrorBoundary>
  </React.StrictMode>
)
