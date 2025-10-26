import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type Variant = 'noir-blanc' | 'jaune' | 'bleu' | 'rouge' | 'noir-unique'

interface VariantConfig {
  name: string
  description: string
  color: string
}

const variants: Record<Variant, VariantConfig> = {
  'noir-blanc': {
    name: 'Noir Moucheté Blanc',
    description: 'Caoutchouc recyclé noir avec mouchetures blanches',
    color: '#FFFFFF'
  },
  jaune: {
    name: 'Noir Moucheté Jaune',
    description: 'Éclat jaune vif sur fond noir',
    color: '#FFD700'
  },
  bleu: {
    name: 'Noir Moucheté Bleu',
    description: 'Fragments bleus éclatants sur fond noir',
    color: '#00BFFF'
  },
  rouge: {
    name: 'Noir Moucheté Rouge',
    description: 'Éclats rouges dynamiques sur fond noir',
    color: '#DC2626'
  },
  'noir-unique': {
    name: 'Noir Unique',
    description: 'Caoutchouc recyclé noir uni sans mouchetures',
    color: '#000000'
  }
}

export default function ProductGallery() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>('noir-blanc')
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} className="product-showcase" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      padding: '80px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
        <div className="product-gallery-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px', 
          alignItems: 'center'
        }}>
          
          {/* Image/Preview Section */}
          <motion.div
            className="product-gallery-preview"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ 
              background: variants[selectedVariant].color === '#000000' 
                ? '#1a1a1a' 
                : '#000000',
              borderRadius: '20px',
              padding: '60px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: '300px',
              height: '300px',
              background: variants[selectedVariant].color,
              borderRadius: '20px',
              boxShadow: `0 20px 60px ${variants[selectedVariant].color}40`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: variants[selectedVariant].color === '#000000' ? '#fff' : '#000',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              {variants[selectedVariant].name}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 style={{ fontSize: '3em', marginBottom: '30px', color: '#fff' }}>
              Nos Produits
            </h2>
            
            <h3 style={{ fontSize: '2em', marginBottom: '20px', color: '#DC2626' }}>
              {variants[selectedVariant].name}
            </h3>
            
            <p style={{ fontSize: '1.2em', color: '#999', marginBottom: '40px', lineHeight: '1.6' }}>
              {variants[selectedVariant].description}
            </p>

            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1em' }}>Variantes disponibles:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {Object.entries(variants).map(([variant, config]) => (
                  <motion.button
                    key={variant}
                    onClick={() => setSelectedVariant(variant as Variant)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: `2px solid ${config.color}`,
                      background: selectedVariant === variant ? config.color : 'transparent',
                      color: selectedVariant === variant ? (config.color === '#FFFFFF' || config.color === '#FFD700' ? '#000' : '#fff') : config.color,
                      cursor: 'pointer',
                      fontSize: '0.95em',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {config.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1em' }}>Spécifications:</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ color: '#999' }}>
                  <strong style={{ color: '#fff' }}>Dimensions:</strong> 900 × 900 × 20mm
                </div>
                <div style={{ color: '#999' }}>
                  <strong style={{ color: '#fff' }}>Poids:</strong> 19kg
                </div>
                <div style={{ color: '#999' }}>
                  <strong style={{ color: '#fff' }}>Matériau:</strong> Caoutchouc SBR recyclé
                </div>
                <div style={{ color: '#999' }}>
                  <strong style={{ color: '#fff' }}>Finition:</strong> Anti-dérapante
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1em'
                }}
              >
                Demander un Devis
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

