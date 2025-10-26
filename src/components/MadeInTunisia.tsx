import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Factory, 
  MapPin, 
  Award, 
  Users, 
  Shield, 
  CheckCircle,
  Flag,
  Globe
} from 'lucide-react'

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay = 0 
}: {
  icon: any,
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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="card"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left'
      }}
    >
      <motion.div
        style={{
          padding: '1rem',
          background: 'rgba(220, 38, 38, 0.1)',
          borderRadius: '15px',
          marginRight: '1.5rem',
          border: '1px solid rgba(220, 38, 38, 0.2)'
        }}
        whileHover={{ 
          rotate: 360,
          scale: 1.1,
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
        }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={24} color="#DC2626" />
      </motion.div>
      <div>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#DC2626'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#e5e5e5',
          lineHeight: '1.6'
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const CountryCard = ({ country, flag, delay = 0 }: { country: string, flag: string, delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}} 
      transition={{ duration: 0.5, delay }}
      style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        borderRadius: '15px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)',
        borderColor: '#DC2626'
      }}
    >
      <div style={{
        fontSize: '3rem',
        marginBottom: '0.75rem'
      }}>
        {flag}
      </div>
      <div style={{
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        fontSize: '1.1rem'
      }}>
        {country}
      </div>
      <div style={{
        color: '#DC2626',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        Export actif
      </div>
    </motion.div>
  )
}

function MadeInTunisia() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: Factory,
      title: "Usine Moderne",
      description: "Installations de production de dernière génération avec équipements automatisés et contrôles qualité stricts."
    },
    {
      icon: Shield,
      title: "Contrôle Qualité",
      description: "Tests rigoureux à chaque étape de production pour garantir la conformité aux standards internationaux."
    },
    {
      icon: Users,
      title: "Équipe Expert",
      description: "Ingénieurs et techniciens qualifiés avec plus de 15 ans d'expérience dans l'industrie du caoutchouc."
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Certifications ISO 9001 et ISO 14001 attestant de notre engagement qualité et environnemental."
    }
  ]

  const advantages = [
    "Fabrication locale = coûts maîtrisés",
    "Contrôle qualité direct et personnalisé",
    "Réactivité et flexibilité de production",
    "Support technique local disponible",
    "Réduction de l'empreinte carbone",
    "Création d'emplois locaux"
  ]

  const exportCountries = [
    { name: 'France', flag: '🇫🇷' },
    { name: 'Allemagne', flag: '🇩🇪' },
    { name: 'Italie', flag: '🇮🇹' },
    { name: 'Espagne', flag: '🇪🇸' },
    { name: 'Maroc', flag: '🇲🇦' },
    { name: 'Algérie', flag: '🇩🇿' },
    { name: 'Libye', flag: '🇱🇾' },
    { name: 'Mauritanie', flag: '🇲🇷' }
  ]

  return (
    <section className="section section-gray">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Flag size={32} color="#DC2626" style={{ marginRight: '1rem' }} />
          Made in <span className="accent">Tunisia</span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-2" style={{ marginBottom: '4rem' }}>
          {/* Factory Image avec effet 3D */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(15, 15, 15, 0.9) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <motion.div
                style={{
                  fontSize: '4rem',
                  marginBottom: '1rem'
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏭
              </motion.div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#DC2626',
                marginBottom: '1rem'
              }}>
                Usine Rubberflex Tunisie
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#e5e5e5',
                fontSize: '1.1rem'
              }}>
                <MapPin size={20} color="#DC2626" style={{ marginRight: '0.5rem' }} />
                <span>Tunisie - Zone Industrielle</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#DC2626'
            }}>
              Notre Excellence Industrielle
            </h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(15, 15, 15, 0.9) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            backdropFilter: 'blur(20px)',
            marginBottom: '4rem'
          }}
        >
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#DC2626'
          }}>
            Avantages de la Fabrication Tunisienne
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(15, 15, 15, 0.5)',
                  borderRadius: '10px',
                  border: '1px solid rgba(220, 38, 38, 0.1)'
                }}
              >
                <CheckCircle size={20} color="#DC2626" style={{ marginRight: '1rem', flexShrink: 0 }} />
                <span style={{ color: '#e5e5e5' }}>{advantage}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Export Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Globe size={24} color="#DC2626" style={{ marginRight: '0.5rem' }} />
            Export International
          </h3>
          <div id="export-countries-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {exportCountries.map((country, index) => (
              <CountryCard
                key={index}
                country={country.name}
                flag={country.flag}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MadeInTunisia