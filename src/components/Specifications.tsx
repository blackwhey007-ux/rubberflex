import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Ruler, 
  Weight, 
  Shield, 
  Zap, 
  Volume2, 
  Thermometer,
  Droplets,
  CheckCircle
} from 'lucide-react'

const SpecCard = ({ 
  icon: Icon, 
  label, 
  value, 
  description,
  delay = 0 
}: {
  icon: any,
  label: string,
  value: string,
  description: string,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Contenu */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Icône avec animation */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            padding: '0.8rem',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '12px',
            marginRight: '1rem',
            border: '1px solid rgba(220, 38, 38, 0.2)'
          }}>
            <Icon size={24} color="#DC2626" />
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              {label}
            </div>
            <div style={{ 
              color: '#FFFFFF', 
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              {value}
            </div>
          </div>
        </motion.div>

        <p
          style={{
            color: '#e5e5e5',
            fontSize: '0.9rem',
            lineHeight: '1.5'
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const CertificationBadge = ({ 
  title, 
  description,
  delay = 0 
}: {
  title: string,
  description: string,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(15, 15, 15, 0.9) 100%)',
        borderRadius: '15px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <CheckCircle size={24} color="#DC2626" style={{ marginRight: '1rem' }} />
      <div>
        <h4 style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '0.2rem' }}>
          {title}
        </h4>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function Specifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const specifications = [
    {
      icon: Ruler,
      label: "Dimensions",
      value: "900 × 900 × 20mm",
      description: "Format standard pour installation facile"
    },
    {
      icon: Weight,
      label: "Poids",
      value: "19kg par dalle",
      description: "Poids optimal pour manipulation et transport"
    },
    {
      icon: Shield,
      label: "Résistance aux chocs",
      value: "95%",
      description: "Absorption exceptionnelle des impacts"
    },
    {
      icon: Zap,
      label: "Résistance électrique",
      value: "> 10⁶ Ω",
      description: "Sécurité électrique garantie"
    },
    {
      icon: Volume2,
      label: "Isolation phonique",
      value: "20dB",
      description: "Réduction significative du bruit"
    },
    {
      icon: Thermometer,
      label: "Résistance température",
      value: "-30°C à +80°C",
      description: "Stabilité dans toutes les conditions"
    },
    {
      icon: Droplets,
      label: "Absorption d'eau",
      value: "1%",
      description: "Résistance à l'humidité"
    },
    {
      icon: Shield,
      label: "Durabilité",
      value: "15+ années",
      description: "Garantie de longévité"
    }
  ]

  const certifications = [
    {
      title: "Norme EN 1177",
      description: "Sécurité des aires de jeux"
    },
    {
      title: "Certification CE",
      description: "Conformité européenne"
    },
    {
      title: "ISO 9001",
      description: "Système de management qualité"
    },
    {
      title: "ISO 14001",
      description: "Management environnemental"
    }
  ]

  return (
    <section className="section section-black">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          Spécifications <span className="accent">Techniques</span>
        </motion.div>

        <div className="grid grid-2" style={{ marginBottom: '4rem' }}>
          {/* Specifications Grid */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Ruler size={24} style={{ marginRight: '0.5rem' }} />
              Caractéristiques Techniques
            </h3>
            <div id="specifications-grid" style={{ display: 'grid', gap: '1.5rem' }}>
              {specifications.map((spec, index) => (
                <SpecCard
                  key={index}
                  icon={spec.icon}
                  label={spec.label}
                  value={spec.value}
                  description={spec.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />
              Certifications & Normes
            </h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              {certifications.map((cert, index) => (
                <CertificationBadge
                  key={index}
                  title={cert.title}
                  description={cert.description}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Material Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(15, 15, 15, 0.9) 100%)',
                borderRadius: '15px',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#DC2626'
              }}>
                Matériau SBR
              </h4>
              <p style={{
                color: '#e5e5e5',
                lineHeight: '1.6'
              }}>
                Nos produits sont fabriqués à partir de caoutchouc SBR (Styrène-Butadiène-Rubber) 
                recyclé provenant de pneus usagés. Ce matériau offre une excellente résistance 
                aux chocs, à l'abrasion et aux intempéries, tout en contribuant à la protection 
                de l'environnement.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#DC2626'
          }}>
            Performances Comparatives
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { value: "95%", label: "Absorption des chocs", sublabel: "vs 60% pour le béton" },
              { value: "20dB", label: "Réduction du bruit", sublabel: "vs 5dB pour les surfaces dures" },
              { value: "15+", label: "Années de garantie", sublabel: "vs 5 ans pour les alternatives" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
                  borderRadius: '15px',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  backdropFilter: 'blur(20px)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#DC2626',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  {stat.label}
                </div>
                <div style={{ color: '#999', fontSize: '0.9rem' }}>
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Specifications