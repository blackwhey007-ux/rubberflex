import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Factory, 
  Trophy, 
  Globe, 
  Recycle, 
  Shield, 
  Wrench
} from 'lucide-react'

const BenefitCard = ({ 
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="card"
      style={{
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Icône avec animation 3D */}
      <motion.div 
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50%',
          margin: '0 auto 1.5rem',
          border: '2px solid rgba(220, 38, 38, 0.3)',
          boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1,
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        whileHover={{ 
          rotateY: 360, 
          scale: 1.15,
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.6), 0 0 80px rgba(220, 38, 38, 0.3)',
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 100%)'
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Effet de particules/brillance */}
        <div style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: 0
        }} />
        <Icon size={40} color="#DC2626" strokeWidth={2.5} />
      </motion.div>

      {/* Titre */}
      <h3 style={{ 
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 1,
        color: '#DC2626'
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{ 
        color: '#e5e5e5',
        lineHeight: '1.6',
        position: 'relative',
        zIndex: 1
      }}>
        {description}
      </p>
    </motion.div>
  )
}

function WhyRubberflex() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const benefits = [
    {
      icon: Factory,
      title: "Fabrication Tunisienne",
      description: "Usine propre et moderne en Tunisie avec contrôle qualité rigoureux et standards internationaux."
    },
    {
      icon: Trophy,
      title: "Leader Qualité",
      description: "N°1 en qualité en Tunisie avec des produits qui respectent les normes européennes les plus strictes."
    },
    {
      icon: Globe,
      title: "Export International",
      description: "Nos produits sont exportés dans le monde entier, témoignant de notre excellence et fiabilité."
    },
    {
      icon: Recycle,
      title: "Éco-Responsable",
      description: "Fabrication à partir du recyclage de pneus, contribuant à la protection de l'environnement."
    },
    {
      icon: Shield,
      title: "Résistance Garantie",
      description: "Matériaux ultra-résistants aux chocs, à l'usure et aux intempéries pour une durabilité exceptionnelle."
    },
    {
      icon: Wrench,
      title: "Installation Facile",
      description: "Système de pose simple et rapide, réduisant les coûts d'installation et les délais de mise en service."
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
          Pourquoi <span className="accent">Rubberflex</span> ?
        </motion.div>

        <div id="why-rubberflex-grid" className="grid grid-3">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}
        >
          {[
            { number: "15+", label: "Années d'expérience" },
            { number: "500+", label: "Projets réalisés" },
            { number: "20+", label: "Pays exportés" },
            { number: "100%", label: "Satisfaction client" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(220, 38, 38, 0.05)',
                borderRadius: '15px',
                border: '1px solid rgba(220, 38, 38, 0.1)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#DC2626',
                  marginBottom: '0.5rem'
                }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div style={{ color: '#999', fontSize: '0.9rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyRubberflex