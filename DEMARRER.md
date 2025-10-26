# 🚀 Comment Démarrer Rubberflex SaaS

## ⚡ Méthode Rapide

1. **Ouvrez un terminal** dans le dossier `rubberflex`

2. **Installez SQLite** (si pas déjà installé):
   ```bash
   cd backend
   npm install sqlite3
   ```

3. **Lancez le serveur**:
   ```bash
   npm run dev
   ```

4. **Ouvrez votre navigateur**:
   - API: http://localhost:3000
   - Health Check: http://localhost:3000/health

## 📋 Les Fichiers Créés

### Backend Structure
- ✅ `backend/src/models/` - 5 modèles (User, Client, Demande, Devis, Facture)
- ✅ `backend/src/controllers/` - 6 contrôleurs API
- ✅ `backend/src/routes/` - 6 fichiers de routes
- ✅ `backend/src/middleware/` - Authentification JWT
- ✅ `backend/src/config/` - Configuration DB

### API Endpoints
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/clients` - Liste clients
- `POST /api/demandes` - Créer demande
- `POST /api/devis/generate` - Générer devis PDF
- `POST /api/factures/generate` - Générer facture PDF
- `GET /api/analytics/dashboard` - Statistiques

## 🔑 Admin User Créé Automatiquement

- **Email:** `admin@rubberflex.tn`
- **Password:** `admin123`

## 🧪 Tester l'API

Après avoir lancé le serveur, testez avec curl:

```bash
# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@rubberflex.tn\",\"password\":\"admin123\"}"

# Liste clients (nécessite token)
curl http://localhost:3000/api/clients ^
  -H "Authorization: Bearer VOTRE_TOKEN"
```

## 📦 Base de Données

Le fichier `database.sqlite` sera créé automatiquement dans `backend/` au premier démarrage.

## 🎯 Fonctionnalités

✅ Authentification JWT  
✅ Gestion clients (CRUD)  
✅ Workflow demandes → devis → factures  
✅ Génération PDF automatique  
✅ Dashboard analytics  
✅ API REST complète  

## 🐛 Problèmes?

Si le serveur ne démarre pas:
1. Vérifiez que Node.js 18+ est installé
2. Reinstallez: `cd backend && npm install`
3. Consultez les logs dans le terminal

## 📝 Prochaines Étapes

Une fois le backend lancé:
1. Lancer le frontend (autre terminal): `npm run dev`
2. Ouvrir http://localhost:5173 (Vite)
3. Le formulaire de contact enverra des données au backend

