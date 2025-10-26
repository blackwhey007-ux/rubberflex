import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  Flag,
  Award,
  Globe,
  Heart
} from 'lucide-react'

const FooterLink = ({ href, children, delay = 0 }: {
  href: string,
  children: React.ReactNode,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        color: '#999',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        display: 'block',
        marginBottom: '0.5rem'
      }}
      whileHover={{ 
        color: '#DC2626',
        x: 5,
        textShadow: '0 0 10px rgba(220, 38, 38, 0.5)'
      }}
    >
      {children}
    </motion.a>
  )
}

const SocialIcon = ({ icon: Icon, href, delay = 0 }: {
  icon: any,
  href: string,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        background: 'rgba(220, 38, 38, 0.1)',
        borderRadius: '50%',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        color: '#999',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.1,
        background: 'rgba(220, 38, 38, 0.2)',
        color: '#DC2626',
        boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
      }}
    >
      <Icon size={20} />
    </motion.a>
  )
}

const StatItem = ({ icon: Icon, value, label, delay = 0 }: {
  icon: any,
  value: string,
  label: string,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center',
        padding: '1.5rem',
        background: 'rgba(220, 38, 38, 0.05)',
        borderRadius: '15px',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)',
        borderColor: '#DC2626'
      }}
    >
      <motion.div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#DC2626',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon size={32} style={{ marginRight: '0.5rem' }} />
        {value}
      </motion.div>
      <div style={{ color: '#999', fontSize: '0.9rem' }}>
        {label}
      </div>
    </motion.div>
  )
}

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="footer"
    >
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }} className="footer-grid">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <motion.h3
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Flag size={32} style={{ marginRight: '0.5rem' }} />
              Rubberflex
            </motion.h3>
            <p style={{
              color: '#e5e5e5',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Leader tunisien en solutions de revêtement de sol en caoutchouc SBR pour espaces sportifs. 
              Qualité, durabilité et innovation Made in Tunisia.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#DC2626',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={16} style={{ marginRight: '0.3rem' }} />
                Made in Tunisia
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Award size={20} style={{ marginRight: '0.5rem' }} />
              Liens Rapides
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <FooterLink href="#products" delay={0.1}>Nos Produits</FooterLink>
              <FooterLink href="#why-rubberflex" delay={0.2}>Pourquoi Nous Choisir</FooterLink>
              <FooterLink href="#applications" delay={0.3}>Applications</FooterLink>
              <FooterLink href="#specifications" delay={0.4}>Spécifications</FooterLink>
              <FooterLink href="#made-in-tunisia" delay={0.5}>Made in Tunisia</FooterLink>
              <FooterLink href="#contact" delay={0.6}>Contact</FooterLink>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Phone size={20} style={{ marginRight: '0.5rem' }} />
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#e5e5e5' }}>
                <MapPin size={16} color="#DC2626" style={{ marginRight: '0.5rem' }} />
                <span>Zone Industrielle, Tunisie</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#e5e5e5' }}>
                <Phone size={16} color="#DC2626" style={{ marginRight: '0.5rem' }} />
                <span>+216 XX XXX XXX</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#e5e5e5' }}>
                <Mail size={16} color="#DC2626" style={{ marginRight: '0.5rem' }} />
                <span>contact@rubberflex.tn</span>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Globe size={20} style={{ marginRight: '0.5rem' }} />
              Suivez-nous
            </h4>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <SocialIcon icon={Facebook} href="https://facebook.com/rubberflex" delay={0.1} />
              <SocialIcon icon={Instagram} href="https://instagram.com/rubberflex" delay={0.2} />
              <SocialIcon icon={Linkedin} href="https://linkedin.com/company/rubberflex" delay={0.3} />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <StatItem icon={Award} value="15+" label="Années d'expérience" delay={0.1} />
          <StatItem icon={Globe} value="20+" label="Pays exportés" delay={0.2} />
          <StatItem icon={Heart} value="500+" label="Projets réalisés" delay={0.3} />
          <StatItem icon={Flag} value="100%" label="Satisfaction client" delay={0.4} />
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(220, 38, 38, 0.2)',
            textAlign: 'center'
          }}
        >
          <p style={{ color: '#999', marginBottom: '1rem' }}>
            &copy; {currentYear} Rubberflex. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <FooterLink href="/mentions-legales" delay={0.1}>Mentions Légales</FooterLink>
            <FooterLink href="/politique-confidentialite" delay={0.2}>Politique de Confidentialité</FooterLink>
            <FooterLink href="/cgv" delay={0.3}>CGV</FooterLink>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer