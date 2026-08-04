import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './assets/pages/Home'
import Calculators from './assets/pages/calculator'
import EMI from './assets/pages/Emi'
import SIP from './assets/pages/Sip'
import FD from './assets/pages/Fd'
import Footer from './components/Footer'

function Placeholder({ title }) {
  return (
    <div className="container py-5">
      <h2>{title}</h2>
      <p className="text-muted">Coming soon.</p>
    </div>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/emi" element={<EMI />} />
        <Route path="/sip" element={<SIP />} />
        <Route path="/fd" element={<FD />} />
        <Route path="/investments" element={<Placeholder title="Investments" />} />
        <Route path="/insurance" element={<Placeholder title="Insurance" />} />
        <Route path="/learn" element={<Placeholder title="Learn" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
