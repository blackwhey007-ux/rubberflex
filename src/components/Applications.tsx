import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Dumbbell, 
  Target, 
  Users, 
  Gamepad2, 
  Building, 
  Heart 
} from 'lucide-react'

const ApplicationCard = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0,
  gridSpan = 1
}: {
  title: string,
  description: string,
  icon: any,
  delay?: number,
  gridSpan?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const gridStyles = {
    1: { gridColumn: 'span 1', gridRow: 'span 1' },
    2: { gridColumn: 'span 2', gridRow: 'span 1' },
    3: { gridColumn: 'span 1', gridRow: 'span 2' }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className="card"
      style={{
        ...gridStyles[gridSpan as keyof typeof gridStyles],
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Icône avec animation 3D */}
      <motion.div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.8rem',
          background: 'rgba(220, 38, 38, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          zIndex: 2
        }}
        whileHover={{ 
          rotateY: 180,
          scale: 1.2,
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
        }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={24} color="#DC2626" />
      </motion.div>

      {/* Contenu */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#FFFFFF'
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: '#e5e5e5',
            lineHeight: '1.6',
            fontSize: '0.95rem'
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function Applications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const applications = [
    {
      title: "Salles de Sport & Fitness",
      description: "Revêtement idéal pour les salles de musculation, cardio et cours collectifs. Absorption optimale des chocs et confort d'utilisation.",
      icon: Dumbbell,
      gridSpan: 2
    },
    {
      title: "Terrains de Football",
      description: "Granulés de caoutchouc pour terrains synthétiques. Amélioration de la performance, réduction des blessures et drainage optimal.",
      icon: Target,
      gridSpan: 1
    },
    {
      title: "Courts de Padel",
      description: "Surface de jeu professionnelle avec excellente adhérence et rebond. Résistance aux intempéries et facilité d'entretien.",
      icon: Gamepad2,
      gridSpan: 1
    },
    {
      title: "Aires de Jeux",
      description: "Sécurité maximale pour les enfants avec absorption des chocs et résistance aux UV. Conformité aux normes de sécurité.",
      icon: Users,
      gridSpan: 1
    },
    {
      title: "Gymnases & Centres",
      description: "Polyvalence parfaite pour tous types d'activités sportives. Installation rapide et maintenance minimale.",
      icon: Building,
      gridSpan: 2
    },
    {
      title: "Centres de Rééducation",
      description: "Confort et sécurité pour la rééducation physique. Surface antidérapante et absorption des chocs pour la récupération.",
      icon: Heart,
      gridSpan: 1
    }
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
        >
          Nos <span className="accent">Applications</span>
        </motion.div>

        {/* Grid asymétrique style Bento */}
        <div id="applications-grid">
          {applications.map((app, index) => (
            <ApplicationCard
              key={index}
              title={app.title}
              description={app.description}
              icon={app.icon}
              delay={index * 0.1}
              gridSpan={app.gridSpan}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(15, 15, 15, 0.9) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#FFFFFF'
          }}>
            Votre projet n'est pas listé ?
          </h3>
          <p style={{
            color: '#e5e5e5',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Nos experts peuvent vous conseiller sur la solution optimale pour votre projet spécifique. 
            Contactez-nous pour une étude personnalisée.
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #DC2626, #EF4444)',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
            }}
          >
            Demander une Étude Personnalisée
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Applications