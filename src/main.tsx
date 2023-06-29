import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AdapterErrorBoundary } from './components/system/AdapterErrorBoundary.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <AdapterErrorBoundary>
      <App />
    </AdapterErrorBoundary>
  </React.StrictMode>
)
