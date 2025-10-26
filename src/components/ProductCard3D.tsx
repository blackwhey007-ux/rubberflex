import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, SpotLight } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'

// Types pour les variantes de dalles
type DalleVariant = 'noir-blanc' | 'jaune' | 'bleu' | 'rouge' | 'noir-unique'

interface DalleConfig {
  baseColor: string
  speckleColors: string[]
  name: string
  description: string
}

const dalleConfigs: Record<DalleVariant, DalleConfig> = {
  'noir-blanc': {
    baseColor: '#1a1a1a',
    speckleColors: [
      '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E8E8E8', 
      '#DDDDDD', '#D0D0D0', '#C8C8C8', '#BEBEBE'
    ], // Blancs pour contraste sur noir
    name: 'Noir Moucheté Blanc',
    description: 'Caoutchouc recyclé noir avec mouchetures blanches'
  },
  jaune: {
    baseColor: '#1a1a1a',
    speckleColors: [
      '#FFD700', '#FFC107', '#FFB300', '#FFA000',
      '#FF8F00', '#FFAB00', '#FFD54F', '#FFCA28'
    ], // Jaunes vifs
    name: 'Noir Moucheté Jaune',
    description: 'Éclat jaune vif sur fond noir'
  },
  bleu: {
    baseColor: '#1a1a1a',
    speckleColors: [
      '#00BFFF', '#2196F3', '#03A9F4', '#40C4FF',
      '#00B0FF', '#0091EA', '#29B6F6', '#4FC3F7'
    ], // Bleus vifs
    name: 'Noir Moucheté Bleu',
    description: 'Fragments bleus éclatants sur fond noir'
  },
  rouge: {
    baseColor: '#1a1a1a',
    speckleColors: [
      '#DC2626', '#EF4444', '#F87171', '#FF5252',
      '#FF1744', '#D32F2F', '#E53935', '#F44336'
    ], // Rouges vifs
    name: 'Noir Moucheté Rouge',
    description: 'Éclats rouges dynamiques sur fond noir'
  },
  'noir-unique': {
    baseColor: '#1a1a1a',
    speckleColors: [], // Pas de mouchetures
    name: 'Noir Unique',
    description: 'Caoutchouc recyclé noir uni sans mouchetures'
  }
}

// Fonction pour générer la texture mouchetée avec fragments irréguliers ultra-réalistes
function generateSpeckledTexture(variant: DalleVariant): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 2048
  const ctx = canvas.getContext('2d')!

  const config = dalleConfigs[variant]

  // Fond noir pour la dalle
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, 2048, 2048)

  // Si c'est noir unique, ne pas générer de mouchetures
  if (config.speckleColors.length === 0) {
    return new THREE.CanvasTexture(canvas)
  }

  // Densité RÉDUITE pour dalle noire avec quelques taches colorées
  const densityMap = {
    'noir-blanc': 8000,   // Juste quelques taches blanches
    'jaune': 6000,        // Juste quelques taches jaunes
    'bleu': 6000,         // Juste quelques taches bleues
    'rouge': 5000,        // Juste quelques taches rouges
    'noir-unique': 0      
  }
  const numPoints = densityMap[variant as keyof typeof densityMap]

  // Générer les fragments principaux irréguliers et anguleux
  for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    
    // Distribution réaliste des tailles
    const sizeRandom = Math.random()
    let size
    if (sizeRandom < 0.4) {
      size = Math.random() * 2 + 1 // 40% petits (1-3 pixels)
    } else if (sizeRandom < 0.85) {
      size = Math.random() * 3 + 3 // 45% moyens (3-6 pixels)
    } else {
      size = Math.random() * 4 + 6 // 15% gros (6-10 pixels)
    }

    // Opacité MAXIMALE pour mouchetures ultra-visibles
    const opacityRandom = Math.random()
    let opacity
    if (opacityRandom < 0.95) {
      opacity = 1.0 // 95% complètement opaques pour visibilité maximale
    } else {
      opacity = 0.95 // 5% presque opaques
    }
    
    // Utiliser les couleurs spécifiques à la variante
    const color = config.speckleColors[Math.floor(Math.random() * config.speckleColors.length)]
    
    ctx.globalAlpha = opacity
    ctx.fillStyle = color
    
    // Créer un fragment irrégulier avec 4-7 côtés (comme les vraies dalles)
    const sides = Math.floor(Math.random() * 4) + 4 // 4-7 côtés
    ctx.beginPath()
    for (let j = 0; j < sides; j++) {
      const angle = (j / sides) * Math.PI * 2 + Math.random() * 0.5
      const radius = size * (0.5 + Math.random() * 0.8) // Variation de taille
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      if (j === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
  }

  // Ajouter quelques micro-fragments pour texture granuleuse subtile
  const numMicroFragments = 3000  // Réduit pour garder la dalle principalement noire
  for (let i = 0; i < numMicroFragments; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    const size = Math.random() * 1 + 0.5 // Micro-fragments subtils (0.5-1.5 pixels)
    const opacity = Math.random() * 0.3 + 0.5 // Opacité moyenne (0.5-0.8)
    
    const color = config.speckleColors[Math.floor(Math.random() * config.speckleColors.length)]
    
    ctx.globalAlpha = opacity
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size) // Petits carrés pour micro-texture
  }

  // Ajouter une passe de brillance pour les gros fragments
  const numHighlightPoints = Math.floor(numPoints * 0.1) // 10% des fragments principaux
  for (let i = 0; i < numHighlightPoints; i++) {
    const x = Math.random() * 2048
    const y = Math.random() * 2048
    const size = Math.random() * 2 + 1 // Points plus petits (1-3 pixels)
    const opacity = Math.random() * 0.3 + 0.7 // Opacité élevée
    
    const color = config.speckleColors[Math.floor(Math.random() * config.speckleColors.length)]
    
    // Ajouter un léger glow
    ctx.shadowBlur = 2
    ctx.shadowColor = color
    ctx.globalAlpha = opacity
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
    
    // Reset shadow
    ctx.shadowBlur = 0
    ctx.shadowColor = 'transparent'
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  
  // DEBUG: Vérifier la texture
  console.log(`Texture générée pour ${variant}:`, {
    width: canvas.width,
    height: canvas.height,
    hasContext: !!ctx,
    numPoints: config.speckleColors.length === 0 ? 0 : densityMap[variant as keyof typeof densityMap]
  })
  
  return texture
}

// Fonction pour générer la texture de surface granuleuse
function generateSurfaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Créer un pattern granuleux
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, 1024, 1024)

  // Ajouter des variations de gris pour simuler les granulés
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 1024
    const brightness = Math.random() * 100 + 100 // 100-200
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
    ctx.fillRect(x, y, 2, 2)
  }

  return new THREE.CanvasTexture(canvas)
}

// Composant de la dalle SBR 3D avec variante
function DalleSBR3D({ 
  variant,
  isHovered, 
  setIsHovered, 
  autoRotate, 
  rotationSpeed 
}: {
  variant: DalleVariant,
  isHovered: boolean,
  setIsHovered: (hovered: boolean) => void,
  autoRotate: boolean,
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [textures, setTextures] = useState<{
    speckled: THREE.CanvasTexture | null,
    surface: THREE.CanvasTexture | null
  }>({ speckled: null, surface: null })

  // Générer les textures au montage
  useEffect(() => {
    const speckledTexture = generateSpeckledTexture(variant)
    const surfaceTexture = generateSurfaceTexture()
    
    speckledTexture.wrapS = speckledTexture.wrapT = THREE.RepeatWrapping
    surfaceTexture.wrapS = surfaceTexture.wrapT = THREE.RepeatWrapping
    
    // AJOUTER CES LIGNES CRITIQUES
    speckledTexture.needsUpdate = true
    surfaceTexture.needsUpdate = true
    
    setTextures({ speckled: speckledTexture, surface: surfaceTexture })
  }, [variant])

  // Animation de rotation
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  const handlePointerEnter = () => setIsHovered(true)
  const handlePointerLeave = () => setIsHovered(false)

  return (
    <group>
      {/* Dalle principale avec dimensions exactes */}
      {textures.speckled && (
        <mesh
          ref={meshRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          scale={isHovered ? 1.05 : 1}
          rotation={[0.1, 0.2, 0]} // Rotation initiale pour vue isométrique
          castShadow
          receiveShadow
        >
                      <boxGeometry args={[1.2, 0.03, 1.2]} /> {/* 1200x30x1200mm - Plus grande */}
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.95}
            metalness={0.05}
            map={textures.speckled}
            bumpMap={textures.surface}
            bumpScale={0.001}
            transparent={false}
          />
        </mesh>
      )}

    </group>
  )
}

// Composant des lumières cinématiques
function CinematicLights() {
  return (
    <>
      <SpotLight
        position={[3, 4, 3]}
        color="#DC2626"
        intensity={1.5}
        angle={0.3}
        penumbra={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <SpotLight
        position={[-3, 4, 2]}
        color="#ffffff"
        intensity={0.8}
        angle={0.4}
        penumbra={1}
        castShadow
      />
      <pointLight
        position={[0, 2, -3]}
        color="#DC2626"
        intensity={0.6}
        castShadow
      />
      <ambientLight intensity={0.3} />
    </>
  )
}


// Composant principal ProductCard3D
function ProductCard3D() {
  const [selectedVariant, setSelectedVariant] = useState<DalleVariant>('noir-blanc')
  const [isHovered, setIsHovered] = useState(false)
  const [autoRotate] = useState(true)
  const [rotationSpeed] = useState(0.003)
  const [isLoaded, setIsLoaded] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  useEffect(() => {
    // Lazy loading avec délai pour améliorer les performances
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const currentConfig = dalleConfigs[selectedVariant]

  return (
    <section id="products" className="products-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Nos Produits</h2>
          <p>Dalles de sol SBR en caoutchouc recyclé - Made in Tunisia</p>
        </motion.div>

        <div className="products-grid">
          {/* Sélecteur de variantes */}
          <motion.div
            className="variant-selector"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Choisissez votre couleur :</h3>
            <div className="variant-buttons">
              {Object.entries(dalleConfigs).map(([variant, config]) => (
                <motion.button
                  key={variant}
                  className={`variant-btn ${selectedVariant === variant ? 'active' : ''}`}
                  onClick={() => setSelectedVariant(variant as DalleVariant)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: selectedVariant === variant ? config.speckleColors[0] : 'transparent',
                    borderColor: config.speckleColors[0],
                    color: selectedVariant === variant ? '#000' : config.speckleColors[0]
                  }}
                >
                  {config.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Canvas 3D avec dalle réaliste */}
          <motion.div
            className="product-3d-container"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isLoaded ? (
              <Canvas 
                camera={{ position: [1.8, 1.5, 1.8], fov: 50 }}
                performance={{ min: 0.5 }}
                dpr={[1, 1.5]}
                shadows
                style={{ background: '#ffffff' }}
              >
                <CinematicLights />
                <DalleSBR3D 
                  variant={selectedVariant}
                  isHovered={isHovered} 
                  setIsHovered={setIsHovered}
                  autoRotate={autoRotate}
                  rotationSpeed={rotationSpeed}
                />
                <OrbitControls 
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={autoRotate}
                  autoRotateSpeed={0.5}
                  minDistance={1.2}
                  maxDistance={2.5}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2.5}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
              </Canvas>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#ffffff',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(220, 38, 38, 0.3)',
                  borderTop: '3px solid #DC2626',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <div style={{ color: '#DC2626', fontSize: '1rem', fontWeight: 'bold' }}>
                  Chargement de la dalle 3D...
                </div>
              </div>
            )}

          </motion.div>

          {/* Informations produit */}
          <motion.div
            className="product-info"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>{currentConfig.name}</h3>
            <p>{currentConfig.description}</p>
            
            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Dimensions :</span>
                <span className="spec-value">900 × 900 × 20mm</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Poids :</span>
                <span className="spec-value">19kg</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Matériau :</span>
                <span className="spec-value">Caoutchouc SBR recyclé</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Finition :</span>
                <span className="spec-value">Anti-dérapante</span>
              </div>
            </div>

            <div className="product-actions">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un Devis
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Télécharger la Fiche Technique
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProductCard3D