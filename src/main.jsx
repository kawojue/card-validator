import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DataProvider } from './Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
