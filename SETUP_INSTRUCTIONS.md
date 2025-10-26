# Instructions d'Installation - Rubberflex SaaS

## 🚀 Installation Rapide

### 1. Prérequis

- **Node.js** version 18 ou supérieure
- **PostgreSQL** version 14 ou supérieure
- **npm** ou **yarn**

### 2. Cloner et Installer

```bash
# Déjà dans le dossier rubberflex
cd rubberflex

# Installer les dépendances du backend
cd backend
npm install

# Revenir à la racine et installer les dépendances frontend
cd ..
npm install
```

### 3. Configuration Base de Données

#### Créer la base de données PostgreSQL:

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE rubberflex;

# Quitter psql
\q
```

#### Configurer les variables d'environnement:

Créer un fichier `.env` dans le dossier `backend/`:

```bash
cd backend
cp .env.example .env
# Puis éditer le fichier .env avec vos informations
```

Contenu minimum du `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rubberflex
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

JWT_SECRET=rubberflex_super_secret_key_change_in_production
JWT_EXPIRATION=24h

PORT=3000
NODE_ENV=development
```

### 4. Initialiser la Base de Données

```bash
cd backend

# Créer les tables
npm run migrate

# Créer l'utilisateur admin
npm run seed
```

L'utilisateur admin créé sera:
- **Email:** `admin@rubberflex.tn`
- **Password:** `admin123`

⚠️ **Important:** Changez ce mot de passe en production!

### 5. Lancer l'Application

#### Mode Développement (recommandé pour débuter)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

L'application sera accessible sur:
- **Frontend:** http://localhost:5173 (port Vite par défaut)
- **Backend API:** http://localhost:3000

#### Mode Production (serveur unifié)

```bash
# Build frontend et backend
npm run build

# Lancer le serveur
npm start
```

L'application sera accessible sur: http://localhost:3000

### 6. Tester l'Installation

1. **Vérifier la connexion DB:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Se connecter comme admin:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@rubberflex.tn","password":"admin123"}'
   ```

3. **Tester une demande depuis le formulaire de contact**

## 📋 Structure du Projet

```
rubberflex/
├── backend/              # Backend Node.js/Express
│   ├── src/
│   │   ├── config/     # Configuration DB
│   │   ├── models/     # Modèles Sequelize
│   │   ├── controllers/# Contrôleurs API
│   │   ├── routes/      # Routes Express
│   │   ├── middleware/ # Auth & validation
│   │   └── server.ts   # Point d'entrée
│   ├── .env            # Variables d'environnement
│   └── package.json
├── src/                # Frontend React existant
│   ├── components/
│   └── App.tsx
├── dist/               # Build frontend
├── package.json
└── README.md
```

## 🔧 Scripts Disponibles

**Depuis la racine:**
```bash
npm run dev          # Lancer frontend + backend en dev
npm run build        # Build production complet
npm start            # Lancer en mode production
```

**Depuis backend/:**
```bash
npm run dev          # Lancer backend en dev avec nodemon
npm run build        # Compiler TypeScript
npm start            # Lancer backend compilé
npm run migrate      # Créer/synchroniser tables
npm run seed         # Créer utilisateur admin
```

**Depuis src/ (frontend):**
```bash
npm run dev          # Lancer Vite dev server
npm run build        # Build production
npm run preview      # Preview du build
```

## 🎯 Fonctionnalités Disponibles

### ✅ CRUD Clients
- Créer, lire, modifier, supprimer des clients
- Historique des interactions
- API: `/api/clients`

### ✅ Gestion des Demandes
- Formulaire de contact → Création automatique de demande
- Workflow: nouveau → en_cours → devis_envoye → accepte/refuse
- API: `/api/demandes`

### ✅ Génération de Devis
- Génération automatique de PDF
- Numérotation automatique (DEVIS-2025-XXXX)
- API: `/api/devis/generate`

### ✅ Génération de Factures
- Génération automatique de PDF
- Numérotation automatique (FACT-2025-XXXX)
- Suivi des paiements
- API: `/api/factures`

### ✅ Dashboard Analytics
- Statistiques en temps réel
- CA mensuel/annuel
- Taux de conversion
- Top produits/couleurs
- API: `/api/analytics/dashboard`

## 🔒 Sécurité

- **JWT Authentication** pour toutes les routes protégées
- **Bcrypt** pour le hash des mots de passe
- **Rate limiting** sur toutes les routes
- **CORS** configuré
- **Validation** des données

## 🐛 Dépannage

### Problème de connexion à la base de données

Vérifier:
1. PostgreSQL est démarré
2. Les credentials dans `.env` sont corrects
3. La base de données `rubberflex` existe

```bash
# Tester la connexion
psql -h localhost -U postgres -d rubberflex
```

### Erreur "Port already in use"

Si le port 3000 est déjà utilisé:

```bash
# Changer le port dans backend/.env
PORT=3001
```

### Erreur lors de la génération de PDF

Vérifier que le dossier `uploads` existe:
```bash
mkdir -p backend/uploads
```

## 📞 API Endpoints

Documentation complète dans le README.md

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Connexion

### Clients
- `GET /api/clients` - Liste
- `GET /api/clients/:id` - Détails
- `POST /api/clients` - Créer
- `PUT /api/clients/:id` - Modifier
- `DELETE /api/clients/:id` - Supprimer

### Demandes
- `POST /api/demandes` - Créer (public)
- `GET /api/demandes` - Liste (auth)
- `GET /api/demandes?statut=xxx` - Filtrer
- `PATCH /api/demandes/:id/statut` - Changer statut

### Devis
- `POST /api/devis/generate` - Générer devis
- `GET /api/devis/:id` - Détails
- `GET /api/devis/:id/pdf` - PDF

### Factures
- `POST /api/factures/generate` - Générer facture
- `GET /api/factures` - Liste
- `PATCH /api/factures/:id/payment` - Mettre à jour paiement
- `GET /api/factures/:id/pdf` - PDF

### Analytics
- `GET /api/analytics/dashboard` - Statistiques

## 🎉 Prêt!

Votre backend SaaS est maintenant configuré et prêt à l'emploi!

Pour toute question: contact@rubberflex.tn

