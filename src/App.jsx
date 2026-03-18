import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import HomePage    from './pages/Home/HomePage'
import AboutPage   from './pages/About/AboutPage'
import ServicesPage from './pages/Services/ServicesPage'
import PricingPage from './pages/Pricing/PricingPage'
import TeamPage    from './pages/Team/TeamPage'
import ContactPage from './pages/Contact-us/ContactUsPage'
import ScrollToTop from './utils/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/"         element={<HomePage />}     />
        <Route path="/about"    element={<AboutPage />}    />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing"  element={<PricingPage />}  />
        <Route path="/team"     element={<TeamPage />}     />
        <Route path="/contact"  element={<ContactPage />}  />
      </Routes>
    </BrowserRouter>
  )
}