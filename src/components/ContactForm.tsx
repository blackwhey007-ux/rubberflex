import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Phone, 
  MapPin,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const FloatingLabelInput = ({ 
  label, 
  type = "text", 
  required = false,
  delay = 0,
  name = ""
}: {
  label: string,
  type?: string,
  required?: boolean,
  delay?: number,
  name?: string
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(true)

  const validateInput = (val: string) => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(val)
    }
    if (type === 'tel') {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
      return phoneRegex.test(val)
    }
    return val.length > 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    setIsValid(validateInput(val))
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="form-group"
      style={{ position: 'relative' }}
    >
      <div style={{ position: 'relative' }}>
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          style={{
            width: '100%',
            padding: '1.2rem',
            background: 'rgba(15, 15, 15, 0.8)',
            border: `2px solid ${isValid ? 'rgba(220, 38, 38, 0.2)' : '#DC2626'}`,
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            outline: 'none'
          }}
          animate={{
            boxShadow: isFocused ? '0 0 20px rgba(220, 38, 38, 0.3)' : '0 0 0px rgba(220, 38, 38, 0)',
            borderColor: isFocused ? '#DC2626' : (isValid ? 'rgba(220, 38, 38, 0.2)' : '#DC2626')
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.label
          style={{
            position: 'absolute',
            top: isFocused || value ? '-0.5rem' : '1.2rem',
            left: '1rem',
            color: isFocused ? '#DC2626' : '#999',
            fontSize: isFocused || value ? '0.8rem' : '1rem',
            background: 'rgba(15, 15, 15, 0.8)',
            padding: '0 0.5rem',
            transition: 'all 0.3s ease',
            pointerEvents: 'none'
          }}
          animate={{
            color: isFocused ? '#DC2626' : '#999',
            fontSize: isFocused || value ? '0.8rem' : '1rem'
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>

        {/* Validation Icon */}
        {value && (
          <motion.div
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isValid ? (
              <CheckCircle size={20} color="#DC2626" />
            ) : (
              <AlertCircle size={20} color="#DC2626" />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

const ContactInfoCard = ({ icon: Icon, title, content, delay = 0 }: {
  icon: any,
  title: string,
  content: string,
  delay?: number
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        borderRadius: '15px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        backdropFilter: 'blur(20px)',
        marginBottom: '1rem',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)',
        borderColor: '#DC2626'
      }}
    >
      <div style={{
        padding: '1rem',
        background: 'rgba(220, 38, 38, 0.1)',
        borderRadius: '12px',
        marginRight: '1rem',
        border: '1px solid rgba(220, 38, 38, 0.2)'
      }}>
        <Icon size={24} color="#DC2626" />
      </div>
      <div>
        <h4 style={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          marginBottom: '0.2rem'
        }}>
          {title}
        </h4>
        <p style={{ color: '#e5e5e5' }}>{content}</p>
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📍 Formulaire soumis!')
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    
    // Récupérer les données du formulaire
    const formValues = {
      nom: formData.get('nom') || '',
      email: formData.get('email') || '',
      telephone: formData.get('telephone') || '',
      produit: formData.get('produit') || '',
      couleur: formData.get('couleur') || '',
      surface: formData.get('surface') || '',
      message: formData.get('message') || ''
    }
    
    console.log('📋 Données du formulaire:', formValues)
    
    try {
      // Envoyer au backend
      console.log('📡 Envoi de la demande au backend...')
      const response = await fetch('http://localhost:3000/api/demandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
      
      console.log('📥 Réponse du backend:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Demande envoyée avec succès!', data)
        setIsSubmitted(true)
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setIsSubmitted(false)
          ;(e.target as HTMLFormElement).reset()
        }, 3000)
      } else {
        const errorData = await response.json()
        console.error('❌ Erreur:', errorData)
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error)
      alert('Erreur de connexion au serveur. Assurez-vous que le backend est démarré.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section section-black">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          Contactez <span className="accent">nos Experts</span>
        </motion.div>

        <div className="grid grid-2" style={{ gap: '3rem' }}>
          {/* Formulaire de Contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(220, 38, 38, 0.2)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Send size={24} style={{ marginRight: '0.5rem' }} />
              Demander un Devis Gratuit
            </h3>

            <form onSubmit={handleSubmit}>
              <FloatingLabelInput
                label="Nom complet"
                type="text"
                required={true}
                delay={0.1}
                name="nom"
              />
              
              <FloatingLabelInput
                label="Email"
                type="email"
                required={true}
                delay={0.2}
                name="email"
              />
              
              <FloatingLabelInput
                label="Téléphone"
                type="tel"
                required={false}
                delay={0.3}
                name="telephone"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="form-group"
              >
                <label style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  Produit d'intérêt
                </label>
                <select 
                  name="produit"
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '2px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    outline: 'none'
                  }}
                >
                  <option value="">Sélectionnez un produit</option>
                  <option value="dalles">Dalles de sol SBR</option>
                  <option value="granules">Granulés de caoutchouc</option>
                  <option value="both">Les deux produits</option>
                  <option value="consultation">Consultation personnalisée</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="form-group"
              >
                <label style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  Couleur souhaitée
                </label>
                <select 
                  name="couleur"
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '2px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    outline: 'none'
                  }}
                >
                  <option value="">Sélectionnez une couleur</option>
                  <option value="noir-unique">Noir Unique</option>
                  <option value="noir-mouchete-blanc">Noir Moucheté Blanc</option>
                  <option value="noir-mouchete-jaune">Noir Moucheté Jaune</option>
                  <option value="noir-mouchete-bleu">Noir Moucheté Bleu</option>
                  <option value="noir-mouchete-rouge">Noir Moucheté Rouge</option>
                </select>
              </motion.div>

              <FloatingLabelInput
                label="Surface en m²"
                type="number"
                required={false}
                delay={0.5}
                name="surface"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="form-group"
              >
                <label style={{
                  display: 'block',
                  color: '#e5e5e5',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  Message / Détails du projet
                </label>
                <textarea
                  name="message"
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '2px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Décrivez votre projet ou posez vos questions..."
                  required
                />
              </motion.div>

              {/* Bouton unique pour envoyer à l'admin */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                onClick={() => console.log('🎯 Bouton cliqué!')}
                style={{
                  width: '100%',
                  background: isSubmitted ? '#4CAF50' : '#DC2626',
                  color: 'white',
                  padding: '1.2rem 2.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: (isSubmitting || isSubmitted) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isSubmitted ? '0 10px 30px rgba(76, 175, 80, 0.3)' : '0 10px 30px rgba(220, 38, 38, 0.3)',
                  position: 'relative',
                  zIndex: 100
                }}
                whileHover={(isSubmitting || isSubmitted) ? {} : { scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {isSubmitting ? (
                  <>
                    <Send size={20} style={{ marginRight: '0.5rem' }} />
                    Envoi en cours...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} style={{ marginRight: '0.5rem' }} />
                    Demande envoyée avec succès!
                  </>
                ) : (
                  <>
                    <Send size={20} style={{ marginRight: '0.5rem' }} />
                    Envoyer la Demande
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Informations de Contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#DC2626'
            }}>
              Nos Coordonnées
            </h3>

            <ContactInfoCard
              icon={Mail}
              title="Email"
              content="contact@rubberflex.tn"
              delay={0.1}
            />

            <ContactInfoCard
              icon={Phone}
              title="Téléphone"
              content="+216 XX XXX XXX"
              delay={0.2}
            />

            <ContactInfoCard
              icon={MapPin}
              title="Adresse"
              content="Zone Industrielle, Tunisie"
              delay={0.3}
            />

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                marginTop: '2rem',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <MapPin size={32} color="#DC2626" style={{ marginBottom: '1rem' }} />
              <h4 style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Localisation
              </h4>
              <p style={{ color: '#e5e5e5' }}>
                Zone Industrielle<br />
                Tunisie
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm