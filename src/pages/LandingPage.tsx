import Hero3D from '../components/Hero3D'
import ProductCard3D from '../components/ProductCard3D'
import WhyRubberflex from '../components/WhyRubberflex'
import Applications from '../components/Applications'
import Specifications from '../components/Specifications'
import MadeInTunisia from '../components/MadeInTunisia'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { useAnalytics } from '../hooks/useAnalytics'

export default function LandingPage() {
  useAnalytics(); // Tracking automatique des visiteurs
  
  return (
    <div style={{ position: 'relative' }}>
      <Hero3D />
      <ProductCard3D />
      <WhyRubberflex />
      <Applications />
      <Specifications />
      <MadeInTunisia />
      <ContactForm />
      <Footer />
    </div>
  )
}

