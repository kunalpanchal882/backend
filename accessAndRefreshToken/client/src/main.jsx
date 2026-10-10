import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Section from './context/Context.jsx'
import AppRouter from './routers/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
    <Section>
        <AppRouter />
    </Section>
)
