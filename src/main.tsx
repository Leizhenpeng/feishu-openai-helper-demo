import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./styles/markdown.less"
import './ui.state'

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // @ts-ignore
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
