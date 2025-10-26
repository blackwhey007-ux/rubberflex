# Rubberflex - CRM & Invoice Management SaaS

Application complète SaaS pour la gestion des clients, demandes, devis et factures pour Rubberflex Tunisie.

## 📋 Structure du Projet

```
rubberflex/
├── backend/          # API Backend (Node.js + Express + PostgreSQL)
│   ├── src/
│   │   ├── config/      # Configuration DB
│   │   ├── models/      # Modèles Sequelize
│   │   ├── controllers/ # Contrôleurs API
│   │   ├── routes/      # Routes Express
│   │   ├── middleware/  # Auth & validation
│   │   └── server.ts    # Point d'entrée
│   └── package.json
└── src/              # Frontend React (existant)
    ├── components/
    └── App.tsx
```

## 🚀 Installation

### Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### 1. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend (depuis la racine)
npm install
```

### 2. Configuration de la base de données

1. Créer une base de données PostgreSQL:
```sql
CREATE DATABASE rubberflex;
```

2. Créer le fichier `.env` dans `backend/`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rubberflex
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=24h

PORT=3000
NODE_ENV=development
```

### 3. Initialiser la base de données

```bash
cd backend
npm run migrate
npm run seed
```

Cela crée:
- Toutes les tables nécessaires
- Un utilisateur admin: `admin@rubberflex.tn` / `admin123`

### 4. Lancer l'application

**En développement:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

**En production:**
```bash
# Build frontend
npm run build

# Lancer serveur unifié
cd backend
npm start
```

L'application sera accessible sur: http://localhost:3000

## 🔑 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Connexion

### Clients (require auth)
- `GET /api/clients` - Liste des clients
- `GET /api/clients/:id` - Détails d'un client
- `POST /api/clients` - Créer un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Demandes
- `POST /api/demandes` - Créer une demande (public)
- `GET /api/demandes` - Liste des demandes (auth)
- `GET /api/demandes?statut=nouveau` - Filtrer par statut
- `PATCH /api/demandes/:id/statut` - Changer le statut

### Devis (require auth)
- `POST /api/devis/generate` - Générer un devis (PDF)
- `GET /api/devis/:id` - Détails d'un devis
- `GET /api/devis/:id/pdf` - Télécharger le PDF

### Factures (require auth)
- `POST /api/factures/generate` - Générer une facture (PDF)
- `GET /api/factures` - Liste des factures
- `PATCH /api/factures/:id/payment` - Mettre à jour le paiement
- `GET /api/factures/:id/pdf` - Télécharger le PDF

### Analytics (require manager/admin)
- `GET /api/analytics/dashboard` - Statistiques du dashboard

## 🎯 Fonctionnalités

### ✅ Implémenté

- ✅ Authentification JWT avec rôles (admin, manager, user)
- ✅ CRUD complet pour la gestion des clients
- ✅ Système de demandes avec workflow de statuts
- ✅ Génération automatique de devis (PDF)
- ✅ Génération automatique de factures (PDF)
- ✅ Numérotation automatique des documents
- ✅ Dashboard analytics avec statistiques
- ✅ API REST complète
- ✅ Intégration frontend <-> backend
- ✅ Validation des données
- ✅ Rate limiting pour sécurité

### 📊 Statistiques Dashboard

- Nombre total de clients
- Nombre de demandes par statut
- CA mensuel et total
- Taux de conversion
- Top produits et couleurs demandés
- Statuts de paiement des factures

### 🔒 Sécurité

- Authentification JWT
- Hash des mots de passe (bcrypt)
- Rate limiting
- CORS configuré
- Validation des données
- Protection des routes sensibles

## 🛠️ Technologies

**Backend:**
- Node.js + TypeScript
- Express.js
- Sequelize (ORM)
- PostgreSQL
- JWT Authentication
- PDFKit (génération PDF)
- Bcrypt (hash passwords)

**Frontend:**
- React 19
- TypeScript
- Framer Motion
- Three.js / React Three Fiber
- Tailwind CSS

## 📝 Workflow Typique

1. **Client remplit le formulaire** de contact → Création automatique d'une demande avec statut "nouveau"
2. **Admin/Manager** traite la demande → Passe le statut à "en_cours"
3. **Génération du devis** depuis la demande → Statut passe à "devis_envoye"
4. **Client accepte/refuse** → Statut devient "accepte" ou "refuse"
5. Si accepté, **génération de la facture** avec PDF automatique
6. **Suivi du paiement** avec statuts: non_paye, partiellement_paye, paye

## 🔧 Scripts Disponibles

**Backend:**
```bash
npm run dev      # Démarrer en mode dev
npm run build    # Compiler TypeScript
npm start        # Lancer en production
npm run migrate  # Créer les tables
npm run seed     # Créer utilisateur admin
```

**Frontend:**
```bash
npm run dev      # Démarrer Vite dev server
npm run build    # Build production
npm run preview  # Preview du build
```

## 📦 Déploiement

L'application est conçue pour être déployée sur un seul serveur:

1. Build le frontend: `npm run build`
2. Le backend sert automatiquement le frontend depuis `/dist`
3. La base de données doit être accessible depuis le serveur
4. Configurer les variables d'environnement en production

## 👤 Utilisateurs par Défaut

**Admin:**
- Email: `admin@rubberflex.tn`
- Password: `admin123`

## 📞 Support

Pour toute question, contactez-nous à: contact@rubberflex.tn

