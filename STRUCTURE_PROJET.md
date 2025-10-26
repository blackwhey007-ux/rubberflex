# 📁 Structure Complète du Projet RUBBERFLEX

## 🎯 Vue d'ensemble

```
rubberflex/
│
├── 📄 Fichiers de configuration
│   ├── package.json              # Dépendances frontend
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── index.html                # Point d'entrée HTML
│   └── vite.config.ts            # Configuration Vite
│
├── 📚 Documentation
│   ├── README.md                 # Vue d'ensemble
│   ├── DEMARRAGE_RAPIDE.md       # Guide de démarrage
│   ├── ADMIN_GUIDE.md            # Guide interface admin
│   ├── PROJET_COMPLET.md         # Documentation complète
│   ├── STRUCTURE_PROJET.md       # Ce fichier
│   ├── SETUP_INSTRUCTIONS.md     # Instructions d'installation
│   ├── DEMARRER.md               # Guide de lancement
│   ├── ETAT_PROJET.md            # État du projet
│   └── PROBLEME_RESOLUTION.md    # Dépannage
│
├── 🚀 Scripts de démarrage
│   ├── START_ALL.bat             # Démarrer tout (Windows)
│   └── START_SERVER.bat          # Démarrer serveur (Windows)
│
├── 🎨 Frontend (src/)
│   ├── main.tsx                  # Point d'entrée React
│   ├── App.tsx                   # Router principal
│   ├── index.css                 # Styles globaux
│   │
│   ├── 🌐 components/            # Composants site web
│   │   ├── Hero3D.tsx            # Hero avec animation 3D
│   │   ├── ProductCard3D.tsx     # Cartes produits 3D
│   │   ├── WhyRubberflex.tsx     # Section avantages
│   │   ├── Applications.tsx      # Section applications
│   │   ├── Specifications.tsx    # Spécifications techniques
│   │   ├── MadeInTunisia.tsx     # Section Made in Tunisia
│   │   ├── ContactForm.tsx       # Formulaire de contact ✅
│   │   ├── Footer.tsx            # Pied de page
│   │   └── GlobalEffects.tsx     # Effets globaux
│   │
│   └── 🔐 admin/                 # Interface admin
│       ├── context/
│       │   └── AuthContext.tsx   # Gestion authentification
│       │
│       ├── components/
│       │   ├── Layout.tsx        # Layout avec sidebar
│       │   └── ProtectedRoute.tsx # Protection des routes
│       │
│       └── pages/
│           ├── Login.tsx         # Page de connexion
│           ├── Dashboard.tsx     # Tableau de bord
│           ├── Clients.tsx       # Gestion clients
│           ├── Demandes.tsx      # Gestion demandes
│           ├── Devis.tsx         # Gestion devis
│           └── Factures.tsx      # Gestion factures
│
└── 🔧 Backend (backend/)
    ├── package.json              # Dépendances backend
    ├── tsconfig.json             # Configuration TypeScript
    ├── server.js                 # Serveur principal ✅
    ├── database.sqlite           # Base de données
    │
    └── src/
        ├── server.ts             # Code source serveur
        ├── server-simple.js      # Version simplifiée
        │
        ├── 🗄️ config/            # Configuration
        │   ├── database.ts       # Configuration DB
        │   ├── migrate.ts        # Migrations
        │   └── seed.ts           # Données initiales
        │
        ├── 📊 models/            # Modèles de données
        │   ├── index.ts          # Export des modèles
        │   ├── User.ts           # Modèle utilisateur
        │   ├── Client.ts         # Modèle client
        │   ├── Demande.ts        # Modèle demande
        │   ├── Devis.ts          # Modèle devis
        │   └── Facture.ts        # Modèle facture
        │
        ├── 🎮 controllers/       # Logique métier
        │   ├── authController.ts      # Authentification
        │   ├── clientController.ts    # Gestion clients
        │   ├── demandeController.ts   # Gestion demandes
        │   ├── devisController.ts     # Gestion devis
        │   ├── factureController.ts   # Gestion factures
        │   └── analyticsController.ts # Statistiques
        │
        ├── 🛣️ routes/           # Routes API
        │   ├── index.ts              # Export des routes
        │   ├── authRoutes.ts         # Routes auth
        │   ├── clientRoutes.ts       # Routes clients
        │   ├── demandeRoutes.ts      # Routes demandes
        │   ├── devisRoutes.ts        # Routes devis
        │   ├── factureRoutes.ts      # Routes factures
        │   └── analyticsRoutes.ts    # Routes analytics
        │
        └── 🔒 middleware/        # Middleware
            └── auth.ts               # Authentification JWT
```

---

## 🎯 Flux de données

### 1. Site Web → Backend
```
Utilisateur remplit formulaire
         ↓
ContactForm.tsx (frontend)
         ↓
POST /api/demandes
         ↓
demandeController.ts (backend)
         ↓
Demande.ts (model)
         ↓
database.sqlite
```

### 2. Admin → Backend → Admin
```
Admin se connecte
         ↓
Login.tsx
         ↓
POST /api/auth/login
         ↓
authController.ts
         ↓
JWT Token généré
         ↓
AuthContext.tsx (stockage)
         ↓
Protected Routes accessibles
         ↓
Dashboard, Clients, Demandes, etc.
```

### 3. Workflow Demande → Devis → Facture
```
Demande créée (statut: nouveau)
         ↓
Admin traite (statut: en_cours)
         ↓
Admin génère devis
         ↓
Devis créé (PDF généré)
         ↓
Admin envoie (statut: devis_envoye)
         ↓
Client accepte (statut: accepte)
         ↓
Admin génère facture
         ↓
Facture créée (PDF généré)
         ↓
Client paie (statut: paye)
```

---

## 🗄️ Base de données

### Tables et relations

```
┌─────────────┐
│   users     │
│─────────────│
│ id (PK)     │
│ email       │
│ passwordHash│
│ role        │
└─────────────┘

┌─────────────┐
│  clients    │
│─────────────│
│ id (PK)     │
│ nom         │
│ email       │
│ telephone   │
│ entreprise  │
│ adresse     │
│ notes       │
└─────────────┘

┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  demandes   │      │    devis    │      │  factures   │
│─────────────│      │─────────────│      │─────────────│
│ id (PK)     │──┐   │ id (PK)     │──┐   │ id (PK)     │
│ nom         │  │   │ numero      │  │   │ numero      │
│ email       │  └──→│ demandeId   │  └──→│ devisId     │
│ telephone   │      │ montantHt   │      │ montantTtc  │
│ produit     │      │ tva         │      │ statut      │
│ couleur     │      │ montantTtc  │      │ dateEmission│
│ surface     │      │ validite    │      │ datePaiement│
│ message     │      │ pdfPath     │      │ pdfPath     │
│ statut      │      └─────────────┘      └─────────────┘
└─────────────┘
```

---

## 🔐 Sécurité

### Authentification
```
Login
  ↓
Vérification email/password
  ↓
Génération JWT Token
  ↓
Token stocké (localStorage)
  ↓
Envoyé dans headers (Authorization: Bearer TOKEN)
  ↓
Middleware vérifie token
  ↓
Accès autorisé
```

### Protection des routes

#### Frontend
```typescript
<ProtectedRoute>
  <Layout>
    <Dashboard />
  </Layout>
</ProtectedRoute>
```

#### Backend
```typescript
router.get('/clients', authenticate, getClients)
                      ↑
                  Middleware
```

---

## 🎨 Technologies par couche

### Frontend
```
┌─────────────────────────────────────┐
│           React 18                  │
│  ┌─────────────────────────────┐   │
│  │   React Router              │   │
│  │   (Navigation)              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Framer Motion             │   │
│  │   (Animations)              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Three.js                  │   │
│  │   (3D Graphics)             │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Lucide React              │   │
│  │   (Icons)                   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Backend
```
┌─────────────────────────────────────┐
│           Node.js                   │
│  ┌─────────────────────────────┐   │
│  │   Express                   │   │
│  │   (Web Framework)           │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Sequelize                 │   │
│  │   (ORM)                     │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   JWT + bcrypt              │   │
│  │   (Security)                │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   PDFKit                    │   │
│  │   (PDF Generation)          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Base de données
```
┌─────────────────────────────────────┐
│           SQLite                    │
│  ┌─────────────────────────────┐   │
│  │   database.sqlite           │   │
│  │   (File-based DB)           │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 📊 API Endpoints

### Structure des routes

```
/api
├── /auth
│   ├── POST /login
│   └── POST /register
│
├── /clients
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /:id
│   ├── PUT    /:id
│   └── DELETE /:id
│
├── /demandes
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /:id
│   ├── PATCH  /:id/statut
│   └── DELETE /:id
│
├── /devis
│   ├── GET    /
│   ├── POST   /generate
│   ├── GET    /:id
│   ├── GET    /:id/pdf
│   └── DELETE /:id
│
├── /factures
│   ├── GET    /
│   ├── POST   /generate
│   ├── GET    /:id
│   ├── GET    /:id/pdf
│   ├── PATCH  /:id/statut
│   └── DELETE /:id
│
└── /analytics
    └── GET    /dashboard
```

---

## 🎯 Points d'entrée

### Développement

#### Backend
```bash
cd backend
node server.js
```
→ `http://localhost:3000`

#### Frontend
```bash
npm run dev
```
→ `http://localhost:5173`

### Production

#### Build
```bash
npm run build
```
→ Génère `dist/`

#### Preview
```bash
npm run preview
```
→ Test du build de production

---

## ✅ Fichiers importants

### Configuration
- `package.json` - Dépendances et scripts
- `tsconfig.json` - Configuration TypeScript
- `vite.config.ts` - Configuration Vite
- `backend/package.json` - Dépendances backend

### Code source
- `src/App.tsx` - Router principal
- `src/main.tsx` - Point d'entrée React
- `backend/src/server.ts` - Serveur Express
- `backend/server.js` - Version compilée

### Base de données
- `backend/database.sqlite` - Base SQLite
- `backend/src/models/*.ts` - Modèles Sequelize

### Documentation
- `README.md` - Vue d'ensemble
- `DEMARRAGE_RAPIDE.md` - Guide de démarrage
- `ADMIN_GUIDE.md` - Guide admin
- `PROJET_COMPLET.md` - Documentation complète

---

## 🎨 Conventions de code

### Nommage
- **Composants React**: PascalCase (`Dashboard.tsx`)
- **Fichiers utilitaires**: camelCase (`authController.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Variables**: camelCase (`userName`)

### Structure des fichiers
```typescript
// Imports
import React from 'react'
import { useAuth } from '../context/AuthContext'

// Types/Interfaces
interface Props {
  title: string
}

// Component
export default function Component({ title }: Props) {
  // Hooks
  const { user } = useAuth()
  
  // State
  const [data, setData] = useState([])
  
  // Effects
  useEffect(() => {
    // ...
  }, [])
  
  // Handlers
  const handleClick = () => {
    // ...
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

---

## 🚀 Prêt à démarrer!

Utilisez `START_ALL.bat` (Windows) ou suivez le guide dans `DEMARRAGE_RAPIDE.md`

**Bon développement! 🎉**

---

*Made in Tunisia 🇹🇳 with ❤️*

