import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  AdapterErrorBoundary,
  defaultErrorFormatter,
} from './components/system/AdapterErrorBoundary.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ajvErrorFormatter } from './validators/ajv-error-formatter.tsx'
import {
  CustomErrorMessagePattern,
  customErrorMessagePatternHandler,
  keywordPattern,
} from './validators/ajv-custom-error-message.tsx'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

const customErrorMessagePatterns: CustomErrorMessagePattern[] = [
  keywordPattern({
    keyword: 'maximum',
    schemaPath: /\/age/,
    process: (error) => {
      return {
        handled: true,
        message: `Maximum allowed age is ${error.params.limit}`,
      }
    },
  }),
]

const errorFormatter = ajvErrorFormatter(
  defaultErrorFormatter,
  customErrorMessagePatternHandler(customErrorMessagePatterns)
)

root.render(
  <React.StrictMode>
    <AdapterErrorBoundary errorFormatter={errorFormatter}>
      <App />
    </AdapterErrorBoundary>
  </React.StrictMode>
)
