import { lazy, Suspense } from 'react'
import Hero3D from '../components/Hero3D'
import WhyRubberflex from '../components/WhyRubberflex'
import Applications from '../components/Applications'
import Specifications from '../components/Specifications'
import MadeInTunisia from '../components/MadeInTunisia'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { useAnalytics } from '../hooks/useAnalytics'
import ErrorBoundary3D from '../components/ErrorBoundary3D'
import ProductGallery from '../components/ProductGallery'

// Lazy load the 3D component
const ProductCard3D = lazy(() => import('../components/ProductCard3D'))

export default function LandingPage() {
  useAnalytics(); // Tracking automatique des visiteurs
  
  return (
    <div style={{ position: 'relative' }}>
      <Hero3D />
      <ErrorBoundary3D>
        <Suspense fallback={<ProductGallery />}>
          <ProductCard3D />
        </Suspense>
      </ErrorBoundary3D>
      <WhyRubberflex />
      <Applications />
      <Specifications />
      <MadeInTunisia />
      <ContactForm />
      <Footer />
    </div>
  )
}

