import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global styles are imported by App.jsx — importing them here as well was a
// duplicate.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
