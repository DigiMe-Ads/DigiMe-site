import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap CSS (grid, utilities)
import 'bootstrap/dist/css/bootstrap.min.css'
// Our global overrides come AFTER bootstrap so they win
import './styles/globals.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)